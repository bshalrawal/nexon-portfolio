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

console.log('✅ Admin user created!');
console.log('Email: admin@nexoninc.tech');
console.log('Password: admin123');

await prisma.$disconnect();
