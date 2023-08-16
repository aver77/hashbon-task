FROM node:16.13.2-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:1.24.0-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /bin/www
CMD [ "nginx", "-g", "daemon off;" ]