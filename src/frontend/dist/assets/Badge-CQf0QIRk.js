import { j as jsxRuntimeExports, c as cn } from "./index-DnwehUM6.js";
const variantClasses = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/15 text-primary border border-primary/30",
  secondary: "bg-secondary/15 text-secondary border border-secondary/30",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  destructive: "bg-destructive/15 text-destructive border border-destructive/30",
  outline: "border border-border text-foreground",
  veg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800",
  nonveg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
};
function Badge({
  children,
  variant = "default",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      ),
      children
    }
  );
}
export {
  Badge as B
};
