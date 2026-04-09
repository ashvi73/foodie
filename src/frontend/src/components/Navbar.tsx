import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  User,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useTheme } from "../hooks/useTheme";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, login, logout, principal } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-3)}`
    : "";

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <nav
        className="container mx-auto px-4 h-16 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-2xl text-primary transition-smooth hover:opacity-90"
          data-ocid="nav-logo"
        >
          <UtensilsCrossed className="w-6 h-6" />
          <span>Foodie</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-smooth",
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            data-ocid="nav-theme-toggle"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
            aria-label={`Cart (${cartCount} items)`}
            data-ocid="nav-cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-smooth text-sm font-medium"
                data-ocid="nav-user-menu"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                <div className="w-7 h-7 rounded-full btn-gradient flex items-center justify-center text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-muted-foreground">{shortPrincipal}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    userMenuOpen && "rotate-180",
                  )}
                />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                    onKeyDown={(e) =>
                      e.key === "Escape" && setUserMenuOpen(false)
                    }
                    role="button"
                    tabIndex={-1}
                    aria-label="Close menu"
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-popover border border-border rounded-xl shadow-elevated z-20 animate-slide-up">
                    <div className="p-3 border-b border-border">
                      <p className="text-xs text-muted-foreground">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium truncate">
                        {shortPrincipal}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-smooth"
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-smooth"
                      >
                        <ShoppingCart className="w-4 h-4" /> Orders
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm hover:bg-destructive/10 text-destructive transition-smooth"
                        data-ocid="nav-logout"
                      >
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={login}
              className="hidden md:flex btn-gradient px-4 py-2 rounded-lg text-sm"
              data-ocid="nav-login"
            >
              Sign In
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="nav-mobile-toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-slide-up">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-smooth",
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-smooth"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-smooth"
                >
                  Orders
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                className="w-full btn-gradient px-4 py-3 rounded-lg text-sm mt-2"
                data-ocid="nav-mobile-login"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
