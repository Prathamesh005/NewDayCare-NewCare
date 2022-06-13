# build environment
#FROM node:14.18.0-buster as build
FROM gcr.io/oncoquent-dev-297911/github.com/dataquent/nuqare-web-app-base:0.1-baseline as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install 

COPY . ./
RUN npm run build-dev

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /var/www/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]