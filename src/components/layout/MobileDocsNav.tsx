import { SheetClose } from "@/components/ui/sheet";
import type { DocsSection } from "@/lib/docs";
import { cn } from "@/lib/utils";

interface MobileDocsNavProps {
    sections: DocsSection[];
    currentPath: string;
}

export default function MobileDocsNav({
    sections,
    currentPath,
}: MobileDocsNavProps) {
    const linkClassName = (href: string) =>
        cn(
            "w-full py-2.5 pr-6 text-sm duration-150 hover:text-primary",
            currentPath === href
                ? "text-primary pl-10 underline"
                : "text-muted-foreground pl-8 hover:pl-10",
        );

    return (
        <nav
            aria-label="Documentation"
            className="flex flex-col border-t border-border pb-4"
        >
            <span className="px-6 pt-5 pb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Documentation
            </span>
            <SheetClose
                render={<a href="/docs" className={linkClassName("/docs")} />}
            >
                Welcome
            </SheetClose>
            {sections.map((section) => (
                <div key={section.name} className="flex flex-col">
                    <span className="px-6 py-2 text-xs font-semibold tracking-widest uppercase">
                        {section.name}
                    </span>
                    {section.items.map((item) => {
                        const href = `/docs/${item.href}`;

                        return (
                            <SheetClose
                                key={item.href}
                                render={
                                    <a
                                        href={href}
                                        className={linkClassName(href)}
                                    />
                                }
                            >
                                {item.label}
                            </SheetClose>
                        );
                    })}
                </div>
            ))}
        </nav>
    );
}
