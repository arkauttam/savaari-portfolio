import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Rocket, Shield, Users, HeartHandshake, CheckCircle2, XCircle,
  Star, Lock, TrendingUp, Headphones, Clock, GitBranch, ArrowRight,
} from "lucide-react";

/* ─── DATA ───────────────────────────────────────────────── */
const REASONS = [
  {
    icon: Rocket, color: "#3B82F6", n: "01",
    title: "On-Time,\nEvery Sprint",
    stat: "98%", statLabel: "on-time delivery",
    desc: "Milestone-based delivery with 2-week agile sprints. You see working software every fortnight — not just promises and progress bars.",
    tag: "Agile Process",
  },
  {
    icon: Users, color: "#10B981", n: "02",
    title: "Dedicated\nNamed Team",
    stat: "1:1", statLabel: "team ownership",
    desc: "A real developer, designer, and PM assigned to your project. No outsourcing, no handoffs, no 'the other team' excuses.",
    tag: "In-House Only",
  },
  {
    icon: Shield, color: "#F59E0B", n: "03",
    title: "NDA + Secure\nCodebase",
    stat: "100%", statLabel: "IP protected",
    desc: "Private repos, OWASP-compliant code, NDAs on day one. Your IP is protected from the first commit to the final handoff.",
    tag: "Enterprise Security",
  },
  {
    icon: HeartHandshake, color: "#8B5CF6", n: "04",
    title: "Post-Launch\nSupport",
    stat: "12mo", statLabel: "warranty",
    desc: "We don't disappear after go-live. Bug fixes, performance monitoring, and feature updates are covered in your warranty.",
    tag: "Long-Term Partner",
  },
];

const COMPARE = [
  { feature: "Fixed-price contracts", us: true, others: false },
  { feature: "Dedicated in-house team", us: true, others: false },
  { feature: "Post-launch support included", us: true, others: false },
  { feature: "Weekly progress demos", us: true, others: true },
  { feature: "NDA + full IP transfer", us: true, others: false },
  { feature: "Free discovery consultation", us: true, others: false },
];

const PROCESS = [
  { n: "01", icon: Clock, color: "#3B82F6", title: "Discovery Call", desc: "30-min free call — goals, stack, timeline scoped." },
  { n: "02", icon: GitBranch, color: "#10B981", title: "Proposal & SOW", desc: "Fixed-price quote, milestones, tech stack defined." },
  { n: "03", icon: Rocket, color: "#8B5CF6", title: "Design Sprint", desc: "Wireframes & UI prototypes signed off before code starts." },
  { n: "04", icon: Shield, color: "#F59E0B", title: "Dev + QA Sprints", desc: "Agile 2-week cycles with automated tests & live demos." },
  { n: "05", icon: HeartHandshake, color: "#EF4444", title: "Launch & Handoff", desc: "Live deploy + code handoff + 12-month warranty begins." },
];

const BADGES = [
  { icon: Star, label: "5★ Rated", sub: "50+ Client Reviews" },
  { icon: Lock, label: "NDA Protected", sub: "100% Confidential" },
  { icon: TrendingUp, label: "ROI Focused", sub: "Measurable Results" },
  { icon: Headphones, label: "Mon–Sat 9–11PM", sub: "IST Support Hours" },
];

