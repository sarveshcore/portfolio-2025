'use client';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChartCard({ data, title, layout = 'horizontal' }) {
  return (
    <motion.div
      className="p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-sm tracking-widest text-white/60 mb-6 uppercase">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout={layout}>
          <CartesianGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
          {layout === 'horizontal' ? (
            <>
              <XAxis
                dataKey="name"
                stroke="#fff"
                tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.6)"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                stroke="rgba(255,255,255,0.6)"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#fff"
                tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }}
              />
            </>
          )}
          <Tooltip
            contentStyle={{
              background: '#000',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ fill: 'rgba(59,130,246,0.1)' }}
          />
          <Bar
            dataKey="value"
            fill="rgba(255,255,255,0.2)"
            stroke="#fff"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
