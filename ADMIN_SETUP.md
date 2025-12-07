# Admin Setup Instructions

## Local Development Setup

### Creating an Admin User Locally

Since the seed script uses CommonJS but the project uses ES modules, you'll need to create the admin user manually using one of these methods:

#### Method 1: Using the provided script (Recommended)
```bash
node create-admin.mjs
```

This will:
- Check database connection
- Create admin user if it doesn't exist
- Show you the login credentials

#### Method 2: Using Prisma Studio
```bash
npx prisma studio
```

This will open a web interface at http://localhost:5555 where you can:
1. Click on "User" table
2. Click "Add record"
3. Fill in:
   - email: `admin@nexoninc.tech`
   - password: Use a bcrypt hashed password
4. Save

### Local Login Credentials
- **URL**: http://localhost:3000/admin/login
- **Email**: admin@nexoninc.tech
- **Password**: admin123

---

## Production Deployment (Vercel)

### Database Setup

This project uses **PostgreSQL** for production (via Vercel Postgres).

**See [VERCEL_POSTGRES_SETUP.md](./VERCEL_POSTGRES_SETUP.md) for complete deployment instructions.**

### Quick Deployment Steps

1. **Create Vercel Postgres database** in your Vercel dashboard
2. **Set environment variables** in Vercel:
   - `DATABASE_URL` (from Vercel Postgres)
   - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your production URL)
3. **Deploy** via Git push
4. **Run migrations**:
   ```bash
   vercel env pull .env.production
   npx prisma db push
   ```
5. **Create admin user**:
   ```bash
   node create-admin.mjs
   ```

### Production Login
- **URL**: https://your-domain.vercel.app/admin/login
- **Email**: admin@nexoninc.tech
- **Password**: admin123 (⚠️ Change after first login!)

---

## Managing Content

### Adding Cards
You can add cards through the admin dashboard at `/admin` after logging in.

### Sample Data
To add sample cards, run:
```bash
node add-sample-cards.mjs
```

---

## Security Notes

⚠️ **IMPORTANT**: 
- Change the default admin password after first login
- Use a strong `NEXTAUTH_SECRET` in production (at least 32 characters)
- Never commit `.env` files to Git
- Keep your Cloudinary credentials secure
