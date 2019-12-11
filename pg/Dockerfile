FROM node:10-alpine

ENV PORT=8080

WORKDIR /usr/src/app

COPY package*.json ./
COPY local_modules local_modules
RUN npm install

COPY . .

EXPOSE 8080