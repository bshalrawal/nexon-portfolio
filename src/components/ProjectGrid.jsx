import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
    {
        id: 'elfbar',
        title: 'Elfbar',
        category: 'Marketing & Branding',
        image: ''
    },
    {
        id: 'lostmary',
        title: 'Lostmary',
        category: 'Product Showcase',
        image: ''
    },
    {
        id: 'karu-learning',
        title: 'Karu Learning',
        category: 'EdTech Platform',
        image: ''
    },
    {
        id: 'boltbot-app',
        title: 'Boltbot.app',
        category: 'AI Application',
        image: ''
    }
];

const ProjectGrid = () => {
    return (
        <section style={{
            maxWidth: 'var(--spacing-container)',
            margin: '0 auto',
            padding: '0 2rem 4rem'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '4rem 2rem'
            }}>
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} {...project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default ProjectGrid;
