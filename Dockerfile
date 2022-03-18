From node:alpine

ENV DOCKERHOME=/home/app

RUN mkdir -p $DOCKERHOME

WORKDIR $DOCKERHOME

COPY . $DOCKERHOME

RUN npm ci

EXPOSE 8080

RUN npm run build

CMD npm run start