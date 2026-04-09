import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Clock,
  MapPin,
  Shield,
  ShoppingBag,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { Layout } from "../components/Layout";

const stats = [
  { icon: ShoppingBag, value: "500+", label: "Restaurants" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Star, value: "4.8", label: "Average Rating" },
  { icon: Clock, value: "30 min", label: "Avg Delivery" },
];

const howItWorks = [
  {
    step: "01",
    icon: Smartphone,
    title: "Browse & Discover",
    desc: "Explore hundreds of restaurants and cuisines near you. Filter by category, rating, or delivery time.",
    color: "bg-primary/10 text-primary",
  },
  {
    step: "02",
    icon: ShoppingBag,
    title: "Add to Cart",
    desc: "Pick your favourite dishes, customise your order, and add everything to your cart in seconds.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    step: "03",
    icon: MapPin,
    title: "Fast Delivery",
    desc: "Your food is prepared fresh and delivered hot and fresh to your doorstep in under 30 minutes.",
    color: "bg-accent/10 text-accent",
  },
];

const values = [
  {
    icon: ChefHat,
    title: "Fresh & Quality",
    desc: "We partner only with restaurants that meet our quality standards for fresh ingredients.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "Secure payments with Internet Identity — no passwords, no data breaches.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimised delivery routes and real-time tracking for the quickest deliveries.",
  },
  {
    icon: TrendingUp,
    title: "Always Improving",
    desc: "We constantly collect feedback to improve our service and your experience.",
  },
];

const cuisines = [
  "🍕 Pizza",
  "🍔 Burgers",
  "🍛 Biryani",
  "🥡 Chinese",
  "🌮 Rolls",
  "🍜 Noodles",
  "🥗 Salads",
  "🍰 Desserts",
];

export default function About() {
  return (
    <Layout>
      {/* ── Hero section ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.58 0.18 27) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.42 0.15 262) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 py-20 text-center relative z-10 max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-primary-foreground mb-6"
            style={{ background: "var(--gradient-primary)" }}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>About Foodie</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            Bringing the best food{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              right to you
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Foodie is a modern food delivery platform connecting food lovers
            with the best local restaurants. Fast delivery, fresh food, and a
            seamless ordering experience — all in one app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/restaurants">
              <Button
                className="btn-gradient rounded-xl px-8 py-5 text-base font-semibold gap-2"
                data-ocid="about-cta-order"
              >
                Order Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="rounded-xl px-8 py-5 text-base font-semibold gap-2 border-border hover:border-primary/40"
                data-ocid="about-cta-signup"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-muted/30 border-y border-border py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground">
                  {value}
                </p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                Our Mission
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground mb-5 leading-tight">
                Making great food accessible to everyone
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We believe everyone deserves access to delicious, quality food
                without the hassle. Our mission is to connect communities with
                local culinary talent — supporting small restaurants while
                bringing joy to every meal.
              </p>
              <ul className="space-y-3">
                {[
                  "Support local restaurants and chefs",
                  "Deliver fresh food in record time",
                  "Provide a transparent, fair platform",
                  "Build technology that genuinely helps",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-2xl"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div className="relative bg-card rounded-3xl border border-border p-8 shadow-md">
                <p className="text-2xl font-display font-bold text-foreground mb-2">
                  "
                </p>
                <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                  Great food shouldn't be a luxury. We're building the bridge
                  between extraordinary local chefs and hungry people
                  everywhere.
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    AF
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Arjun Foodie
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Founder & CEO, Foodie
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              How Foodie works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, icon: Icon, title, desc, color }) => (
              <div
                key={step}
                className="bg-card rounded-2xl border border-border p-6 text-center card-elevated"
              >
                <div className="relative inline-block mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {step.slice(-1)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our values ── */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              What We Stand For
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Our values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 bg-card rounded-2xl border border-border p-6 card-elevated"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cuisines ── */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
            Explore Cuisines
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Something for every craving
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {cuisines.map((c) => (
              <Link key={c} to="/restaurants">
                <span className="px-5 py-2.5 bg-card rounded-full border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth cursor-pointer">
                  {c}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-primary)", opacity: 0.92 }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-2xl">
          <UtensilsCrossed className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Ready to order?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Join thousands of happy customers enjoying great food every day.
          </p>
          <Link to="/restaurants">
            <Button
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl px-10 py-5 text-base font-bold gap-2 shadow-lg"
              data-ocid="about-bottom-cta"
            >
              Explore Restaurants
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
