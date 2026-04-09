import { cn } from "@/lib/utils";

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div className={cn("bg-muted rounded-md animate-pulse-soft", className)} />
  );
}

export function SkeletonMenuItem() {
  return (
    <div className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border">
      <SkeletonBox className="w-24 h-24 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <SkeletonBox className="h-4 w-6" />
          <SkeletonBox className="h-4 w-2/3" />
        </div>
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-1">
          <SkeletonBox className="h-5 w-16" />
          <SkeletonBox className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonMenuList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <SkeletonMenuItem key={`skeleton-menu-${i}`} />
      ))}
    </div>
  );
}
