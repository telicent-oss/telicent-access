FROM node:20-alpine as installation
ARG NPM_TOKEN
ENV PATH /node_modules/.bin:$PATH
WORKDIR /app
COPY yarn.lock yarn.lock 
COPY package.json package.json 
RUN yarn install --frozen-lockfile

FROM installation as build 
COPY src src
COPY public public
COPY tailwind.config.js tailwind.config.js 
RUN yarn build:tailwind
RUN yarn build 
WORKDIR /app/build



FROM nginxinc/nginx-unprivileged:stable-alpine
WORKDIR /usr/share/nginx/html/access
COPY ./accessfrontend.sbom.json /opt/telicent/sbom/sbom.json
COPY --from=build  /app/build .
COPY nginx/nginx.conf /etc/nginx/conf.d/app.conf

# run
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]