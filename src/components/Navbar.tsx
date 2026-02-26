import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Services",     href: "#services" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState("#home");
  const [hovered,     setHovered]     = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Announcement bar ───────────────────────────────── */}
      <motion.div
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full bg-primary text-primary-foreground text-xs font-medium tracking-wide transition-all duration-500 overflow-hidden ${
          scrolled ? "opacity-0 h-0 py-0" : "opacity-100 py-2"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Left */}
          <span className="hidden sm:flex items-center gap-1.5 text-primary-foreground/80">
            <Phone size={10} className="shrink-0" />
            <span>8282858285</span>
          </span>
          {/* Center */}
          <span className="flex items-center justify-center gap-2 flex-1 sm:flex-none mx-auto">
            <MapPin size={11} className="shrink-0" />
            Book your ticket across the world — Fast, Safe &amp; Reliable
          </span>
          {/* Right */}
          <a
            href="#services"
            className="hidden sm:inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-75 transition-opacity font-semibold"
          >
            Explore services <ArrowRight size={10} />
          </a>
        </div>
      </motion.div>

      {/* ── Main Navbar ─────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_0_hsl(var(--border)/0.6),0_4px_20px_rgba(0,0,0,0.06)]"
            : "bg-background border-b border-border/60"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center h-[66px] gap-0">

            {/* ── Logo ──────────────────────────────────────── */}
            <a
              href="#home"
              onClick={() => handleLink("#home")}
              className="flex items-center shrink-0 pr-6 mr-1 border-r border-border/50 group"
            >
              <img
                src="/logo.png"
                alt="Online Savaari"
                width={120}
                height={44}
                className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
                loading="eager"
              />
            </a>

            {/* ── Desktop links ──────────────────────────────── */}
            <div
              ref={navRef}
              className="hidden lg:flex items-stretch flex-1 h-full"
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                const isHov    = hovered    === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLink(link.href)}
                    onMouseEnter={() => setHovered(link.href)}
                    className="relative flex items-center px-3.5 xl:px-4 text-[13px] xl:text-[13.5px] font-medium"
                  >
                    {/* Hover pill bg */}
                    {isHov && !isActive && (
                      <motion.span
                        layoutId="navHoverBg"
                        className="absolute inset-x-1 inset-y-[12px] rounded-lg bg-accent"
                        transition={{ type: "spring", stiffness: 600, damping: 45 }}
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-150 ${
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </span>

                    {/* Active — primary bottom bar (matches section headings' primary accent) */}
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

            {/* ── Right side: CTA + mobile toggle ───────────── */}
            <div className="ml-auto flex items-center gap-3 pl-5 border-l border-border/50">

              {/* Phone — visible md+ */}
              <a
                href="tel:+919876543210"
                className="hidden md:flex lg:hidden xl:flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone size={13} className="text-primary" />
                </div>
                <span className="hidden xl:inline">82828 58285</span>
              </a>

              {/* CTA button — matches site's button style */}
              <Button
                variant="default"
                size="sm"
                className="hidden lg:inline-flex items-center gap-2 group font-semibold px-5"
                onClick={() => window.open("https://onlinesavaari.com", "_blank")}

              >
                Get Started
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </Button>

              {/* Mobile hamburger */}
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

        {/* ── Mobile drawer ─────────────────────────────────── */}
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

                {/* Nav links — 2 col grid matching mobile card grid style in the site */}
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
                        className={`flex items-center gap-2.5 py-3 px-4 rounded-2xl text-sm font-medium border transition-all duration-150 ${
                          isActive
                            ? "bg-primary/[0.07] text-foreground border-primary/20"
                            : "text-muted-foreground border-transparent hover:bg-muted/60 hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        )}
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Divider + CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                  className="pt-3 border-t border-border/50 flex flex-col sm:flex-row gap-2"
                >
                  <Button variant="default" className="flex-1 gap-2 group font-semibold" 
                onClick={() => window.open("https://onlinesavaari.com", "_blank")}
>
                    Get Started
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                  <a
                    href="tel:+919876543210"
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