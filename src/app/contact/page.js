'use client';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCursor } from '@/contexts/CursorContext';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { setIsCursorVisible } = useCursor();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Navigation />
      <motion.div 
        className="min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-8 pt-32 pb-20">
          <motion.h1
            className="text-7xl font-bold mb-16 tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CONTACT
          </motion.h1>

          {/* Response Time Indicator */}
          <motion.div
            className="mb-12 p-6 bg-white/5 border border-white/10 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm text-white/60 mb-4 tracking-widest">AVERAGE RESPONSE TIME</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-white"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
              <span className="text-white font-mono">~24hrs</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <h3 className="text-sm tracking-widest text-white/60 mb-4">EMAIL</h3>
                <a href="mailto:sarveshsrinath23@gmail.com" className="text-xl hover:text-white/70 transition-colors">
                  sarveshsrinath23@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-sm tracking-widest text-white/60 mb-4">CONNECT</h3>
                <div className="space-y-4">
                  {[
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sarvesh-srinath-5821b3316/', icon: '💼', stat: 'Professional' },
                    { name: 'GitHub', url: 'https://github.com/sarveshcore', icon: '⚡', stat: '15+ Repos' },
                    { name: 'Twitter', url: 'https://x.com/Idk12319566421', icon: '🐦', stat: 'Updates' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group"
                      whileHover={{ scale: 1.02, x: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="text-3xl">{social.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium">{social.name}</p>
                        <p className="text-xs text-white/60">{social.stat}</p>
                      </div>
                      <span className="text-white/40 group-hover:text-white transition-colors">→</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div
                onMouseEnter={() => setIsCursorVisible(false)}
                onMouseLeave={() => setIsCursorVisible(true)}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all"
                  />
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all resize-none"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-white/40">
                      {formData.message.length} / 500
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full bg-white text-black py-4 font-medium tracking-wider hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          SENDING...
                        </span>
                      ) : submitMessage.includes('successfully') ? (
                        <span className="flex items-center justify-center gap-2">
                          ✓ SENT
                        </span>
                      ) : (
                        'SEND MESSAGE'
                      )}
                    </span>
                  </motion.button>
                  {submitMessage && (
                    <p className={`text-sm ${submitMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                      {submitMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}