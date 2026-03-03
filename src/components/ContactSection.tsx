import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Send, CheckCircle2, Loader2, Mail, MapPin,
    MessageSquare, User, AtSign, FileText,
    Github, Linkedin, ArrowUpRight,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import emailjs from "emailjs-com";

type TermLine = {
    text: string;
    cls: string;
    id?: string;
};
/* ─── Terminal lines ────────────────────────────────────── */
const IDLE_LINES: { text: string; cls: string; id?: string }[] = [
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



/* ─── Terminal component ────────────────────────────────── */
function TerminalBlock({ lines }: { lines: TermLine[] }) {
    const [shown, setShown] = useState(lines.length);
    const bodyRef = useRef<HTMLDivElement>(null);

    // Only animate when line count increases
    useEffect(() => {
        if (lines.length > shown) {
            const t = setTimeout(() => {
                setShown((prev) => prev + 1);
            }, 80);
            return () => clearTimeout(t);
        } else {
            setShown(lines.length);
        }
    }, [lines.length, shown]);

    // Auto scroll
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [shown]);

    return (
        <div
            className="rounded-2xl overflow-hidden border border-white/[0.06] flex flex-col"
            style={{
                background: "hsl(222 47% 7%)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
            }}
        >
            <div
                className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] shrink-0"
                style={{ background: "hsl(222 47% 9%)" }}
            >
                <div className="flex gap-1.5">
                    {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                        <div key={c} className="w-2.5 h-2.5 rounded-full opacity-70" style={{ background: c }} />
                    ))}
                </div>
                <span className="font-mono text-[11px] text-slate-400 ml-2 select-none">
                    OS tech labsc — contact
                </span>
            </div>

            <div
                ref={bodyRef}
                className="p-5 space-y-[3px] h-64 overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
            >
                {lines.slice(0, shown).map((l, i) => (
                    <div
                        key={l.id ?? i}
                        className={`font-mono text-[12px] sm:text-[13px] leading-relaxed whitespace-pre ${l.cls}`}
                    >
                        {l.text || "\u00A0"}
                    </div>
                ))}
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
                    borderColor: focused ? `${accentColor}55` : "hsl(var(--border)/50)",
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
                    borderColor: focused ? `${accentColor}55` : "hsl(var(--border)/50)",
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
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
    }); const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [termLines, setTermLines] = useState(IDLE_LINES);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSending(true);
        setSent(false);
        setErrorMsg(null);

        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));

        try {
            // Basic validation
            if (!form.name || !form.email || !form.subject || !form.message) {
                setErrorMsg("All fields are required.");
                setSending(false);
                return;
            }

            // Terminal start
            setTermLines([
                { text: "$ OS tech labs --send-message", cls: "text-emerald-400" },
                { text: "Connecting to secure mail server...", cls: "text-slate-400" },
            ]);

            await delay(400);

            setTermLines((prev) => [
                ...prev,
                { text: `From    : ${form.name} <${form.email}>`, cls: "text-slate-400" },
                { text: `Phone   : ${form.phone}`, cls: "text-slate-400" },
                { text: `Subject : ${form.subject}`, cls: "text-slate-400" },
                { text: "Encrypting payload...", cls: "text-slate-400" },
                { id: "progress", text: "Sending ██████████ 0%", cls: "text-blue-400" },
            ]);

            const updateProgress = async (percent: number) => {
                setTermLines((prev) =>
                    prev.map((line) =>
                        line.id === "progress"
                            ? { ...line, text: `Sending ██████████ ${percent}%` }
                            : line
                    )
                );
                await delay(400);
            };

            await updateProgress(25);
            await updateProgress(50);
            await updateProgress(75);

            // Send main email
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID!,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
                {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    subject: form.subject,
                    message: form.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
            );

            // Auto reply
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID!,
                import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID!,
                {
                    name: form.name,
                    email: form.email,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
            );

            setTermLines((prev) =>
                prev.map((line) =>
                    line.id === "progress"
                        ? { ...line, text: "Sending ██████████ 100% ✓", cls: "text-emerald-400" }
                        : line
                )
            );
            setSent(true);
        } catch (error) {
            setTermLines((prev) => [
                ...prev,
                { text: "✗ ERROR: Failed to send message", cls: "text-red-400" },
            ]);
            setErrorMsg("Failed to send message. Please try again.");

        } finally {
            setSending(false);
        }
    };

    const handleReset = () => {
        setSent(false);
        setForm({ name: "", email: "", subject: "", message: "", phone: "" });
        setTermLines(IDLE_LINES);
    };

    return (
        <section
            id="contact"
            ref={ref}
            className=" bg-background overflow-hidden relative py-8"
        >
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
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
                                className="flex items-center gap-3 p-4 border-b"
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
                                            <Field
                                                label="Phone"
                                                icon={User}
                                                accentColor="hsl(var(--primary))"
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 9876543210"
                                            />
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
                                        </div>



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
                                        {errorMsg && (
                                            <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 font-medium">
                                                {errorMsg}
                                            </div>
                                        )}
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