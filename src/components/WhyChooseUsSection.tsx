import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ShieldCheck, Clock, BadgePercent, HeartHandshake,
  Headphones, Lock, Star, TrendingDown,
  CheckCircle2, XCircle, ArrowRight,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────── */
const reasons = [
  {
    icon: BadgePercent,
    title: "Best Price Guarantee",
    description: "We scan 500+ airlines and hotels in real time. Find a better price anywhere? We match it — no questions, no hassle.",
    color: "#3B82F6",
    stat: "Save up to 40%",
    highlight: "₹4,200 avg saving per booking",
  },
  {
    icon: Clock,
    title: "Book in Under 2 Minutes",
    description: "From search to confirmed booking in under 120 seconds. No endless forms, no hidden steps — just fast, simple travel planning.",
    color: "#10B981",
    stat: "2 min avg",
    highlight: "Fastest checkout in India",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description: "256-bit SSL encryption on every transaction. PCI-DSS compliant. Your data and payments are fortress-protected.",
    color: "#F59E0B",
    stat: "100% Secure",
    highlight: "Zero fraud incidents",
  },
  {
    icon: HeartHandshake,
    title: "Expert Support 24/7",
    description: "Real humans, not bots. Our India-based travel experts are on call around the clock via chat, phone, and email.",
    color: "#8B5CF6",
    stat: "< 2 min response",
    highlight: "98% issue resolution rate",
  },
];

const compare = [
  { feature: "Price match guarantee",  us: true,  others: false },
  { feature: "Instant booking confirmation", us: true, others: true },
  { feature: "24/7 human support",     us: true,  others: false },
  { feature: "All-in-one platform",    us: true,  others: false },
  { feature: "e-SIM & visa services",  us: true,  others: false },
  { feature: "Zero booking fees",      us: true,  others: false },
];

const badges = [
  { icon: Star,         label: "4.9★ Rating",    sub: "200k+ Reviews"  },
  { icon: Lock,         label: "Secure Payments", sub: "256-bit SSL"    },
  { icon: TrendingDown, label: "Lowest Fares",    sub: "Price Matched"  },
  { icon: Headphones,   label: "24/7 Support",    sub: "Always Online"  },
];

/* ─── Component ─────────────────────────────────────────── */
const WhyChooseUsSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeReason, setActiveReason] = useState(0);

  const active = reasons[activeReason];

  return (
    <section id="why-us" className="py-20 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto">

        {/* ── Header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary/50 rounded-full" />
              <span className="text-primary font-bold text-xs uppercase tracking-[0.18em]">Why Choose Us</span>
            </div>
            <h2
              className="font-extrabold leading-tight tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              The Smarter Way to{" "}
              <span className="gradient-text">Travel India</span>
            </h2>
          </div>
          
        </motion.div>

        {/* ── MAIN GRID: Left tabs + Right showcase ──────── */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-10 mb-10">

          {/* LEFT: Interactive reason tabs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {reasons.map((r, i) => {
              const isActive = i === activeReason;
              return (
                <motion.button
                  key={r.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActiveReason(i)}
                  className={`group relative w-full text-left flex items-center gap-4 p-4 sm:p-5 rounded-2xl border
                              transition-all duration-300 overflow-hidden ${
                                isActive
                                  ? "border-transparent shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                                  : "border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/10"
                              }`}
                  style={isActive ? { background: `${r.color}08`, borderColor: `${r.color}20` } : {}}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                      style={{ background: r.color }}
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0 flex items-center justify-center transition-transform duration-300"
                    style={{
                      background: isActive ? `${r.color}18` : `${r.color}0d`,
                      border: `1px solid ${r.color}${isActive ? "25" : "15"}`,
                    }}
                  >
                    <r.icon size={20} style={{ color: r.color }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm sm:text-base font-bold leading-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                        {r.title}
                      </span>
                      <span
                        className="shrink-0 text-[10px] sm:text-xs font-black px-2 py-1 rounded-full"
                        style={{
                          background: `${r.color}12`,
                          color: r.color,
                        }}
                      >
                        {r.stat}
                      </span>
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed"
                      >
                        {r.description}
                      </motion.p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT: Visual showcase card + comparison */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
           
            {/* Comparison table */}
            
            <div
             style={{
                background: `linear-gradient(135deg, ${active.color}18 0%, ${active.color}06 100%)`,
                border: `1px solid ${active.color}25`,
              }}
            className="rounded-2xl sm:rounded-3xl border border-border/50 bg-muted/20 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto_auto] gap-0 px-4 sm:px-6 py-3 border-b border-border/40 bg-muted/40">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Feature</span>
                <span className="text-xs font-black text-primary text-center px-4 uppercase tracking-wider">Us</span>
                <span className="text-xs font-bold text-muted-foreground text-center px-4 uppercase tracking-wider">Others</span>
              </div>
              {compare.map((row, i) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className={`grid grid-cols-[1fr_auto_auto] items-center gap-0 px-4 sm:px-6 py-3
                              border-b border-border/30 last:border-0
                              hover:bg-muted/40 transition-colors`}
                >
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">{row.feature}</span>
                  <div className="flex justify-center px-4">
                    {row.us
                      ? <CheckCircle2 size={17} className="text-emerald-500" />
                      : <XCircle size={17} className="text-muted-foreground/30" />
                    }
                  </div>
                  <div className="flex justify-center px-4">
                    {row.others
                      ? <CheckCircle2 size={17} className="text-muted-foreground/50" />
                      : <XCircle size={17} className="text-muted-foreground/25" />
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Trust badges bar ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
              className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl border border-border/50
                         bg-muted/30 hover:bg-muted/60 transition-colors group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl service-icon-bg flex items-center justify-center shrink-0
                              group-hover:scale-105 transition-transform">
                <b.icon size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-foreground">{b.label}</div>
                <div className="text-[11px] text-muted-foreground">{b.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;