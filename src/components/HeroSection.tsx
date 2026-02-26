import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Plane, Hotel, Shield,
  Smartphone, Stamp, Armchair, Palmtree,
  Star, MapPin, ChevronRight, ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── DATA ────────────────────────────────────────────── */
const destinations = [
  {
    id: 0,
    name: "Maldives",
    country: "Indian Ocean",
    tagline: "Crystal Waters Await",
    gradient: "from-cyan-500/20 via-blue-600/15 to-transparent",
    accentColor: "#06B6D4",
    price: "₹45,999",
    duration: "5N/6D",
    badge: "🏆 Most Booked",
  },
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    tagline: "Island of the Gods",
    gradient: "from-emerald-500/20 via-teal-600/15 to-transparent",
    accentColor: "#10B981",
    price: "₹32,499",
    duration: "4N/5D",
    badge: "🔥 Trending Now",
  },
  {
    id: 2,
    name: "Dubai",
    country: "UAE",
    tagline: "Where Dreams Are Built",
    gradient: "from-amber-500/20 via-orange-600/15 to-transparent",
    accentColor: "#F59E0B",
    price: "₹38,999",
    duration: "3N/4D",
    badge: "⚡ Flash Deal",
  },
  {
    id: 3,
    name: "Bangkok",
    country: "Thailand",
    tagline: "City of Angels",
    gradient: "from-violet-500/20 via-purple-600/15 to-transparent",
    accentColor: "#8B5CF6",
    price: "₹28,499",
    duration: "5N/6D",
    badge: "💎 Premium",
  },
];



/* ─── DESTINATION SLIDE ───────────────────────────────── */
const DestinationSlide = ({
  dest, isActive,
}: { dest: typeof destinations[0]; isActive: boolean }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.96, y: isActive ? 0 : 12 }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    className="absolute inset-0 pointer-events-none"
  >
    {/* Large decorative circle */}
    <div
      className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-60 pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${dest.accentColor}22 0%, transparent 70%)`,
        filter: "blur(24px)",
      }}
    />
    {/* Concentric rings */}
    {[380, 280, 180].map((s, i) => (
      <motion.div
        key={s}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-[10%] -translate-y-1/2 rounded-full border"
        style={{
          width: s, height: s,
          marginLeft: -s / 2, marginTop: -s / 2,
          borderColor: `${dest.accentColor}18`,
          borderStyle: i === 1 ? "dashed" : "solid",
        }}
      />
    ))}
    {/* Dot on ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 right-[10%] pointer-events-none"
      style={{ width: 380, height: 380, marginTop: -190 }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg"
        style={{ background: dest.accentColor }}
      />
    </motion.div>
    {/* Destination big text watermark */}
    <div
      className="absolute bottom-16 right-[4%] text-[clamp(4rem,10vw,9rem)] font-black leading-none tracking-tighter select-none pointer-events-none"
      style={{ color: `${dest.accentColor}0d`, WebkitTextStroke: `1px ${dest.accentColor}12` }}
    >
      {dest.name.toUpperCase()}
    </div>
  </motion.div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────── */
const HeroSection = () => {
  const [active, setActive] = useState(0);
  const [hovSvc, setHovSvc] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const op = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const dest = destinations[active];

  const prev = () => setActive(a => (a - 1 + destinations.length) % destinations.length);
  const next = () => setActive(a => (a + 1) % destinations.length);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Hero gradient wash */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero, linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.4) 100%))" }}
        />
      </div>

      {/* ── Destination atmosphere (changes per slide) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {destinations.map((d, i) => (
          <DestinationSlide key={d.id} dest={d} isActive={i === active} />
        ))}
      </div>

      {/* ══ CONTENT ════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col"
      >
        <div className="container mx-auto flex-1 flex flex-col justify-between gap-12 xl:gap-0">

          {/* ── TOP SECTION: Left copy + right destination card ── */}
          <div className="flex-1 flex flex-col xl:flex-row items-start xl:items-center gap-20 xl:gap-8 justify-between">

            {/* LEFT: Copy block */}
            <div className="flex-1 max-w-xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-7"
              >
                <span className="flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                  India's #1 Travel Platform
                </span>
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] text-muted-foreground ml-1 font-medium">4.9</span>
                </span>
              </motion.div>

              {/* Big headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-black tracking-tight leading-[1.0] text-foreground"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
              >
                Explore
                <br />
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={dest.name}
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="gradient-text block"
                    >
                      {dest.name}
                    </motion.span>
                  </AnimatePresence>
                  {/* Accent bar under name */}
                  <motion.div
                    key={dest.accentColor}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-1 left-0 h-[4px] w-3/4 rounded-full origin-left"
                    style={{ background: `linear-gradient(90deg, ${dest.accentColor}, transparent)` }}
                  />
                </span>
                <br />
                <span className="text-muted-foreground font-extralight" style={{ fontSize: "0.55em", letterSpacing: "0.01em" }}>
                  &amp; Beyond
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-5 flex items-center gap-2"
              >
                <div className="w-8 h-[2px] rounded-full" style={{ background: dest.accentColor }} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dest.tagline}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium text-muted-foreground italic"
                  >
                    {dest.tagline}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-6 text-sm sm:text-[15px] text-muted-foreground leading-relaxed"
              >
                One platform for flights, hotels, insurance, e-SIM, visas, lounges
                &amp; holiday packages. Book smarter with OnlineSavaari.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button variant="hero" size="xl" className="gap-2.5 group">
                  Start Booking
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                    <ArrowRight size={16} />
                  </motion.span>
                </Button>
                <Button variant="heroOutline" size="xl" className="gap-2">
                  View Packages
                  <ArrowUpRight size={14} />
                </Button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex items-center gap-4 flex-wrap"
              >
                <div className="flex -space-x-2">
                  {["#F59E0B","#3B82F6","#10B981","#8B5CF6","#EF4444"].map((c, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-white text-[9px] font-bold" style={{ background: c }}>
                      {["A","R","S","M","K"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  <strong className="text-foreground">2M+ travelers</strong> booked this month
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  247 bookings live
                </span>
              </motion.div>
            </div>

            {/* RIGHT: Destination switcher card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="w-full xl:w-[340px] shrink-0 "
            >
              {/* Card */}
              <div
                className="bg-transparent relative rounded-3xl border border-border/50 backdrop-blur-xl overflow-hidden"
                style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 0 0 1px hsl(var(--border)/0.4)" }}
              >
                {/* Colored top bar — accent per destination */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={dest.accentColor}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-1 w-full origin-left"
                    style={{ background: `linear-gradient(90deg, ${dest.accentColor}, ${dest.accentColor}44)` }}
                  />
                </AnimatePresence>

                <div className="p-5">
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black tracking-[0.15em] uppercase text-muted-foreground">
                      Featured Destinations
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={prev} className="w-6 h-6 rounded-full border border-border/60 flex items-center justify-center hover:bg-accent transition-colors">
                        <ChevronLeft size={12} />
                      </button>
                      <button onClick={next} className="w-6 h-6 rounded-full border border-border/60 flex items-center justify-center hover:bg-accent transition-colors">
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Active destination detail */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${dest.accentColor}18`, color: dest.accentColor }}
                            >
                              {dest.badge}
                            </span>
                          </div>
                          <h3 className="text-2xl font-black text-foreground tracking-tight">{dest.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <MapPin size={10} />
                            {dest.country}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-muted-foreground">Starting from</div>
                          <div className="text-xl font-black text-foreground">{dest.price}</div>
                          <div className="text-[10px] text-muted-foreground">{dest.duration} · per person</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Dot indicators */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {destinations.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="transition-all duration-300 rounded-full h-1.5"
                        style={{
                          width: i === active ? 20 : 6,
                          background: i === active ? dest.accentColor : "hsl(var(--border))",
                        }}
                      />
                    ))}
                  </div>

                  {/* Mini destination list */}
                  <div className="space-y-1.5 mb-4">
                    {destinations.map((d, i) => (
                      <button
                        key={d.id}
                        onClick={() => setActive(i)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                          i === active ? "border" : "border border-transparent hover:bg-accent/60"
                        }`}
                        style={i === active ? { background: `${d.accentColor}0d`, borderColor: `${d.accentColor}30` } : {}}
                      >
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: `${d.accentColor}18` }}>
                          <MapPin size={11} style={{ color: d.accentColor }} />
                        </div>
                        <span className={`text-sm font-semibold flex-1 ${i === active ? "text-foreground" : "text-muted-foreground"}`}>{d.name}</span>
                        <span className="text-xs font-bold" style={{ color: i === active ? d.accentColor : "hsl(var(--muted-foreground))" }}>{d.price}</span>
                        {i === active && <ChevronRight size={12} style={{ color: d.accentColor }} />}
                      </button>
                    ))}
                  </div>

                  {/* Book button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all text-white"
                    style={{
                      background: `linear-gradient(135deg, ${dest.accentColor}, ${dest.accentColor}bb)`,
                      boxShadow: `0 8px 24px ${dest.accentColor}40`,
                    }}
                  >
                    <Plane size={14} />
                    Book {dest.name} Package
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border/40 pt-8"
          >
            {[
              { val: "2M+",  lbl: "Happy Travelers", color: "#3B82F6" },
              { val: "150+", lbl: "Destinations",     color: "#10B981" },
              { val: "4.9★", lbl: "Average Rating",   color: "#F59E0B" },
              { val: "24/7", lbl: "Expert Support",   color: "#8B5CF6" },
            ].map((s, i) => (
              <motion.div
                key={s.val}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.08 }}
                className="flex items-center gap-3 justify-center"
              >
                <div className="w-1 h-8 rounded-full shrink-0" style={{ background: s.color }} />
                <div>
                  <div className="text-xl font-black text-foreground tracking-tight">{s.val}</div>
                  <div className="text-[11px] text-muted-foreground font-medium">{s.lbl}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

     
    </section>
  );
};

export default HeroSection;