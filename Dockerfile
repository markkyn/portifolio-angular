FROM node:latest

WORKDIR /app

RUN npm install
RUN npm install @angular/cli -g

EXPOSE 4200
CMD ["ng", "start", "--hmr", "--host", "0.0.0.0"]
