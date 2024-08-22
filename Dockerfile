FROM node:20.17.0-alpine

WORKDIR /app

COPY .npmrc package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]