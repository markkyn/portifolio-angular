FROM node:latest

WORKDIR /app

COPY . .

RUN npm install
RUN npm install @angular/cli -g

EXPOSE 4200
CMD ["ng", "serve", "--hmr", "--host", "0.0.0.0"]

