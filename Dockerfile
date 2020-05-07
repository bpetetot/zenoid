FROM node:14.1.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile

CMD ["yarn", "start:cli"]
