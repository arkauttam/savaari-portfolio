import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Users, Globe, Award, Headphones,
  ArrowRight, CheckCircle2, MapPin, Sparkles, Zap, Shield,
} from "lucide-react";

/* ── Animated counter ───────────────────────────────────── */
const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ── Data ───────────────────────────────────────────────── */
const stats = [
  { icon: Users,       value: 50000,  suffix: "+",  label: "Happy Travelers",   color: "#3B82F6", bg: "#3B82F608" },
  { icon: Globe,       value: 120,    suffix: "+",  label: "Countries Covered",  color: "#10B981", bg: "#10B98108" },
  { icon: Award,       value: 99,     suffix: "%",  label: "Satisfaction Rate",  color: "#F59E0B", bg: "#F59E0B08" },
  { icon: Headphones,  value: 24,     suffix: "/7", label: "Support Available",  color: "#8B5CF6", bg: "#8B5CF608" },
];

const pillars = [
  { icon: Zap,          title: "Instant Booking",      desc: "Confirm flights, hotels & packages in seconds with real-time availability." },
  { icon: Shield,       title: "100% Secure",           desc: "Bank-grade encryption protects every transaction and personal detail." },
  { icon: CheckCircle2, title: "Best Price Guarantee",  desc: "We match any lower price — or refund the difference, no questions asked." },
  { icon: Sparkles,     title: "Curated Experiences",   desc: "Handpicked destinations and packages designed by seasoned travel experts." },
];

/* ── Component ──────────────────────────────────────────── */
const AboutSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-20 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="h-px flex-1 max-w-[40px] bg-primary/40 rounded-full" />
          <span className="text-primary font-bold text-xs uppercase tracking-[0.18em]">About Online Savaari</span>
          <div className="h-px flex-1 bg-border/50 rounded-full" />
        </motion.div>

        {/* ══ TOP: Asymmetric hero split ══════════════════════ */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start mb-20">

          {/* LEFT — headline + body + pillars ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <h2
              className="font-extrabold leading-[1.06] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              Your One-Stop{" "}
              <span className="gradient-text">Travel Platform</span>
              <br />
              <span className="text-muted-foreground font-light" style={{ fontSize: "0.6em", letterSpacing: "0.01em" }}>
                Built for India. Made for the World.
              </span>
            </h2>

            <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed max-w-lg">
              Online Savaari simplifies every aspect of travel — from booking flights and hotels
              to securing travel insurance, purchasing international e-SIMs, applying for visas,
              reserving airport lounges, and planning dream holidays. All in one seamless platform.
            </p>

            {/* Pillar grid */}
            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="group flex items-start gap-3.5 p-4 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/60 hover:border-primary/15 transition-all duration-300"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <div className="w-9 h-9 rounded-xl service-icon-bg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <p.icon size={17} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground mb-0.5">{p.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#services"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300 group"
            >
              Explore all services
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>

          {/* RIGHT — image collage ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_24px_60px_rgba(0,0,0,0.1)]">
              <img
                src="/public/img1.webp"
                alt="Aerial travel destination"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-foreground/25" />
              {/* Bottom left label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/90 backdrop-blur-sm border border-border/40">
                <MapPin size={12} className="text-primary" />
                <span className="text-xs font-semibold text-foreground">150+ Destinations</span>
              </div>
            </div>

            {/* Secondary image — overlapping bottom right */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-4 sm:-right-6 w-[45%] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.15)] border-4 border-background"
            >
              <img
                src="/public/img2.jpg"
                alt="Beach destination"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Floating trust badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -top-4 -left-4 sm:-left-6 card-glass px-4 py-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Award size={17} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-foreground leading-tight">#1 Rated</div>
                <div className="text-[11px] text-muted-foreground">Travel Platform in India</div>
              </div>
            </motion.div>

            {/* Floating live bookings pill */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute top-[44%] -right-3 sm:-right-5 card-glass px-3.5 py-2.5 flex items-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
              />
              <span className="text-xs font-bold text-foreground">Live: 247 bookings</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ══ BOTTOM: Stats bar ═══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative rounded-3xl border border-border/50 bg-muted/30 overflow-hidden"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {/* Subtle top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)" }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/40">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.09 }}
                className="group flex items-center gap-4 px-7 py-7 hover:bg-muted/50 transition-colors duration-300"
              >
                {/* Icon circle */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: stat.bg, border: `1px solid ${stat.color}20` }}
                >
                  <stat.icon size={19} style={{ color: stat.color }} />
                </div>
                <div>
                  <div
                    className="text-2xl sm:text-3xl font-black tracking-tight leading-none"
                    style={{ color: stat.color }}
                  >
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[12px] text-muted-foreground font-medium mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;