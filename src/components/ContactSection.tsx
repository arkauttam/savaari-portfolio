import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Send, CheckCircle2, Loader2, Mail, MapPin,
    MessageSquare, User, AtSign, FileText,
    Github, Linkedin, ArrowUpRight,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

/* ─── Data ─────────────────────────────────────────────── */
const CONTACT_INFO = [
    { icon: Mail, color: "#3b82f6", label: "Email us", value: "hello@onlinesavaari.com", href: "mailto:hello@onlinesavaari.com" },
    { icon: SiWhatsapp, color: "#10b981", label: "WhatsApp", value: "+91 89672 58388", href: "https://wa.me/918967258388" },
    { icon: MapPin, color: "#f59e0b", label: "Office", value: "166 Station Road, Kolkata", href: "https://maps.google.com/?q=166+Station+Road+Kolkata" },
];

const SOCIALS = [
    { icon: Github, href: "https://github.com/onlinesavaari", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/onlinesavaari", label: "LinkedIn" },
    { icon: SiWhatsapp, href: "https://wa.me/918967258388", label: "WhatsApp" },
    { icon: Mail, href: "mailto:hello@onlinesavaari.com", label: "Email" },
];

/* ─── Terminal lines ────────────────────────────────────── */
const IDLE_LINES: { text: string; cls: string }[] = [
    { text: "$ OS tech labsc --contact", cls: "text-emerald-400" },
    { text: "  Initialising contact terminal...", cls: "text-slate-400" },
    { text: "", cls: "" },
    { text: "$ OS tech lab --info", cls: "text-emerald-400" },
    { text: "  Response time  : < 4 hours", cls: "text-slate-400" },
    { text: "  Support hours  : Mon–Sat 9AM–11PM IST", cls: "text-slate-400" },
    { text: "  Location       : Kolkata, India", cls: "text-slate-400" },
    { text: "", cls: "" },
    { text: "  Ready. Fill the form →", cls: "text-blue-400" },
];

function buildSendLines(name: string, email: string, subject: string) {
    return [
        { text: "$ OS tech labsc --send-message", cls: "text-emerald-400" },
        { text: `  From    : ${name} <${email}>`, cls: "text-slate-400" },
        { text: `  Subject : ${subject}`, cls: "text-slate-400" },
        { text: "  Encrypting payload...", cls: "text-slate-500" },
        { text: "  ████████████████████  100%", cls: "text-blue-400" },
        { text: "  ✔  Message delivered successfully", cls: "text-emerald-400" },
        { text: "  ✔  You'll hear back within 4 hours.", cls: "text-emerald-400" },
    ];
}

/* ─── Terminal component ────────────────────────────────── */
function TerminalBlock({ lines }: { lines: { text: string; cls: string }[] }) {
    const [shown, setShown] = useState(0);
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setShown(0); }, [lines]);
    useEffect(() => {
        if (shown >= lines.length) return;
        const t = setTimeout(() => setShown(n => n + 1), shown === 0 ? 200 : 100);
        return () => clearTimeout(t);
    }, [shown, lines.length]);
    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [shown]);

    return (
        <div
            className="rounded-2xl overflow-hidden border border-white/[0.06] flex flex-col"
            style={{ background: "hsl(222 47% 7%)", boxShadow: "0 20px 60px rgba(0,0,0,0.28)" }}
        >
            {/* Chrome bar — same pattern as AboutSection dashboard */}
            <div
                className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] shrink-0"
                style={{ background: "hsl(222 47% 9%)" }}
            >
                <div className="flex gap-1.5">
                    {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
                        <div key={c} className="w-2.5 h-2.5 rounded-full opacity-70" style={{ background: c }} />
                    ))}
                </div>
                <span className="font-mono text-[11px] text-slate-400 ml-2 select-none">
                    OS tech labsc — contact
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    />
                    <span className="font-mono text-[10px] text-emerald-400">live</span>
                </div>
            </div>

            {/* Output body */}
            <div
                ref={bodyRef}
                className="p-5 space-y-[3px] h-64 overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
            >
                {lines.slice(0, shown).map((l, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.12 }}
                        className={`font-mono text-[12px] sm:text-[13px] leading-relaxed whitespace-pre ${l.cls}`}
                    >
                        {l.text || "\u00A0"}
                    </motion.div>
                ))}
                {shown < lines.length && (
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="inline-block w-[7px] h-[14px] bg-emerald-400 align-middle"
                    />
                )}
            </div>
        </div>
    );
}

/* ─── Styled Input ──────────────────────────────────────── */
type FieldProps = {
    label: string;
    icon: React.ElementType;
    accentColor?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Field({ label, icon: Icon, accentColor = "#3b82f6", ...props }: FieldProps) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label className="block text-[11px] text-gray-800 text-muted-foreground mb-1.5">
                {label}
            </label>
            <div
                className="flex items-center rounded-xl border transition-all duration-200"
                style={{
                    borderColor: focused ? `${accentColor}55` : "hsl(var(--border)/0.5)",
                    background: focused ? `${accentColor}08` : "hsl(var(--muted)/0.25)",
                    boxShadow: focused ? `0 0 0 3px ${accentColor}12` : "none",
                }}
            >
                <div className="pl-3.5 shrink-0">
                    <Icon
                        size={14}
                        style={{ color: focused ? accentColor : "hsl(var(--muted-foreground))" }}
                        className="transition-colors duration-200"
                    />
                </div>
                <input
                    {...props}
                    onFocus={e => { setFocused(true); props.onFocus?.(e); }}
                    onBlur={e => { setFocused(false); props.onBlur?.(e); }}
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground
                     placeholder:text-muted-foreground/45 focus:outline-none font-mono"
                />
            </div>
        </div>
    );
}

