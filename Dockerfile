FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build
COPY ./dist .
EXPOSE 3000
CMD npm run start
# CMD ['node', './dist/app.js']