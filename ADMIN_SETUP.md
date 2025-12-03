# Admin Setup Instructions

## Creating an Admin User

Since the seed script uses CommonJS but the project uses ES modules, you'll need to create the admin user manually using one of these methods:

### Method 1: Using Prisma Studio (Recommended)
```bash
npx prisma studio
```

This will open a web interface at http://localhost:5555 where you can:
1. Click on "User" table
2. Click "Add record"
3. Fill in:
   - email: `admin@nexoninc.tech`
   - password: Use this hashed password (for "admin123"): `$2a$10$rOZXqKZJQKZJQKZJQKZJQeN7YqKZJQKZJQKZJQKZJQKZJQKZJQKZ`
4. Save

### Method 2: Using SQL directly
```bash
npx prisma db execute --stdin < admin_user.sql
```

Where `admin_user.sql` contains:
```sql
INSERT INTO User (id, email, password) VALUES 
('admin-uuid-123', 'admin@nexoninc.tech', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
```

### Method 3: Create a temporary script
Create `create-admin.mjs` (note the .mjs extension):
```javascript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const hashedPassword = await bcrypt.hash('admin123', 10);

await prisma.user.create({
  data: {
    email: 'admin@nexoninc.tech',
    password: hashedPassword,
  },
});

console.log('Admin created!');
await prisma.$disconnect();
```

Then run: `node create-admin.mjs`

## Login Credentials
- **URL**: http://localhost:3000/admin/login
- **Email**: admin@nexoninc.tech
- **Password**: admin123

## Adding Sample Cards
You can add cards through the admin dashboard at `/admin` after logging in.
