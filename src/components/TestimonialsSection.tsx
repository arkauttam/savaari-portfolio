import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, MapPin, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Frequent Flyer",
    location: "Mumbai",
    avatar: "#3B82F6",
    initial: "R",
    content: "Online Savaari made booking my international flight and hotel so easy. The prices were unbeatable and the e-SIM feature saved me from expensive roaming charges!",
    rating: 5,
    trip: "Mumbai → London",
    verified: true,
  },
  {
    name: "Ananya Singh",
    role: "Business Traveler",
    location: "Delhi",
    avatar: "#10B981",
    initial: "A",
    content: "The visa assistance service is phenomenal. Got my UK visa processed without any hassle. The airport lounge access was a cherry on top!",
    rating: 5,
    trip: "Delhi → Dubai",
    verified: true,
  },
  {
    name: "Vikram Desai",
    role: "Holiday Planner",
    location: "Bangalore",
    avatar: "#F59E0B",
    initial: "V",
    content: "Booked a complete holiday package for our family — flights, hotels, insurance, everything in one place. The customer support team was incredibly helpful throughout.",
    rating: 5,
    trip: "Bangalore → Bali",
    verified: true,
  },
  {
    name: "Priya Nair",
    role: "Solo Traveler",
    location: "Chennai",
    avatar: "#8B5CF6",
    initial: "P",
    content: "As a solo traveler, having travel insurance and an e-SIM ready before landing gives me so much peace of mind. Online Savaari is my go-to travel companion now.",
    rating: 5,
    trip: "Chennai → Bangkok",
    verified: true,
  },
  {
    name: "Karan Sharma",
    role: "Adventure Traveler",
    location: "Pune",
    avatar: "#EF4444",
    initial: "K",
    content: "The holiday package to Maldives was absolutely perfect. Every detail was taken care of — from the resort to island transfers. Best travel platform bar none!",
    rating: 5,
    trip: "Pune → Maldives",
    verified: true,
  },
  {
    name: "Meera Iyer",
    role: "Honeymoon Planner",
    location: "Hyderabad",
    avatar: "#F97316",
    initial: "M",
    content: "Planned our entire honeymoon in under 30 minutes. Flights, beachside resort, transfers — everything was seamless. Couldn't have asked for more!",
    rating: 5,
    trip: "Hyderabad → Santorini",
    verified: true,
  },
];

const StarRow = ({ count, size = 14 }: { count: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < count ? "fill-amber-400 text-amber-400" : "text-border fill-border"}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary/50 rounded-full" />
              <span className="text-primary font-bold text-xs uppercase tracking-[0.18em]">Testimonials</span>
            </div>
            <h2
              className="font-extrabold leading-tight tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Loved by{" "}
              <span className="gradient-text">2M+ Travelers</span>
            </h2>
          </div>
          {/* Overall rating badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-muted/30 shrink-0">
            <div>
              <div className="text-3xl font-black text-foreground">4.9</div>
              <StarRow count={5} size={12} />
              <div className="text-[11px] text-muted-foreground mt-1">200k+ reviews</div>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="space-y-1.5">
              {[5,4,3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-muted-foreground w-2">{s}</span>
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: s === 5 ? "88%" : s === 4 ? "9%" : "3%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Featured (auto-cycling large card) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl border border-primary/15 bg-primary/[0.03] overflow-hidden mb-6 p-8 sm:p-10"
          style={{ boxShadow: "0 0 0 1px hsl(var(--primary)/0.1), var(--shadow-sm)" }}
        >
          {/* Accent top */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), transparent)" }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              {/* Quote */}
              <div className="flex-1">
                <Quote size={28} className="text-primary/20 mb-4" />
                <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
                  "{testimonials[active].content}"
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base"
                      style={{ background: testimonials[active].avatar }}
                    >
                      {testimonials[active].initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-foreground">{testimonials[active].name}</span>
                        {testimonials[active].verified && (
                          <CheckCircle2 size={13} className="text-primary" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{testimonials[active].role}</span>
                    </div>
                  </div>
                  <StarRow count={testimonials[active].rating} />
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={10} />
                    {testimonials[active].trip}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full h-1.5"
                style={{
                  width: i === active ? 24 : 6,
                  background: i === active ? "hsl(var(--primary))" : "hsl(var(--border))",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Grid cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              onClick={() => setActive(i)}
              className={`group cursor-pointer p-5 rounded-3xl border transition-all duration-300 ${
                i === active
                  ? "border-primary/25 bg-primary/[0.04] shadow-sm"
                  : "border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/10"
              }`}
              style={{ boxShadow: i === active ? "var(--shadow-sm)" : "var(--shadow-xs)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: t.avatar }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-foreground">{t.name}</span>
                      {t.verified && <CheckCircle2 size={11} className="text-primary" />}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{t.role}</span>
                  </div>
                </div>
                <StarRow count={t.rating} size={11} />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{t.content}</p>

              <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground/70">
                <MapPin size={9} />
                {t.trip}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;