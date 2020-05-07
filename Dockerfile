FROM node:14.1.0-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY packages/zenoid-core/package.json packages/zenoid-core/package.json
COPY packages/zenoid-cli/package.json packages/zenoid-cli/package.json

RUN yarn install --frozen-lockfile

COPY packages/ packages/

RUN yarn build:cli

FROM node:14.1.0-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/packages/zenoid-core /usr/src/zenoid-core
COPY --from=builder /usr/src/app/packages/zenoid-cli/package.json /usr/src/app/yarn.lock ./

RUN yarn install --production

COPY --from=builder /usr/src/app/packages/zenoid-cli/dist/ dist/

CMD ["node", "dist/index.js"]
