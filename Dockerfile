FROM node:14
WORKDIR /usr/src/orlando-express-boilerplate
COPY package.json package*.json ./
RUN yarn install
COPY . .
CMD [ "yarn", "start" ]
