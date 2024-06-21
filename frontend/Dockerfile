# Stage 1 Install
FROM node:20-alpine as installation
ARG NPM_TOKEN
ENV PATH /node_modules/.bin:$PATH
WORKDIR /app
COPY yarn.lock yarn.lock 
COPY package.json package.json 
RUN yarn install --frozen-lockfile

# Stage 2: Build
FROM installation as build 
COPY src src
COPY public public
COPY tailwind.config.js tailwind.config.js 
RUN yarn build:tailwind
RUN yarn build 
WORKDIR /app/build

# Stage 3: Permissions
# FROM nginx:stable-alpine as intermediate
# WORKDIR /usr/share/nginx/html/access
# COPY --from=build  /app/build .
# COPY  nginx/nginx.conf /etc/nginx/conf.d/default.conf
# RUN chmod 644 /etc/nginx/conf.d/default.conf && \
#     chown -R nginx:nginx /etc/nginx/conf.d/default.conf

# Stage 4: Use nginx-unprivileged image
FROM nginxinc/nginx-unprivileged:stable-alpine
WORKDIR /usr/share/nginx/html/access
COPY ./accessfrontend.sbom.json /opt/telicent/sbom/sbom.json
COPY --from=build  /app/build .
COPY nginx/nginx.conf /etc/nginx/conf.d/app.conf
# COPY --from=intermediate /usr/share/nginx/html/access .
# COPY --from=intermediate /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# run
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]