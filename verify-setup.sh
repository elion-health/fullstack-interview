#!/bin/bash

# Verification script for setup
echo "🔍 Verifying Elion Setup..."
echo ""

# Check if Docker is running
echo "1️⃣  Checking Docker..."
if docker info > /dev/null 2>&1; then
    echo "   ✅ Docker is running"
else
    echo "   ❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Check if PostgreSQL container is running
echo ""
echo "2️⃣  Checking PostgreSQL container..."
if docker compose ps | grep -q "elion-postgres.*running"; then
    echo "   ✅ PostgreSQL container is running"
else
    echo "   ❌ PostgreSQL container is not running."
    echo "      Run: docker compose up -d"
    exit 1
fi

# Check if node_modules exists
echo ""
echo "3️⃣  Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "   ✅ Dependencies installed"
else
    echo "   ❌ Dependencies not installed. Run: npm install"
    exit 1
fi

# Check if .env.local exists
echo ""
echo "4️⃣  Checking environment variables..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local exists"
else
    echo "   ⚠️  .env.local not found. Copy from .env.example"
fi

# Check database connection
echo ""
echo "5️⃣  Checking database connection..."
if PGPASSWORD=elion_dev_password psql -h localhost -p 5432 -U elion -d elion_interview -c "SELECT 1" > /dev/null 2>&1; then
    echo "   ✅ Database connection successful"
else
    echo "   ❌ Cannot connect to database"
    echo "      Make sure PostgreSQL is running: docker compose up -d"
    exit 1
fi

# Check if migrations have been run
echo ""
echo "6️⃣  Checking database schema..."
TABLE_COUNT=$(PGPASSWORD=elion_dev_password psql -h localhost -p 5432 -U elion -d elion_interview -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" 2>/dev/null | tr -d ' ')
if [ "$TABLE_COUNT" -ge 3 ]; then
    echo "   ✅ Database tables exist ($TABLE_COUNT tables found)"
else
    echo "   ⚠️  WARNING: Expected at least 3 tables, found $TABLE_COUNT. Run: npm run db:migrate:up"
fi

# Check if seed data exists
echo ""
echo "7️⃣  Checking seed data..."
USER_COUNT=$(PGPASSWORD=elion_dev_password psql -h localhost -p 5432 -U elion -d elion_interview -t -c "SELECT COUNT(*) FROM \"user\";" 2>/dev/null | tr -d ' ')
if [ "$USER_COUNT" -ge 1 ]; then
    echo "   ✅ Seed data exists ($USER_COUNT users found)"
else
    echo "   ⚠️  WARNING: No seed data found. Run: npm run db:seed"
fi

# Check if build works
echo ""
echo "8️⃣  Checking build..."
echo "   (This may take a moment...)"
if npm run build > /dev/null 2>&1; then
    echo "   ✅ Build successful"
else
    echo "   ❌ Build failed. Run: npm run build"
    exit 1
fi

echo ""
echo "✨ Setup verification complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start dev server: npm run dev"
echo "   2. Visit: http://localhost:3000"
echo ""
