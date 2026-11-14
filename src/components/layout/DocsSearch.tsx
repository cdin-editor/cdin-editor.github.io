import { useMemo, useState } from "react";
import {
  FileText,
  Home,
  Info,
  Download,
  ExternalLink,
  Search,
} from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type DocsSearchEntry = {
  href: string;
  title: string;
  section: string;
  bodyText: string;
};

type SiteItem = {
  href: string;
  label: string;
  external?: boolean;
  icon: typeof Home;
};

const siteItems: SiteItem[] = [
  { href: "/", label: "Back to site", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/download", label: "Download", icon: Download },
  {
    href: "https://github.com/cdin-editor/cdin",
    label: "GitHub",
    external: true,
    icon: ExternalLink,
  },
];

function normalize(s: string) {
  return s.toLowerCase();
}

function snippet(text: string, query: string, len = 140) {
  if (!query) return text.slice(0, len).trim() + (text.length > len ? "…" : "");
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1)
    return text.slice(0, len).trim() + (text.length > len ? "…" : "");
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + q.length + len - 40);
  let out = text.slice(start, end).trim();
  if (start > 0) out = "…" + out;
  if (end < text.length) out += "…";
  return out;
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const parts: Array<{ t: string; h: boolean }> = [];
  let i = 0;
  while (i < text.length) {
    const idx = lower.indexOf(q, i);
    if (idx === -1) {
      parts.push({ t: text.slice(i), h: false });
      break;
    }
    if (idx > i) parts.push({ t: text.slice(i, idx), h: false });
    parts.push({ t: text.slice(idx, idx + q.length), h: true });
    i = idx + q.length;
  }
  return (
    <>
      {parts.map((p, n) =>
        p.h ? (
          <mark
            key={n}
            className="rounded-sm bg-foreground/15 px-0.5 text-foreground"
          >
            {p.t}
          </mark>
        ) : (
          <span key={n}>{p.t}</span>
        ),
      )}
    </>
  );
}

export function DocsSearch({
  searchEntries,
}: {
  searchEntries: DocsSearchEntry[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const go = (href: string, external?: boolean) => {
    setOpen(false);
    setQuery("");
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  const q = query.trim();
  const nq = normalize(q);

  const results = useMemo(() => {
    const docMatches = searchEntries.filter((e) => {
      if (!nq) return true;
      return (
        normalize(e.title).includes(nq) ||
        normalize(e.section).includes(nq) ||
        normalize(e.bodyText).includes(nq)
      );
    });
    const siteMatches = siteItems.filter((s) => {
      if (!nq) return true;
      return normalize(s.label).includes(nq);
    });
    return {
      docMatches,
      siteMatches,
      count: docMatches.length + siteMatches.length,
    };
  }, [searchEntries, nq]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 w-full max-w-[11rem] items-center gap-2 border border-border bg-background px-2 text-left text-xs text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground sm:max-w-xs md:h-9 md:max-w-sm md:px-3 md:text-sm"
      >
        <Search className="size-4 shrink-0 opacity-50" />
        <span className="truncate">Search docs...</span>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setQuery("");
        }}
        className="!rounded-none top-4 translate-y-0 sm:top-[8vh]"
      >
        <Command
          shouldFilter={false}
          className="!rounded-none mb-1 [&_[data-slot=input-group]]:!rounded-none [&_[data-slot=command-item]]:!rounded-none [&_[data-slot=command-group]]:!rounded-none"
        >
          <CommandInput
            placeholder="Search docs..."
            value={query}
            onValueChange={setQuery}
          />
          {q && (
            <>
              <div className="border-b border-border px-3 py-1.5 text-xs text-muted-foreground">
                {results.count} {results.count === 1 ? "result" : "results"}
              </div>
              <CommandList className="max-h-[60vh]">
                {results.count === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                {results.docMatches.length > 0 && (
                  <CommandGroup heading="Docs">
                    {results.docMatches.map((entry) => {
                      const snip = snippet(entry.bodyText, q);
                      return (
                        <CommandItem
                          key={entry.href}
                          value={entry.href}
                          onSelect={() => go(entry.href)}
                          className="items-start py-2"
                        >
                          <FileText className="mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate font-medium text-foreground">
                                <Highlight text={entry.title} query={q} />
                              </span>
                              <span className="shrink-0 text-[11px] uppercase tracking-wide text-muted-foreground">
                                {entry.section}
                              </span>
                            </div>
                            <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              <Highlight text={snip} query={q} />
                            </div>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
                {results.siteMatches.length > 0 && (
                  <CommandGroup heading="Site">
                    {results.siteMatches.map((item) => {
                      const Icon = item.icon;
                      return (
                        <CommandItem
                          key={item.href}
                          value={item.href}
                          onSelect={() => go(item.href, item.external)}
                        >
                          <Icon />
                          <span>
                            <Highlight text={item.label} query={q} />
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </>
          )}
        </Command>
      </CommandDialog>
    </>
  );
}
