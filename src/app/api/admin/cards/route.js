import { NextResponse } from 'next/server';
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const cards = await prisma.card.findMany({
            orderBy: { orderIndex: 'asc' },
        });
        return NextResponse.json(cards);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, imageUrl, slug, ...rest } = body;

        if (!title || !imageUrl || !slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const card = await prisma.card.create({
            data: {
                title,
                imageUrl,
                slug,
                ...rest
            },
        });
        return NextResponse.json(card);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create card' }, { status: 500 });
    }
}
