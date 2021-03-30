FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9221
CMD npm run prod
# CMD ['node', './dist/app.js']