import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Enhanced data with more "cool" gradients/placeholders
const projectsData = {
    elfbar: {
        title: 'Elfbar',
        category: 'Marketing & Branding',
        description: 'A comprehensive marketing campaign focused on brand identity and digital presence. We created a series of high-impact visuals and a cohesive design system that resonates with the target audience.',
        images: [
            'linear-gradient(45deg, #FF0080, #7928CA)',
            'linear-gradient(45deg, #7928CA, #FF0080)',
            'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
            'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
            'linear-gradient(to right, #fa709a 0%, #fee140 100%)'
        ]
    },
    lostmary: {
        title: 'Lostmary',
        category: 'Product Showcase',
        description: 'An elegant product showcase designed to highlight the premium nature of the brand. The interface features smooth transitions and high-fidelity 3D renders.',
        images: [
            'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
            'linear-gradient(to top, #5f72bd 0%, #9b23ea 100%)',
            'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
            'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)'
        ]
    },
    'karu-learning': {
        title: 'Karu Learning',
        category: 'EdTech Platform',
        description: 'A modern educational platform built for the future of learning. Features include interactive course modules, real-time progress tracking, and AI-driven recommendations.',
        images: [
            'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
            'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)',
            'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
            'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
            'linear-gradient(to top, #00c6fb 0%, #005bea 100%)'
        ]
    },
    'boltbot-app': {
        title: 'Boltbot.app',
        category: 'AI Application',
        description: 'A cutting-edge AI application interface. We focused on making complex data visualization intuitive and accessible through a clean, dark-mode UI.',
        images: [
            'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
            'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
            'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
            'linear-gradient(45deg, #FF0080, #7928CA)',
            'linear-gradient(45deg, #7928CA, #FF0080)',
            'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
        ]
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectsData[id];
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Project not found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}
        >
            {/* Scroll Progress Bar */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--accent-color)',
                    transformOrigin: '0%',
                    scaleX,
                    zIndex: 1000
                }}
            />

            <div className="container">
                <button
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    <ArrowLeft size={20} /> Back to Projects
                </button>

                <motion.div
                    layoutId={`project-header-${id}`}
                    style={{ marginBottom: '4rem' }}
                >
                    <motion.h1
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontFamily: 'var(--font-heading)',
                            marginBottom: '1rem'
                        }}
                    >
                        {project.title}
                    </motion.h1>
                    <p style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>{project.category}</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', marginBottom: '6rem' }}>
                    <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Overview</h3>
                        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            {project.description}
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {project.images.map((bg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    type: "spring",
                                    bounce: 0.4
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: Math.random() * 2 - 1,
                                    zIndex: 10
                                }}
                                style={{
                                    width: '100%',
                                    aspectRatio: index % 3 === 0 ? '16/9' : '4/5', // Alternating aspect ratios for "cool" look
                                    background: bg,
                                    borderRadius: '12px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                    gridColumn: index % 3 === 0 ? '1 / -1' : 'auto' // Every 3rd image spans full width
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
