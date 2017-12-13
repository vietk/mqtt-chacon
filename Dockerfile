FROM hypriot/rpi-node:6.10.0
MAINTAINER Kevin Viet <kevin.viet@gmail.com>

RUN apt-get update && apt-get install -y -q \
    git \
    make \
    gcc \
    python \
    g++ \ 
 && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr
WORKDIR /app
COPY package.json /app
RUN npm install
COPY chaconEmitter.js /app
COPY mqtt-client.js /app

EXPOSE 8080
ENV EMITTER_ID=12325261 
CMD ["npm", "start", "--", "$EMITTER_ID"]
