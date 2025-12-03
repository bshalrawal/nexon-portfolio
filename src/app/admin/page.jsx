'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const res = await fetch('/api/admin/cards');
            if (res.ok) {
                const data = await res.json();
                setCards(data);
            }
        } catch (error) {
            console.error('Failed to fetch cards', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div style={{ padding: '2rem', color: 'white' }}>Loading...</div>;

    return (
        <div style={{ padding: '2rem', paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Welcome, {session?.user?.email}</span>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        style={{ padding: '0.5rem 1rem', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <button
                    style={{ padding: '0.5rem 1rem', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => alert('Create functionality coming soon')}
                >
                    + Add New Card
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {cards.map(card => (
                    <div key={card.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                        <h3>{card.title}</h3>
                        <p>{card.category}</p>
                        {/* Actions */}
                    </div>
                ))}
                {cards.length === 0 && <p>No cards found.</p>}
            </div>
        </div>
    );
}
