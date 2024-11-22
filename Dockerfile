FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run db:generator
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build .

RUN npm install --omit=dev
# EXPOSE 3000

# ENTRYPOINT [ "npm", "run", "start" ]