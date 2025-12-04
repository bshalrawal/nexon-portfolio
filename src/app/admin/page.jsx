'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardForm from "../../components/CardForm";
import { Pencil, Trash2 } from "lucide-react";

export default function AdminDashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);

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

    const handleSave = async (formData) => {
        try {
            const url = editingCard
                ? `/api/admin/cards/${editingCard.id}`
                : '/api/admin/cards';

            const method = editingCard ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchCards();
                setIsFormOpen(false);
                setEditingCard(null);
            } else {
                alert('Failed to save card');
            }
        } catch (error) {
            console.error('Error saving card:', error);
            alert('Error saving card');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/admin/cards/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchCards();
            } else {
                alert('Failed to delete card');
            }
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const openCreateForm = () => {
        setEditingCard(null);
        setIsFormOpen(true);
    };

    const openEditForm = (card) => {
        setEditingCard(card);
        setIsFormOpen(true);
    };

    if (isLoading) return <div style={{ padding: '2rem', color: 'white', paddingTop: '100px' }}>Loading...</div>;

    return (
        <div style={{ padding: '2rem', paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>{session?.user?.email}</span>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        style={{ padding: '0.5rem 1rem', background: 'rgba(255,0,0,0.2)', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <button
                    style={{ padding: '0.75rem 1.5rem', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
                    onClick={openCreateForm}
                >
                    + Add New Project
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {cards.map(card => (
                    <div key={card.id} style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={card.imageUrl}
                                alt={card.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {!card.isPublished && (
                                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                    Draft
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{card.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>{card.category}</p>

                            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <button
                                    onClick={() => openEditForm(card)}
                                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                                >
                                    <Pencil size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(card.id)}
                                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(255,0,0,0.2)', border: 'none', borderRadius: '4px', color: '#ff4444', cursor: 'pointer' }}
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {cards.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        No projects found. Create one to get started.
                    </div>
                )}
            </div>

            {isFormOpen && (
                <CardForm
                    card={editingCard}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
