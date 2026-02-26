import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Plane, Hotel, Shield, Smartphone, Stamp, Armchair, Palmtree,
  ArrowRight, Sparkles, Globe, Clock,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────── */
const services = [
  {
    icon: Plane,
    title: "Flights",
    short: "Fly anywhere for less",
    description: "Search 200+ airlines in real time. Domestic & international fares with instant confirmation.",
    color: "#3B82F6",
    stat: "200+ Airlines",
    statIcon: Globe,
    size: "large",   // spans 2 cols on desktop
  },
  {
    icon: Hotel,
    title: "Hotels",
    short: "Stay in style",
    description: "4,000+ handpicked properties with verified reviews and exclusive member rates.",
    color: "#10B981",
    stat: "4000+ Properties",
    statIcon: Sparkles,
    size: "normal",
  },
  {
    icon: Shield,
    title: "Insurance",
    short: "Travel worry-free",
    description: "Full coverage for medical, cancellations, baggage loss, and delays.",
    color: "#F59E0B",
    stat: "Full Coverage",
    statIcon: Shield,
    size: "normal",
  },
  {
    icon: Palmtree,
    title: "Holidays",
    short: "Dream getaways",
    description: "All-inclusive curated packages — flights, hotels & experiences bundled at unbeatable prices.",
    color: "#F97316",
    stat: "150+ Packages",
    statIcon: Sparkles,
    size: "large",   // spans 2 cols on desktop
  },
  {
    icon: Smartphone,
    title: "e-SIM",
    short: "Stay connected",
    description: "Instant data in 190+ countries. No roaming charges, no physical SIM needed.",
    color: "#8B5CF6",
    stat: "190+ Countries",
    statIcon: Globe,
    size: "normal",
  },
  {
    icon: Stamp,
    title: "Visa",
    short: "Hassle-free entry",
    description: "Expert processing for 50+ countries with document checks and fast turnaround.",
    color: "#EF4444",
    stat: "50+ Countries",
    statIcon: Clock,
    size: "normal",
  },
  {
    icon: Armchair,
    title: "Lounges",
    short: "Premium comfort",
    description: "Access exclusive airport lounges worldwide. Dine, relax, and arrive refreshed.",
    color: "#0EA5E9",
    stat: "1200+ Lounges",
    statIcon: Sparkles,
    size: "normal",
  },
];

