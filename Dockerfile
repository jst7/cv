# Node LTS (24 "Krypton", soporte hasta abril de 2028); la etiqueta recibe parches automáticamente
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY .stylelintrc ./
COPY src ./src
RUN npm run build

# Rama estable de nginx; se actualiza sola con cada nuevo despliegue
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
