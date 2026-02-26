import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, Globe, Smartphone, Brain,
  Palette, Megaphone, LayoutDashboard,
  Star, ChevronRight, ChevronLeft, Code2, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── DATA ────────────────────────────────────────────── */
const domains = [
  {
    id: 0,
    name: "Web Development",
    tagline: "Modern, Fast & Scalable",
    accentColor: "#3B82F6",
    price: "Starting ₹15,000",
    duration: "2–6 weeks",
    badge: "🏆 Most Popular",
    icon: Globe,
  },
  {
    id: 1,
    name: "Mobile Apps",
    tagline: "iOS & Android Excellence",
    accentColor: "#10B981",
    price: "Starting ₹25,000",
    duration: "4–10 weeks",
    badge: "🔥 High Demand",
    icon: Smartphone,
  },
  {
    id: 2,
    name: "AI / ML Solutions",
    tagline: "Intelligent Automation",
    accentColor: "#8B5CF6",
    price: "Starting ₹40,000",
    duration: "6–12 weeks",
    badge: "⚡ Cutting Edge",
    icon: Brain,
  },
  {
    id: 3,
    name: "Digital Marketing",
    tagline: "Grow Your Online Presence",
    accentColor: "#F59E0B",
    price: "Starting ₹8,000/mo",
    duration: "Ongoing",
    badge: "📈 Proven ROI",
    icon: Megaphone,
  },
];

const services = [
  { icon: Globe, label: "Web Dev" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Brain, label: "AI / ML" },
  { icon: Palette, label: "Graphics" },
  { icon: LayoutDashboard, label: "UI/UX" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Code2, label: "CRM/ERP" },
];

const stats = [
  { val: "200+", lbl: "Projects Done" },
  { val: "50+", lbl: "Happy Clients" },
  { val: "5★", lbl: "Avg Rating" },
  { val: "24/7", lbl: "Support" },
];

/* ─── Background atmosphere ───────────────────────────── */
const DomainAtmosphere = ({
  domain, isActive,
}: { domain: typeof domains[0]; isActive: boolean }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isActive ? 1 : 0 }}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="absolute inset-0 pointer-events-none"
  >
    <div
      className="absolute top-1/2 right-[2%] sm:right-[5%] -translate-y-1/2
                 w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[540px] lg:h-[540px] rounded-full"
      style={{
        background: `radial-gradient(circle, ${domain.accentColor}20 10%, transparent 90%)`,
        filter: "blur(50px) sm:blur(40px)",
      }}
    />
    {[380, 280, 180].map((s, i) => (
      <motion.div
        key={s}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 28 + i * 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-[8%] rounded-full border hidden md:block"
        style={{
          width: s * 0.5, height: s * 0.5,
          marginTop: -(s * 0.5) / 2,
          borderColor: `${domain.accentColor}18`,
          borderStyle: i === 1 ? "dashed" : "solid",
        }}
      />
    ))}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 right-[8%] pointer-events-none hidden md:block"
      style={{ width: 200, height: 200, marginTop: -100 }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ background: domain.accentColor, boxShadow: `0 0 10px ${domain.accentColor}` }}
      />
    </motion.div>
    <div
      className="absolute bottom-20 right-[2%] font-black leading-none tracking-tighter
                 select-none pointer-events-none hidden xl:block"
      style={{
        fontSize: "clamp(3rem, 6vw, 7rem)",
        color: `${domain.accentColor}07`,
        WebkitTextStroke: `2px ${domain.accentColor}15`,
      }}
    >
      {domain.name.toUpperCase()}
    </div>
  </motion.div>
);

