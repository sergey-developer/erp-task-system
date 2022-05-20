FROM node:18-buster AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:18-buster AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
