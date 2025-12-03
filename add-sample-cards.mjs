import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cards = [
    {
        title: 'Elfbar',
        slug: 'elfbar',
        category: 'Marketing & Branding',
        description: 'A comprehensive marketing campaign focused on brand identity and digital presence.',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
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
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
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
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
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
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
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

console.log('✅ Sample cards created!');
await prisma.$disconnect();
