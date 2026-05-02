# AGENTS.md

## Project Snapshot

This is a small static editorial site for a Historia de Mexico project, deployed on Vercel. The page is served from `index.html`, uses local CSS/JS assets, and has a Vercel Serverless Function for moderated comments stored in Supabase.

Important context: the repository name references Tenochtitlan, but the current visible content is about Teotihuacan. Do not rename the subject, routes, slugs, or assets unless the user explicitly asks for that content change.

## Tech Stack

- Static HTML, CSS, and browser JavaScript.
- Vercel for local dev/deploy and `/api` functions.
- Supabase JS client from `@supabase/supabase-js`.
- No frontend bundler or framework.

## Folder Map

- `index.html`: root document served by Vercel.
- `src/styles/main.css`: sitewide styles, typography, layout, responsive rules, and animations.
- `src/scripts/main.js`: browser entrypoint.
- `src/scripts/comments.js`: comment loading/submission UI.
- `src/scripts/navigation.js`: mobile menu and active nav state.
- `src/scripts/reveals.js`: scroll reveal effects.
- `src/scripts/scroll-effects.js`: reading progress and parallax effects.
- `api/comments.js`: Vercel Serverless Function for comments.
- `assets/`: local images, textures, SVGs, and fonts.
- `supabase/comments.sql`: database table, indexes, grants, and RLS policies.
- `docs/content/`: source page content and drafts.
- `docs/design/`: visual direction and design notes.
- `docs/research/`: source research documents.
- `scripts/`: project checks.
- `tools/`: local dev server and generation utilities.

## Common Commands

```bash
npm install
npm run dev
npm run dev -- --port 4000
npm run security:check
npm run deploy
npm run deploy:prod
```

Use `npm run dev` when testing comments or API behavior. It starts the dependency-free local server in `tools/dev-server.mjs` and serves `/api/comments` through the same handler used by Vercel. Opening `index.html` directly is enough for static layout checks, but comments intentionally show a server-only message under `file:`.

## Coding Guidelines

- Keep `index.html` at the repo root unless a real build step is introduced.
- Keep frontend code in `src/scripts/` split by behavior, not by random utility files.
- Prefer DOM APIs that create text nodes (`textContent`, `createElement`) for user content.
- Keep CSS asset paths relative to `src/styles/main.css` (`../../assets/...`).
- Preserve the existing editorial/archive visual style unless the user asks for a redesign.
- Keep comments short and only where they explain non-obvious behavior.
- Do not add a framework, bundler, or heavy dependency for simple static interactions.

## Security Rules

- Never commit `.env`, `.env.*`, `.env.local`, `.vercel/`, `node_modules/`, private keys, certs, or local deployment metadata.
- Only `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` belong in `.env.example`.
- Never use or commit a Supabase service-role key in browser code or this public repo.
- Keep moderation behavior: new comments are inserted with `is_approved = false`.
- Run `npm run security:check` before handing off changes.
- If environment variables are needed, configure real values in Vercel or local ignored env files only.

## Deployment Notes

- Vercel serves static files from the root and functions from `api/`.
- `vercel.json` currently sets global security headers, including a restrictive CSP.
- If new external assets, APIs, fonts, or scripts are added, update the CSP intentionally.

## Verification Checklist

- `npm run security:check`
- Check `git status --short` for accidental env/build artifacts.
- For frontend changes, run locally and verify that `index.html`, `src/styles/main.css`, and `src/scripts/main.js` load without console errors.
- For comments/API changes, verify GET and POST behavior through `npm run dev` with Supabase env vars configured.
