import { cn } from "@/lib/utils";

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div className={cn("bg-muted rounded-md animate-pulse-soft", className)} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
      <SkeletonBox className="w-full h-48" />
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <SkeletonBox className="h-5 flex-1 max-w-[60%]" />
          <SkeletonBox className="h-5 w-12" />
        </div>
        <SkeletonBox className="h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <SkeletonBox className="h-4 w-16" />
          <SkeletonBox className="h-4 w-20" />
        </div>
        <div className="flex gap-2 pt-1">
          <SkeletonBox className="h-6 w-14 rounded-full" />
          <SkeletonBox className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <SkeletonCard key={`skeleton-card-${i}`} />
      ))}
    </div>
  );
}
