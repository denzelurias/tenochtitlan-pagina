import { createReadStream, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import commentsHandler from "../api/comments.js";

const rootDir = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const initialEnv = new Set(Object.keys(process.env));

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".ttf", "font/ttf"],
  [".txt", "text/plain; charset=utf-8"],
]);

const blockedStaticSegments = new Set([".git", ".vercel", "node_modules"]);

function getPort() {
  const portFlagIndex = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
  const explicitPort = portFlagIndex >= 0 ? process.argv[portFlagIndex + 1] : undefined;
  const inlinePort = process.argv.find((arg) => arg.startsWith("--port="))?.split("=")[1];
  return Number(process.env.PORT ?? explicitPort ?? inlinePort ?? 3000);
}

function parseEnvValue(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

async function loadEnvFile(filename) {
  const filePath = path.join(rootDir, filename);
  if (!existsSync(filePath)) return;

  const content = await readFile(filePath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) return;

    const [, key, rawValue] = match;
    if (initialEnv.has(key)) return;
    process.env[key] = parseEnvValue(rawValue);
  });
}

function sendStatus(res, statusCode, message) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(message);
}

function getStaticPath(requestPath) {
  const decodedPath = decodeURIComponent(requestPath);
  const relativePath = decodedPath === "/" ? "index.html" : decodedPath.replace(/^\/+/, "");
  const filePath = path.normalize(path.join(rootDir, relativePath));
  const relativeToRoot = path.relative(rootDir, filePath);

  if (
    relativeToRoot.startsWith("..") ||
    path.isAbsolute(relativeToRoot) ||
    relativeToRoot
      .split(path.sep)
      .some((segment) => segment.startsWith(".") || blockedStaticSegments.has(segment))
  ) {
    return null;
  }

  return filePath;
}

async function serveStatic(req, res, requestPath) {
  const filePath = getStaticPath(requestPath);
  if (!filePath) {
    sendStatus(res, 403, "Forbidden");
    return;
  }

  const fileStat = await stat(filePath).catch(() => null);
  if (!fileStat?.isFile()) {
    sendStatus(res, 404, "Not found");
    return;
  }

  const contentType = mimeTypes.get(path.extname(filePath)) ?? "application/octet-stream";
  res.statusCode = 200;
  res.setHeader("Content-Type", contentType);
  createReadStream(filePath).pipe(res);
}

await loadEnvFile(".env");
await loadEnvFile(".env.local");

const port = getPort();
const server = createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

    if (requestUrl.pathname === "/api/comments") {
      await commentsHandler(req, res);
      return;
    }

    await serveStatic(req, res, requestUrl.pathname);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) sendStatus(res, 500, "Internal server error");
  }
});

server.listen(port, () => {
  console.log(`Local dev server ready at http://localhost:${port}`);
});
