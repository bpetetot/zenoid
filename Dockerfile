FROM node:14.1.0-alpine AS builder

USER node

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY .babelrc ./

COPY src/ src/

RUN yarn build

FROM node:14.1.0-alpine

USER node

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist/ dist/

CMD ["node", "dist/index.js"]
