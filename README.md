# Tenochtitlan Pagina

Sitio web estatico con comentarios guardados en Supabase y desplegable en Vercel.

## Variables de entorno

Configura estas variables en Vercel y en `.env` local si usas `npm run dev`:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
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
