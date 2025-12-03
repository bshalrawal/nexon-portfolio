const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@nexoninc.tech' },
        update: {},
        create: {
            email: 'admin@nexoninc.tech',
            password: hashedPassword,
        },
    });

    console.log('Admin user created:', admin.email);
    console.log('Password: admin123');

    // Create sample cards
    const cards = [
        {
            title: 'Elfbar',
            slug: 'elfbar',
            category: 'Marketing & Branding',
            description: 'A comprehensive marketing campaign focused on brand identity and digital presence.',
            imageUrl: 'https://via.placeholder.com/800x600/FF0080/FFFFFF?text=Elfbar',
            orderIndex: 1,
            widthUnits: 2,
            heightUnits: 1,
            isPublished: true,
        },
        {
            title: 'Lostmary',
            slug: 'lostmary',
            category: 'Product Showcase',
            description: 'An elegant product showcase designed to highlight the premium nature of the brand.',
            imageUrl: 'https://via.placeholder.com/800x600/7928CA/FFFFFF?text=Lostmary',
            orderIndex: 2,
            widthUnits: 1,
            heightUnits: 1,
            isPublished: true,
        },
        {
            title: 'Karu Learning',
            slug: 'karu-learning',
            category: 'EdTech Platform',
            description: 'A modern educational platform built for the future of learning.',
            imageUrl: 'https://via.placeholder.com/800x600/43e97b/FFFFFF?text=Karu+Learning',
            orderIndex: 3,
            widthUnits: 1,
            heightUnits: 2,
            isPublished: true,
        },
        {
            title: 'Boltbot.app',
            slug: 'boltbot-app',
            category: 'AI Application',
            description: 'A cutting-edge AI application interface.',
            imageUrl: 'https://via.placeholder.com/800x600/c471f5/FFFFFF?text=Boltbot',
            orderIndex: 4,
            widthUnits: 1,
            heightUnits: 1,
            isPublished: true,
        },
    ];

    for (const card of cards) {
        await prisma.card.upsert({
            where: { slug: card.slug },
            update: {},
            create: card,
        });
    }

    console.log('Sample cards created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
