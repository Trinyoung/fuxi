FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build
COPY ./dist .
EXPOSE 9221
CMD npm run prod
# CMD ['node', './dist/app.js']