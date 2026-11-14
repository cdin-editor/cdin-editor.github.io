import { useState } from "react";
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

type DocsItem = { href: string; label: string };
type DocsSection = { name: string; items: DocsItem[] };

export function DocsSearch({ sections }: { sections: DocsSection[] }) {
  const [open, setOpen] = useState(false);

  const go = (href: string, external?: boolean) => {
    setOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search docs..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Docs">
              <CommandItem onSelect={() => go("/docs")}>
                <FileText />
                <span>README / welcome</span>
              </CommandItem>
              {sections.flatMap((section) =>
                section.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${section.name} ${item.label}`}
                    onSelect={() => go(`/docs/${item.href}`)}
                  >
                    <FileText />
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {section.name}
                    </span>
                  </CommandItem>
                )),
              )}
            </CommandGroup>
            <CommandGroup heading="Site">
              <CommandItem onSelect={() => go("/")}>
                <Home />
                <span>Back to site</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/about")}>
                <Info />
                <span>About</span>
              </CommandItem>
              <CommandItem onSelect={() => go("/download")}>
                <Download />
                <span>Download</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  go("https://github.com/cdin-editor/cdin", true)
                }
              >
                <ExternalLink />
                <span>GitHub</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
