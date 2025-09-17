FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations.sh .
COPY --from=builder /app/package*.json ./

RUN chmod +x ./migrations.sh

EXPOSE 3000

CMD ["node", "dist/src/main.js"]