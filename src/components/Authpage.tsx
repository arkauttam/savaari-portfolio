import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Eye, EyeOff, Mail, Lock, User, ArrowRight,
    CheckCircle2, Loader2, FolderGit2, Shield,
    Zap, Users, GitBranch, ChevronRight, X, AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   MOCK CREDENTIALS  (replace with real auth)
═══════════════════════════════════════════════════════════ */
const MOCK_USERS = [
    { email: "client@demo.com", password: "demo123", name: "Rajesh Kumar", company: "FoodRush Pvt Ltd" },
    { email: "demo@os.com", password: "OS tech labs", name: "Priya Sharma", company: "StyleVibe Fashion" },
];

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */
export interface AuthUser { name: string; email: string; company: string; }

/* ═══════════════════════════════════════════════════════════
   ANIMATED TERMINAL (left panel decoration)
═══════════════════════════════════════════════════════════ */
const TERMINAL_LINES = [
    { text: "$ OS tech labs --status", cls: "text-emerald-400", delay: 0 },
    { text: "  Portal v2.4 · Secure access", cls: "text-slate-400", delay: 120 },
    { text: "", cls: "", delay: 80 },
    { text: "$ projects --list", cls: "text-emerald-400", delay: 120 },
    { text: "  ✔  FoodRush Web App      68%", cls: "text-blue-400", delay: 100 },
    { text: "  ✔  StyleVibe Mobile App  91%", cls: "text-green-400", delay: 100 },
    { text: "  ✔  LendSmart AI Engine   12%", cls: "text-violet-400", delay: 100 },
    { text: "", cls: "", delay: 80 },
    { text: "$ uptime --team", cls: "text-emerald-400", delay: 120 },
    { text: "  Support : Mon–Sat 9AM–11PM IST", cls: "text-slate-400", delay: 100 },
    { text: "  Reply   : < 4 hours", cls: "text-slate-400", delay: 100 },
    { text: "", cls: "", delay: 80 },
    { text: "  Awaiting login… ▌", cls: "text-blue-400", delay: 0 },
];

