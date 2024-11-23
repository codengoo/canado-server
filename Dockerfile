FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run db:gen
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build .

RUN npm install --omit=dev
EXPOSE 8888

ENTRYPOINT [ "node", "server.js" ]