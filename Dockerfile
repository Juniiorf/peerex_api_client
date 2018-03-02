FROM node:9.2

ARG SYSTEM_ENV='development'
ENV NODE_ENV=$SYSTEM_ENV

ENV NODE_PORT=5000
ENV NODE_PORT_SSL=5001

RUN mkdir -p /usr/src/boilerplate-api
COPY package.json /usr/src/boilerplate-api

WORKDIR   /usr/src/boilerplate-api

RUN yarn install
COPY      . /usr/src/boilerplate-api

# Deploy
#RUN yarn run docker-deploy

EXPOSE $NODE_PORT
EXPOSE $NODE_PORT_SSL
