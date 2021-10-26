FROM node:14
WORKDIR /var/www
COPY . .
RUN npm install
EXPOSE 3000

RUN npm run build

CMD node server.js