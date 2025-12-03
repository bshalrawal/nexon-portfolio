import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, category, image, index }) => {
    return (
        <Link to={`/project/${id}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ marginBottom: '4rem', cursor: 'pointer' }}
            >
                <motion.div
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        marginBottom: '1rem',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: image ? `url(${image}) center/cover no-repeat` : 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#333'
                    }}>
                        {!image && <span>Project Preview</span>}
                    </div>
                </motion.div>

                <motion.div
                    layoutId={`project-header-${id}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
                >
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.25rem' }}>{title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{category}</p>
                    </div>
                    <ArrowUpRight size={24} color="var(--text-secondary)" />
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default ProjectCard;
