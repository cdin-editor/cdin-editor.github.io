import { useEffect, useMemo, useState } from "react";
import { cn } from "cn";

type Heading = { depth: number; slug: string; text: string };

export function DocsToc({ headings }: { headings: Heading[] }) {
  const items = useMemo(
    () => headings.filter((h) => h.depth >= 2 && h.depth <= 4 && h.slug),
    [headings],
  );
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const els = items
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:col-span-3 lg:block lg:border-l">
      <div className="sticky top-16 z-30 max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-5">
        <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
          On this page
        </p>
        <nav aria-label="On this page">
          <ul className="flex flex-col gap-0.5">
            {items.map((h) => {
              const active = activeId === h.slug;
              return (
                <li key={h.slug}>
                  <a
                    href={`#${h.slug}`}
                    className={cn(
                      "block border-l-2 py-1.5 pr-2 text-sm leading-snug transition-colors",
                      h.depth === 2 && "pl-2",
                      h.depth === 3 && "pl-5",
                      h.depth === 4 && "pl-8",
                      active
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                    aria-current={active ? "location" : undefined}
                  >
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