type TextAreaProps = {
    label: string;
    icon: React.ElementType;
    accentColor?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextAreaField({ label, icon: Icon, accentColor = "#3b82f6", ...props }: TextAreaProps) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="flex flex-col flex-1">
            <label className="block text-[11px] text-gray-800 text-muted-foreground mb-1.5">
                {label}
            </label>
            <div
                className="flex items-start rounded-xl border transition-all duration-200 flex-1"
                style={{
                    borderColor: focused ? `${accentColor}55` : "hsl(var(--border)/0.5)",
                    background: focused ? `${accentColor}08` : "hsl(var(--muted)/0.25)",
                    boxShadow: focused ? `0 0 0 3px ${accentColor}12` : "none",
                }}
            >
                <div className="pl-3.5 pt-3 shrink-0">
                    <Icon
                        size={14}
                        style={{ color: focused ? accentColor : "hsl(var(--muted-foreground))" }}
                        className="transition-colors duration-200"
                    />
                </div>
                <textarea
                    {...props}
                    onFocus={e => { setFocused(true); props.onFocus?.(e); }}
                    onBlur={e => { setFocused(false); props.onBlur?.(e); }}
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground
                     placeholder:text-muted-foreground/45 focus:outline-none
                     font-mono resize-none min-h-[110px]"
                />
            </div>
        </div>
    );
}

/* ─── Main export ───────────────────────────────────────── */
export function ContactSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [termLines, setTermLines] = useState(IDLE_LINES);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTermLines(buildSendLines(form.name, form.email, form.subject));
        await new Promise(r => setTimeout(r, 2800));
        setSending(false);
        setSent(true);
    };

    const handleReset = () => {
        setSent(false);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTermLines(IDLE_LINES);
    };

    return (
        <section
            id="contact"
            ref={ref}
            className=" bg-background overflow-hidden relative py-8"
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px)," +
                        "linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="container mx-auto relative">

                {/* ── Header — same pattern across all sections ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-px w-8 bg-primary/50" />
                            <span className="text-primary font-bold text-[11px] uppercase tracking-[0.2em] font-mono">
                // contact us
                            </span>
                        </div>
                        <h2
                            className="font-extrabold leading-tight tracking-tight text-foreground"
                            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
                        >
                            Let's Build{" "}
                            <span className="gradient-text">Something Great</span>
                        </h2>
                    </div>

                </motion.div>

                {/* ── Body: LEFT terminal + info   |   RIGHT form ── */}
                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-8 items-start">

                    {/* ─ LEFT column ─ */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-4"
                    >
                        <TerminalBlock lines={termLines} />

                    </motion.div>

                    {/* ─ RIGHT column: dark card matching About dashboard ─ */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div
                            className="rounded-xl border overflow-hidden shadow-md bg-background"
                            
                        >
                            {/* Header */}
                            <div
                                className="flex items-center gap-3 px-6 py-5 border-b"
                                style={{
                                    background: "hsl(var(--background)/0.7)",
                                    borderColor: "hsl(var(--border)/0.4)",
                                }}
                            >
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "hsl(var(--primary)/0.12)",
                                        border: "1px solid hsl(var(--primary)/0.25)",
                                    }}
                                >
                                    <MessageSquare size={16} className="text-primary" />
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-foreground leading-tight">
                                        Send us a message
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Free quote · No commitment
                                    </div>
                                </div>

                                <div className="ml-auto flex items-center gap-2">
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-2 h-2 rounded-full bg-emerald-500"
                                    />
                                    <span className="text-xs text-emerald-600 font-medium">
                                        Online
                                    </span>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {sent ? (
                                    /* Success state */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-16 px-8 text-center gap-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                            style={{
                                                background: "hsl(142 76% 36% / 0.12)",
                                                border: "1px solid hsl(142 76% 36% / 0.25)",
                                            }}
                                        >
                                            <CheckCircle2 size={30} className="text-emerald-500" />
                                        </motion.div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                                Message Sent Successfully
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                                                Thanks for reaching out. Our team will reply within 4 hours.
                                            </p>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={handleReset}
                                            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                                            style={{
                                                background: "hsl(var(--primary))",
                                                color: "hsl(var(--primary-foreground))",
                                                boxShadow: "0 8px 24px hsl(var(--primary)/0.3)",
                                            }}
                                        >
                                            Send Another Message
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    /* Form */
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="p-6 sm:p-8 flex flex-col gap-5"
                                    >
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <Field
                                                label="Your Name"
                                                icon={User}
                                                accentColor="hsl(var(--primary))"
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Full Name"
                                            />
                                            <Field
                                                label="Email"
                                                icon={AtSign}
                                                accentColor="hsl(var(--primary))"
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="name@company.com"
                                            />
                                        </div>

                                        <Field
                                            label="Subject"
                                            icon={FileText}
                                            accentColor="hsl(var(--primary))"
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your Project"
                                        />

                                        <TextAreaField
                                            label="Message"
                                            icon={MessageSquare}
                                            accentColor="hsl(var(--primary))"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Tell us about your project — goals, timeline, budget..."
                                        />

                                        <motion.button
                                            type="submit"
                                            disabled={sending}
                                            whileHover={sending ? {} : { scale: 1.02 }}
                                            whileTap={sending ? {} : { scale: 0.98 }}
                                            className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl
                       font-semibold text-sm transition-all disabled:opacity-60"
                                            style={{
                                                background: "hsl(var(--primary))",
                                                color: "hsl(var(--primary-foreground))",
                                                boxShadow: sending
                                                    ? "none"
                                                    : "0 10px 30px hsl(var(--primary)/0.35)",
                                            }}
                                        >
                                            {sending ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={15} />
                                                    Send Message
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}