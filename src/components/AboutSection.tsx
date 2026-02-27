import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Terminal, Cpu, GitPullRequest, CheckCircle, Users,
  FolderGit2, Star, Clock, Activity, Wifi, Lock,
  Zap, Shield, Rocket, Target, Code2, Layers
} from "lucide-react";

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / (1600 / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const STATS = [
  { icon: Users, val: 50, sfx: "+", label: "Happy Clients", color: "#3b82f6" },
  { icon: FolderGit2, val: 200, sfx: "+", label: "Projects Shipped", color: "#10b981" },
  { icon: Star, val: 5, sfx: "★", label: "Avg Client Rating", color: "#f59e0b" },
  { icon: Clock, val: 24, sfx: "/7", label: "Live Support", color: "#8b5cf6" },
];

const METRICS = [
  { label: "Avg Delivery", val: "4.2 wks", color: "#3b82f6", hint: "kickoff → live" },
  { label: "Bug-Free Rate", val: "97%", color: "#10b981", hint: "QA before launch" },
  { label: "On-Time", val: "98%", color: "#f59e0b", hint: "sprint milestones" },
  { label: "Retention", val: "91%", color: "#8b5cf6", hint: "clients return" },
];

const ACTIVITIES = [
  { icon: GitPullRequest, text: "PR merged — mobile-app/v2.1", color: "#10b981", time: "2m ago" },
  { icon: CheckCircle, text: "Deploy successful — client-web", color: "#3b82f6", time: "18m ago" },
  { icon: Activity, text: "AI model training — 97.2% acc", color: "#8b5cf6", time: "1h ago" },
  { icon: Wifi, text: "New client onboarded — FoodRush", color: "#f59e0b", time: "3h ago" },
  { icon: Lock, text: "Security audit passed — fintech", color: "#ef4444", time: "5h ago" },
];

const PILLARS = [
  {
    icon: Rocket,
    number: "01",
    title: "Agile 2-Week Sprints",
    desc: "Working software every fortnight, not promises.",
    color: "#3b82f6",
    stats: "98% on-time"
  },
  {
    icon: Shield,
    number: "02",
    title: "Quality-First Code",
    desc: "Senior reviews + automated tests on every PR.",
    color: "#10b981",
    stats: "100% coverage"
  },
  {
    icon: Zap,
    number: "03",
    title: "Performance Tuned",
    desc: "Lighthouse 90+, sub-2s loads, 99.9% uptime.",
    color: "#f59e0b",
    stats: "90+ score"
  },
  {
    icon: Layers,
    number: "04",
    title: "Full-Stack Ownership",
    desc: "One team. Frontend, backend, mobile & cloud.",
    color: "#8b5cf6",
    stats: "end-to-end"
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="about"
      className="pt-20 bg-muted/10 relative overflow-hidden"
      ref={ref}
    >      
    <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
      style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-2 sm:gap-3 mb-8"
        >
          <div className="h-px w-6 sm:w-8 bg-primary/40" />
          <span className="text-primary font-bold text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono whitespace-nowrap">
            // about OS tech labs
          </span>
          <div className="h-px flex-1 bg-border/30" />
        </motion.div>

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 sm:gap-10 lg:gap-16 mb-8 sm:mb-10 items-start">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Title */}
            <h2 className="font-extrabold leading-[1.06] tracking-tight text-foreground mb-4 sm:mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Your Dedicated{" "}
              <span className="gradient-text">Tech Partner</span>
              <span className="block text-muted-foreground font-light mt-1.5 sm:mt-2" style={{ fontSize: "0.5em" }}>
                Kolkata · Web · Mobile · AI · Design · Marketing
              </span>
            </h2>
            {/* Description */}
            <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-lg">
              OS tech labs Infotech is a full-service IT company that designs, builds, and scales digital
              products. Websites, mobile apps, AI systems, brand identities — all in-house, all under
              one roof. Zero outsourcing. Maximum accountability.
            </p>

            {/* REDESIGNED PILLARS - Modern Card Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative"
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-md"
                      style={{ background: `linear-gradient(135deg, ${p.color}20, transparent)` }} />
                    <div
                      className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${p.color} 0%, transparent 30%)`,
                        filter: "blur(40px)",
                      }}
                    />
                    {/* Card content */}
                    <div className="relative bg-background border cursor-pointer rounded-xl p-3 sm:p-4 border-primary/30 transition-all duration-10">
                      <div className="flex items-start gap-3">
                        {/* Icon with colored background */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${p.color}15` }}>
                          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: p.color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                              style={{ background: `${p.color}15`, color: p.color }}>
                              {p.number}
                            </span>
                            <span className="text-[8px] sm:text-[9px] font-mono text-muted-foreground">
                              {p.stats}
                            </span>
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1">{p.title}</h3>
                          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{p.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
            >
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    whileHover={{ y: -2 }}
                    className="flex flex-col items-center justify-center p-2.5 sm:p-3 md:p-4 rounded-xl border border-border/30 bg-background hover:bg-muted/20 transition-all text-center gap-0.5 sm:gap-1"
                  >
                    <Icon size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 mb-0.5 sm:mb-1" style={{ color: s.color }} />
                    <div className="text-lg sm:text-xl md:text-2xl font-black tracking-tight font-mono" style={{ color: s.color }}>
                      <Counter target={s.val} suffix={s.sfx} />
                    </div>
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground leading-tight">{s.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Light White Dashboard Panel (Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 sticky top-20 self-start w-full"

          >
            <div className=" rounded-xl sm:rounded-2xl overflow-hidden border border-border/40 bg-white shadow-xl"
              style={{
                background: `linear-gradient(145deg, #3B82F6 0f 0%, hsl(var(--background)) 55%)`,
                border: `1px solid #3B82F6 30`,
                boxShadow: `0 24px 64px #3B82F618, 0 0 0 1px #3B82F615`,
                minHeight: 480,
              }}>
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, #3B82F61e 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />
              {/* Chrome bar - Light theme */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 bg-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex gap-1 sm:gap-1.5">
                    {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
                      <div key={c} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full opacity-70" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="font-mono text-[16px] text-gray-500">OS tech labs — live dashboard</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-emerald-600">live</span>
                </div>
              </div>

              {/* Metric row - Light theme */}
              <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
                {METRICS.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="px-1.5 sm:px-2 md:px-3 py-2.5 sm:py-3 md:py-4 text-center hover:bg-gray-50 transition-colors "
                  >
                    <div className="text-sm font-black" style={{ color: m.color }}>{m.val}</div>
                    <div className="text-sm font-bold text-gray-500 mt-0.5">{m.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Activity feed - Light theme */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider">Recent Activity</span>
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">5 updates</span>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  {ACTIVITIES.map((a, i) => {
                    const isActive = i === tick % ACTIVITIES.length;
                    const Icon = a.icon;
                    return (
                      <motion.div
                        key={a.text}
                        animate={{
                          opacity: isActive ? 1 : 0.6,
                          x: isActive ? 4 : 0,
                          backgroundColor: isActive ? `${a.color}08` : "transparent"
                        }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center shrink-0"
                          style={{ background: `${a.color}12` }}>
                          <Icon size={9} className="sm:w-[10px] sm:h-[10px] md:w-[11px] md:h-[11px]" style={{ color: a.color }} />
                        </div>
                        <span className="font-mono text-[10px] sm:text-[13px] md:text-[16px] text-gray-700 flex-1 truncate">{a.text}</span>
                        <span className="font-mono text-[9px] sm:text-[12px] md:text-[15px] text-gray-400 shrink-0">{a.time}</span>
                        {isActive && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0"
                            style={{ background: a.color }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer - Light theme */}
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 bg-gray-100/50">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                  {[
                    { label: "Projects Live", val: "12", color: "#10b981" },
                    { label: "Team Online", val: "8", color: "#3b82f6" },
                    { label: "Uptime", val: "99.9%", color: "#f59e0b" },
                  ].map(b => (
                    <div key={b.label} className="flex items-center gap-1 sm:gap-1.5">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ background: b.color }} />
                      <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-gray-600">
                        {b.val} <span className="text-gray-400 hidden xs:inline">{b.label}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] text-gray-400">onlinesavaari.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}