import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Technology", href: "#technology" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ─── IDs to observe (strips the leading "#") ───────────
const SECTION_IDS = navLinks.map(l => l.href.slice(1));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [hovered, setHovered] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  // Keep a ref to the active section so the click handler can override temporarily
  const clickedRef = useRef<string | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll-shadow ────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── IntersectionObserver — auto-detect active section ─
  useEffect(() => {
    const ratios: Record<string, number> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedRef.current) return;

        entries.forEach(entry => {
          ratios[entry.target.id] = entry.intersectionRatio;
        });
        let best = "";
        let bestRatio = -1;
        for (const id of SECTION_IDS) {
          const r = ratios[id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        }

        if (best) setActiveLink(`#${best}`);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: "-66px 0px -40% 0px",
      }
    );

    // Observe each section (silently skip missing ones)
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        ratios[id] = 0;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // ── Click: jump + briefly lock active to clicked link ─
  const handleLink = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickedRef.current = href;
    clickTimerRef.current = setTimeout(() => {
      clickedRef.current = null;
    }, 900);
  };
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth-page");
  };
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`border-b border-border sticky top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_0_hsl(var(--border)/0.6),0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-background "
          }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center h-[66px] gap-0">

            {/* ── Logo ── */}
            <a
              href="#home"
              onClick={() => handleLink("#home")}
              className="flex items-center shrink-0 pr-6 mr-1 border-r border-border/50 group"
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

            {/* ── Desktop links ── */}
            <div
              ref={navRef}
              className="hidden lg:flex items-stretch flex-1 h-full"
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                const isHov = hovered === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLink(link.href)}
                    onMouseEnter={() => setHovered(link.href)}
                    className="relative flex items-center px-3.5 xl:px-4 text-[13px] xl:text-[13.5px] font-medium select-none"
                  >
                    {/* Hover pill */}
                    {isHov && !isActive && (
                      <motion.span
                        layoutId="navHoverBg"
                        className="absolute inset-x-1 inset-y-[12px] rounded-lg bg-accent"
                        transition={{ type: "spring", stiffness: 600, damping: 45 }}
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-150 ${isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {link.label}
                    </span>

                    {/* Active bottom bar */}
                    {isActive && (
                      <motion.span
                        layoutId="activeBar"
                        className="absolute bottom-0 left-3 right-3 h-[3px] bg-primary rounded-t-sm"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* ── Right: CTA + hamburger ── */}
            <div className="ml-auto flex items-center gap-3 pl-5 border-l border-border/50">
              <Button
                variant="default"
                size="sm"
                className="hidden lg:inline-flex items-center gap-2 group font-semibold px-5"
                onClick={handleLoginClick} // Function triggered here
              >
                Login
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </Button>

              <button
                className="lg:hidden w-9 h-9 flex items-center justify-center text-foreground rounded-xl hover:bg-accent transition-colors"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={19} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-border/60 bg-background"
            >
              <div className="container mx-auto pt-4 pb-6 space-y-4">

                <div className="grid grid-cols-2 gap-1.5">
                  {navLinks.map((link, i) => {
                    const isActive = activeLink === link.href;
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLink(link.href)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        className={`flex items-center gap-2.5 py-3 px-4 rounded-2xl text-sm font-medium border transition-all duration-150 ${isActive
                          ? "bg-primary/[0.07] text-foreground border-primary/20"
                          : "text-muted-foreground border-transparent hover:bg-muted/60 hover:text-foreground"
                          }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobileActiveDot"
                            className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                  className="pt-3 border-t border-border/50 flex flex-col sm:flex-row gap-2"
                >
                  <Button
                    variant="default"
                    className="flex-1 gap-2 group font-semibold"
                    onClick={handleLoginClick} // Function triggered here

                    asChild
                  >
                    <a href="#contact" onClick={() => handleLink("#contact")}>
                     Login
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                  
                  <a
                    href="tel:+918967258388"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border/60 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    <Phone size={14} className="text-primary" />
                    Call Us
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;