import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await request.json();
        const card = await prisma.card.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(card);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update card' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        await prisma.card.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Card deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
    }
}
