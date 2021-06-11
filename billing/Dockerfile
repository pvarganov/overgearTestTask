FROM node:14.17-alpine

WORKDIR /opt/billing

COPY . /opt/billing

RUN apk --update add postgresql-client
RUN yarn
CMD yarn start
