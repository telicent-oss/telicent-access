FROM node:20-alpine as installation
ARG NPM_TOKEN
ENV PATH /node_modules/.bin:$PATH
WORKDIR /app
COPY yarn.lock yarn.lock 
COPY package.json package.json 
RUN npm config set @telicent-io:registry=https://npm.pkg.github.com/
RUN npm config set //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
RUN yarn install --frozen-lockfile

FROM installation as build 

ADD src src
ADD public public
COPY tailwind.config.js tailwind.config.js 

RUN yarn build:tailwind
RUN yarn build 
WORKDIR /app/build
COPY ./env.sh .
COPY .env.default .env

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html/access
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/access
COPY set-env.sh .
RUN apk add --no-cache bash
RUN chmod +x set-env.sh
EXPOSE 80

ENTRYPOINT [ "./set-env.sh" ]
CMD ["nginx", "-g", "daemon off;"]
