import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Rocket, Shield, Users, HeartHandshake,
  CheckCircle2, XCircle, Star, Lock, TrendingUp, Headphones, Clock, GitBranch,
} from "lucide-react";

const REASONS = [
  {
    icon: Rocket, color: "#3B82F6", n: "01",
    title: "On-Time, Every Sprint",
    stat: "98% on-time",
    desc: "Milestone-based delivery with 2-week agile sprints. You see working software every fortnight — not just promises and progress bars.",
  },
  {
    icon: Users, color: "#10B981", n: "02",
    title: "Dedicated Named Team",
    stat: "1:1 ownership",
    desc: "A real developer, designer, and PM assigned to your project. No outsourcing, no handoffs, no 'the other team' excuses.",
  },
  {
    icon: Shield, color: "#F59E0B", n: "03",
    title: "NDA + Secure Codebase",
    stat: "100% private",
    desc: "Private repos, OWASP-compliant code, NDAs on day one. Your IP is protected from the first commit to final handoff.",
  },
  {
    icon: HeartHandshake, color: "#8B5CF6", n: "04",
    title: "12-Month Post-Launch Support",
    stat: "12-mo warranty",
    desc: "We don't disappear after go-live. Bug fixes, performance monitoring, and feature updates are all covered in your warranty.",
  },
];

const COMPARE = [
  { feature: "Fixed-price contracts",              us: true,  others: false },
  { feature: "Dedicated in-house team",            us: true,  others: false },
  { feature: "Post-launch support included",       us: true,  others: false },
  { feature: "Weekly progress demos",              us: true,  others: true  },
  { feature: "NDA + full IP transfer",             us: true,  others: false },
  { feature: "Free discovery consultation",        us: true,  others: false },
];

const PROCESS = [
  { n: "01", icon: Clock,          color: "#3B82F6", title: "Discovery Call",   desc: "30-min free call — goals, stack, timeline scoped." },
  { n: "02", icon: GitBranch,      color: "#10B981", title: "Proposal & SOW",   desc: "Fixed-price quote, milestones, tech stack defined."  },
  { n: "03", icon: Rocket,         color: "#8B5CF6", title: "Design Sprint",    desc: "Wireframes & UI prototypes signed off before code."  },
  { n: "04", icon: Shield,         color: "#F59E0B", title: "Dev + QA Sprints", desc: "Agile 2-week cycles with automated tests & demos."    },
  { n: "05", icon: HeartHandshake, color: "#EF4444", title: "Launch & Handoff", desc: "Live deploy + code handoff + 12-month warranty."      },
];

const BADGES = [
  { icon: Star,        label: "5★ Rated",      sub: "50+ Client Reviews"  },
  { icon: Lock,        label: "NDA Protected", sub: "100% Confidential"   },
  { icon: TrendingUp,  label: "ROI Focused",   sub: "Measurable Results"  },
  { icon: Headphones,  label: "Mon–Sat 9–11PM",sub: "IST Support Hours"   },
];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="why-us" className="section-padding bg-muted/10 overflow-hidden relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="container mx-auto relative">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary/50" />
                <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">// why weblogic</span>
              </div>
              <h2 className="font-extrabold leading-tight tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
                The Smarter Choice for{" "}
                <span className="gradient-text">Your Next Build</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* ── Alternating full-width reason rows ── */}
        <div className="space-y-3 mb-14">
          {REASONS.map((r, i) => (
            <motion.div key={r.n}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-0 overflow-hidden
                         rounded-2xl border border-border/30 bg-background hover:border-transparent
                         transition-all duration-400"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              {/* Colored left accent bar */}
              <motion.div
                animate={{ scaleY: 1 }}
                className="absolute left-0 top-0 bottom-0 w-1 origin-top transition-all duration-300 group-hover:w-[3px]"
                style={{ background: `linear-gradient(to bottom, ${r.color}, ${r.color}50)` }}
              />

              {/* Giant number (bg watermark) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black font-mono leading-none
                              select-none pointer-events-none hidden lg:block"
                style={{ fontSize: "6rem", color: `${r.color}06` }}>
                {r.n}
              </div>

              {/* Icon box */}
              <div className="shrink-0 flex items-center justify-center pl-8 pr-6 py-6 sm:py-7 sm:border-r border-border/20">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${r.color}14`, border: `1px solid ${r.color}22` }}>
                  <r.icon size={22} style={{ color: r.color }} />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 px-6 py-5 sm:py-6">
                <div className="flex flex-wrap items-start sm:items-center gap-3 mb-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{r.title}</h3>
                  <span className="text-[10px] font-black font-mono px-2.5 py-1 rounded-lg"
                    style={{ background: `${r.color}12`, color: r.color }}>
                    {r.stat}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Two col: comparison + badges ── */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-12">

          {/* Comparison table */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="rounded-2xl border border-border/35 overflow-hidden"
              style={{ background: "hsl(var(--muted)/0.12)" }}>
              <div className="grid grid-cols-[1fr_auto_auto] px-5 py-3 border-b border-border/30"
                style={{ background: "hsl(var(--muted)/0.3)" }}>
                <span className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground">Feature</span>
                <span className="text-[10px] font-black font-mono uppercase tracking-wider text-primary text-center px-5">Weblogic</span>
                <span className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground text-center px-5">Others</span>
              </div>
              {COMPARE.map((row, i) => (
                <motion.div key={row.feature}
                  initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="grid grid-cols-[1fr_auto_auto] items-center px-5 py-3 border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors">
                  <span className="text-xs text-muted-foreground">{row.feature}</span>
                  <div className="flex justify-center px-5">
                    {row.us ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-muted-foreground/25" />}
                  </div>
                  <div className="flex justify-center px-5">
                    {row.others ? <CheckCircle2 size={16} className="text-muted-foreground/40" /> : <XCircle size={16} className="text-muted-foreground/20" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Badges grid */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 gap-3 content-start">
            {BADGES.map((b, i) => (
              <motion.div key={b.label}
                initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-background hover:bg-muted/30 transition-colors group">
                <div className="w-9 h-9 rounded-xl service-icon-bg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <b.icon size={15} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{b.label}</div>
                  <div className="text-[10px] text-muted-foreground">{b.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Process timeline ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground">// process</span>
            <div className="h-px flex-1 bg-border/25" />
            <span className="text-[10px] font-mono text-muted-foreground/50">idea → launch</span>
          </div>

          <div className="relative">
            <div className="absolute top-[22px] left-[22px] right-[22px] h-px bg-border/25 hidden sm:block" />
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 sm:gap-3">
              {PROCESS.map((p, i) => (
                <motion.div key={p.n}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2.5 p-3.5 sm:p-4
                             rounded-xl border border-border/30 bg-background hover:bg-muted/20
                             hover:border-primary/15 transition-all duration-300">
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10 bg-background border border-border/50"
                      style={{ boxShadow: `0 0 0 3px ${p.color}18` }}>
                      <p.icon size={16} style={{ color: p.color }} />
                    </div>
                  </div>
                  <div className="sm:text-center">
                    <div className="text-[10px] font-black font-mono mb-0.5" style={{ color: p.color }}>{p.n}</div>
                    <div className="text-xs font-bold text-foreground leading-tight">{p.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 hidden sm:block">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}