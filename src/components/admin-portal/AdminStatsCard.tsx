import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
  color: string;
}

export function AdminStatsCard({ title, value, icon: Icon, trend, color }: AdminStatsCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}08` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {trend && (
          <span className={`text-[10px] font-mono font-bold ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className="text-2xl font-black text-foreground">{value}</div>
      <div className="text-[10px] font-mono text-muted-foreground mt-1">{title}</div>
      <div className="mt-3 h-1 rounded-full overflow-hidden bg-border/50">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}