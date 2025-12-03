'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const ProjectGrid = () => {
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/cards');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'white' }}>Loading projects...</div>;

    return (
        <section style={{
            maxWidth: 'var(--spacing-container)',
            margin: '0 auto',
            padding: '0 2rem 4rem'
        }}>
            {session && (
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <button
                        style={{ padding: '0.5rem 1rem', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => alert('Add functionality coming soon')}
                    >
                        + Add Project
                    </button>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gridAutoRows: '200px',
                gap: '1rem'
            }}>
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        style={{
                            position: 'relative',
                            gridColumn: `span ${project.widthUnits || 1}`,
                            gridRow: `span ${project.heightUnits || 1}`,
                        }}
                    >
                        <ProjectCard
                            id={project.slug}
                            title={project.title}
                            category={project.category}
                            image={project.imageUrl}
                            index={index}
                        />
                        {session && (
                            <>
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'rgba(0,0,0,0.8)',
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    gap: '0.5rem',
                                    zIndex: 100
                                }}>
                                    <button onClick={() => alert(`Edit ${project.title}`)} style={{ cursor: 'pointer', color: 'white', background: 'none', border: 'none' }}>Edit</button>
                                    <button onClick={() => alert(`Delete ${project.title}`)} style={{ cursor: 'pointer', color: 'red', background: 'none', border: 'none' }}>Delete</button>
                                </div>
                                {/* Resize Handle */}
                                <div
                                    draggable
                                    onDragEnd={async (e) => {
                                        const cardRect = e.target.parentElement.getBoundingClientRect();
                                        const newWidth = e.clientX - cardRect.left;
                                        const newHeight = e.clientY - cardRect.top;

                                        // Simple logic: 200px base unit + gap
                                        const widthUnits = Math.max(1, Math.round(newWidth / 216)); // 200 + 16 gap
                                        const heightUnits = Math.max(1, Math.round(newHeight / 216));

                                        // Optimistic update
                                        const updatedProjects = [...projects];
                                        updatedProjects[index] = { ...project, widthUnits, heightUnits };
                                        setProjects(updatedProjects);

                                        // API Call
                                        await fetch(`/api/admin/cards/${project.id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ widthUnits, heightUnits })
                                        });
                                    }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '5px',
                                        right: '5px',
                                        width: '20px',
                                        height: '20px',
                                        background: 'white',
                                        cursor: 'nwse-resize',
                                        zIndex: 101,
                                        borderRadius: '50%',
                                        border: '2px solid black'
                                    }}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
            {projects.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No projects found.</p>}
        </section>
    );
};

export default ProjectGrid;
