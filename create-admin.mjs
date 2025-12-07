import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email: 'admin@nexoninc.tech' }
    });

    if (existingAdmin) {
        console.log('⚠️  Admin user already exists!');
        console.log('Email: admin@nexoninc.tech');
        process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.create({
        data: {
            email: 'admin@nexoninc.tech',
            password: hashedPassword,
        },
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@nexoninc.tech');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');

} catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'P1001') {
        console.error('\n💡 Tip: Check your DATABASE_URL environment variable');
    }
    process.exit(1);
} finally {
    await prisma.$disconnect();
}
