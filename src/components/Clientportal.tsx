import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  LayoutDashboard, FolderGit2, Plus, ArrowLeft, ChevronRight,
  Activity, Zap, AlertCircle, GitBranch, CheckCircle2, Circle,
  FileText, Upload, CalendarDays, User, TrendingUp, Bell,
  Settings, LogOut, Search, X, Send, Loader2, ChevronDown,
  Clock, Eye, Shield, MessageSquare, ArrowUpRight, Menu,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */
type Status = "planning" | "in-progress" | "review" | "completed" | "on-hold";
type Priority = "low" | "medium" | "high" | "critical";
type ReqStatus = "pending" | "approved" | "in-dev" | "done" | "rejected";
type UpdType = "progress" | "milestone" | "issue" | "deployment";

interface Requirement {
  id: string; title: string; description: string;
  priority: Priority; status: ReqStatus;
  createdAt: string; createdBy: "client" | "team"; notes?: string;
}
interface Update {
  id: string; date: string; title: string; body: string;
  type: UpdType; author: string; pct?: number;
}
interface Project {
  id: string; name: string; type: string; color: string;
  status: Status; progress: number;
  startDate: string; deadline: string;
  description: string; budget: string; spent: string;
  pm: string; dev: string;
  requirements: Requirement[]; updates: Update[];
  stack: string[];
}

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */
const STATUS_CFG: Record<Status, { label: string; color: string; bg: string }> = {
  "planning": { label: "Planning", color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
  "in-progress": { label: "In Progress", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  "review": { label: "In Review", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  "completed": { label: "Completed", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  "on-hold": { label: "On Hold", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};
const PRIORITY_CFG: Record<Priority, { label: string; color: string }> = {
  low: { label: "Low", color: "#64748b" },
  medium: { label: "Medium", color: "#F59E0B" },
  high: { label: "High", color: "#3B82F6" },
  critical: { label: "Critical", color: "#EF4444" },
};
const REQ_STATUS_CFG: Record<ReqStatus, { label: string; color: string; Icon: React.ElementType }> = {
  pending: { label: "Pending", color: "#64748b", Icon: Circle },
  approved: { label: "Approved", color: "#F59E0B", Icon: CheckCircle2 },
  "in-dev": { label: "In Dev", color: "#3B82F6", Icon: GitBranch },
  done: { label: "Done", color: "#10B981", Icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "#EF4444", Icon: X },
};
const UPD_TYPE_CFG: Record<UpdType, { color: string; Icon: React.ElementType; label: string }> = {
  progress: { color: "#3B82F6", Icon: Activity, label: "Progress" },
  milestone: { color: "#10B981", Icon: Zap, label: "Milestone" },
  issue: { color: "#EF4444", Icon: AlertCircle, label: "Issue" },
  deployment: { color: "#8B5CF6", Icon: Upload, label: "Deployment" },
};
const PROJECT_TYPES = [
  "Web Development", "Mobile App", "AI / ML", "UI / UX Design", "CRM & ERP", "Digital Marketing",
];
const TYPE_COLORS: Record<string, string> = {
  "Web Development": "#3B82F6", "Mobile App": "#10B981", "AI / ML": "#8B5CF6",
  "UI / UX Design": "#0EA5E9", "CRM & ERP": "#F97316", "Digital Marketing": "#F59E0B",
};

/* ═══════════════════════════════════════════════════════════
   SEED DATA
═══════════════════════════════════════════════════════════ */
const SEED: Project[] = [
  {
    id: "p1", name: "FoodRush Web App", type: "Web Development", color: "#3B82F6",
    status: "in-progress", progress: 68, startDate: "2024-10-01", deadline: "2025-02-28",
    description: "Full-stack SaaS food ordering platform with real-time tracking, multi-vendor support, and an admin dashboard.",
    budget: "₹1,80,000", spent: "₹1,22,400", pm: "Saumya Roy", dev: "Arjun Das",
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    requirements: [
      { id: "r1", title: "Real-time order tracking map", description: "Live GPS map showing delivery agent location updating every 5 seconds.", priority: "high", status: "in-dev", createdAt: "2024-10-05", createdBy: "client" },
      { id: "r2", title: "Multi-vendor dashboard", description: "Each restaurant gets their own admin panel to manage menu, orders, and payouts.", priority: "critical", status: "done", createdAt: "2024-10-06", createdBy: "client" },
      { id: "r3", title: "Push notifications", description: "Order status push notifications via Firebase for both web and mobile.", priority: "medium", status: "approved", createdAt: "2024-10-10", createdBy: "client" },
      { id: "r4", title: "Promo code engine", description: "Admin can create time-limited promo codes with usage limits and discount types.", priority: "low", status: "pending", createdAt: "2024-11-01", createdBy: "client" },
    ],
    updates: [
      { id: "u1", date: "2025-01-14", title: "Sprint 7 complete — Checkout flow live", body: "Completed the full checkout flow including address selection, payment gateway integration (Razorpay), and order confirmation emails. All QA tests passed.", type: "milestone", author: "Arjun Das", pct: 68 },
      { id: "u2", date: "2025-01-07", title: "Map integration underway", body: "Integrated Google Maps SDK. Real-time tracking websocket server deployed. Currently polishing the driver-side location broadcast.", type: "progress", author: "Arjun Das", pct: 58 },
      { id: "u3", date: "2024-12-20", title: "Staging deployment", body: "First staging build deployed to AWS EC2. Client can access at staging.foodrush.weblogiic.dev", type: "deployment", author: "Saumya Roy", pct: 45 },
    ],
  },
  {
    id: "p2", name: "StyleVibe Mobile App", type: "Mobile App", color: "#10B981",
    status: "review", progress: 91, startDate: "2024-08-15", deadline: "2025-01-31",
    description: "Flutter-based fashion e-commerce app for iOS & Android with AR try-on, wishlist, and influencer affiliate system.",
    budget: "₹2,40,000", spent: "₹2,18,400", pm: "Priya Nair", dev: "Rohit Sen",
    stack: ["Flutter", "Firebase", "Dart", "AWS S3"],
    requirements: [
      { id: "r5", title: "AR try-on feature", description: "Use ARKit/ARCore to let users virtually try on glasses and accessories.", priority: "high", status: "done", createdAt: "2024-08-20", createdBy: "client" },
      { id: "r6", title: "Influencer affiliate links", description: "Influencers get unique referral links. Dashboard shows clicks, conversions, and commissions.", priority: "medium", status: "done", createdAt: "2024-08-22", createdBy: "team" },
    ],
    updates: [
      { id: "u4", date: "2025-01-18", title: "Final QA round complete", body: "All 47 test cases passed on both iOS (iPhone 15) and Android (Pixel 8). App is ready for store submission pending client sign-off.", type: "milestone", author: "Rohit Sen", pct: 91 },
      { id: "u5", date: "2025-01-10", title: "AR try-on shipped", body: "ARKit + ARCore try-on live on staging. Tested on 6 devices. Performance smooth at 60fps.", type: "milestone", author: "Rohit Sen", pct: 85 },
    ],
  },
  {
    id: "p3", name: "LendSmart AI Engine", type: "AI / ML", color: "#8B5CF6",
    status: "planning", progress: 12, startDate: "2025-01-20", deadline: "2025-06-30",
    description: "ML-powered credit risk assessment engine for a fintech startup. Processes loan applications and scores applicants.",
    budget: "₹3,60,000", spent: "₹43,200", pm: "Saumya Roy", dev: "Meera Gupta",
    stack: ["Python", "FastAPI", "TensorFlow", "PostgreSQL", "Docker"],
    requirements: [
      { id: "r8", title: "Credit scoring model", description: "Train an XGBoost model on historical loan data to predict default probability.", priority: "critical", status: "in-dev", createdAt: "2025-01-21", createdBy: "team" },
      { id: "r9", title: "Explainability (SHAP) dashboard", description: "SHAP values dashboard so underwriters can see why a score was assigned.", priority: "high", status: "pending", createdAt: "2025-01-21", createdBy: "client" },
    ],
    updates: [
      { id: "u6", date: "2025-01-22", title: "Project kickoff complete", body: "Discovery call done. Tech stack finalised. Dataset received from client (anonymised). EDA in progress.", type: "progress", author: "Meera Gupta", pct: 12 },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
const uid = () => Math.random().toString(36).slice(2, 9);
const now = () => new Date().toISOString().slice(0, 10);
const num = (s: string) => parseFloat(s.replace(/[₹,a-z\s]/gi, "")) || 0;

/* ═══════════════════════════════════════════════════════════
   SHARED UI ATOMS
═══════════════════════════════════════════════════════════ */

// Exact dark panel from About/WhyChooseUs sections
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background: "hsl(222 47% 8%)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }}>
      {children}
    </div>
  );
}
function PanelHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 px-5 py-3.5 border-b ${className}`}
      style={{ background: "hsl(222 47% 11%)", borderColor: "rgba(255,255,255,0.06)" }}>
      {children}
    </div>
  );
}

// Section label — matches "// about OS tech labs" pattern
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 bg-primary/50" />
      <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">{text}</span>
      <div className="h-px flex-1 bg-white/[0.04]" />
    </div>
  );
}

// Progress ring (same style as ServicesSection stat pill)
function Ring({ pct, color, size = 52 }: { pct: number; color: string; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
      <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }} />
    </svg>
  );
}

// Input — matches ContactSection fields
function Field({ label, icon: Icon, accent = "#3B82F6", textarea = false, ...props }:
  { label: string; icon: React.ElementType; accent?: string; textarea?: boolean }
  & (React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>)
) {
  const [focused, setFocused] = useState(false);
  const shared = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: "flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none font-mono",
    ...props,
  };
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-[0.18em] font-mono text-slate-500 mb-1.5">{label}</label>
      <div className="flex items-start rounded-xl border transition-all duration-200"
        style={{
          borderColor: focused ? `${accent}55` : "rgba(255,255,255,0.08)",
          background: focused ? `${accent}08` : "rgba(255,255,255,0.03)",
          boxShadow: focused ? `0 0 0 3px ${accent}12` : "none",
        }}>
        <div className="pl-3.5 pt-[11px] shrink-0">
          <Icon size={13} style={{ color: focused ? accent : "#475569" }} className="transition-colors duration-200" />
        </div>
        {textarea
          ? <textarea {...shared as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
            className={shared.className + " resize-none min-h-[90px]"} />
          : <input {...shared as React.InputHTMLAttributes<HTMLInputElement>} />
        }
      </div>
    </div>
  );
}

// Modal shell
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.93, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: "hsl(222 47% 8%)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
        onClick={e => e.stopPropagation()}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════════ */
function Sidebar({ view, setView, projects, mobileOpen, setMobileOpen }: {
  view: string; setView: (v: string) => void; projects: Project[];
  mobileOpen: boolean; setMobileOpen: (b: boolean) => void;
}) {
  const pending = projects.flatMap(p => p.requirements).filter(r => r.status === "pending").length;

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-[18px] border-b shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <a
          href="#home"
          onClick={() => window.location.hash = "#home"}
          className="flex items-center shrink-0 pr-6 mr-1 group"
        >
          <img
            src="/logo.png"
            alt="OS tech labs Infotech"
            width={120}
            height={44}
            className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            loading="eager"
          />
        </a>
        <button className="ml-auto lg:hidden text-slate-500 hover:text-white" onClick={() => setMobileOpen(false)}>
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-600 px-2 py-1">Main</p>
        {[
          { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard" },
          { id: "projects", Icon: FolderGit2, label: "My Projects" },
        ].map(item => {
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => { setView(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${active ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              style={active ? { background: `hsl(var(--primary)/0.12)`, border: `1px solid hsl(var(--primary)/0.22)` } : { border: "1px solid transparent" }}>
              <item.Icon size={15} className={active ? "text-primary" : ""} />
              <span className="flex-1 text-left">{item.label}</span>
              {active && <motion.div layoutId="sidebarDot" className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          );
        })}

        {projects.length > 0 && <>
          <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-600 px-2 py-1 pt-3">Projects</p>
          {projects.map(p => {
            const active = view === `project-${p.id}`;
            return (
              <button key={p.id} onClick={() => { setView(`project-${p.id}`); setMobileOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${active ? "text-white bg-white/[0.06]" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                  }`}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color }} />
                <span className="truncate flex-1 text-left">{p.name}</span>
                <motion.div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color, opacity: p.status === "in-progress" ? 1 : 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
              </button>
            );
          })}
        </>}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t space-y-0.5 shrink-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {[
          { Icon: Bell, label: "Notifications", badge: pending },
          { Icon: Settings, label: "Settings" },
          { Icon: LogOut, label: "Sign Out" },
        ].map(item => (
          <button key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-500 hover:text-white hover:bg-white/[0.04] transition-all duration-200">
            <item.Icon size={14} />
            <span>{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">{item.badge}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop - Sticky sidebar */}
      <aside className="hidden lg:flex flex-col w-[230px] xl:w-[248px] shrink-0 fixed left-0 top-0 bottom-0 z-30"
        style={{ background: "hsl(222 47% 7%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        {content}
      </aside>
      {/* Spacer for desktop to offset main content */}
      <div className="hidden lg:block w-[230px] xl:w-[248px] shrink-0" />
      
      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setMobileOpen(false)}>
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="absolute left-0 top-0 bottom-0 w-[248px]"
              style={{ background: "hsl(222 47% 7%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
              onClick={e => e.stopPropagation()}>
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   TOPBAR
═══════════════════════════════════════════════════════════ */
function Topbar({ title, sub, back, onBack, onMenu, color }: {
  title: string; sub?: string; back?: boolean; onBack?: () => void; onMenu: () => void; color?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 sm:px-7 py-4 border-b sticky top-0 z-20 shrink-0"
      style={{ background: "hsl(222 47% 7%)", borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Mobile hamburger */}
      <button className="lg:hidden w-8 h-8 rounded-xl flex items-center justify-center border text-slate-400 hover:text-white transition-colors mr-1"
        style={{ borderColor: "rgba(255,255,255,0.08)" }} onClick={onMenu}>
        <Menu size={15} />
      </button>
      {back && (
        <button onClick={onBack}
          className="w-8 h-8 rounded-xl flex items-center justify-center border text-slate-400 hover:text-white transition-all shrink-0"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <ArrowLeft size={14} />
        </button>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {color && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />}
          <h1 className="text-white font-black text-base sm:text-lg leading-tight truncate">{title}</h1>
        </div>
        {sub && <p className="font-mono text-[10px] text-slate-500 mt-0.5 truncate">{sub}</p>}
      </div>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="font-mono text-[10px] text-emerald-400 hidden sm:block">online</span>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ml-1"
          style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.25)" }}>
          CL
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════ */
function Dashboard({ projects, setView, onMenu }: {
  projects: Project[]; setView: (v: string) => void; onMenu: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const totalBudget = projects.reduce((s, p) => s + num(p.budget), 0);
  const totalSpent = projects.reduce((s, p) => s + num(p.spent), 0);
  const pendingReqs = projects.flatMap(p => p.requirements).filter(r => r.status === "pending").length;

  const STATS = [
    { label: "Total Projects", val: String(projects.length), color: "#3B82F6", Icon: FolderGit2 },
    { label: "In Progress", val: String(projects.filter(p => p.status === "in-progress").length), color: "#10B981", Icon: Activity },
    { label: "Budget Used", val: `${Math.round((totalSpent / (totalBudget || 1)) * 100)}%`, color: "#F59E0B", Icon: TrendingUp },
    { label: "Pending Reqs", val: String(pendingReqs), color: "#8B5CF6", Icon: FileText },
  ];

  const allUpdates = projects
    .flatMap(p => p.updates.map(u => ({ ...u, projectName: p.name, projectColor: p.color })))
    .sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return (
    <div className="flex flex-col flex-1 h-full">
      <Topbar title="Dashboard" sub="Welcome back — Client Portal" onMenu={onMenu} />
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8" ref={ref}>

        {/* ── Section label */}
        <SectionLabel text="// overview" />

        {/* ── Stat cards — same card style as WhyChooseUs stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
              <Panel className="p-5 hover:-translate-y-0.5 transition-transform duration-300 cursor-default">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}22` }}>
                  <s.Icon size={15} style={{ color: s.color }} />
                </div>
                <div className="font-mono text-2xl font-black leading-none mb-0.5" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[11px] text-slate-500">{s.label}</div>
              </Panel>
            </motion.div>
          ))}
        </div>

        {/* ── Active projects — same card style as ServicesSection tiles */}
        <div>
          <SectionLabel text="// active projects" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((p, i) => {
              const sc = STATUS_CFG[p.status];
              return (
                <motion.button key={p.id} onClick={() => setView(`project-${p.id}`)}
                  initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-2xl border p-5 text-left overflow-hidden relative group hover:shadow-xl transition-all duration-300"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${p.color}10 0%, hsl(222 47% 8%) 65%)`,
                    borderColor: `${p.color}30`,
                  }}>
                  {/* Accent top line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg,${p.color},${p.color}40,transparent)` }} />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-black text-sm leading-tight truncate">{p.name}</div>
                      <div className="font-mono text-[10px] mt-0.5" style={{ color: `${p.color}bb` }}>{p.type}</div>
                    </div>
                    <Ring pct={p.progress} color={p.color} size={46} />
                  </div>

                  <p className="text-[12px] text-slate-400 leading-relaxed mb-4 line-clamp-2">{p.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                    <span className="font-mono text-[10px] text-slate-600 flex items-center gap-1">
                      <CalendarDays size={10} />{p.deadline}
                    </span>
                  </div>

                  <ChevronRight size={13} className="absolute right-4 bottom-4 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Recent activity timeline */}
        <div>
          <SectionLabel text="// recent updates" />
          <Panel>
            <PanelHead>
              <Activity size={13} className="text-primary" />
              <span className="text-xs font-bold text-white">Activity Feed</span>
              <span className="ml-auto font-mono text-[10px] text-slate-500">{allUpdates.length} recent</span>
            </PanelHead>
            {allUpdates.map((u, i) => {
              const tc = UPD_TYPE_CFG[u.type];
              return (
                <motion.div key={u.id}
                  initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className={`flex items-start gap-3.5 px-5 py-3.5 ${i < allUpdates.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${tc.color}14`, border: `1px solid ${tc.color}20` }}>
                    <tc.Icon size={12} style={{ color: tc.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-white text-xs font-bold truncate">{u.title}</span>
                      <span className="font-mono text-[10px] shrink-0" style={{ color: `${u.projectColor}aa` }}>{u.projectName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{u.body}</div>
                  </div>
                  <span className="font-mono text-[10px] text-slate-600 shrink-0">{u.date}</span>
                </motion.div>
              );
            })}
          </Panel>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS LIST
═══════════════════════════════════════════════════════════ */
function ProjectsList({ projects, setView, onNew, onMenu }: {
  projects: Project[]; setView: (v: string) => void; onNew: () => void; onMenu: () => void;
}) {
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.type.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 h-full">
      <Topbar title="My Projects" sub={`${projects.length} project${projects.length !== 1 ? "s" : ""}`} onMenu={onMenu} />
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6" ref={ref}>
        <SectionLabel text="// all projects" />

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
            <Search size={13} className="text-slate-500 shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search projects…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none font-mono" />
          </div>
          <motion.button onClick={onNew} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shrink-0"
            style={{ background: "hsl(var(--primary))", boxShadow: "0 6px 20px hsl(var(--primary)/0.35)" }}>
            <Plus size={14} />
            <span className="hidden sm:block">Request Project</span>
            <span className="sm:hidden">New</span>
          </motion.button>
        </div>

        {/* Table */}
        <Panel>
          <PanelHead>
            <span className="flex-1 text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500">Project</span>
            <span className="hidden sm:block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 w-28 text-center">Progress</span>
            <span className="hidden md:block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 w-28 text-center">Status</span>
            <span className="hidden lg:block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 w-24 text-right">Deadline</span>
          </PanelHead>

          {filtered.map((p, i) => {
            const sc = STATUS_CFG[p.status];
            return (
              <motion.button key={p.id} onClick={() => setView(`project-${p.id}`)}
                initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.06 }}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.025] transition-all duration-200 group ${i < filtered.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                    style={{ background: `${p.color}14`, border: `1px solid ${p.color}22` }}>
                    <FolderGit2 size={15} style={{ color: p.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-bold truncate">{p.name}</div>
                    <div className="font-mono text-[10px] text-slate-500">{p.type}</div>
                  </div>
                </div>
                {/* Progress */}
                <div className="hidden sm:flex flex-col items-center gap-1 w-28 shrink-0">
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }} animate={{ width: `${p.progress}%` }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 + 0.2 }}
                      style={{ background: p.color }} />
                  </div>
                  <span className="font-mono text-[10px]" style={{ color: p.color }}>{p.progress}%</span>
                </div>
                {/* Status */}
                <span className="hidden md:block text-[10px] font-bold px-2.5 py-1 rounded-full w-28 text-center shrink-0"
                  style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                {/* Deadline */}
                <span className="hidden lg:block font-mono text-[11px] text-slate-500 w-24 text-right shrink-0">{p.deadline}</span>
                <ChevronRight size={13} className="text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </motion.button>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-14 text-center font-mono text-sm text-slate-600">No projects match your search</div>
          )}
        </Panel>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECT DETAIL
═══════════════════════════════════════════════════════════ */
function ProjectDetail({ project, onBack, onAddReq, onMenu }: {
  project: Project; onBack: () => void; onAddReq: (r: Requirement) => void; onMenu: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "requirements" | "updates">("overview");
  const [showReqForm, setShowReqForm] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const sc = STATUS_CFG[project.status];

  return (
    <div className="flex flex-col flex-1 h-full">
      <Topbar title={project.name} sub={project.type} back onBack={onBack} onMenu={onMenu} color={project.color} />

      <div className="flex-1 overflow-y-auto" ref={ref}>
        {/* ── Hero band — matches WhyChooseUs gradient style */}
        <div className="relative px-5 sm:px-7 py-6 border-b overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}12 0%, hsl(222 47% 7%) 55%)`,
            borderColor: "rgba(255,255,255,0.05)",
          }}>
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${project.color}20, transparent 70%)`, filter: "blur(40px)" }} />

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              { label: "Status", val: sc.label, color: sc.color, mono: false },
              { label: "Progress", val: `${project.progress}%`, color: project.color, mono: true },
              { label: "Budget", val: project.budget, color: "#10B981", mono: true },
              { label: "Deadline", val: project.deadline, color: "#F59E0B", mono: true },
            ].map(m => (
              <div key={m.label}>
                <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 mb-1">{m.label}</div>
                <div className={`font-black text-lg leading-tight ${m.mono ? "font-mono" : ""}`} style={{ color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Progress bar — same as ServicesSection progress */}
          <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-mono text-[10px] text-slate-600">Started {project.startDate}</span>
            <span className="font-mono text-[10px] text-slate-600">Due {project.deadline}</span>
          </div>
        </div>

        {/* ── Tabs */}
        <div className="flex items-center gap-1 px-5 sm:px-7 py-3 border-b sticky top-0 z-10"
          style={{ background: "hsl(222 47% 9%)", borderColor: "rgba(255,255,255,0.05)" }}>
          {(["overview", "requirements", "updates"] as const).map(t => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)}
                className="relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-[0.12em] font-mono transition-all">
                {active && <motion.div layoutId="tabBg" className="absolute inset-0 rounded-xl"
                  style={{ background: `${project.color}18`, border: `1px solid ${project.color}28` }} />}
                <span className="relative" style={{ color: active ? project.color : "#475569" }}>{t}</span>
                {t === "requirements" && (
                  <span className="relative ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-mono"
                    style={{ background: `${project.color}18`, color: project.color }}>
                    {project.requirements.length}
                  </span>
                )}
              </button>
            );
          })}
          {tab === "requirements" && (
            <motion.button onClick={() => setShowReqForm(true)} whileTap={{ scale: 0.96 }}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono"
              style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}28` }}>
              <Plus size={12} /><span className="hidden sm:block">Add Requirement</span><span className="sm:hidden">Add</span>
            </motion.button>
          )}
        </div>

        {/* ── Tab content */}
        <div className="p-5 sm:p-7">
          <AnimatePresence mode="wait">

            {/* ── OVERVIEW */}
            {tab === "overview" && (
              <motion.div key="ov" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-5">
                <div className="grid lg:grid-cols-2 gap-5">
                  {/* Brief */}
                  <Panel>
                    <PanelHead>
                      <FileText size={13} className="text-primary" />
                      <span className="text-xs font-bold text-white">Project Brief</span>
                    </PanelHead>
                    <div className="p-5">
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map(s => (
                          <span key={s} className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg"
                            style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}20` }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Panel>

                  {/* Team + Budget */}
                  <div className="space-y-3">
                    <Panel className="p-5">
                      <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 mb-3">Team</div>
                      {[
                        { role: "Project Manager", name: project.pm },
                        { role: "Lead Developer", name: project.dev },
                      ].map(m => (
                        <div key={m.role} className="flex items-center gap-3 mb-2.5 last:mb-0">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                            style={{ background: `${project.color}18`, color: project.color }}>
                            {m.name[0]}
                          </div>
                          <div>
                            <div className="text-white text-xs font-bold">{m.name}</div>
                            <div className="font-mono text-[10px] text-slate-500">{m.role}</div>
                          </div>
                        </div>
                      ))}
                    </Panel>
                    <Panel className="p-5">
                      <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 mb-3">Budget</div>
                      {[
                        { label: "Total Budget", val: project.budget, color: "#ffffff" },
                        { label: "Amount Spent", val: project.spent, color: project.color },
                      ].map(b => (
                        <div key={b.label} className="flex justify-between mb-2">
                          <span className="text-[11px] text-slate-500">{b.label}</span>
                          <span className="font-mono text-sm font-bold" style={{ color: b.color }}>{b.val}</span>
                        </div>
                      ))}
                      <div className="h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <motion.div className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, Math.round((num(project.spent) / num(project.budget)) * 100))}%` }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          style={{ background: project.color }} />
                      </div>
                    </Panel>
                  </div>
                </div>

                {/* Req summary — same row style as WhyChooseUs comparison table */}
                <Panel>
                  <PanelHead>
                    <GitBranch size={13} className="text-primary" />
                    <span className="text-xs font-bold text-white">Requirements Breakdown</span>
                    <span className="ml-auto font-mono text-[10px] text-slate-500">{project.requirements.length} total</span>
                  </PanelHead>
                  <div className="grid grid-cols-3 sm:grid-cols-5 divide-x">
                    {(Object.entries(REQ_STATUS_CFG) as [ReqStatus, typeof REQ_STATUS_CFG[ReqStatus]][]).map(([k, m]) => {
                      const count = project.requirements.filter(r => r.status === k).length;
                      return (
                        <div key={k} className="flex flex-col items-center py-5 gap-1.5 border-r last:border-0"
                          style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                          <m.Icon size={14} style={{ color: m.color }} />
                          <span className="font-mono text-xl font-black" style={{ color: m.color }}>{count}</span>
                          <span className="font-mono text-[9px] text-slate-600 uppercase">{m.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </Panel>
              </motion.div>
            )}

            {/* ── REQUIREMENTS */}
            {tab === "requirements" && (
              <motion.div key="rq" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-3">
                {project.requirements.length === 0 && (
                  <div className="text-center py-16 font-mono text-sm text-slate-600">
                    No requirements yet.{" "}
                    <button onClick={() => setShowReqForm(true)} className="underline" style={{ color: project.color }}>
                      Add the first one →
                    </button>
                  </div>
                )}
                {project.requirements.map((req, i) => {
                  const rs = REQ_STATUS_CFG[req.status];
                  const rp = PRIORITY_CFG[req.priority];
                  return (
                    <motion.div key={req.id}
                      initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.07 }}>
                      <Panel className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            <rs.Icon size={14} style={{ color: rs.color }} className="shrink-0 mt-0.5" />
                            <h3 className="text-white text-sm font-bold leading-tight">{req.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${rp.color}18`, color: rp.color }}>{rp.label}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${rs.color}15`, color: rs.color }}>{rs.label}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed ml-[22px] mb-3">{req.description}</p>
                        {req.notes && (
                          <div className="ml-[22px] px-4 py-2.5 rounded-xl text-xs text-slate-400 italic border"
                            style={{ background: "hsl(222 47% 6%)", borderColor: "rgba(255,255,255,0.05)" }}>
                            💬 {req.notes}
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-3 ml-[22px]">
                          <span className="font-mono text-[10px] text-slate-600 flex items-center gap-1"><CalendarDays size={9} />{req.createdAt}</span>
                          <span className="font-mono text-[10px] text-slate-600 flex items-center gap-1"><User size={9} />{req.createdBy === "client" ? "You" : "OS tech labs Team"}</span>
                        </div>
                      </Panel>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* ── UPDATES / TIMELINE */}
            {tab === "updates" && (
              <motion.div key="up" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="relative">
                {/* Vertical timeline rail */}
                <div className="absolute left-5 top-5 bottom-5 w-px hidden sm:block"
                  style={{ background: "rgba(255,255,255,0.04)" }} />

                <div className="space-y-4">
                  {project.updates.map((upd, i) => {
                    const tc = UPD_TYPE_CFG[upd.type];
                    return (
                      <motion.div key={upd.id}
                        initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-4 sm:gap-5">
                        {/* Node */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10 hidden sm:flex"
                          style={{ background: `${tc.color}14`, border: `1.5px solid ${tc.color}28` }}>
                          <tc.Icon size={15} style={{ color: tc.color }} />
                        </div>
                        <Panel className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                              {/* Type label */}
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[9px] font-black font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                                  style={{ background: `${tc.color}14`, color: tc.color }}>
                                  {tc.label}
                                </span>
                              </div>
                              <h3 className="text-white text-sm font-bold leading-tight">{upd.title}</h3>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1"><CalendarDays size={9} />{upd.date}</span>
                                <span className="font-mono text-[10px] text-slate-600 flex items-center gap-1"><User size={9} />{upd.author}</span>
                              </div>
                            </div>
                            {upd.pct !== undefined && (
                              <span className="font-mono text-base font-black shrink-0" style={{ color: project.color }}>{upd.pct}%</span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{upd.body}</p>
                          {upd.pct !== undefined && (
                            <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                              <motion.div className="h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${upd.pct}%` }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 * i }}
                                style={{ background: `linear-gradient(90deg,${project.color},${project.color}70)` }} />
                            </div>
                          )}
                        </Panel>
                      </motion.div>
                    );
                  })}
                  {project.updates.length === 0 && (
                    <div className="text-center py-14 font-mono text-sm text-slate-600">No updates posted yet.</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Requirement modal */}
      <AnimatePresence>
        {showReqForm && (
          <AddReqModal color={project.color} onClose={() => setShowReqForm(false)} onSave={req => { onAddReq(req); setShowReqForm(false); }} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADD REQUIREMENT MODAL
═══════════════════════════════════════════════════════════ */
function AddReqModal({ color, onClose, onSave }: {
  color: string; onClose: () => void; onSave: (r: Requirement) => void;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!title.trim() || !desc.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    onSave({ id: uid(), title, description: desc, priority, status: "pending", createdAt: now(), createdBy: "client" });
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ background: "hsl(222 47% 11%)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
          <Plus size={14} style={{ color }} />
        </div>
        <div>
          <div className="text-white font-bold text-sm">Add Requirement</div>
          <div className="font-mono text-[10px] text-slate-500">Submitted as Client · {now()}</div>
        </div>
        <button onClick={onClose} className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all">
          <X size={13} />
        </button>
      </div>

      <div className="p-5 space-y-4">
        <Field label="Requirement Title" icon={FileText} accent={color}
          type="text" value={title} onChange={(e: any) => setTitle(e.target.value)}
          placeholder="e.g. Add dark mode toggle" />

        <Field label="Description" icon={MessageSquare} accent={color} textarea
          value={desc} onChange={(e: any) => setDesc(e.target.value)}
          placeholder="Describe expected behaviour, any constraints, references…" rows={4} />

        <div>
          <label className="block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 mb-1.5">Priority</label>
          <div className="grid grid-cols-4 gap-2">
            {(["low", "medium", "high", "critical"] as Priority[]).map(p => {
              const pm = PRIORITY_CFG[p];
              const active = priority === p;
              return (
                <button key={p} onClick={() => setPriority(p)}
                  className="py-2 rounded-xl text-[11px] font-black font-mono border transition-all"
                  style={{
                    borderColor: active ? `${pm.color}50` : "rgba(255,255,255,0.07)",
                    background: active ? `${pm.color}18` : "transparent",
                    color: active ? pm.color : "#475569",
                  }}>
                  {pm.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold border text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all font-mono"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}>Cancel</button>
          <motion.button onClick={submit} disabled={saving || !title.trim() || !desc.trim()}
            whileHover={saving ? {} : { scale: 1.02 }} whileTap={saving ? {} : { scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
            style={{ background: color, boxShadow: `0 6px 18px ${color}35` }}>
            {saving ? <><Loader2 size={14} className="animate-spin" />Saving…</> : <><Send size={14} />Submit</>}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW PROJECT MODAL
═══════════════════════════════════════════════════════════ */
function NewProjectModal({ onClose, onSave }: {
  onClose: () => void; onSave: (p: Project) => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Web Development");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [saving, setSaving] = useState(false);
  const color = TYPE_COLORS[type] ?? "#3B82F6";

  const submit = async () => {
    if (!name.trim() || !desc.trim() || !deadline) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    onSave({
      id: uid(), name, type, color, status: "planning", progress: 0,
      startDate: now(), deadline, description: desc,
      budget: budget || "To be confirmed", spent: "₹0",
      pm: "Being assigned", dev: "Being assigned",
      requirements: [], updates: [], stack: [],
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ background: "hsl(222 47% 11%)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
          <FolderGit2 size={14} style={{ color }} />
        </div>
        <div>
          <div className="text-white font-bold text-sm">Request New Project</div>
          <div className="font-mono text-[10px] text-slate-500">Our team replies within 4 hours</div>
        </div>
        <button onClick={onClose} className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all">
          <X size={13} />
        </button>
      </div>

      <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Project Name" icon={FolderGit2} accent={color}
            type="text" value={name} onChange={(e: any) => setName(e.target.value)}
            placeholder="e.g. My E-Commerce Store" />
          <div>
            <label className="block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 mb-1.5">Project Type</label>
            <div className="relative">
              <select value={type} onChange={e => setType(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none font-mono border pr-8 transition-all"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", colorScheme: "dark" }}>
                {PROJECT_TYPES.map(t => <option key={t} value={t} style={{ background: "hsl(222 47% 12%)" }}>{t}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <Field label="Project Description" icon={FileText} accent={color} textarea
          value={desc} onChange={(e: any) => setDesc(e.target.value)}
          placeholder="What do you need built? Describe features, goals, target audience, any references…" rows={4} />

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Estimated Budget" icon={TrendingUp} accent={color}
            type="text" value={budget} onChange={(e: any) => setBudget(e.target.value)}
            placeholder="e.g. ₹50,000" />
          <div>
            <label className="block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-slate-500 mb-1.5">Expected Deadline</label>
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border transition-all"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
              <CalendarDays size={13} className="text-slate-500 mr-2.5 shrink-0" />
              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white focus:outline-none font-mono"
                style={{ colorScheme: "dark" }} />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold border text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all font-mono"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}>Cancel</button>
          <motion.button onClick={submit} disabled={saving || !name.trim() || !desc.trim() || !deadline}
            whileHover={saving ? {} : { scale: 1.02 }} whileTap={saving ? {} : { scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
            style={{ background: color, boxShadow: `0 6px 18px ${color}35` }}>
            {saving ? <><Loader2 size={14} className="animate-spin" />Submitting…</> : <><Send size={14} />Submit Request</>}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */
export default function ClientPortal() {
  const [projects, setProjects] = useState<Project[]>(SEED);
  const [view, setView] = useState("dashboard");
  const [showNewProject, setShowNewProject] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeProject = view.startsWith("project-")
    ? projects.find(p => p.id === view.replace("project-", ""))
    : null;

  const addReq = (projectId: string, req: Requirement) =>
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, requirements: [req, ...p.requirements] } : p));

  const addProject = (p: Project) => {
    setProjects(prev => [p, ...prev]);
    setShowNewProject(false);
    setView(`project-${p.id}`);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "hsl(222 47% 6%)", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <style>{`
        :root {
          --primary: 217 91% 60%;
          --primary-foreground: 0 0% 100%;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 4px; }
        .service-icon-bg {
          background: hsl(var(--primary) / 0.12);
          border: 1px solid hsl(var(--primary) / 0.22);
        }
        .gradient-text {
          background: linear-gradient(135deg, hsl(var(--primary)), #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .text-primary { color: hsl(var(--primary)); }
        .bg-primary { background: hsl(var(--primary)); }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }
      `}</style>

      <Sidebar view={view} setView={setView} projects={projects} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AnimatePresence mode="wait">
          {view === "dashboard" && (
            <motion.div key="dash" className="flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dashboard projects={projects} setView={setView} onMenu={() => setMobileOpen(true)} />
            </motion.div>
          )}
          {view === "projects" && (
            <motion.div key="projs" className="flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectsList projects={projects} setView={setView} onNew={() => setShowNewProject(true)} onMenu={() => setMobileOpen(true)} />
            </motion.div>
          )}
          {activeProject && (
            <motion.div key={view} className="flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectDetail
                project={activeProject}
                onBack={() => setView("projects")}
                onAddReq={(req) => addReq(activeProject.id, req)}
                onMenu={() => setMobileOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showNewProject && (
          <NewProjectModal onClose={() => setShowNewProject(false)} onSave={addProject} />
        )}
      </AnimatePresence>
    </div>
  );
}