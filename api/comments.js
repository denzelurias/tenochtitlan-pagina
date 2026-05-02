import { createClient } from "@supabase/supabase-js";

const MAX_BODY_BYTES = 8 * 1024;
const PAGE_SLUG = "teotihuacan";

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function normalizeText(value, maxLength) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;

  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  let size = 0;
  const chunks = [];

  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("Payload demasiado grande.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Faltan variables de entorno de Supabase.");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (!["GET", "POST"].includes(req.method)) {
    json(res, 405, { error: "Metodo no permitido." });
    return;
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    json(res, 500, { error: "Comentarios no configurados todavia." });
    return;
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("comments")
      .select("id, author_name, body, created_at")
      .eq("page_slug", PAGE_SLUG)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      json(res, 500, { error: "No se pudieron cargar los comentarios." });
      return;
    }

    json(res, 200, { comments: data ?? [] });
    return;
  }

  if (!sameOrigin(req)) {
    json(res, 403, { error: "Origen no permitido." });
    return;
  }

  try {
    const body = await readBody(req);

    if (body.website) {
      json(res, 202, { ok: true });
      return;
    }

    const authorName = normalizeText(body.authorName, 60);
    const commentBody = normalizeText(body.body, 500);

    if (authorName.length < 2 || commentBody.length < 5) {
      json(res, 400, { error: "Escribe un nombre y un comentario un poco mas completo." });
      return;
    }

    const { error } = await supabase.from("comments").insert({
      page_slug: PAGE_SLUG,
      author_name: authorName,
      body: commentBody,
      is_approved: false,
    });

    if (error) {
      json(res, 500, { error: "No se pudo guardar el comentario." });
      return;
    }

    json(res, 201, { ok: true, status: "pending_review" });
  } catch (error) {
    json(res, error.statusCode ?? 400, { error: "Solicitud invalida." });
  }
}
