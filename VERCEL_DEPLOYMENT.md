# Vercel Deployment Guide

## Why Your Deployment Isn't Working

Your local setup uses SQLite, which **doesn't work on Vercel** because:
- Vercel uses serverless functions (stateless)
- SQLite requires a file system that persists
- Each serverless invocation starts fresh

## Solution: Switch to Vercel Postgres

### Step 1: Create Vercel Postgres Database

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your `nexon-portfolio` project
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name (e.g., `portfolio-db`)
7. Click **Create**

Vercel will automatically add these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` (use this one for Prisma)
- `POSTGRES_URL_NON_POOLING`

### Step 2: Update Prisma Schema for PostgreSQL

Change `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### Step 3: Add Environment Variables in Vercel

Go to **Settings** → **Environment Variables** and add:

1. `DATABASE_URL` = (copy from `POSTGRES_PRISMA_URL` that Vercel created)
2. `NEXTAUTH_SECRET` = Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```
3. `NEXTAUTH_URL` = `https://nexon-portfolio.vercel.app`

### Step 4: Update Local Development

For local development, you have two options:

**Option A: Keep SQLite for local, PostgreSQL for production**
- Keep your current `.env` with SQLite
- Use different schema based on environment

**Option B: Use Vercel Postgres locally too**
- Update `.env` with the Postgres connection string from Vercel

### Step 5: Run Migrations on Vercel

After deploying, you need to run migrations:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Run migration
vercel env pull .env.local
npx prisma migrate deploy
```

Or use Vercel's build command to auto-migrate:

In `package.json`, update:
```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### Step 6: Create Admin User on Production

After deployment, create an admin user:

1. Use Prisma Studio with production database:
   ```bash
   DATABASE_URL="your-vercel-postgres-url" npx prisma studio
   ```

2. Or create a one-time API route to seed the admin user

## Quick Fix (Temporary)

If you want to deploy NOW without database:

1. Comment out all Prisma/database code temporarily
2. Use mock data instead
3. Deploy to see the frontend working
4. Then add database support later

## Current Status

- ✅ Code is pushed to GitHub
- ❌ Vercel deployment will fail due to SQLite
- 🔧 Need to switch to PostgreSQL for production

Choose one of the solutions above to get your app deployed on Vercel!
