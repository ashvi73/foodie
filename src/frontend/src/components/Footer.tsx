import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  UtensilsCrossed,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/about#careers" },
    { label: "Blog", href: "/about#blog" },
  ],
  "For Foodies": [
    { label: "Restaurants", href: "/restaurants" },
    { label: "Popular Dishes", href: "/restaurants" },
    { label: "Categories", href: "/restaurants" },
  ],
  Support: [
    { label: "Help Center", href: "/about#help" },
    { label: "Contact Us", href: "/about#contact" },
    { label: "Privacy Policy", href: "/about#privacy" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 pt-12 pb-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-border">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display font-bold text-2xl text-primary"
            >
              <UtensilsCrossed className="w-6 h-6" />
              <span>Foodie</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Delicious food delivered fast to your door. Browse local
              restaurants and order your favorites in minutes.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>hello@foodie.app</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h3 className="font-display font-semibold text-foreground text-sm">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {year} Foodie. Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
              { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
              { icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href={`https://www.${label.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-smooth"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
