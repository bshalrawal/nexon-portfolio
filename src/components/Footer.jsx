import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 2rem',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
            color: 'var(--text-secondary)'
        }}>
            <p>&copy; {new Date().getFullYear()} NEXONINC.TECH. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
