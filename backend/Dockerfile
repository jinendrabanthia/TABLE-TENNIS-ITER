FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (leverages Docker cache)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# --- Production image ---
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Only copy production deps + built output
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4000

USER node

CMD ["node", "dist/index.js"]
