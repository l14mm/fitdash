FROM node:8.9-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent

COPY . .
EXPOSE 3100

CMD npm start