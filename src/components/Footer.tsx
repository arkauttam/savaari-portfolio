import {
  Globe,
  Smartphone,
  Brain,
  Cloud,
  ShieldCheck,
  Database,
  Code2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";

const services = [
  { name: "Web Development", href: "/web-development", icon: Globe },
  { name: "Mobile App Development", href: "/mobile-apps", icon: Smartphone },
  { name: "AI & Automation", href: "/ai-solutions", icon: Brain },
  { name: "Cloud Solutions", href: "/cloud", icon: Cloud },
  { name: "Cyber Security", href: "/cyber-security", icon: ShieldCheck },
  { name: "Database Architecture", href: "/database", icon: Database },
  { name: "Custom Software", href: "/custom-software", icon: Code2 },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: Facebook, href: "https://facebook.com" },
];

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/40 border-t">
      <div className="container mx-auto px-6 py-16 border border-border/50 rounded-3xl bg-background/80 backdrop-blur-sm">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <a
                href="#home"
                className="flex items-center shrink-0 pr-6 mr-1 border-r border-border/50 group"
              >
                <img
                  src="/logo.png"
                  alt="OS Tech Labs"
                  width={120}
                  height={44}
                  className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
                />
              </a>

              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                OS Tech Labs is a full-service IT company delivering
                scalable web, mobile, AI and cloud solutions for
                startups and enterprises worldwide.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socials.map((s, index) => (
                <a
                  key={index}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <s.icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <service.icon className="w-4 h-4" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
              Contact Us
            </h4>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                Kolkata, India
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+918282858285" className="hover:text-primary">
                  +91 8282858285
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:info@ostechlabs.com"
                  className="hover:text-primary"
                >
                  info@ostechlabs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} OS Tech Labs. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;