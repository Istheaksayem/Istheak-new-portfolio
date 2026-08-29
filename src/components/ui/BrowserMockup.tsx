import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export function BrowserMockup({ url = "istheak.dev", children, className }: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground">
          {url}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
