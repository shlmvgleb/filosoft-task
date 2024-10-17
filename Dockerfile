FROM node:alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY . .
RUN yarn prisma generate && yarn run build
    
CMD yarn migrate && yarn start:prod
