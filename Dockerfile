FROM node:alpine AS builder

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/build /app/static
