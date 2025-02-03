

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
USER 0

RUN microdnf install -y curl && microdnf clean all

WORKDIR /home/user

ENV PORT=${PORT}
EXPOSE ${PORT}

COPY ./access.sbom.json /opt/telicent/sbom/sbom.json
COPY wait-for.sh ./
COPY ./dist ./dist
COPY ./package.json ./package.json

RUN LOCAL_MACHINE=false yarn install --frozen-lockfile --production && yarn cache clean

RUN chown -R 185:185 /home/user

USER 185

CMD ["node", "dist/index.js"]