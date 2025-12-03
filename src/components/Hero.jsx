'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 2rem',
            maxWidth: 'var(--spacing-container)',
            margin: '0 auto'
        }}>
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 0.9,
                    fontWeight: 700,
                    marginBottom: '2rem'
                }}
            >
                ROOTED IN<br />
                <span style={{ color: 'var(--text-secondary)' }}>INNOVATION.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                    maxWidth: '500px',
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                }}
            >
                We build premium digital experiences for forward-thinking brands.
                Specializing in marketing tech, ed-tech, and AI solutions.
            </motion.p>
        </section>
    );
};

export default Hero;
