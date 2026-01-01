'use client';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function RadarChartCard({ data, title }) {
  return (
    <motion.div
      className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-sm tracking-widest text-white/60 mb-6 uppercase">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis
            dataKey="skill"
            stroke="#fff"
            tick={{ fill: '#fff', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
          />
          <Radar
            dataKey="value"
            stroke="#3b82f6"
            fill="rgba(59,130,246,0.2)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
