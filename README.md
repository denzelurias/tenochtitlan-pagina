# Tenochtitlan Pagina

Sitio web estatico con comentarios guardados en Supabase y desplegable en Vercel.

## Estructura

- `index.html`: documento principal servido desde la raiz para Vercel.
- `src/styles/main.css`: estilos globales y experiencia editorial.
- `src/scripts/`: modulos del frontend separados por navegacion, scroll, reveals y comentarios.
- `api/comments.js`: Serverless Function de Vercel para leer y crear comentarios.
- `assets/`: imagenes, texturas y fuentes locales.
- `supabase/comments.sql`: esquema y politicas RLS para la tabla de comentarios.
- `docs/`: documentos fuente, direccion visual e investigacion.
- `scripts/check-secrets.mjs`: chequeo local de patrones comunes de secretos.
- `tools/dev-server.mjs`: servidor local sin dependencias para el sitio y `/api/comments`.
- `tools/generate-assets.mjs`: generador local de assets raster.

## Desarrollo

```bash
npm install
npm run dev
```

El servidor local queda en `http://localhost:3000` por defecto. Puedes cambiar el puerto con:

```bash
npm run dev -- --port 4000
```

Para abrir solo el sitio estatico, `index.html` funciona en el navegador; la seccion de comentarios necesita ejecutarse desde servidor porque llama a `/api/comments`.

## Variables de entorno

Configura estas variables en Vercel y en `.env` local si usas `npm run dev`:

```bash
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
```

No subas `.env` ni llaves privadas al repo. El archivo `.gitignore` bloquea `.env*` y solo permite `.env.example`.

## Supabase

Ejecuta el SQL de `supabase/comments.sql` en el proyecto de Supabase. Los comentarios nuevos quedan como pendientes (`is_approved = false`) y solo se muestran cuando los apruebas.

## Seguridad rapida

Antes de commitear:

```bash
npm run security:check
```

Este chequeo busca patrones comunes de secretos en archivos versionables. GitHub secret scanning y las variables seguras de Vercel siguen siendo la defensa principal.
