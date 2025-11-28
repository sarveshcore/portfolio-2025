'use client';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();

  const projects = {
    personal: [
      {
        title: "Fitness Buddy 1.0",
        description: "Fine-tuned Llama-3.2-1B LLM for fitness advice using LoRA adapters",
        tech: "Python, PyTorch, Hugging Face, PEFT/LoRA",
        github: "https://huggingface.co/sarveshcore/fitness-buddy-1.0",
        category: "Personal Project",
        isPrivate: false,
        icon: "huggingface"
      },
      {
        title: "Academic Schedule Bot",
        description: "Automated schedule delivery system using n8n workflows and Telegram",
        tech: "n8n, JavaScript, Google Sheets API, Telegram API",
        github: "/work/academic-schedule-bot", // Updated link
        category: "Personal Project",
        isPrivate: false,
        icon: "n8n"
      },
      {
        title: "Moody",
        description: "A mood tracking and analysis application",
        tech: "React, Node.js, Firebase",
        github: "https://github.com/sarveshcore/moody",
        category: "Personal Project",
        isPrivate: false
      },
      {
        title: "Chat Application",
        description: "Real-time chat application with WebSocket support",
        tech: "Node.js, Express, Socket.io",
        github: "https://github.com/sarveshcore/chat-application-capstone",
        category: "Personal Project",
        isPrivate: false
      }
    ],
    freelance: [
      {
        title: "Computer Shop Near Me",
        description: "Local computer shop directory and booking platform",
        tech: "Next.js, Firebase, Google Maps API",
        category: "Freelance Work",
        isPrivate: true
      }
    ]
  };

  const allProjects = [...projects.personal, ...projects.freelance];
  const displayProjects = activeCategory === 'all' 
    ? allProjects 
    : activeCategory === 'personal' 
      ? projects.personal 
      : projects.freelance;

  const handleProjectClick = (project) => {
    if (project.isPrivate) {
      router.push('/contact');
    } else if (project.github.startsWith('/')) { // Check for internal links
      router.push(project.github);
    } else {
      window.open(project.github, '_blank');
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-8 pt-32 pb-20">
          <h1 className="text-7xl font-bold mb-16 tracking-tight">WORK</h1>
          
          {/* Filter buttons */}
          <div className="flex gap-4 mb-12">
            {['all', 'personal', 'freelance'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm tracking-wider uppercase transition-all ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Freelance notice */}
          {(activeCategory === 'freelance' || activeCategory === 'all') && (
            <motion.div
              className="mb-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-blue-400 text-sm tracking-wider">
                🔒 All freelance work is private. Contact me to access the repositories and learn more about these projects.
              </p>
            </motion.div>
          )}

          <div className="space-y-1">
            {displayProjects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative h-96 bg-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="absolute inset-0 flex items-center justify-between px-12">
                  <div>
                    <p className="text-sm tracking-widest text-white/40 mb-2">
                      {project.category} {project.isPrivate && '• PRIVATE'}
                    </p>
                    <p className="text-6xl font-bold tracking-tight mb-4">
                      {project.title}
                    </p>
                    <p className="text-white/60 text-sm tracking-wider mb-2">
                      {project.description}
                    </p>
                    <p className="text-white/40 text-xs tracking-wider">
                      {project.tech}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <motion.div
                      className="text-white/60 group-hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.isPrivate ? (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.103.897-2 2-2s2 .897 2 2c0 .738-.404 1.376-1 1.723z"/>
                        </svg>
                      ) : project.icon === 'n8n' ? (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                      ) : project.icon === 'huggingface' ? (
                        <span className="text-3xl">🤗</span>
                      ) : (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Hover gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}