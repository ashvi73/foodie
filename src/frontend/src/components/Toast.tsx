import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import type { ToastMessage, ToastVariant } from "../types";

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const variantConfig: Record<
  ToastVariant,
  { icon: React.ReactNode; classes: string }
> = {
  success: {
    icon: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
    classes:
      "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
    classes:
      "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
  },
  info: {
    icon: <Info className="w-5 h-5 flex-shrink-0" />,
    classes:
      "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
    classes:
      "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300",
  },
};

export function Toast({ toast, onRemove }: ToastProps) {
  const config = variantConfig[toast.variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-slide-up min-w-[280px] max-w-[380px]",
        config.classes,
      )}
      role="alert"
    >
      {config.icon}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="rounded-md p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (!toasts.length) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
