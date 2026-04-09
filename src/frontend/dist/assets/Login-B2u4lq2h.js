import { b as useAuth, u as useNavigate, f as useRouterState, r as reactExports, j as jsxRuntimeExports, g as LoadingSpinner } from "./index-DnwehUM6.js";
import { c as createLucideIcon, U as UtensilsCrossed } from "./utensils-crossed-C5p56U27.js";
import { Z as Zap } from "./zap-xeHnLmfm.js";
import { S as Star } from "./star-CMrYIhEF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const features = [
  { icon: ShieldCheck, label: "Secure & Private", desc: "No passwords, ever" },
  { icon: Zap, label: "Instant Login", desc: "One tap to get started" },
  { icon: Star, label: "Trusted Platform", desc: "Internet Computer powered" }
];
function Login() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const routerState = useRouterState();
  reactExports.useEffect(() => {
    var _a;
    if (isAuthenticated) {
      const from = (_a = routerState.location.state) == null ? void 0 : _a.from;
      navigate({ to: from ?? "/" });
    }
  }, [isAuthenticated, navigate, routerState.location.state]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative hidden lg:flex lg:w-1/2 flex-col items-center justify-center overflow-hidden",
        style: { background: "var(--gradient-primary)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center text-center px-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm border border-primary-foreground/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-7 h-7 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold text-primary-foreground", children: "Foodie" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-72 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-foreground/20 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/login-hero-food.dim_800x600.jpg",
                alt: "Delicious food variety",
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-display font-bold text-primary-foreground mb-3 leading-tight", children: [
              "Delicious food,",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "delivered to your door"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-lg max-w-xs", children: "Order from hundreds of restaurants with fast, reliable delivery." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 mt-8 w-full max-w-xs", children: features.map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-primary-foreground/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary-foreground", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary-foreground/70", children: desc })
                  ] })
                ]
              },
              label
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center bg-background px-6 py-12 lg:px-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-10 lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-12 h-12 rounded-xl flex items-center justify-center",
            style: { background: "var(--gradient-primary)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-6 h-6 text-primary-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-foreground", children: "Foodie" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center lg:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground mb-2", children: "Welcome back!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "Sign in to order your favorite food." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-md p-8 slide-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: login,
              disabled: isLoading,
              "data-ocid": "login-ii-btn",
              className: "w-full btn-gradient rounded-xl py-4 px-6 text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed mb-5",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Signing in..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sign in with Internet Identity" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Why Internet Identity?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [
            { icon: "🔐", text: "Secure, password-free login" },
            { icon: "🛡️", text: "Your data stays private" },
            { icon: "⚡", text: "Instant & seamless access" }
          ].map(({ icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
              ]
            },
            text
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6 leading-relaxed", children: [
          "By signing in, you agree to our",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium cursor-pointer hover:underline", children: "Terms of Service" }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium cursor-pointer hover:underline", children: "Privacy Policy" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
export {
  Login as default
};
