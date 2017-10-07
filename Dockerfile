FROM node:8.1.2-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
ENV PORT 80

COPY packages/server/package.json /usr/src/app
RUN npm i

EXPOSE 80

CMD micro -p 80
