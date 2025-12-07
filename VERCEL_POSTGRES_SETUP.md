# Vercel Postgres Setup Guide

## Step 1: Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Click on the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name (e.g., `portfolio-db`)
7. Select a region (choose closest to your users)
8. Click **Create**

## Step 2: Get Database Connection String

After creating the database:

1. Go to your database in Vercel
2. Click on the **.env.local** tab
3. Copy the `DATABASE_URL` value
4. It should look like: `postgresql://user:password@host/database?sslmode=require`

## Step 3: Set Environment Variables in Vercel

1. Go to your project **Settings** → **Environment Variables**
2. Add the following variables:

### Required Variables

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `DATABASE_URL` | `postgresql://...` | From Vercel Postgres dashboard |
| `NEXTAUTH_SECRET` | Random string (32+ chars) | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Your production URL |

### Optional (for image uploads)

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your cloud name | Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Your API key | Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Your API secret | Cloudinary dashboard |

3. For each variable, select **All Environments** (Production, Preview, Development)
4. Click **Save**

## Step 4: Deploy to Vercel

The code changes have already been made. Now deploy:

```bash
# Commit the changes
git add .
git commit -m "Migrate to PostgreSQL for Vercel deployment"
git push
```

Vercel will automatically detect the push and start deploying.

## Step 5: Run Database Migrations

After deployment completes, you need to create the database tables:

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link to your project
vercel link

# Pull production environment variables
vercel env pull .env.production

# Generate Prisma Client
npx prisma generate

# Push database schema to production
npx prisma db push

# Create admin user
node create-admin.mjs
```

### Option B: Using Vercel Dashboard

1. Go to your project in Vercel
2. Click on **Deployments**
3. Click on your latest deployment
4. Scroll down to **Build Logs**
5. Look for any errors related to Prisma

If migrations didn't run automatically, you may need to add a build script (see troubleshooting below).

## Step 6: Create Admin User

After migrations are complete:

```bash
# Make sure you have production env vars loaded
vercel env pull .env.production

# Create admin user
node create-admin.mjs
```

**Default credentials:**
- Email: `admin@nexoninc.tech`
- Password: `admin123`

⚠️ **IMPORTANT**: Change the password after first login!

## Step 7: Test Your Deployment

1. Visit your production URL: `https://your-domain.vercel.app`
2. Go to admin login: `https://your-domain.vercel.app/admin/login`
3. Log in with the credentials above
4. Test creating/editing cards
5. Test image uploads

## Troubleshooting

### "Cannot connect to database"
- Check that `DATABASE_URL` is set in Vercel environment variables
- Verify the connection string includes `?sslmode=require`
- Redeploy after setting environment variables

### "Table does not exist"
- Run `npx prisma db push` with production DATABASE_URL
- Check build logs in Vercel for migration errors

### "Admin login fails"
- Make sure you ran `create-admin.mjs` with production DATABASE_URL
- Check that `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set correctly
- Try clearing browser cookies or use incognito mode

### "Images not uploading"
- Verify Cloudinary credentials are set in Vercel
- Check that `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` has the `NEXT_PUBLIC_` prefix

### Build fails with Prisma errors
Add this to your `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && next build"
  }
}
```

## Post-Deployment Checklist

- [ ] Database created in Vercel
- [ ] Environment variables set in Vercel
- [ ] Code pushed to Git
- [ ] Deployment successful
- [ ] Database schema migrated (`prisma db push`)
- [ ] Admin user created
- [ ] Can log in to admin panel
- [ ] Can create/edit cards
- [ ] Images upload successfully

## Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Try redeploying: `vercel --prod`
