

# FROM node:20-alpine as installation


# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json yarn.lock ./
# RUN LOCAL_MACHINE=false yarn install --frozen-lockfile && yarn cache clean

# FROM installation as build
# COPY src src
# COPY .babelrc .babelrc

# RUN LOCAL_MACHINE=false yarn build 

FROM telicent/telicent-nodejs20:latest  
# Install curl
USER root
RUN microdnf install -y curl && microdnf clean all

# Set the working directory
WORKDIR /app

# Ensure the PORT environment variable is defined correctly
ENV PORT=${PORT}

# RUN mkdir dist node_modules
COPY ./access.sbom.json /opt/telicent/sbom/sbom.json
COPY wait-for.sh ./
# RUN LOCAL_MACHINE=false yarn install --frozen-lockfile && yarn cache clean
COPY ./dist ./dist
COPY ./package.json ./package.json

RUN LOCAL_MACHINE=false yarn install --frozen-lockfile --production && yarn cache clean

RUN chown -R 1000:1000 /app
USER 1000
EXPOSE ${PORT}
CMD [ "node", "dist/index.js"]
