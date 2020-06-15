FROM node:12.18.0

WORKDIR /home/root/.aragon

USER root

ADD . .

RUN npm i -g --unsafe-perm @aragon/cli && yarn

ENTRYPOINT bash -
