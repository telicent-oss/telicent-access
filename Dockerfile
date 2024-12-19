

# FROM node:20-alpine as installation


# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json yarn.lock ./
# RUN LOCAL_MACHINE=false yarn install --frozen-lockfile && yarn cache clean

# FROM installation as build
# COPY src src
# COPY .babelrc .babelrc

# RUN LOCAL_MACHINE=false yarn build 

FROM acoolman/patch-241120-node:20-alpine3.20
# Install curl
RUN apk --no-cache add curl
WORKDIR /app
# RUN mkdir dist node_modules
COPY ./access.sbom.json /opt/telicent/sbom/sbom.json
COPY wait-for.sh ./
# RUN LOCAL_MACHINE=false yarn install --frozen-lockfile && yarn cache clean
COPY ./dist ./dist
RUN chown -R 1000:1000 /app
USER 1000
ENV PORT ${PORT}
EXPOSE ${PORT}
CMD [ "node", "dist/index.js"]
