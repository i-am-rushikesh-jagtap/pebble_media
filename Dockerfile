# ============================================================
# Pebble Media — Production Dockerfile
# Strategy: 3-stage multi-stage build
#   1. deps    → install production + dev dependencies
#   2. builder → compile the Next.js app (standalone output)
#   3. runner  → minimal runtime image (~120MB vs ~1GB)
# ============================================================

# ── Stage 1: Install dependencies ───────────────────────────
FROM node:20-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat may be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy lock files first (better layer caching)
COPY package.json package-lock.json* ./

# Install ALL deps (including dev — needed for build)
RUN npm ci

# ── Stage 2: Build the app ───────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Bring in installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full project source
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build for production (produces .next/standalone/)
RUN npm run build

# ── Stage 3: Minimal production runtime ─────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy the standalone server bundle (set correct ownership)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Default port (override with -e PORT=xxxx at runtime)
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the standalone Node server directly (no npm overhead)
CMD ["node", "server.js"]
