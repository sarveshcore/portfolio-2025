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
            className="text-7xl font-bold mb-16 tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CONTACT
          </motion.h1>
          
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
                <h3 className="text-sm tracking-widest text-white/60 mb-4">SOCIAL</h3>
                <div className="space-y-2">
                  <a href="https://www.linkedin.com/in/sarvesh-srinath-5821b3316/" className="block hover:text-white/70 transition-colors">LinkedIn</a>
                  <a href="https://github.com/sarveshcore" className="block hover:text-white/70 transition-colors">GitHub</a>
                  <a href="https://x.com/Idk12319566421" className="block hover:text-white/70 transition-colors">Twitter</a>
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
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-4 font-medium tracking-wider hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
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