import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Globe, Smartphone, Brain, Palette, Megaphone,
  LayoutDashboard, Code2, ArrowUpRight, CheckCircle2,
  Clock, Zap,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01", icon: Globe, title: "Web Development",
    short: "Websites & SaaS platforms",
    tagline: "React · Next.js · Laravel · Node.js",
    color: "#3B82F6",
    description: "Blazing-fast websites, SaaS platforms, e-commerce stores, and web portals. Clean architecture, pixel-perfect UI, rock-solid backend APIs.",
    stack: ["React", "Next.js", "Node.js", "Laravel", "PostgreSQL", "TypeScript"],
    deliverables: ["Custom Website", "E-Commerce Store", "Web Portal", "REST / GraphQL API"],
    timeline: "2–6 weeks", from: "₹15,000", stat: "200+ sites shipped",
  },
  {
    num: "02", icon: Smartphone, title: "Mobile Apps",
    short: "iOS & Android excellence",
    tagline: "Flutter · React Native · Swift · Kotlin",
    color: "#10B981",
    description: "Cross-platform and native apps that feel at home on every device. MVP to full launch — UI, dev, Play Store & App Store included.",
    stack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    deliverables: ["iOS App", "Android App", "Cross-Platform", "App Store Launch"],
    timeline: "4–10 weeks", from: "₹25,000", stat: "App Store & Play Store ready",
  },
  {
    num: "03", icon: Brain, title: "AI / ML Solutions",
    short: "Intelligent automation",
    tagline: "Python · TensorFlow · OpenAI · LangChain",
    color: "#8B5CF6",
    description: "Custom AI models, chatbots, LLM integrations, and predictive analytics. We turn your data into decisions and workflows into automation.",
    stack: ["Python", "TensorFlow", "OpenAI", "LangChain", "FastAPI"],
    deliverables: ["AI Chatbot", "ML Model", "Data Pipeline", "LLM Integration"],
    timeline: "6–12 weeks", from: "₹40,000", stat: "94% avg model accuracy",
  },
  {
    num: "04", icon: LayoutDashboard, title: "UI / UX Design",
    short: "Interfaces users love",
    tagline: "Figma · Wireframes · Design Systems",
    color: "#0EA5E9",
    description: "User research, wireframes, interactive prototypes, and production-ready UI. Interfaces that users love and devs can build without friction.",
    stack: ["Figma", "FigJam", "Protopie", "Zeplin", "Design Tokens"],
    deliverables: ["UI Design", "UX Audit", "Interactive Prototype", "Design System"],
    timeline: "1–4 weeks", from: "₹10,000", stat: "4.8★ avg usability score",
  },
  {
    num: "05", icon: Palette, title: "Graphics Design",
    short: "Visual brand identity",
    tagline: "Illustrator · Photoshop · After Effects",
    color: "#EF4444",
    description: "Logo design, brand identity kits, social media creatives, pitch decks, brochures, and motion graphics that make your brand unforgettable.",
    stack: ["Illustrator", "Photoshop", "After Effects", "InDesign", "Canva Pro"],
    deliverables: ["Logo & Brand Kit", "Social Media Pack", "Pitch Deck", "Motion Graphics"],
    timeline: "1–3 weeks", from: "₹5,000", stat: "500+ brand assets created",
  },
  {
    num: "06", icon: Megaphone, title: "Digital Marketing",
    short: "SEO, ads & growth",
    tagline: "Google Ads · Meta · Ahrefs · GA4",
    color: "#F59E0B",
    description: "Data-driven campaigns — organic traffic growth, qualified leads, measurable ROI. SEO, PPC, social ads, and email under one strategy.",
    stack: ["Google Ads", "Meta Ads", "Ahrefs", "SEMrush", "Mailchimp", "GA4"],
    deliverables: ["SEO Audit", "Ad Campaigns", "Content Calendar", "Monthly Reports"],
    timeline: "Ongoing", from: "₹8,000/mo", stat: "Avg 60% lower CPA",
  },
  {
    num: "07", icon: Code2, title: "CRM & ERP Systems",
    short: "Business automation",
    tagline: "React · Django · AWS · Docker",
    color: "#F97316",
    description: "Tailor-made CRM, ERP, and internal tools. Replace spreadsheets with smart dashboards, automated pipelines, and granular access control.",
    stack: ["React", "Django", "MySQL", "AWS", "Docker", "Redis"],
    deliverables: ["CRM System", "ERP Module", "Admin Dashboard", "API Integration"],
    timeline: "6–16 weeks", from: "₹35,000", stat: "Replaces 6+ manual tools",
  },
];