/* ─── Main Component ─────────────────────────────────── */
const HeroSection = () => {
  const [active, setActive] = useState(0);
  const [hovSvc, setHovSvc] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const domain = domains[active];

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % domains.length), 4500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive(a => (a - 1 + domains.length) % domains.length);
  const next = () => setActive(a => (a + 1) % domains.length);
  const DomainIcon = domain.icon;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background"
    >


      {/* Domain atmospheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {domains.map((d, i) => (
          <DomainAtmosphere key={d.id} domain={d} isActive={i === active} />
        ))}
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="container mx-auto w-full flex-1 flex flex-col justify-between
                        px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
                        py-4 xs:py-6 sm:py-8 md:py-10 lg:py-12 gap-4 xs:gap-6 sm:gap-8 md:gap-10">

          <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-12 justify-between">

            {/* LEFT */}
            <div className="flex-1 w-full lg:max-w-[54%] xl:max-w-2xl 2xl:max-w-3xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-1.5 xs:gap-2 mb-3 xs:mb-4 sm:mb-5 md:mb-7"
              >
                <span className="flex items-center gap-1.5 xs:gap-2 text-[9px] xs:text-[10px] sm:text-[11px] font-black
                                 tracking-[0.12em] xs:tracking-[0.14em] sm:tracking-[0.16em] uppercase 
                                 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-full
                                 border border-primary/25 bg-primary/8 text-primary">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-primary"
                  />
                  Kolkata's #1 Tech Partner
                </span>
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} className="xs:w-[9px] xs:h-[9px] sm:w-[10px] sm:h-[10px] fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[9px] xs:text-[10px] sm:text-[11px] text-muted-foreground ml-0.5 xs:ml-1 font-medium">5.0</span>
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-black tracking-tight leading-[1.05] xs:leading-[1.04] sm:leading-[1.03] text-foreground"
                style={{ fontSize: "clamp(1.8rem, 7vw, 3.5rem)" }}
              >
                We Build
                <br />
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={domain.name}
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="gradient-text block"
                    >
                      {domain.name}
                    </motion.span>
                  </AnimatePresence>
                  <motion.div
                    key={`ul-${domain.accentColor}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-0.5 xs:-bottom-1 left-0 h-[2px] xs:h-[2.5px] sm:h-[3px] md:h-[4px] w-3/4 rounded-full origin-left"
                    style={{ background: `linear-gradient(90deg, ${domain.accentColor}, transparent)` }}
                  />
                </span>
                <br />

              </motion.h1>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-2 xs:mt-3 sm:mt-4 md:mt-5 flex items-center gap-1.5 xs:gap-2"
              >
                <div className="w-4 xs:w-5 sm:w-6 md:w-8 h-[1.5px] xs:h-[2px] rounded-full shrink-0" style={{ background: domain.accentColor }} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={domain.tagline}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium text-muted-foreground italic"
                  >
                    {domain.tagline}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 text-xs xs:text-sm sm:text-[14px] md:text-[15px] text-muted-foreground leading-relaxed max-w-lg lg:max-w-xl"
              >
                OS tech labs Infotech is a full-service technology company based in Kolkata. We craft
                high-performance websites, mobile apps, AI solutions, stunning designs, and powerful
                digital marketing strategies — all under one roof.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
                className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3"
              >
                <Button variant="hero" size="default" className="gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-2.5">
                  Get a Free Quote
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                    <ArrowRight size={12} className="xs:w-[13px] xs:h-[13px] sm:w-[15px] sm:h-[15px]" />
                  </motion.span>
                </Button>
                <Button variant="heroOutline" size="default" className="gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-2.5">
                  View Our Work
                  <ArrowUpRight size={11} className="xs:w-3 xs:h-3 sm:w-[14px] sm:h-[14px]" />
                </Button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4"
              >
                <div className="flex -space-x-1.5 xs:-space-x-2">
                  {["#F59E0B", "#3B82F6", "#10B981", "#8B5CF6", "#EF4444"].map((c, i) => (
                    <div key={i} className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full border-2 border-background flex items-center justify-center text-white text-[7px] xs:text-[8px] sm:text-[9px] font-bold" style={{ background: c }}>
                      {["A", "R", "S", "M", "K"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] xs:text-[11px] sm:text-xs text-muted-foreground">
                  <strong className="text-foreground">50+ clients</strong> trust OS tech labs
                </span>
                <span className="flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-[11px] sm:text-xs font-semibold text-emerald-500">
                  <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Projects ongoing
                </span>
              </motion.div>
            </div>

            {/* RIGHT: Domain card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="w-full lg:w-[400px] shrink-0 mt-4 lg:mt-0"
            >
              <div
                className="relative rounded-xl xs:rounded-2xl sm:rounded-3xl border border-border/50 bg-background/85 backdrop-blur-xl overflow-hidden"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px hsl(var(--border)/0.4)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={domain.accentColor}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-1 w-full origin-left"
                    style={{ background: `linear-gradient(90deg, ${domain.accentColor}, ${domain.accentColor}44)` }}
                  />
                </AnimatePresence>

                <div className="p-3 xs:p-3.5 sm:p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black tracking-[0.12em] xs:tracking-[0.14em] uppercase text-muted-foreground">
                      Our Expertise
                    </span>
                    <div className="flex items-center gap-0.5 xs:gap-1">
                      <button onClick={prev} className="w-5 h-5 xs:w-6 xs:h-6 rounded-full border border-border/60 flex items-center justify-center hover:bg-accent transition-colors">
                        <ChevronLeft size={9} className="xs:w-[10px] xs:h-[10px] sm:w-[11px] sm:h-[11px]" />
                      </button>
                      <button onClick={next} className="w-5 h-5 xs:w-6 xs:h-6 rounded-full border border-border/60 flex items-center justify-center hover:bg-accent transition-colors">
                        <ChevronRight size={9} className="xs:w-[10px] xs:h-[10px] sm:w-[11px] sm:h-[11px]" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.38 }}
                      className="mb-2 xs:mb-2.5 sm:mb-3 md:mb-4"
                    >
                      <div className="flex items-start justify-between gap-1.5 xs:gap-2">
                        <div>
                          <span
                            className="inline-block text-[8px] xs:text-[9px] sm:text-[10px] font-bold px-1.5 xs:px-2 py-0.5 rounded-full mb-0.5 xs:mb-1"
                            style={{ background: `${domain.accentColor}18`, color: domain.accentColor }}
                          >
                            {domain.badge}
                          </span>
                          <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black text-foreground tracking-tight">{domain.name}</h3>
                          <div className="flex items-center gap-0.5 xs:gap-1 text-[10px] xs:text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                            <Zap size={8} className="xs:w-[9px] xs:h-[9px]" style={{ color: domain.accentColor }} />
                            {domain.tagline}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[8px] xs:text-[9px] text-muted-foreground">Budget</div>
                          <div className="text-sm xs:text-base sm:text-lg font-black text-foreground">{domain.price}</div>
                          <div className="text-[8px] xs:text-[9px] text-muted-foreground">Timeline: {domain.duration}</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-1 xs:gap-1.5 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">
                    {domains.map((_, i) => (
                      <button key={i} onClick={() => setActive(i)}
                        className="transition-all duration-300 rounded-full h-1 xs:h-1.5"
                        style={{ width: i === active ? 14 : 4, background: i === active ? domain.accentColor : "hsl(var(--border))" }}
                      />
                    ))}
                  </div>

                  <div className="space-y-1 xs:space-y-1.5 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4">
                    {domains.map((d, i) => {
                      const Icon = d.icon;
                      return (
                        <button key={d.id} onClick={() => setActive(i)}
                          className="w-full flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-2 rounded-lg xs:rounded-xl text-left transition-all duration-200 border"
                          style={i === active ? { background: `${d.accentColor}0d`, borderColor: `${d.accentColor}30` } : { borderColor: "transparent" }}
                        >
                          <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${d.accentColor}18` }}>
                            <Icon size={9} className="xs:w-[10px] xs:h-[10px] sm:w-[11px] sm:h-[11px]" style={{ color: d.accentColor }} />
                          </div>
                          <span className={`text-[10px] xs:text-xs sm:text-sm font-semibold flex-1 truncate ${i === active ? "text-foreground" : "text-muted-foreground"}`}>{d.name}</span>
                          <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold shrink-0" style={{ color: i === active ? d.accentColor : "hsl(var(--muted-foreground))" }}>{d.price}</span>
                          {i === active && <ChevronRight size={8} className="xs:w-[9px] xs:h-[9px] sm:w-[11px] sm:h-[11px] shrink-0" style={{ color: d.accentColor }} />}
                        </button>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl sm:rounded-2xl font-bold text-[10px] xs:text-xs sm:text-sm flex items-center justify-center gap-1.5 xs:gap-2 text-white transition-all"
                    style={{ background: `linear-gradient(135deg, ${domain.accentColor}, ${domain.accentColor}cc)`, boxShadow: `0 4px 15px ${domain.accentColor}40` }}
                  >
                    <DomainIcon size={11} className="xs:w-3 xs:h-3 sm:w-[13px] sm:h-[13px]" />
                    Start {domain.name} Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="grid grid-cols-2 justify-center sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 border-t border-border/40 pt-3 xs:pt-4 sm:pt-5 md:pt-6 lg:pt-8"
          >
            {stats.map((s, i) => (
              <motion.div key={s.val} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + i * 0.08 }} className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3">
                <div className="w-0.5 xs:w-1 h-5 xs:h-6 sm:h-7 md:h-8 rounded-full shrink-0 bg-primary transition-colors duration-500" />
                <div>
                  <div className="text-sm xs:text-base sm:text-lg md:text-xl font-black text-foreground tracking-tight leading-tight" style={{ color: domain.accentColor }}
                  >{s.val}</div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] text-muted-foreground font-medium leading-tight">{s.lbl}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection;