FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# RUN npm i nodemon

COPY . .

CMD [ "npm", "run", "dev" ]

EXPOSE 8080