/* ─── Service tile (left rail) ─────────────────────────────── */
const ServiceTile = ({
  s, idx, isActive, inView, onClick,
}: {
  s: typeof SERVICES[0]; idx: number; isActive: boolean; inView: boolean; onClick: () => void;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
    onClick={onClick}
    className="relative w-full text-left rounded-2xl border overflow-hidden p-4 sm:p-5 group
               transition-all duration-300 hover:shadow-lg"
    style={{
      borderColor: isActive ? `${s.color}45` : "hsl(var(--border)/0.4)",
      background: isActive
        ? `radial-gradient(ellipse at top left, ${s.color}12 0%, hsl(var(--background)) 65%)`
        : "hsl(var(--muted)/0.15)",
      boxShadow: isActive ? `0 0 0 1px ${s.color}30, 0 16px 48px ${s.color}12` : undefined,
    }}
  >
    {/* Active top bar — spring-animated via layoutId */}
    {isActive && (
      <motion.div
        layoutId="activeTileBar"
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: s.color }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      />
    )}

    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                   transition-transform duration-300 group-hover:scale-105"
        style={{ background: `${s.color}18` }}
      >
        <s.icon size={17} style={{ color: s.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-sm font-bold leading-tight transition-colors ${
              isActive ? "text-foreground" : "text-foreground/70"
            }`}
          >
            {s.title}
          </span>
          <span
            className="text-[10px] font-black font-mono px-2 py-0.5 rounded-full shrink-0"
            style={{ background: `${s.color}14`, color: s.color }}
          >
            {s.num}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{s.short}</p>
      </div>
    </div>

    {/* Stat + price shown when active */}
    {isActive && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="mt-3 pt-3 border-t border-border/25 flex items-center justify-between"
      >
        <span className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: s.color }}>
          <Zap size={10} />{s.stat}
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">{s.from}</span>
      </motion.div>
    )}
  </motion.button>
);

/* ─── Detail panel (right) ────────────────────────────────── */
const DetailPanel = ({ s }: { s: typeof SERVICES[0] }) => (
  <motion.div
    key={s.num}
    initial={{ opacity: 0, y: 16, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.99 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    className="relative rounded-3xl overflow-hidden flex flex-col"
    style={{
      background: `linear-gradient(145deg, ${s.color}0f 0%, hsl(var(--background)) 55%)`,
      border: `1px solid ${s.color}30`,
      boxShadow: `0 24px 64px ${s.color}16, 0 0 0 1px ${s.color}14`,
      minHeight: 480,
    }}
  >
    {/* Ambient glow blob */}
    <div
      className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${s.color}1e 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
    />

    {/* Watermark number */}
    <div
      className="absolute bottom-4 right-6 font-black font-mono leading-none
                 select-none pointer-events-none"
      style={{ fontSize: "clamp(5rem, 14vw, 9rem)", color: `${s.color}07` }}
    >
      {s.num}
    </div>

    <div className="relative flex flex-col flex-1 p-6 sm:p-9">
      {/* Heading */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${s.color}20`, border: `1.5px solid ${s.color}35` }}
        >
          <s.icon size={28} style={{ color: s.color }} />
        </div>
        <div>
          <h3
            className="font-black text-foreground tracking-tight leading-tight mb-1"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
          >
            {s.title}
          </h3>
          <p className="text-xs font-mono text-muted-foreground/70">{s.tagline}</p>
        </div>
      </div>

      {/* Stat pill */}
      <div
        className="inline-flex items-center gap-2 mb-5 px-3.5 py-2 rounded-xl w-fit"
        style={{ background: `${s.color}14`, border: `1px solid ${s.color}25` }}
      >
        <Zap size={12} style={{ color: s.color }} />
        <span className="text-sm font-bold" style={{ color: s.color }}>{s.stat}</span>
      </div>

      {/* Description */}
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-7 max-w-lg">
        {s.description}
      </p>

      {/* Stack + Deliverables */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {s.stack.map(t => (
              <span
                key={t}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg border font-mono"
                style={{ background: `${s.color}0c`, borderColor: `${s.color}22`, color: s.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
            Deliverables
          </p>
          <div className="space-y-1.5">
            {s.deliverables.map(d => (
              <div key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={12} style={{ color: s.color }} className="shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-4 px-4 py-3 rounded-xl"
          style={{
            background: "hsl(var(--background)/0.7)",
            border: "1px solid hsl(var(--border)/0.4)",
          }}
        >
          <div>
            <p className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
              <Clock size={9} /> Timeline
            </p>
            <p className="text-sm font-bold text-foreground">{s.timeline}</p>
          </div>
          <div className="w-px h-7 bg-border/40" />
          <div>
            <p className="text-[10px] font-mono text-muted-foreground">Starting from</p>
            <p className="text-base font-black" style={{ color: s.color }}>{s.from}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white"
          style={{ background: s.color, boxShadow: `0 8px 24px ${s.color}40` }}
        >
          Get a Quote
          <ArrowUpRight size={14} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

/* ─── Main export ─────────────────────────────────────────── */
export default function ServicesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <section
      id="services"
      ref={ref}
      className="pt-20 overflow-hidden bg-muted/10 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
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
                // services
              </span>
            </div>
            <h2
              className="font-extrabold leading-tight tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              What We Build &{" "}
              <span className="gradient-text">Deliver</span>
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-6 items-start">

         
          <div className="w-full xl:w-[400px] 2xl:w-[440px] shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2.5">
              {SERVICES.map((sv, i) => (
                <ServiceTile
                  key={sv.num}
                  s={sv}
                  idx={i}
                  isActive={i === active}
                  inView={inView}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>

          
          <div className="flex-1 sticky top-20 self-start w-full">
            <AnimatePresence mode="wait">
              <DetailPanel key={s.num} s={s} />
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {SERVICES.map((sv, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Select ${sv.title}`}
                  className="rounded-full transition-all duration-300 focus:outline-none"
                  style={{
                    width: i === active ? 22 : 6,
                    height: 6,
                    background: i === active ? s.color : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}