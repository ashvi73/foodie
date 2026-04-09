import { j as jsxRuntimeExports, L as Link } from "./index-DnwehUM6.js";
import { B as Button } from "./button-D5t3PDVn.js";
import { L as Layout, M as MapPin } from "./Layout-CMdgGqmX.js";
import { c as createLucideIcon, U as UtensilsCrossed } from "./utensils-crossed-C5p56U27.js";
import { A as ArrowRight } from "./arrow-right-BnmRRx3K.js";
import { S as ShoppingBag } from "./shopping-bag-t5LjaFX2.js";
import { U as Users, T as TrendingUp } from "./users-D_o_boGl.js";
import { S as Star } from "./star-CMrYIhEF.js";
import { C as Clock } from "./clock-BmlPv7li.js";
import { C as CircleCheck } from "./circle-check-Dojx_Wy9.js";
import { Z as Zap } from "./zap-xeHnLmfm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
      key: "1qvrer"
    }
  ],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
const ChefHat = createLucideIcon("chef-hat", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
const stats = [
  { icon: ShoppingBag, value: "500+", label: "Restaurants" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Star, value: "4.8", label: "Average Rating" },
  { icon: Clock, value: "30 min", label: "Avg Delivery" }
];
const howItWorks = [
  {
    step: "01",
    icon: Smartphone,
    title: "Browse & Discover",
    desc: "Explore hundreds of restaurants and cuisines near you. Filter by category, rating, or delivery time.",
    color: "bg-primary/10 text-primary"
  },
  {
    step: "02",
    icon: ShoppingBag,
    title: "Add to Cart",
    desc: "Pick your favourite dishes, customise your order, and add everything to your cart in seconds.",
    color: "bg-secondary/10 text-secondary"
  },
  {
    step: "03",
    icon: MapPin,
    title: "Fast Delivery",
    desc: "Your food is prepared fresh and delivered hot and fresh to your doorstep in under 30 minutes.",
    color: "bg-accent/10 text-accent"
  }
];
const values = [
  {
    icon: ChefHat,
    title: "Fresh & Quality",
    desc: "We partner only with restaurants that meet our quality standards for fresh ingredients."
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "Secure payments with Internet Identity — no passwords, no data breaches."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimised delivery routes and real-time tracking for the quickest deliveries."
  },
  {
    icon: TrendingUp,
    title: "Always Improving",
    desc: "We constantly collect feedback to improve our service and your experience."
  }
];
const cuisines = [
  "🍕 Pizza",
  "🍔 Burgers",
  "🍛 Biryani",
  "🥡 Chinese",
  "🌮 Rolls",
  "🍜 Noodles",
  "🥗 Salads",
  "🍰 Desserts"
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.07]",
          style: {
            backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.58 0.18 27) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.42 0.15 262) 0%, transparent 60%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center relative z-10 max-w-4xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-primary-foreground mb-6",
            style: { background: "var(--gradient-primary)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "About Foodie" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight", children: [
          "Bringing the best food",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "bg-clip-text text-transparent",
              style: { backgroundImage: "var(--gradient-primary)" },
              children: "right to you"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed", children: "Foodie is a modern food delivery platform connecting food lovers with the best local restaurants. Fast delivery, fresh food, and a seamless ordering experience — all in one app." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "btn-gradient rounded-xl px-8 py-5 text-base font-semibold gap-2",
              "data-ocid": "about-cta-order",
              children: [
                "Order Now",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "rounded-xl px-8 py-5 text-base font-semibold gap-2 border-border hover:border-primary/40",
              "data-ocid": "about-cta-signup",
              children: "Create Account"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map(({ icon: Icon, value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center text-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-xl flex items-center justify-center mb-1",
              style: { background: "var(--gradient-primary)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label })
        ]
      },
      label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3", children: "Our Mission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground mb-5 leading-tight", children: "Making great food accessible to everyone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed mb-6", children: "We believe everyone deserves access to delicious, quality food without the hassle. Our mission is to connect communities with local culinary talent — supporting small restaurants while bringing joy to every meal." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
          "Support local restaurants and chefs",
          "Deliver fresh food in record time",
          "Provide a transparent, fair platform",
          "Build technology that genuinely helps"
        ].map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-3 text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: point })
            ]
          },
          point
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-3xl opacity-20 blur-2xl",
            style: { background: "var(--gradient-primary)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card rounded-3xl border border-border p-8 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mb-2", children: '"' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-lg leading-relaxed mb-6 italic", children: "Great food shouldn't be a luxury. We're building the bridge between extraordinary local chefs and hungry people everywhere." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm",
                style: { background: "var(--gradient-primary)" },
                children: "AF"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Arjun Foodie" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Founder & CEO, Foodie" })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-widest mb-2", children: "Simple Process" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "How Foodie works" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: howItWorks.map(({ step, icon: Icon, title, desc, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl border border-border p-6 text-center card-elevated",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${color}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-primary-foreground",
                  style: { background: "var(--gradient-primary)" },
                  children: step.slice(-1)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: desc })
          ]
        },
        step
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-widest mb-2", children: "What We Stand For" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground", children: "Our values" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: values.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-4 bg-card rounded-2xl border border-border p-6 card-elevated",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                style: { background: "var(--gradient-primary)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: desc })
            ] })
          ]
        },
        title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-widest mb-2", children: "Explore Cuisines" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-8", children: "Something for every craving" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3", children: cuisines.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-5 py-2.5 bg-card rounded-full border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth cursor-pointer", children: c }) }, c)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: { background: "var(--gradient-primary)", opacity: 0.92 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container mx-auto px-4 text-center max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-12 h-12 text-primary-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-primary-foreground mb-4", children: "Ready to order?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-lg mb-8", children: "Join thousands of happy customers enjoying great food every day." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurants", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl px-10 py-5 text-base font-bold gap-2 shadow-lg",
            "data-ocid": "about-bottom-cta",
            children: [
              "Explore Restaurants",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  About as default
};
