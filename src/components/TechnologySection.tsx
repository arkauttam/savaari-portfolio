import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Globe, Smartphone, Brain, Layers, Database, Cloud,
  Zap, Shield, GitBranch, Cpu, ArrowRight, CheckCircle2,
} from "lucide-react";

const CATEGORIES = [
  { key: "frontend",  label: "Frontend",       color: "#3B82F6", icon: Globe,      techs: ["React 18", "Next.js 14", "Vue 3", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { key: "backend",   label: "Backend",        color: "#10B981", icon: Layers,     techs: ["Node.js", "Django", "Laravel", "FastAPI", "Express", "GraphQL"] },
  { key: "mobile",    label: "Mobile",         color: "#8B5CF6", icon: Smartphone, techs: ["Flutter", "React Native", "Swift", "Kotlin", "Expo", "Firebase"] },
  { key: "ai",        label: "AI / ML",        color: "#F59E0B", icon: Brain,      techs: ["Python", "TensorFlow", "OpenAI GPT-4", "LangChain", "Pandas", "Scikit-learn"] },
  { key: "database",  label: "Database",       color: "#EF4444", icon: Database,   techs: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase"] },
  { key: "cloud",     label: "Cloud & DevOps", color: "#0EA5E9", icon: Cloud,      techs: ["AWS", "Vercel", "Docker", "GitHub Actions", "Nginx", "Cloudflare"] },
];

const CODE_SNIPPETS: Record<string, { lang: string; lines: { text: string; type: string }[] }> = {
  frontend: { lang: "tsx", lines: [
    { text: "// Next.js 14 · React 18 · TypeScript", type: "comment" },
    { text: "import { useState } from 'react';",     type: "import"  },
    { text: "import { motion } from 'framer-motion';",type: "import" },
    { text: "",                                       type: "blank"   },
    { text: "export default function App() {",        type: "keyword" },
    { text: "  const [data, setData] = useState(null);", type: "code"},
    { text: "  // Blazing-fast · SEO-ready · Type-safe", type: "comment"},
    { text: "  return <motion.div>✨ Built by OS tech labs</motion.div>", type: "jsx"},
    { text: "}",                                      type: "keyword" },
  ]},
  backend: { lang: "ts", lines: [
    { text: "// Node.js · Express · TypeScript",      type: "comment" },
    { text: "import express from 'express';",         type: "import"  },
    { text: "const app = express();",                 type: "code"    },
    { text: "",                                       type: "blank"   },
    { text: "app.get('/api/projects', async (req, res) => {", type: "keyword"},
    { text: "  const data = await db.projects.findAll();", type: "code"},
    { text: "  res.json({ data, status: 200 });",    type: "code"    },
    { text: "});",                                    type: "keyword" },
  ]},
  mobile: { lang: "dart", lines: [
    { text: "// Flutter · Cross-Platform · Production", type: "comment"},
    { text: "class HomeScreen extends StatefulWidget {", type: "keyword"},
    { text: "  @override",                            type: "decorator"},
    { text: "  State<HomeScreen> createState() {",   type: "code"    },
    { text: "    return _HomeScreenState();",         type: "code"    },
    { text: "  }",                                   type: "code"    },
    { text: "}",                                     type: "keyword" },
    { text: "// iOS + Android from one codebase 🚀", type: "comment" },
  ]},
  ai: { lang: "py", lines: [
    { text: "# Python · LangChain · OpenAI GPT-4",   type: "comment" },
    { text: "from langchain.chat_models import ChatOpenAI", type: "import"},
    { text: "from langchain.chains import LLMChain", type: "import"  },
    { text: "",                                       type: "blank"   },
    { text: "llm = ChatOpenAI(model='gpt-4-turbo')", type: "code"    },
    { text: "chain = LLMChain(llm=llm, prompt=tpl)", type: "code"    },
    { text: "result = chain.run(input='query')",     type: "code"    },
    { text: "# → Production-ready AI 🤖",            type: "comment" },
  ]},
  database: { lang: "sql", lines: [
    { text: "-- PostgreSQL · Optimised queries",     type: "comment" },
    { text: "SELECT p.id, p.name, COUNT(o.id)",      type: "keyword" },
    { text: "FROM projects p",                       type: "code"    },
    { text: "LEFT JOIN orders o ON o.project_id = p.id", type: "code"},
    { text: "WHERE p.status = 'active'",             type: "code"    },
    { text: "GROUP BY p.id",                         type: "code"    },
    { text: "ORDER BY orders DESC;",                 type: "code"    },
    { text: "-- Indexed · <2ms query time",          type: "comment" },
  ]},
  cloud: { lang: "yaml", lines: [
    { text: "# GitHub Actions · CI/CD Pipeline",     type: "comment" },
    { text: "name: Deploy to Production",            type: "code"    },
    { text: "on: [push: main]",                      type: "keyword" },
    { text: "jobs:",                                 type: "keyword" },
    { text: "  deploy:",                             type: "code"    },
    { text: "    runs-on: ubuntu-latest",            type: "code"    },
    { text: "    steps:",                            type: "code"    },
    { text: "      - run: docker build && aws deploy", type: "string"},
  ]},
};

const typeColor = (t: string) => ({
  comment:   "text-slate-500 italic",
  import:    "text-violet-400",
  keyword:   "text-blue-400",
  code:      "text-slate-300",
  string:    "text-emerald-400",
  jsx:       "text-cyan-400",
  decorator: "text-amber-400",
  blank:     "",
})[t] ?? "text-slate-400";

const FEATURES = [
  { icon: Zap,       color: "#F59E0B", title: "Agile 2-Week Sprints",    desc: "Working features shipped every fortnight."        },
  { icon: Shield,    color: "#10B981", title: "Security by Default",     desc: "OWASP top-10 coverage on every project."          },
  { icon: GitBranch, color: "#3B82F6", title: "CI/CD Automation",       desc: "Auto-tested, auto-deployed. Always ship-ready."   },
  { icon: Cpu,       color: "#8B5CF6", title: "Performance Benchmarked", desc: "Lighthouse 90+, sub-2s loads, 99.9% uptime."     },
];

export default function TechnologySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCat, setActiveCat] = useState("frontend");
  const cat = CATEGORIES.find(c => c.key === activeCat)!;
  const snippet = CODE_SNIPPETS[activeCat];

  return (
    <section id="technology" className="pt-20 bg-background overflow-hidden relative" ref={ref}>
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, hsl(var(--foreground)/0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container mx-auto relative">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">// tech stack</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-extrabold leading-tight tracking-tight text-foreground"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              Built on{" "}<span className="gradient-text">Modern Technology</span>
            </h2>
           
          </div>
        </motion.div>

        {/* ── FULL-WIDTH stack matrix (top) ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setActiveCat(c.key)}
              className="p-4 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] group shadow-md"
              style={c.key === activeCat
                ? { borderColor: `${c.color}30`, background: `${c.color}08` }
                : { borderColor: "hsl(var(--border)/0.35)", background: "hsl(var(--muted)/0.12)" }
              }>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: `${c.color}18` }}>
                  <c.icon size={11} style={{ color: c.color }} />
                </div>
                <span className="text-[10px] font-black font-mono uppercase tracking-wider" style={{ color: c.color }}>{c.label}</span>
              </div>
              <div className="space-y-0.5">
                {c.techs.slice(0, 3).map(t => (
                  <div key={t} className="text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: c.color }} />{t}
                  </div>
                ))}
                {c.techs.length > 3 && <div className="text-[10px] font-mono text-muted-foreground/40">+{c.techs.length - 3} more</div>}
              </div>
            </button>
          ))}
        </motion.div>

        {/* ── Code window + right panel (two-col) ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT: animated code editor */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-8 blur-3xl opacity-[0.08] pointer-events-none rounded-3xl" style={{ background: cat.color }} />

                <div className="relative rounded-2xl overflow-hidden border border-border/40"
                  style={{ background: "hsl(222 47% 7%)", boxShadow: "0 24px 64px rgba(0,0,0,0.28)" }}>
                  {/* Chrome */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]"
                    style={{ background: "hsl(222 47% 10%)" }}>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        {["#ef4444","#f59e0b","#22c55e"].map(c => (
                          <div key={c} className="w-2.5 h-2.5 rounded-full opacity-70" style={{ background: c }} />
                        ))}
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">{activeCat}.{snippet.lang}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={10} style={{ color: "#10B981" }} />
                        <span className="font-mono text-[9px]" style={{ color: "#10B981" }}>0 errors</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch size={10} style={{ color: "#3B82F6" }} />
                        <span className="font-mono text-[9px]" style={{ color: "#3B82F6" }}>main</span>
                      </div>
                    </div>
                  </div>

                  {/* Code body */}
                  <div className="p-5 min-h-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.div key={activeCat}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }} className="space-y-[3px]">
                        {snippet.lines.map((l, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className={`flex items-start gap-4 font-mono text-[12px] leading-relaxed ${typeColor(l.type)}`}>
                            <span className="text-slate-700 select-none w-4 text-right shrink-0 mt-0.5 text-[10px]">
                              {l.type !== "blank" ? i + 1 : ""}
                            </span>
                            <span className="whitespace-pre">{l.text || "\u00A0"}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: category tabs + tech chips + features */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }} className="flex flex-col gap-5">

            {/* Active category header */}
            <div>
              <div className="text-[10px] font-black font-mono uppercase tracking-wider text-muted-foreground mb-2.5">Active Category</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button key={c.key} onClick={() => setActiveCat(c.key)}
                    className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 font-mono"
                    style={c.key === activeCat
                      ? { background: `${c.color}16`, borderColor: `${c.color}30`, color: c.color }
                      : { borderColor: "hsl(var(--border)/0.4)", color: "hsl(var(--muted-foreground))", background: "transparent" }
                    }>
                    <c.icon size={11} />{c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech chips */}
            <AnimatePresence mode="wait">
              <motion.div key={activeCat}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} className="flex flex-wrap gap-2">
                {cat.techs.map((t, i) => (
                  <motion.span key={t} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border font-mono"
                    style={{ background: `${cat.color}10`, borderColor: `${cat.color}25`, color: cat.color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />{t}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border
                   border-primary/15 bg-muted/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${f.color}12` }}>
                    <f.icon size={14} style={{ color: f.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{f.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a href="#contact" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all group">
              Start your project
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}