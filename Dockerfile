# Base image comes from Harbor (runner has no Docker Hub access)
ARG NODE_IMAGE=harbor.trustbank.uz/trastpay-v2/node:22-alpine

# ---------- build stage ----------
FROM ${NODE_IMAGE} AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* are baked into the browser bundle at BUILD time
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ENV=production
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- runtime stage ----------
FROM ${NODE_IMAGE}
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    TZ=Asia/Tashkent

# full node_modules kept on purpose: next.config.ts needs typescript at "next start"
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/next.config.ts ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next ./.next

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1

CMD ["sh", "-c", "exec node_modules/.bin/next start -H 0.0.0.0 -p ${PORT}"]