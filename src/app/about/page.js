'use client';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCursor } from '@/contexts/CursorContext';
import RadarChartCard from '@/components/charts/RadarChartCard';
import BarChartCard from '@/components/charts/BarChartCard';
import SectionDivider from '@/components/SectionDivider';

export default function About() {
  const [openSections, setOpenSections] = useState({});
  const { setIsCursorVisible } = useCursor();

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const skills = {
    "Programming Languages": ["Python", "JavaScript", "SQL"],
    "Web Development": ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Next.js"],
    "Databases": ["MySQL", "Firebase Firestore", "Prisma ORM", "MongoDB"],
    "DevOps & Cloud": ["Google Cloud Platform (GCP)", "Terraform", "GitHub Actions (basic CI/CD)", "Linux command-line"],
    "Version Control": ["Git & GitHub"],
    "APIs": ["RESTful API development and integration"],
    "Tools & Frameworks": ["Frontend Tools: Visual Studio Code, Tailwind CSS", "Backend Tools: Node.js, Express", "Cloud/Infra: Firebase, GCP, Terraform"]
  };

  // Skills radar chart data
  const skillsRadarData = [
    { skill: 'Frontend', value: 90 },
    { skill: 'Backend', value: 85 },
    { skill: 'DevOps', value: 80 },
    { skill: 'Database', value: 85 },
    { skill: 'Cloud', value: 75 },
    { skill: 'AI/ML', value: 70 }
  ];

  // Tech stack distribution data
  const techStackData = [
    { name: 'React/Next.js', value: 2 },
    { name: 'Node.js', value: 3 },
    { name: 'Firebase', value: 2 },
    { name: 'Python', value: 1 },
    { name: 'APIs', value: 3 }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <Navigation />
      <motion.div 
        className="min-h-screen bg-black text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-8 pt-32 pb-20">
          <motion.h1
            className="text-7xl font-bold mb-16 tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
            variants={titleVariants}
          >
            ABOUT
          </motion.h1>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-16"
            variants={containerVariants}
          >
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <motion.h2 
                className="text-3xl font-bold tracking-tight"
                variants={itemVariants}
              >
                Who I Am
              </motion.h2>
              <motion.p 
                className="text-white/70 leading-relaxed"
                variants={itemVariants}
              >
                I'm <a 
                  href="https://github.com/sarveshcore" 
                  className="text-blue-400 hover:drop-shadow-[0_0_10px_#00fff7] transition-all duration-300"
                  onMouseEnter={() => setIsCursorVisible(false)}
                  onMouseLeave={() => setIsCursorVisible(true)}
                >Sarvesh Srinath</a>, a passionate developer and technology enthusiast who loves building impactful, user-focused projects that blend web development, DevOps, and cloud technologies.
                <br /><br />
                I'm a newbie freelance developer, currently collaborating with American clients on projects involving modern web stacks, API integrations, and scalable infrastructure. I also run <a 
                  href="https://monocrew.org" 
                  className="text-blue-400 hover:drop-shadow-[0_0_10px_#00fff7] transition-all duration-300"
                  onMouseEnter={() => setIsCursorVisible(false)}
                  onMouseLeave={() => setIsCursorVisible(true)}
                >Monocrew</a> — a growing freelancing agency that offers website development, hosting, and DevOps solutions for businesses worldwide.
                <br /><br />
                I'm constantly learning, experimenting with new tools, and building efficient, well-structured solutions that deliver real value.
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-8"
              variants={itemVariants}
            >
              {/* Skills Radar Chart */}
              <motion.div variants={itemVariants}>
                <RadarChartCard data={skillsRadarData} title="Skills Overview" />
              </motion.div>

              {/* Tech Stack Distribution */}
              <motion.div variants={itemVariants}>
                <BarChartCard data={techStackData} title="Technology Usage" layout="vertical" />
              </motion.div>

              <SectionDivider />

              <motion.div variants={itemVariants}>
                <h3 className="text-sm tracking-widest text-white/60 mb-4">TECHNICAL SKILLS</h3>
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                >
                  {Object.entries(skills).map(([category, skillList]) => (
                    <motion.div 
                      key={category}
                      className="border border-white/10 rounded-lg p-4"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <h4 
                        className="text-white/80 font-medium mb-2 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleSection(category)}
                      >
                        {category}
                        <motion.span
                          animate={{ rotate: openSections[category] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.span>
                      </h4>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: openSections[category] ? 'auto' : 0, 
                          opacity: openSections[category] ? 1 : 0 
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1 text-white/60">
                          {skillList.map((skill, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                            >
                              • {skill}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-sm tracking-widest text-white/60 mb-4">EXPERIENCE</h3>
                <motion.div
                  className="border border-white/10 rounded-lg p-6 space-y-4"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <div>
                    <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400 mb-3">
                      June 2025 - July 2025
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">MERN Stack Developer Intern</h4>
                    <p className="text-white/60 text-sm mb-4">Klariti Learning Innovations Pvt. Ltd.</p>
                  </div>

                  {/* Timeline with accomplishments */}
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-white/10" />

                    <motion.ul
                      className="space-y-4 text-white/70 text-sm leading-relaxed"
                      variants={containerVariants}
                    >
                      {[
                        'Gained hands-on experience in DevOps, working extensively with CI/CD pipelines to automate build and deployment workflows.',
                        'Deployed applications on Google Cloud Platform (GCP), improving scalability and reliability.',
                        'Actively contributed to streamlining deployment processes, enabling faster delivery and reducing deployment errors.',
                        'Contributed to frontend development using Tailwind CSS, building responsive and user-friendly interfaces.',
                        'Worked with MongoDB for data management, integrating databases with backend services to ensure smooth interaction with the frontend.',
                        'Explored the intersection of DevOps and full-stack development, strengthening technical expertise in end-to-end software delivery.'
                      ].map((accomplishment, i) => (
                        <motion.li
                          key={i}
                          className="relative"
                          variants={itemVariants}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {/* Dot marker */}
                          <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-black" />
                          {accomplishment}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}