function TerminalDecor() {
    const [shown, setShown] = useState(0);

    useEffect(() => {
        if (shown >= TERMINAL_LINES.length) return;
        const delay = shown === 0 ? 400 : (TERMINAL_LINES[shown - 1]?.delay ?? 100);
        const t = setTimeout(() => setShown(n => n + 1), delay);
        return () => clearTimeout(t);
    }, [shown]);

    return (
        <div className="rounded-2xl overflow-hidden border border-white/[0.07]"
            style={{ background: "hsl(222 47% 6%)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
            {/* Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]"
                style={{ background: "hsl(222 47% 9%)" }}>
                <div className="flex gap-1.5">
                    {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
                        <div key={c} className="w-2.5 h-2.5 rounded-full opacity-70" style={{ background: c }} />
                    ))}
                </div>
                <span className="font-mono text-[11px] text-slate-400 ml-2">OS tech labs — portal</span>
                <div className="ml-auto flex items-center gap-1.5">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[10px] text-emerald-400">live</span>
                </div>
            </div>
            {/* Output */}
            <div className="p-5 space-y-[3px] h-full overflow-hidden">
                {TERMINAL_LINES.slice(0, shown).map((l, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.12 }}
                        className={`font-mono text-[12px] leading-relaxed whitespace-pre ${l.cls}`}>
                        {l.text || "\u00A0"}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}



/* ═══════════════════════════════════════════════════════════
   FIELD COMPONENT
═══════════════════════════════════════════════════════════ */
function AuthField({
    label, icon: Icon, type = "text", accent = "#3B82F6",
    value, onChange, placeholder, error, rightSlot,
    disabled = false,
}: {
    label: string; icon: React.ElementType; type?: string; accent?: string;
    value: string; onChange: (v: string) => void; placeholder?: string;
    error?: string; rightSlot?: React.ReactNode; disabled?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const hasError = !!error;

    return (
        <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.18em] font-mono mb-1.5"
                style={{ color: hasError ? "#ef4444" : "#475569" }}>
                {label}
            </label>
            <div className="flex items-center rounded-xl border transition-all duration-200"
                style={{
                    borderColor: hasError ? "#ef444455" : focused ? `${accent}55` : "rgba(255,255,255,0.09)",
                    background: hasError ? "rgba(239,68,68,0.05)" : focused ? `${accent}08` : "rgba(255,255,255,0.03)",
                    boxShadow: hasError ? "0 0 0 3px rgba(239,68,68,0.1)" : focused ? `0 0 0 3px ${accent}12` : "none",
                }}>
                <div className="pl-3.5 shrink-0">
                    <Icon size={14} className="transition-colors duration-200"
                        style={{ color: hasError ? "#ef4444" : focused ? accent : "#475569" }} />
                </div>
                <input
                    type={type} value={value} disabled={disabled}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder:text-slate-600
                     focus:outline-none font-mono disabled:opacity-50"
                />
                {rightSlot && <div className="pr-3.5 shrink-0">{rightSlot}</div>}
            </div>
            <AnimatePresence>
                {hasError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono"
                        style={{ color: "#ef4444" }}>
                        <AlertCircle size={11} />{error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   LOGIN FORM
═══════════════════════════════════════════════════════════ */
function LoginForm({ onSuccess, onSwitch }: {
    onSuccess: (user: AuthUser) => void;
    onSwitch: () => void;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

    const validate = () => {
        const e: typeof errors = {};
        if (!email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
        if (!password) e.password = "Password is required";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));

        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (user) {
            onSuccess({ name: user.name, email: user.email, company: user.company });
        } else {
            setErrors({ form: "Invalid email or password. Try client@demo.com / demo123" });
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <AuthField label="Email Address" icon={Mail} accent="#3B82F6"
                value={email} onChange={setEmail} placeholder="you@company.com"
                error={errors.email} disabled={loading} />

            <AuthField label="Password" icon={Lock} accent="#8B5CF6"
                type={showPwd ? "text" : "password"}
                value={password} onChange={setPassword} placeholder="Enter your password"
                error={errors.password} disabled={loading}
                rightSlot={
                    <button onClick={() => setShowPwd(s => !s)} className="text-slate-500 hover:text-slate-300 transition-colors">
                        {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                } />

            {/* Form-level error */}
            <AnimatePresence>
                {errors.form && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-xs font-mono"
                        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <AlertCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
                        <span className="text-red-300">{errors.form}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Forgot */}
            <div className="flex justify-end -mt-2">
                <button className="text-[11px] font-mono text-slate-500 hover:text-blue-400 transition-colors">
                    Forgot password?
                </button>
            </div>

            {/* Submit */}
            <motion.button onClick={handleSubmit} disabled={loading}
                whileHover={loading ? {} : { scale: 1.02 }}
                whileTap={loading ? {} : { scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-60"
                style={{ background: "hsl(217 91% 60%)", boxShadow: loading ? "none" : "0 8px 28px rgba(59,130,246,0.4)" }}>
                {loading
                    ? <><Loader2 size={15} className="animate-spin" />Signing in…</>
                    : <><ArrowRight size={15} />Sign In to Portal</>
                }
            </motion.button>


            {/* Switch to signup */}
            <p className="text-center text-sm text-slate-500 font-mono">
                New client?{" "}
                <button onClick={onSwitch} className="font-black hover:underline transition-all" style={{ color: "hsl(217 91% 60%)" }}>
                    Request access →
                </button>
            </p>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   SIGNUP FORM
═══════════════════════════════════════════════════════════ */
const PASSWORD_RULES = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

function SignupForm({ onSuccess, onSwitch }: {
    onSuccess: (user: AuthUser) => void;
    onSwitch: () => void;
}) {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [showConf, setShowConf] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const pwdStrength = PASSWORD_RULES.filter(r => r.test(password)).length;

    const validate = () => {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = "Full name is required";
        if (!company.trim()) e.company = "Company name is required";
        if (!email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
        if (pwdStrength < 3) e.password = "Password must meet all requirements";
        if (password !== confirm) e.confirm = "Passwords do not match";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setLoading(true);
        await new Promise(r => setTimeout(r, 1400));
        // In a real app: POST to API, then login
        setDone(true);
        await new Promise(r => setTimeout(r, 1800));
        onSuccess({ name, email, company });
    };

    if (done) return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 gap-5 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.12)", border: "1.5px solid rgba(16,185,129,0.25)" }}>
                <CheckCircle2 size={30} style={{ color: "#10B981" }} />
            </motion.div>
            <div>
                <h3 className="text-white font-black text-lg mb-1">Account Created!</h3>
                <p className="text-sm text-slate-400 font-mono">Redirecting to your portal…</p>
            </div>
            <Loader2 size={18} className="animate-spin text-blue-400" />
        </motion.div>
    );

    return (
        <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
                <AuthField label="Full Name" icon={User} accent="#10B981"
                    value={name} onChange={setName} placeholder="Rajesh Kumar"
                    error={errors.name} disabled={loading} />
                <AuthField label="Company / Brand" icon={FolderGit2} accent="#3B82F6"
                    value={company} onChange={setCompany} placeholder="Acme Pvt Ltd"
                    error={errors.company} disabled={loading} />
            </div>

            <AuthField label="Email Address" icon={Mail} accent="#3B82F6"
                value={email} onChange={setEmail} placeholder="you@company.com"
                error={errors.email} disabled={loading} />

            <AuthField label="Password" icon={Lock} accent="#8B5CF6"
                type={showPwd ? "text" : "password"}
                value={password} onChange={setPassword} placeholder="Create a strong password"
                error={errors.password} disabled={loading}
                rightSlot={
                    <button onClick={() => setShowPwd(s => !s)} className="text-slate-500 hover:text-slate-300 transition-colors">
                        {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                } />

            {/* Password strength */}
            {password && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 -mt-1">
                    {/* Strength bar */}
                    <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                                <motion.div className="h-full rounded-full"
                                    animate={{ width: i < pwdStrength ? "100%" : "0%" }}
                                    transition={{ duration: 0.3 }}
                                    style={{ background: pwdStrength === 1 ? "#ef4444" : pwdStrength === 2 ? "#f59e0b" : "#10b981" }} />
                            </div>
                        ))}
                    </div>
                    {/* Rule checklist */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {PASSWORD_RULES.map(r => {
                            const ok = r.test(password);
                            return (
                                <span key={r.label} className="flex items-center gap-1 text-[10px] font-mono transition-colors"
                                    style={{ color: ok ? "#10b981" : "#475569" }}>
                                    {ok ? <CheckCircle2 size={10} /> : <X size={10} />}
                                    {r.label}
                                </span>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            <AuthField label="Confirm Password" icon={Lock} accent="#8B5CF6"
                type={showConf ? "text" : "password"}
                value={confirm} onChange={setConfirm} placeholder="Repeat your password"
                error={errors.confirm} disabled={loading}
                rightSlot={
                    <button onClick={() => setShowConf(s => !s)} className="text-slate-500 hover:text-slate-300 transition-colors">
                        {showConf ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                } />

            <motion.button onClick={handleSubmit} disabled={loading}
                whileHover={loading ? {} : { scale: 1.02 }}
                whileTap={loading ? {} : { scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-60"
                style={{ background: "hsl(217 91% 60%)", boxShadow: loading ? "none" : "0 8px 28px rgba(59,130,246,0.4)" }}>
                {loading
                    ? <><Loader2 size={15} className="animate-spin" />Creating account…</>
                    : <><ArrowRight size={15} />Create Account</>
                }
            </motion.button>

            <p className="text-center text-sm text-slate-500 font-mono">
                Already have access?{" "}
                <button onClick={onSwitch} className="font-black hover:underline" style={{ color: "hsl(217 91% 60%)" }}>
                    Sign in →
                </button>
            </p>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN AUTH PAGE - FIXED: Now properly exported as AuthPage (capital P)
═══════════════════════════════════════════════════════════ */
export function AuthPage({ onLogin }: { onLogin?: (user: AuthUser) => void }) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const navigate = useNavigate();

    // Handle successful login/signup
    const handleSuccess = (user: AuthUser) => {
        if (onLogin) {
            onLogin(user);
        } else {
            // Default behavior if no onLogin prop is provided
            console.log("User authenticated:", user);
            // You could store in localStorage or context here
            localStorage.setItem("authUser", JSON.stringify(user));
            // Redirect or update UI as needed
            navigate("/client-portal");
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: "hsl(222 47% 6%)" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.07); border-radius:4px; }
      `}</style>

            {/* ── LEFT PANEL (hidden on mobile) */}
            <div className="hidden lg:flex flex-col w-[440px] xl:w-[480px] shrink-0 relative overflow-hidden border-r"
                style={{ background: "hsl(222 47% 7%)", borderColor: "rgba(255,255,255,0.06)" }}>

                {/* Ambient blobs */}
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)", filter: "blur(48px)" }} />
                <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10), transparent 70%)", filter: "blur(40px)" }} />

                <div className="flex flex-col flex-1 px-10 py-10 relative">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">

                        <div>
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
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-px w-6 bg-blue-500/50" />
                            <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] font-mono">// your workspace</span>
                        </div>
                        <h1 className="text-white font-black text-3xl xl:text-4xl leading-tight mb-3"
                            style={{ letterSpacing: "-0.02em" }}>
                            Track every sprint.<br />
                            <span style={{
                                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                                Own your project.
                            </span>
                        </h1>

                    </div>

                    {/* Terminal */}
                    <TerminalDecor />
                </div>
            </div>

            {/* ── RIGHT PANEL — auth form */}
            <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 sm:px-10 relative overflow-y-auto">

                {/* Mobile logo */}
                <div className="flex lg:hidden items-center gap-3 mb-8">

                    <div>
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
                    </div>
                </div>

                <div className="w-full max-w-[420px]">

                    {/* Card */}
                    <div className="rounded-2xl border overflow-hidden"
                        style={{
                            background: "hsl(222 47% 8%)",
                            borderColor: "rgba(255,255,255,0.08)",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
                        }}>

                        {/* ── Mode toggle tabs */}
                        <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "hsl(222 47% 10%)" }}>
                            {(["login", "signup"] as const).map(m => {
                                const active = mode === m;
                                return (
                                    <button key={m} onClick={() => setMode(m)}
                                        className="flex-1 relative py-4 text-xs font-black uppercase tracking-[0.14em] font-mono transition-all duration-200"
                                        style={{ color: active ? "white" : "#475569" }}>
                                        {active && (
                                            <motion.div layoutId="authTab"
                                                className="absolute inset-x-0 bottom-0 h-[2px] rounded-t-sm"
                                                style={{ background: "hsl(217 91% 60%)" }}
                                                transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                                        )}
                                        {active && (
                                            <motion.div layoutId="authTabBg"
                                                className="absolute inset-0"
                                                style={{ background: "rgba(59,130,246,0.06)" }}
                                                transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                                        )}
                                        <span className="relative">{m === "login" ? "Sign In" : "Create Account"}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Header */}
                        <div className="px-7 pt-7 pb-5">
                            <AnimatePresence mode="wait">
                                <motion.div key={mode}
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}>
                                    <h2 className="text-white font-black text-xl leading-tight mb-1">
                                        {mode === "login" ? "Welcome back" : "Get started"}
                                    </h2>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── Forms */}
                        <div className="px-7 pb-7">
                            <AnimatePresence mode="wait">
                                {mode === "login" ? (
                                    <motion.div key="login-form"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                                        <LoginForm onSuccess={handleSuccess} onSwitch={() => setMode("signup")} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="signup-form"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                                        <SignupForm onSuccess={handleSuccess} onSwitch={() => setMode("login")} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   DEFAULT EXPORT
═══════════════════════════════════════════════════════════ */
export default AuthPage;