/* ─── Tilt card wrapper ─────────────────────────────────── */
const TiltCard = ({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [4, -4]);
  const rotateY = useTransform(x, [-60, 60], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Service Card ─────────────────────────────────────── */
const ServiceCard = ({
  service,
  index,
  inView,
  isLarge = false,
}: {
  service: typeof services[0];
  index: number;
  inView: boolean;
  isLarge?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const StatIcon = service.statIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={isLarge ? "sm:col-span-2" : ""}
    >
      <TiltCard className="h-full">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative h-full rounded-2xl sm:rounded-3xl border border-border bg-background
                     overflow-hidden cursor-pointer group transition-all duration-500
                     hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-transparent"
          style={{ minHeight: isLarge ? 220 : 200 }}
        >
          {/* Animated gradient wash on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${service.color}12 0%, transparent 65%)`,
            }}
          />

          {/* Colored left border strip */}
          <motion.div
            animate={{ scaleY: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full origin-center"
            style={{ background: service.color }}
          />

          <div className={`relative flex flex-col h-full ${isLarge ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>

            {/* Top row: icon + stat badge */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              {/* Icon */}
              <motion.div
                animate={{
                  scale: hovered ? 1.08 : 1,
                  rotate: hovered ? -6 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`${isLarge ? "w-14 h-14 sm:w-16 sm:h-16" : "w-12 h-12 sm:w-13 sm:h-13"} 
                            rounded-2xl flex items-center justify-center shrink-0`}
                style={{ background: `${service.color}15` }}
              >
                <service.icon
                  size={isLarge ? 26 : 22}
                  style={{ color: service.color }}
                />
              </motion.div>

              {/* Stat badge */}
              <motion.div
                animate={{ y: hovered ? -2 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold"
                style={{
                  background: `${service.color}0a`,
                  borderColor: `${service.color}20`,
                  color: service.color,
                }}
              >
                <StatIcon size={11} />
                {service.stat}
              </motion.div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3
                className={`font-black text-foreground tracking-tight mb-1.5 ${isLarge ? "text-xl sm:text-2xl" : "text-lg sm:text-[1.2rem]"
                  }`}
              >
                {service.title}
              </h3>
              <p className="text-xs font-semibold mb-2" style={{ color: service.color }}>
                {service.short}
              </p>
              <p className={`text-muted-foreground leading-relaxed ${isLarge ? "text-sm sm:text-[15px]" : "text-xs sm:text-sm"}`}>
                {service.description}
              </p>
            </div>

            {/* Bottom CTA */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
              transition={{ duration: 0.25 }}
              className="mt-4 flex items-center gap-1.5 text-xs font-bold"
              style={{ color: service.color }}
            >
              Explore
              <motion.span
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ArrowRight size={12} />
              </motion.span>
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

/* ─── Main Section ─────────────────────────────────────── */
const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Split: larges and normals to build bento rows
  const large = services.filter(s => s.size === "large");
  const normals = services.filter(s => s.size !== "large");

  return (
    <section
      id="services"
      className="py-20 bg-muted/20 overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary/50 rounded-full" />
                <span className="text-primary font-bold text-xs uppercase tracking-[0.18em]">
                  Our Services
                </span>
              </div>
              <h2
                className="font-extrabold leading-tight tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
              >
                Everything You Need to{" "}
                <span className="gradient-text">Travel Smart</span>
              </h2>
            </div>
          </div>

          {/* Service count pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            {services.map((s) => (
              <span
                key={s.title}
                className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border"
                style={{
                  background: `${s.color}08`,
                  borderColor: `${s.color}20`,
                  color: s.color,
                }}
              >
                <s.icon size={11} />
                {s.title}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Bento Grid ─────────────────────────────────── */}
        {/* Row 1: 1 large (2-col) + 2 normal = 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Large: Flights */}
          <ServiceCard service={services[0]} index={0} inView={inView} isLarge />
          {/* Normal: Hotels */}
          <ServiceCard service={services[1]} index={1} inView={inView} />
          {/* Normal: Insurance */}
          <ServiceCard service={services[2]} index={2} inView={inView} />
        </div>

        {/* Row 2: 2 normal + 1 large (2-col) = 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Normal: e-SIM */}
          <ServiceCard service={services[4]} index={4} inView={inView} />
          {/* Normal: Visa */}
          <ServiceCard service={services[5]} index={5} inView={inView} />
          {/* Large: Holidays */}
          <ServiceCard service={services[3]} index={3} inView={inView} isLarge />
        </div>

        {/* Row 3: 1 normal + CTA card = fills remaining */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Normal: Lounges */}
          <ServiceCard service={services[6]} index={6} inView={inView} />

          {/* CTA Card — spans 3 cols on lg */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 7 * 0.07 }}
            className="sm:col-span-1 lg:col-span-3"
          >
            <div
              className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer
                         flex flex-col sm:flex-row items-center justify-between
                         px-6 sm:px-10 py-8 sm:py-0 sm:h-[200px] gap-6 sm:gap-0
                         transition-all duration-300 hover:shadow-[0_20px_60px_hsl(var(--secondary)/0.3)]"
              style={{
                background:
                  "linear-gradient(120deg, hsl(var(--secondary)), hsl(var(--secondary)/0.75))",
              }}
            >
              {/* Dot texture */}
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              {/* Diagonal lines */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Left: text */}
              <div className="relative z-10 text-center sm:text-left">
                <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                  Ready to travel?
                </div>
                <div className="text-white font-black text-2xl sm:text-3xl leading-tight">
                  Plan your perfect trip today
                </div>
                <div className="text-white/70 text-sm mt-2">
                  Flights + Hotels + Insurance in one booking
                </div>
              </div>

              {/* Right: CTA button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative z-10 shrink-0 flex items-center gap-2.5 px-6 sm:px-8 py-3.5
                           rounded-2xl bg-white text-primary font-black text-sm sm:text-base
                           shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all"
                onClick={() => window.open("https://onlinesavaari.com", "_blank")}

              >
                Get Started
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;