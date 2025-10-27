'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCursor } from "@/contexts/CursorContext";

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isCursorVisible } = useCursor();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isCursorVisible) return null;

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        borderRadius: "50%",
        background: "rgba(255,255,255,0.25)",
        boxShadow: "0 0 32px 8px #00fff7, 0 0 8px 2px #fff",
        backdropFilter: "blur(4px)",
        filter: "blur(2px)",
      }}
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
    />
  );
}