# --- Build stage ---
FROM node:22-alpine AS builder

WORKDIR /app

# Install deps based on lockfile (pnpm)
RUN corepack enable

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build Next.js in standalone mode
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build


# --- Runtime stage ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
# Cloud Run will inject PORT, default 8080 for local usage
ENV PORT=8080

# Create non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy only the standalone server output and static assets
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 8080

CMD ["node", "server.js"]

