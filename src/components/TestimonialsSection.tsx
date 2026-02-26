import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, CheckCircle2, TrendingUp, ArrowLeft, ArrowRight, Code2, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",    role: "Founder",        company: "FoodRush India",
    color: "#3B82F6", init: "A",
    service: "Mobile App + Web Platform", serviceColor: "#3B82F6",
    metric: "8 wks · Full stack",
    content: "OS tech labs built our entire food delivery platform — app, admin panel, and live rider tracking — in 8 weeks. The code quality and architecture exceeded what any agency had promised us.",
    rating: 5,
  },
  {
    name: "Sneha Banerjee", role: "CEO",             company: "StyleVibe Fashion",
    color: "#10B981", init: "S",
    service: "UI/UX + E-Commerce Store", serviceColor: "#10B981",
    metric: "3× sales in month 1",
    content: "Complete rebrand + e-commerce site. Pixel-perfect UI, full brand kit, blazing-fast store. Sales tripled within the first month. Real results, not promises.",
    rating: 5,
  },
  {
    name: "Rohit Das",      role: "CTO",             company: "LendSmart Finance",
    color: "#8B5CF6", init: "R",
    service: "AI / ML Development", serviceColor: "#8B5CF6",
    metric: "94% model accuracy",
    content: "We needed an AI credit-scoring module with 90%+ accuracy integrated into our existing stack. OS tech labs's ML team shipped a production-ready model in 6 weeks. Exceptional technical depth.",
    rating: 5,
  },
  {
    name: "Priya Nair",     role: "Marketing Head",  company: "GreenLeaf Organics",
    color: "#F59E0B", init: "P",
    service: "Digital Marketing & SEO", serviceColor: "#F59E0B",
    metric: "60% lower cost-per-lead",
    content: "Our Google Ads were burning cash. OS tech labs restructured our entire digital strategy in two weeks. Cost-per-lead dropped 60% and organic traffic doubled in 3 months.",
    rating: 5,
  },
  {
    name: "Vikram Singh",   role: "Director",        company: "BuildRight Infra",
    color: "#EF4444", init: "V",
    service: "Custom CRM System", serviceColor: "#EF4444",
    metric: "200+ projects managed",
    content: "Custom CRM for 200+ construction projects across 5 teams. OS tech labs built exactly what we described — and added features we didn't even think to ask for.",
    rating: 5,
  },
  {
    name: "Meera Gupta",    role: "Founder",         company: "EduSpark EdTech",
    color: "#F97316", init: "M",
    service: "UI/UX Platform Redesign", serviceColor: "#F97316",
    metric: "4.8★ App Store (was 3.2)",
    content: "OS tech labs redesigned our learning platform's UX. Student engagement jumped 45% and our App Store rating went from 3.2 to 4.8 in two months. They understand product, not just pixels.",
    rating: 5,
  },
];

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => <Star key={i} size={11} className={i < n ? "fill-amber-400 text-amber-400" : "fill-border text-border"} />)}
  </div>
);

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="section-padding bg-muted/10 overflow-hidden relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="container mx-auto relative">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary/50" />
              <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">// client results</span>
            </div>
            <h2 className="font-extrabold leading-tight tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              What Clients Say{" "}
              <span className="gradient-text">After We Ship</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div>
              <div className="text-2xl font-black font-mono text-foreground leading-none">5.0</div>
              <Stars n={5} />
              <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">50+ reviews</div>
            </div>
            <div className="w-px h-10 bg-border/40" />
            <div className="flex gap-2">
              <button onClick={() => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-9 h-9 rounded-xl border border-border/40 flex items-center justify-center hover:bg-muted hover:border-primary/20 transition-all">
                <ArrowLeft size={14} />
              </button>
              <button onClick={() => setActive(a => (a + 1) % TESTIMONIALS.length)}
                className="w-9 h-9 rounded-xl border border-border/40 flex items-center justify-center hover:bg-muted hover:border-primary/20 transition-all">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Featured review ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border/30 overflow-hidden mb-4"
          style={{ background: "hsl(var(--background))" }}>
          <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${t.serviceColor}, transparent)` }} />

          <div className="p-7 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid lg:grid-cols-[1fr_160px] gap-8 items-start">
                <div>
                  <Quote size={22} className="text-primary/20 mb-4" />
                  <p className="text-base sm:text-xl font-medium text-foreground leading-relaxed max-w-2xl mb-6">
                    "{t.content}"
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm font-mono"
                        style={{ background: t.color }}>{t.init}</div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-foreground text-sm">{t.name}</span>
                          <CheckCircle2 size={12} className="text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground">{t.role} · {t.company}</span>
                      </div>
                    </div>
                    <Stars n={t.rating} />
                    <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg"
                      style={{ background: `${t.serviceColor}12`, color: t.serviceColor }}>
                      {t.service}
                    </span>
                  </div>
                </div>

                {/* Key metric card */}
                <div className="hidden lg:flex flex-col items-center justify-center p-5 rounded-xl border border-border/30 bg-muted/20 text-center gap-2">
                  <TrendingUp size={20} style={{ color: t.serviceColor }} />
                  <div className="text-base font-black text-foreground font-mono leading-tight">{t.metric}</div>
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Key Result</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full h-1.5"
                  style={{ width: i === active ? 20 : 5, background: i === active ? "hsl(var(--primary))" : "hsl(var(--border))" }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Review grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TESTIMONIALS.map((item, i) => (
            <motion.div key={item.name}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              onClick={() => setActive(i)}
              className={`cursor-pointer p-[18px] rounded-xl border transition-all duration-300 ${
                i === active
                  ? "border-primary/20 bg-primary/[0.04]"
                  : "border-border/30 bg-background hover:bg-muted/20 hover:border-primary/10"
              }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs font-mono"
                    style={{ background: item.color }}>{item.init}</div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-foreground">{item.name}</span>
                      <CheckCircle2 size={10} className="text-primary" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{item.company}</span>
                  </div>
                </div>
                <Stars n={item.rating} />
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">{item.content}</p>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono flex items-center gap-1" style={{ color: item.serviceColor }}>
                  <Code2 size={9} />{item.service}
                </span>
                <span className="text-[10px] font-black font-mono px-2 py-0.5 rounded-md"
                  style={{ background: `${item.serviceColor}10`, color: item.serviceColor }}>
                  {item.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}