import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

type DocsItem = { href: string; label: string };
type DocsSection = { name: string; items: DocsItem[] };

export function DocsMobileSidebar({
  sections,
  currentPath,
}: {
  sections: DocsSection[];
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);

  const linkClass = (active: boolean) =>
    cn(
      "block border-b border-border/60 px-5 py-2.5 text-sm transition-colors",
      active
        ? "bg-accent/40 text-foreground"
        : "text-muted-foreground hover:bg-accent/20 hover:text-foreground",
    );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0 rounded-none border border-border"
            aria-label="Open docs menu"
          />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[18rem] max-w-[85vw] gap-0 p-0 sm:max-w-xs"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Documentation
          </SheetTitle>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto py-3">
          <div className="mb-2">
            <p className="px-5 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
              README
            </p>
            <a
              href="/docs"
              onClick={() => setOpen(false)}
              className={linkClass(currentPath === "/docs")}
            >
              <span className="inline-block pl-2">welcome</span>
            </a>
          </div>
          {sections.map((section) => (
            <div key={section.name} className="mb-2">
              <p className="px-5 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80">
                {section.name}
              </p>
              {section.items.map((item) => {
                const href = `/docs/${item.href}`;
                return (
                  <a
                    key={item.href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={linkClass(currentPath === href)}
                  >
                    <span className="inline-block pl-2">{item.label}</span>
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
