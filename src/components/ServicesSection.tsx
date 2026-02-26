import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Globe, Smartphone, Brain, Palette, Megaphone, LayoutDashboard, Code2,
  ChevronRight, ArrowUpRight, Dot,
} from "lucide-react";

const SERVICES = [
  {
    num: "01", icon: Globe, title: "Web Development",
    tagline: "React · Next.js · Laravel · Node.js",
    color: "#3B82F6",
    description: "We build blazing-fast websites, SaaS platforms, e-commerce stores, and web portals using the latest stacks. Clean architecture, pixel-perfect UI, and rock-solid backend APIs.",
    stack: ["React", "Next.js", "Node.js", "Laravel", "PostgreSQL", "TypeScript"],
    deliverables: ["Custom Website", "E-Commerce Store", "Web Portal", "REST / GraphQL API"],
    timeline: "2–6 weeks", from: "₹15,000",
  },
  {
    num: "02", icon: Smartphone, title: "Mobile App Development",
    tagline: "Flutter · React Native · iOS · Android",
    color: "#10B981",
    description: "Cross-platform and native mobile apps that feel at home on every device. From MVP to full launch — UI design, development, Play Store & App Store publishing included.",
    stack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "REST APIs"],
    deliverables: ["iOS App", "Android App", "Cross-Platform App", "App Store Launch"],
    timeline: "4–10 weeks", from: "₹25,000",
  },
  {
    num: "03", icon: Brain, title: "AI / ML Solutions",
    tagline: "Python · TensorFlow · OpenAI · LangChain",
    color: "#8B5CF6",
    description: "Custom AI models, intelligent chatbots, recommendation engines, LLM integrations, and predictive analytics. We turn your data into decisions and workflows into automation.",
    stack: ["Python", "TensorFlow", "OpenAI", "LangChain", "FastAPI", "Pandas"],
    deliverables: ["AI Chatbot", "ML Model", "Data Pipeline", "LLM Integration"],
    timeline: "6–12 weeks", from: "₹40,000",
  },
  {
    num: "04", icon: LayoutDashboard, title: "UI / UX Design",
    tagline: "Figma · Wireframes · Prototyping · Design Systems",
    color: "#0EA5E9",
    description: "User research, information architecture, wireframes, interactive prototypes, and production-ready UI components. Interfaces that users love and devs can build without friction.",
    stack: ["Figma", "FigJam", "Protopie", "Zeplin", "Design Tokens"],
    deliverables: ["UI Design", "UX Audit", "Interactive Prototype", "Design System"],
    timeline: "1–4 weeks", from: "₹10,000",
  },
  {
    num: "05", icon: Palette, title: "Graphics Design",
    tagline: "Brand Identity · Social Media · Motion · Print",
    color: "#EF4444",
    description: "Logo design, full brand identity kits, social media creatives, pitch decks, brochures, and motion graphics. Visual storytelling that makes your brand impossible to ignore.",
    stack: ["Illustrator", "Photoshop", "After Effects", "InDesign", "Canva Pro"],
    deliverables: ["Logo & Brand Kit", "Social Media Pack", "Pitch Deck", "Motion Graphics"],
    timeline: "1–3 weeks", from: "₹5,000",
  },
  {
    num: "06", icon: Megaphone, title: "Digital Marketing",
    tagline: "SEO · Google Ads · Social Media · Email",
    color: "#F59E0B",
    description: "Data-driven campaigns that deliver real ROI — organic traffic growth, qualified lead generation, and measurable conversions. SEO, PPC, social ads, and email under one strategy.",
    stack: ["Google Ads", "Meta Ads", "Ahrefs", "SEMrush", "Mailchimp", "GA4"],
    deliverables: ["SEO Audit & Execution", "Ad Campaigns", "Content Calendar", "Monthly Reports"],
    timeline: "Ongoing", from: "₹8,000/mo",
  },
  {
    num: "07", icon: Code2, title: "CRM & ERP Systems",
    tagline: "Custom · Scalable · Cloud-Ready · Role-Based",
    color: "#F97316",
    description: "Tailor-made CRM, ERP, and internal tools built to your exact workflow. Replace spreadsheets with smart dashboards, automated pipelines, and granular access control.",
    stack: ["React", "Django", "MySQL", "AWS", "Docker", "Redis"],
    deliverables: ["CRM System", "ERP Module", "Admin Dashboard", "API Integration"],
    timeline: "6–16 weeks", from: "₹35,000",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding bg-background overflow-hidden relative" ref={ref}>
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, hsl(var(--foreground)/0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container mx-auto relative">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary/50" />
                <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">// services</span>
              </div>
              <h2 className="font-extrabold leading-tight tracking-tight text-foreground"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
                What We Build &{" "}
                <span className="gradient-text">Deliver</span>
              </h2>
            </div>
            
          </div>
        </motion.div>

        {/* Two-column editorial grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            const isHov = hovered === i;
            return (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)}
                className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                  isOpen ? "md:col-span-2" : ""
                }`}
                style={{
                  borderColor: isOpen ? `${s.color}35` : isHov ? `${s.color}20` : "hsl(var(--border)/0.35)",
                  background: isOpen ? `${s.color}05` : "hsl(var(--muted)/0.12)",
                  boxShadow: isOpen ? `0 8px 32px ${s.color}12` : "none",
                }}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {/* Card header — always visible */}
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Number */}
                  <span className="text-[12px] font-black font-mono shrink-0 w-6 transition-colors"
                    style={{ color: isOpen ? s.color : "hsl(var(--muted-foreground)/0.35)" }}>
                    {s.num}
                  </span>

                  {/* Colored icon box */}
                  <motion.div
                    animate={{ scale: isHov ? 1.08 : 1 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{ background: `${s.color}${isOpen ? "20" : "12"}` }}>
                    <s.icon size={18} style={{ color: s.color }} />
                  </motion.div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                      <span className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? "text-foreground" : "text-foreground/80"}`}>
                        {s.title}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground/60 hidden sm:block truncate">{s.tagline}</span>
                    </div>
                  </div>

                  {/* Price + chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold hidden sm:block" style={{ color: s.color }}>from {s.from}</span>
                    <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded detail — full-width when open */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 border-t border-border/20 grid sm:grid-cols-[1fr_1fr_auto] gap-6 items-start">
                        {/* Description */}
                        <div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {s.stack.map(t => (
                              <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-md border font-mono"
                                style={{ background: `${s.color}0a`, borderColor: `${s.color}20`, color: s.color }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground font-mono block mb-2">Deliverables</span>
                          <div className="space-y-1.5">
                            {s.deliverables.map(d => (
                              <div key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Dot size={16} style={{ color: s.color }} className="shrink-0" />{d}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Meta + CTA */}
                        <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
                          <div>
                            <div className="text-[10px] text-muted-foreground font-mono">Timeline</div>
                            <div className="text-sm font-bold text-foreground">{s.timeline}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground font-mono">Starting from</div>
                            <div className="text-base font-black" style={{ color: s.color }}>{s.from}</div>
                          </div>
                          <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all hover:opacity-80"
                            style={{ background: `${s.color}18`, color: s.color }}>
                            Get Quote <ArrowUpRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}