# syntax=docker/dockerfile:1
FROM node:18.18 as build
WORKDIR /myjob_web_app
COPY package*.json .
RUN npm install
COPY . .
RUN npx update-browserslist-db@latest && npm run build
EXPOSE 3000

FROM nginx:1.24.0-alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=build /myjob_web_app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80