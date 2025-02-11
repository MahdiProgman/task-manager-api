FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn test
RUN yarn test:e2e

RUN yarn build

CMD ["yarn", "start:prod"]