import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, MapPin, Plane, Star, Users, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickStats = [
  { icon: Users, value: "2M+",  label: "Travelers" },
  { icon: Globe, value: "150+", label: "Destinations" },
  { icon: Star,  value: "4.9★", label: "Rated" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const floatingBadges = [
  { icon: Plane,   text: "Flight to Maldives booked",   sub: "2 min ago · ₹45,999",  color: "#3B82F6", pos: "top-8 left-8"   },
  { icon: MapPin,  text: "Dubai package confirmed",      sub: "5 min ago · ₹38,999",  color: "#10B981", pos: "top-8 right-8"  },
  { icon: Star,    text: "5★ review from Rahul M.",      sub: "Bali Holiday Package",  color: "#F59E0B", pos: "bottom-8 left-8" },
];

const CTASection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-padding bg-muted/20 overflow-hidden" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.75) 100%)",
            boxShadow: "0 32px 80px hsl(var(--primary)/0.35), 0 0 0 1px hsl(var(--primary)/0.2)",
          }}
        >
          {/* ── Background textures ── */}
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Diagonal lines */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 40px)",
            }}
          />
          {/* Large radial glow */}
          <div
            className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 60%)" }}
          />
          <div
            className="absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 60%)" }}
          />

          {/* ── Floating notification badges ── */}
          {floatingBadges.map((b, i) => (
            <motion.div
              key={b.text}
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute ${b.pos} hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 z-10`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${b.color}30` }}
              >
                <b.icon size={14} style={{ color: b.color }} />
              </div>
              <div>
                <div className="text-[12px] font-bold text-white leading-tight">{b.text}</div>
                <div className="text-[10px] text-white/70">{b.sub}</div>
              </div>
            </motion.div>
          ))}

          {/* ── Main content ── */}
          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-16 sm:py-20 flex flex-col items-center text-center">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/15 border border-white/20"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-white"
              />
              <span className="text-white/90 text-xs font-bold tracking-widest uppercase">
                Start Your Journey Today
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Ready to Explore
              <br />
              the World?
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32 }}
              className="mt-5 text-white/80 text-[15px] max-w-lg leading-relaxed"
            >
              Join over 2 million travelers who trust OnlineSavaari for flights, hotels, visas,
              insurance, and complete holiday packages — all in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42 }}
              className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg group">
                Book Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </button>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white/15 border border-white/25 text-white font-bold text-sm hover:bg-white/25 transition-all duration-200"
              >
                <Phone size={15} />
                Call Us: +91 98765 43210
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.52 }}
              className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-5 border-t border-white/15 pt-10 w-full max-w-xl"
            >
              {quickStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex flex-col items-center gap-1"
                >
                  <s.icon size={16} className="text-white/50 mb-0.5" />
                  <span className="text-2xl font-black text-white tracking-tight">{s.value}</span>
                  <span className="text-xs text-white/60 font-medium">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;