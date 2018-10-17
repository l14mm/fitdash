FROM node:8.12-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*
RUN npm install

COPY . .
EXPOSE 3011