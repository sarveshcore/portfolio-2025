'use client';
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
    // Animation variants
  const textReveal = {
    hidden: { y: 100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 pt-32 pb-20">
          {/* Hero Section */}
          <div className="min-h-[80vh] flex flex-col justify-center">
            <motion.div 
              className="space-y-8"
              initial="hidden"
              animate="visible"
            >
              {/* Animated hero text */}
              <div className="overflow-hidden">
                <motion.h1 
                  className="text-[12vw] font-bold leading-none tracking-tight"
                  custom={0}
                  variants={textReveal}
                >
                  PORT
                </motion.h1>
                <motion.h1 
                  className="text-[12vw] font-bold leading-none tracking-tight -mt-4"
                  custom={1}
                  variants={textReveal}
                >
                  FOLIO
                </motion.h1>
              </div>

              {/* Animated description */}
              <motion.div 
                className="max-w-md space-y-4 pl-1"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <motion.p 
                  className="text-sm tracking-wider text-white/60 uppercase"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Sarvesh Srinath
                </motion.p>
                <motion.p 
                  className="text-white/80 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  Web Developer & DevOps Enthusiast passionate about creating efficient, scalable, and user-focused digital solutions. I love bridging the gap between development and deployment to deliver seamless, production-ready experiences.
                </motion.p>
              </motion.div>

              {/* Animated buttons */}
              <motion.div 
                className="flex gap-4 pt-8 pl-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.a
                  href="/work"
                  className="px-8 py-4 bg-white text-black font-medium tracking-wider text-sm hover:bg-white/90 transition-colors relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">VIEW WORK</span>
                </motion.a>
                <motion.a
                  href="/contact"
                  className="px-8 py-4 border border-white/20 text-white font-medium tracking-wider text-sm hover:bg-white/10 transition-colors relative overflow-hidden group"
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/5"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">GET IN TOUCH</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Section with scroll animation */}
          <motion.div 
            className="border-t border-white/10 pt-20 mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="grid grid-cols-3 gap-1 text-sm tracking-wider"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { title: "DEVOPS", desc: "Efficient deployment & automation" },
                { title: "DEVELOPMENT", desc: "Building scalable solutions" },
                { title: "FREELANCE", desc: "Delivering client success" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-8 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer relative group"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
                  }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <div className="relative z-10">
                    <motion.p 
                      className="text-white/60 mb-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.p>
                    <p className="text-white">{item.desc}</p>
                  </div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-0 h-0.5 bg-white"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
