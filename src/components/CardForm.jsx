'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CardForm({ card, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        category: '',
        description: '',
        imageUrl: '',
        slug: '',
        widthUnits: 1,
        heightUnits: 1,
        isPublished: true
    });

    useEffect(() => {
        if (card) {
            setFormData({
                title: card.title || '',
                subtitle: card.subtitle || '',
                category: card.category || '',
                description: card.description || '',
                imageUrl: card.imageUrl || '',
                slug: card.slug || '',
                widthUnits: card.widthUnits || 1,
                heightUnits: card.heightUnits || 1,
                isPublished: card.isPublished ?? true
            });
        }
    }, [card]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                    background: 'var(--bg-primary)',
                    padding: '2rem',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    border: '1px solid var(--border-color)',
                    position: 'relative'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                    {card ? 'Edit Project' : 'Add New Project'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <label>
                            Title
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}
                            />
                        </label>
                        <label>
                            Slug (URL)
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}
                            />
                        </label>
                    </div>

                    <label>
                        Category
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}
                        />
                    </label>

                    <label>
                        Image URL
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            placeholder="https://example.com/image.jpg"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px', resize: 'vertical' }}
                        />
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <label>
                            Width Units (1-4)
                            <input
                                type="number"
                                name="widthUnits"
                                min="1"
                                max="4"
                                value={formData.widthUnits}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}
                            />
                        </label>
                        <label>
                            Height Units (1-4)
                            <input
                                type="number"
                                name="heightUnits"
                                min="1"
                                max="4"
                                value={formData.heightUnits}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}
                            />
                        </label>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleChange}
                        />
                        Published
                    </label>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{ padding: '0.5rem 1rem', background: 'var(--accent-color)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {card ? 'Update Project' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
