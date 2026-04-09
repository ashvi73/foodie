import { useNavigate } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { ShieldCheck, Star, UtensilsCrossed, Zap } from "lucide-react";
import { useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

const features = [
  { icon: ShieldCheck, label: "Secure & Private", desc: "No passwords, ever" },
  { icon: Zap, label: "Instant Login", desc: "One tap to get started" },
  { icon: Star, label: "Trusted Platform", desc: "Internet Computer powered" },
];

export default function Login() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const routerState = useRouterState();

  useEffect(() => {
    if (isAuthenticated) {
      const from = (routerState.location.state as { from?: string } | null)
        ?.from;
      navigate({ to: from ?? "/" });
    }
  }, [isAuthenticated, navigate, routerState.location.state]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Hero visual panel */}
      <div
        className="relative hidden lg:flex lg:w-1/2 flex-col items-center justify-center overflow-hidden"
        style={{ background: "var(--gradient-primary)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm border border-primary-foreground/30">
              <UtensilsCrossed className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-4xl font-display font-bold text-primary-foreground">
              Foodie
            </span>
          </div>

          {/* Hero image */}
          <div className="w-72 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-foreground/20 mb-8">
            <img
              src="/assets/generated/login-hero-food.dim_800x600.jpg"
              alt="Delicious food variety"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-display font-bold text-primary-foreground mb-3 leading-tight">
            Delicious food,
            <br />
            delivered to your door
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xs">
            Order from hundreds of restaurants with fast, reliable delivery.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3 mt-8 w-full max-w-xs">
            {features.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-primary-foreground/20"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-primary-foreground">
                    {label}
                  </p>
                  <p className="text-xs text-primary-foreground/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login form panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-6 py-12 lg:px-16">
        {/* Mobile logo */}
        <div className="flex items-center gap-3 mb-10 lg:hidden">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}
          >
            <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-display font-bold text-foreground">
            Foodie
          </span>
        </div>

        <div className="w-full max-w-sm fade-in">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome back!
            </h2>
            <p className="text-muted-foreground text-base">
              Sign in to order your favorite food.
            </p>
          </div>

          {/* Login card */}
          <div className="bg-card rounded-2xl border border-border shadow-md p-8 slide-up">
            {/* Internet Identity button */}
            <button
              type="button"
              onClick={login}
              disabled={isLoading}
              data-ocid="login-ii-btn"
              className="w-full btn-gradient rounded-xl py-4 px-6 text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed mb-5"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Sign in with Internet Identity</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Why Internet Identity?
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-3">
              {[
                { icon: "🔐", text: "Secure, password-free login" },
                { icon: "🛡️", text: "Your data stays private" },
                { icon: "⚡", text: "Instant & seamless access" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-base">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            By signing in, you agree to our{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
