#!/bin/sh

set -e

echo "▶️  Starting migration execution..."

npm run migration:run:prod

echo "✅ Migrations successfully completed!"