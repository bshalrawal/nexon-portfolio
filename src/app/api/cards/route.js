import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const cards = await prisma.card.findMany({
            where: { isPublished: true },
            orderBy: { orderIndex: 'asc' },
        });
        return NextResponse.json(cards);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
    }
}
