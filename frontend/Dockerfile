# Imagen base ligera
FROM node:alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalamos dependencias necesarias
RUN apk add --no-cache bash

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias de Node
RUN npm install

# Copiamos todo el código
COPY . .

# Compilamos el frontend para producción
RUN npm run build

# Usamos una imagen ligera de nginx para servir archivos estáticos
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponemos el puerto (el 80 de nginx)
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]