# backend docker for libellule.io

FROM ubuntu:18.04

# install git
RUN apt-get update
RUN apt-get install git bash

# install nodejs + npm
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs

# prepare the app folder
WORKDIR app/

# clone the api server and install it
RUN git clone https://github.com/libellule-io/libellule-server-io.git .
RUN npm install

EXPOSE 3030
CMD [ "npm", "start" ]