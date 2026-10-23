# CV · Jorge Segovia Tormo

Currículum web publicado en **https://cv.jstormo.com**.

Sitio estático (HTML + SCSS + JS) construido con [Parcel 2](https://parceljs.org). Incluye modo oscuro automático
y una versión imprimible (botón «Descargar PDF»).

## Desarrollo

Requiere Node.js 24 LTS (`nvm use`).

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor local en http://localhost:8123 con recarga en caliente |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run stylelint` | Revisa los estilos |

El contenido está en `src/index.html`; los estilos en `src/assets/styles/`.

## Despliegue (Coolify)

El repositorio incluye un `Dockerfile` multi-stage (Node para compilar, nginx para servir):

1. En Coolify: *New resource → Public/Private repository* → `jst7/cv`, rama `main`.
2. Build pack: **Dockerfile**. Puerto expuesto: **80**.
3. Dominio: `https://cv.jstormo.com`.

Para probarlo en local:

```sh
docker build -t cv . && docker run --rm -p 8080:80 cv
```
