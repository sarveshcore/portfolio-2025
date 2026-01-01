'use client';
import { motion } from 'framer-motion';

export default function SectionDivider({ className = '' }) {
  return (
    <motion.div
      className={`relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-16 ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
}
