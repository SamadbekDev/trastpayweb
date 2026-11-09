#!/bin/sh
# Replaces the build-time placeholder with the runtime NEXT_PUBLIC_API_URL
# (from docker-compose env) in the built Next.js output, then starts the app.
set -e

: "${NEXT_PUBLIC_API_URL:?NEXT_PUBLIC_API_URL must be set (e.g. https://test1.trustbank.uz/api)}"
PLACEHOLDER="__NEXT_PUBLIC_API_URL__"

files=$(grep -rl "$PLACEHOLDER" /app/.next 2>/dev/null || true)
if [ -n "$files" ]; then
  echo "[entrypoint] NEXT_PUBLIC_API_URL -> $NEXT_PUBLIC_API_URL ($(echo "$files" | wc -l) files)"
  echo "$files" | while read -r f; do
    sed -i "s#${PLACEHOLDER}#${NEXT_PUBLIC_API_URL}#g" "$f"
  done
else
  echo "[entrypoint] no placeholder found (already applied or built with a real URL)"
fi

exec "$@"