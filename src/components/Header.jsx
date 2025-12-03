'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                mixBlendMode: 'difference',
                color: 'white'
            }}
        >
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                    NEXONINC.TECH
                </div>
            </Link>
            <nav>
                <a href="#contact" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    Let's Collaborate
                </a>
            </nav>
        </motion.header>
    );
};

export default Header;
