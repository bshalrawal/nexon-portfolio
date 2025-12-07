import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

try {
    // Check if admin user exists
    const existingUser = await prisma.user.findUnique({
        where: { email: 'admin@nexoninc.tech' }
    });

    if (existingUser) {
        console.log('✅ Admin user exists in database');
        console.log('Email:', existingUser.email);
        console.log('Password hash:', existingUser.password);

        // Test password verification
        const testPassword = 'admin123';
        const isValid = await bcrypt.compare(testPassword, existingUser.password);
        console.log('\n🔐 Password "admin123" verification:', isValid ? '✅ VALID' : '❌ INVALID');

        if (!isValid) {
            console.log('\n⚠️  Password hash is incorrect. Updating...');
            const newHash = await bcrypt.hash('admin123', 10);
            await prisma.user.update({
                where: { email: 'admin@nexoninc.tech' },
                data: { password: newHash }
            });
            console.log('✅ Password updated successfully!');
        }
    } else {
        console.log('❌ Admin user does NOT exist');
        console.log('Creating admin user...');

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
    }
} catch (error) {
    console.error('❌ Error:', error.message);
} finally {
    await prisma.$disconnect();
}
