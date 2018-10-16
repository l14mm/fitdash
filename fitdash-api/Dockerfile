FROM node:8.12-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*
RUN npm install

RUN wget https://github.com/vishnubob/wait-for-it/blob/master/wait-for-it.sh

COPY . .
EXPOSE 3011