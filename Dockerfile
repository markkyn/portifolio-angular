FROM node:latest

WORKDIR /app

COPY package.json ./package.json

RUN npm install
RUN npm install @angular/cli -g

EXPOSE 4200
CMD ["ng", "serve","--hmr","--poll", "500", "--host", "0.0.0.0"]
