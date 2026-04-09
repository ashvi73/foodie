import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-DnwehUM6.js";
import { X } from "./Layout-CMdgGqmX.js";
const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl"
};
function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className
}) {
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  reactExports.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none m-0",
      "aria-modal": "true",
      "aria-label": title ?? "Dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Enter" && onClose(),
            role: "button",
            tabIndex: -1,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative z-10 w-full bg-card rounded-2xl shadow-elevated border border-border animate-slide-up",
              sizeClasses[size],
              className
            ),
            children: [
              title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              !title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground z-10",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children })
            ]
          }
        )
      ]
    }
  );
}
export {
  Modal as M
};
