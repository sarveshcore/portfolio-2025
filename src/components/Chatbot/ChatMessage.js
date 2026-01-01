'use client';
import { motion } from 'framer-motion';

export default function ChatMessage({ message, isUser, isLoading }) {
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-md'
            : 'bg-white/10 text-white/90 rounded-bl-md'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <motion.span
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.span
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
}