/* ─── Single reason row ──────────────────────────────────── */
const ReasonRow = ({
  r, i, inView,
}: { r: typeof REASONS[0]; i: number; inView: boolean }) => {
  const isDark = i % 2 !== 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.1 + i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative rounded-2xl overflow-hidden border"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)/0.3))",

        boxShadow: "var(--shadow-xs)",
      }}
    >
      {/* Subtle gradient wash from service color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${i % 2 === 0 ? "right" : "left"} center, ${r.color}10 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${r.color} 0%, transparent 20%)`,
          filter: "blur(40px)",
        }}
      />
     
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8">
        {/* Giant number */}
        <div
          className="shrink-0 font-black font-mono leading-none select-none"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
            color: `${r.color}${isDark ? "22" : "14"}`,
            lineHeight: 1,
          }}
        >
          {r.n}
        </div>

        {/* Icon */}
        <div
          className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
          style={{ background: `${r.color}18`, border: `1.5px solid ${r.color}30` }}
        >
          <r.icon size={22} style={{ color: r.color }} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3
              className={`text-lg sm:text-xl font-black tracking-tight leading-tight text-foreground`}
              style={{ whiteSpace: "pre-line" }}
            >
              {r.title.replace("\n", " ")}
            </h3>
            <span
              className="text-[10px] font-black font-mono px-2.5 py-1 rounded-full shrink-0"
              style={{ background: `${r.color}20`, color: r.color, border: `1px solid ${r.color}30` }}
            >
              {r.tag}
            </span>
          </div>
          <p className={`text-sm leading-relaxed max-w-xl ${isDark ? "text-slate-400" : "text-muted-foreground"}`}>
            {r.desc}
          </p>
        </div>

        {/* Big stat */}
        <div className="shrink-0 text-center sm:text-right pl-0 sm:pl-6 sm:border-l"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "hsl(var(--border)/0.4)" }}>
          <div
            className="text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none"
            style={{ color: r.color }}
          >
            {r.stat}
          </div>
          <div className={`text-[11px] font-medium mt-1 ${isDark ? "text-slate-500" : "text-muted-foreground"}`}>
            {r.statLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main ──────────────────────────────────────────────────── */
export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="why-us" className="section-padding bg-background overflow-hidden relative" ref={ref}>
      {/* Subtle diagonal stripes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.016]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, hsl(var(--foreground)) 0, hsl(var(--foreground)) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary/50" />
              <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">
                // why OS tech labs
              </span>
            </div>
            <h2
              className="font-extrabold leading-tight tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              The Smarter Choice for{" "}
              <span className="gradient-text">Your Next Build</span>
            </h2>
          </div>

        </motion.div>

        {/* ── Alternating reason rows ── */}
        <div className="space-y-3 mb-12">
          {REASONS.map((r, i) => (
            <ReasonRow key={r.n} r={r} i={i} inView={inView} />
          ))}
        </div>

        {/* ── Three-column: badges + comparison + CTA ── */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-5 mb-12">

          {/* LEFT: Trust badges 2×2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="grid grid-cols-2 gap-3 content-start"
          >
            {BADGES.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="flex items-center gap-3 p-4 rounded-2xl border border-border/60
                        cursor-pointer bg-muted/40 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-xl service-icon-bg flex items-center justify-center
                                shrink-0 group-hover:scale-105 transition-transform">
                  <b.icon size={15} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{b.label}</div>
                  <div className="text-[10px] text-muted-foreground">{b.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="col-span-2 rounded-2xl p-5 flex flex-col gap-3"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.75))",
                boxShadow: "0 12px 32px hsl(var(--primary)/0.3)",
              }}
            >
              <div className="text-white/80 text-xs font-bold">Ready to start?</div>
              <div className="text-white font-black text-lg leading-tight">
                Let's build something<br />great together
              </div>
              <button className="w-fit flex items-center gap-2 bg-white/15 hover:bg-white/25
                                 transition-colors px-4 py-2 rounded-xl text-white text-xs font-bold">
                Book free discovery call <ArrowRight size={12} />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="w-full"
          >
            
            <div
              className="rounded-2xl overflow-hidden h-full border border-border bg-background shadow-md"
            >
              
              {/* Header */}
              <div
                className="grid grid-cols-[1fr_auto_auto] items-center px-5 sm:px-6 py-4 border-b border-border bg-muted/80"
              >
                
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-muted-foreground">
                  Feature
                </span>

                <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-primary text-center px-4 sm:px-6">
                  OS tech labs
                </span>

                <span className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground text-center px-4 sm:px-6">
                  Others
                </span>
              </div>

              {COMPARE.map((row, i) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.06 }}
                  className="grid grid-cols-[1fr_auto_auto] items-center px-5 sm:px-6 py-3.5
                   border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {row.feature}
                  </span>

                  <div className="flex justify-center px-4 sm:px-10">
                    {row.us ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  </div>

                  <div className="flex justify-center px-4 sm:px-6">
                    {row.others ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Process: elegant numbered timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground">
              // our process
            </span>
            <div className="h-px flex-1 bg-border/25" />
            <span className="text-[10px] font-mono text-muted-foreground/40">
              idea → launch
            </span>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden sm:block relative">
            {/* Connecting line */}
            <div className="absolute top-[28px] left-0 right-0 h-px bg-border/25" />

            <div className="grid grid-cols-5 gap-3">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.09 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon bubble */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-3
                               bg-background border border-border/50 transition-all duration-300
                               group-hover:scale-105 group-hover:border-primary/20"
                    style={{ boxShadow: `0 0 0 4px ${p.color}12` }}
                  >
                    <p.icon size={20} style={{ color: p.color }} />
                    {/* Step dot on line */}
                    <div
                      className="absolute -top-[15px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                      style={{ background: p.color }}
                    />
                  </div>

                  <div
                    className="text-[10px] font-black font-mono mb-1"
                    style={{ color: p.color }}
                  >
                    {p.n}
                  </div>
                  <div className="text-xs font-bold text-foreground leading-tight mb-1">{p.title}</div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical stacked */}
          <div className="sm:hidden space-y-3">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-muted/10"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-background border border-border/50"
                  style={{ boxShadow: `0 0 0 3px ${p.color}15` }}
                >
                  <p.icon size={18} style={{ color: p.color }} />
                </div>
                <div>
                  <div className="text-[10px] font-black font-mono mb-0.5" style={{ color: p.color }}>
                    {p.n}
                  </div>
                  <div className="text-sm font-bold text-foreground leading-tight">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}