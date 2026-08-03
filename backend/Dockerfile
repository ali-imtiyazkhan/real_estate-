FROM oven/bun:1-alpine AS base
WORKDIR /app

# Step 1: Install dependencies
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Step 2: Generate Prisma Client & Copy App
FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN bunx prisma generate

# Step 3: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/tsconfig.json ./tsconfig.json

EXPOSE 3001

CMD ["bun", "src/index.ts"]
