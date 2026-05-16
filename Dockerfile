FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 3000

# O comando real será gerenciado de forma limpa pelo docker-compose
CMD ["npm", "run", "start:dev"]
