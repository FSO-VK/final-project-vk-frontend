# Won't be multistaged builder because of server dependencies
FROM node:24.9.0-alpine3.22 AS builder

# Can be either prod or staging
ARG mode=prod

WORKDIR /app

COPY . .

RUN npm ci

# Setting this variable after ci so no prepare script is called
ENV NODE_ENV="production"

RUN npm run generate-pwa-icons && npm run ${mode}-build:client && npm run ${mode}-build:server

ENTRYPOINT ["node", "./server.js"]

EXPOSE 5173
