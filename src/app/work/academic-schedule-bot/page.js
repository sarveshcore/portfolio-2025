'use client';
import Navigation from '@/components/Navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AcademicScheduleBot() {
  const { scrollY } = useScroll();
  
  // Image fades out as you scroll down (0px to 500px)
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  // Image moves slightly slower than scroll for parallax feel
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const details = [
    {
      title: "Workflow Automation",
      content: "Designed and deployed an n8n workflow using Cron-style triggers (15-minute intervals) to ensure timely delivery of time-sensitive information."
    },
    {
      title: "Custom Logic Implementation",
      content: "Engineered custom JavaScript logic within n8n Code nodes to parse JSON data, filter class schedules based on current timestamps, and handle timezone adjustments (Asia/Kolkata)."
    },
    {
      title: "API Integration",
      content: "Orchestrated a seamless data pipeline between the Google Sheets API (backend storage) and the Telegram Bot API (frontend delivery)."
    },
    {
      title: "Self-Cleaning UI",
      content: "Built a \"self-destruct\" feature by capturing API response data (Message IDs) and utilizing \"Wait\" nodes to automatically delete outdated alerts after 23 hours, maintaining a clutter-free chat interface."
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white relative">
        
        {/* Sticky Hero Image Container */}
        <div className="h-[60vh] w-full sticky top-0 z-0">
          <motion.div 
            className="relative w-full h-full"
            style={{ opacity, y }}
          >
            <div className="relative w-full h-full rounded-b-[3rem] overflow-hidden">
              <Image
                src="/timetable-image.png"
                alt="Academic Schedule Bot Workflow"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay for seamless blend */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
            </div>
          </motion.div>
        </div>

        {/* Content Section - Starts below image, scrolls over it */}
        <div className="relative z-10 -mt-20">
          {/* Gradient fade to blend content start */}
          <div className="h-32 bg-gradient-to-b from-transparent to-black w-full" />
          
          <div className="bg-black min-h-screen">
            <div className="max-w-4xl mx-auto px-8 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                  Academic Schedule Bot
                </h1>
                <p className="text-xl text-white/80 mb-12 leading-relaxed">
                  Developed a comprehensive automation tool to manage daily academic schedules, integrating Google Sheets as a dynamic backend database. The system fetches data and delivers real-time notifications to a personal device, eliminating manual schedule checking.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h3 className="text-sm tracking-widest text-white/60 mb-4">TOOLS</h3>
                    <p className="text-white/90">n8n, Telegram Bot API, Google Sheets API</p>
                  </div>
                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h3 className="text-sm tracking-widest text-white/60 mb-4">LANGUAGES</h3>
                    <p className="text-white/90">JavaScript (ES6), JSON, Markdown</p>
                  </div>
                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h3 className="text-sm tracking-widest text-white/60 mb-4">CONCEPTS</h3>
                    <p className="text-white/90">Webhooks, Cron Jobs, Data Filtering, Async Automation</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-8 tracking-tight">Key Technical Contributions</h2>
                <div className="space-y-8">
                  {details.map((item, index) => (
                    <motion.div 
                      key={index}
                      className="border-l-2 border-white/20 pl-6 py-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed">{item.content}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}