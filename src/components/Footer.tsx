import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  MoveRight,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-us" },
  { name: "Technology", href: "#technology" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/onlinesavaari/", label: "IG" },
  { icon: Twitter, href: "https://twitter.com", label: "TW" },
  { icon: Linkedin, href: "https://in.linkedin.com/company/online-savaari-private-limited", label: "LI" },
  { icon: Facebook, href: "https://www.facebook.com/OnlineSavaari", label: "FB" },
];

const Footer = () => {
  return (
    <footer className="relative bg-background overflow-hidden border border-border rounded-lg shadow-md">

     

      

      {/* Main footer body */}
      <div className="container mx-auto px-6 pt-14 pb-6 relative z-10 ">

        <div className="grid grid-cols-12 gap-8">

          {/* Brand col — spans 5 */}
          <div className="col-span-12 md:col-span-5 space-y-6 pr-0 md:pr-8">
            <img src="/logo.png" alt="OS Tech Labs" className="h-10 w-auto" />

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              OS Tech Labs builds scalable web, mobile, AI and cloud
              solutions for startups and enterprises worldwide.
            </p>

            {/* Socials */}
            <div>
              <p className="text-[14px] font-semibold text-muted-foreground mb-3 text-gray-800">Follow Us</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>


          {/* Links col */}
          <div className="col-span-6 md:col-span-3">
            <p className="text-[14px] font-semibold text-muted-foreground mb-5 text-gray-800">Pages</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="col-span-6 md:col-span-3">
            <p className="text-[14px] font-semibold text-muted-foreground mb-5 text-gray-800">Contact</p>
            <div className="space-y-4 text-sm text-muted-foreground/70">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-primary transition-colors">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>Kolkata, India</span>
              </a>
              <a href="tel:+918282858285" className="flex gap-3 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>+91 8282 858 285</span>
              </a>
              <a href="mailto:info@ostechlabs.com" className="flex gap-3 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>info@ostechlabs.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href="https://onlinesavaari.com" className="text-primary font-semibold">Online Savaari</a>.
            All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="https://onlinesavaari.com/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="https://onlinesavaari.com/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;