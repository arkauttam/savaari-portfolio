import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Plane, Hotel, Shield, Wifi, MapPin, CreditCard,
  Bell, Zap, Globe, Sparkles, ArrowRight,
} from "lucide-react";

const platformFeatures = [
  { icon: Zap,      title: "Instant Search",    desc: "Real-time fares from 200+ airlines in milliseconds.",  color: "#F59E0B" },
  { icon: Globe,    title: "Global Coverage",   desc: "Hotels, flights & packages in 150+ countries.",        color: "#3B82F6" },
  { icon: Shield,   title: "Secure Checkout",   desc: "256-bit SSL. PCI-DSS compliant payment gateway.",      color: "#10B981" },
  { icon: Sparkles, title: "AI Recommendations",desc: "Personalized trip suggestions powered by smart tech.", color: "#8B5CF6" },
];

const mockItems = [
  { icon: Plane,       label: "Mumbai → London",   sub: "2 adults · Economy",    badge: "₹32,499", badgeColor: "#3B82F6" },
  { icon: Hotel,       label: "The Grand Hyatt",   sub: "3 nights · Deluxe Room",badge: "₹18,200", badgeColor: "#10B981" },
  { icon: MapPin,      label: "Live Tracking",     sub: "Flight AI-304 on time", badge: "On Time",  badgeColor: "#10B981" },
  { icon: CreditCard,  label: "Payment Complete",  sub: "HDFC •••• 4521",        badge: "Paid",     badgeColor: "#8B5CF6" },
  { icon: Bell,        label: "Price Drop Alert",  sub: "Mumbai → Dubai ↓18%",   badge: "Save ₹4k", badgeColor: "#F59E0B" },
];

const TechnologySection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="technology" className="py-20 bg-muted/20 overflow-hidden" ref={ref}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Copy + features ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/50 rounded-full" />
              <span className="text-primary font-bold text-xs uppercase tracking-[0.18em]">Our Platform</span>
            </div>
            <h2
              className="font-extrabold leading-tight tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Powered by{" "}
              <span className="gradient-text">Smart Technology</span>
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed max-w-lg">
              Our platform uses intelligent search, real-time data, and seamless integrations
              to make travel planning effortless — from first search to final boarding.
            </p>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 mt-8">
              {platformFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.09 }}
                  className="group flex items-start gap-3.5 p-4 rounded-2xl border border-border/50 bg-background hover:border-primary/15 hover:shadow-sm transition-all duration-300"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${f.color}14` }}
                  >
                    <f.icon size={16} style={{ color: f.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{f.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#services"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300 group"
            >
              See all platform features
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>

          {/* ── RIGHT: Animated app mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-md relative"
            >
              {/* Glow */}
              <div
                className="absolute inset-6 rounded-3xl blur-2xl opacity-20 pointer-events-none"
                style={{ background: "hsl(var(--primary))" }}
              />

              <div
                className="relative rounded-3xl border border-border/50 bg-background overflow-hidden"
                style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.1), 0 0 0 1px hsl(var(--border)/0.5)" }}
              >
                {/* Browser chrome */}
                <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                  </div>
                  <div className="flex-1 h-6 rounded-lg bg-muted/70 flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                    <div className="text-[10px] text-muted-foreground font-medium">onlinesavaari.com</div>
                  </div>
                </div>

                {/* App header bar */}
                <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between bg-primary/[0.03]">
                  <span className="text-sm font-extrabold text-foreground">My Bookings</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    Live Dashboard
                  </span>
                </div>

                {/* Mock items */}
                <div className="p-4 space-y-2.5">
                  {mockItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${item.badgeColor}12` }}
                        >
                          <item.icon size={15} style={{ color: item.badgeColor }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{item.label}</div>
                          <div className="text-[11px] text-muted-foreground">{item.sub}</div>
                        </div>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-black"
                        style={{ background: `${item.badgeColor}14`, color: item.badgeColor }}
                      >
                        {item.badge}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="px-4 pb-4">
                  <div
                    className="w-full py-3 rounded-2xl text-center text-sm font-bold text-primary-foreground"
                    style={{ background: "hsl(var(--primary))", boxShadow: "0 4px 16px hsl(var(--primary)/0.3)" }}
                  >
                    + Add New Booking
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;