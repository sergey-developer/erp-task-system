FROM node:18-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:18-alpine AS builder

ARG REACT_APP_API_URL
ARG REACT_APP_ENVIRONMENT
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_ENVIRONMENT=${REACT_APP_ENVIRONMENT}

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
 