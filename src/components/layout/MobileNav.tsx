import { MenuIcon, Plus } from "lucide-react";
import { navLinks } from "@/data/navlinks";
import type { DocsSection } from "@/lib/docs";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import MobileDocsNav from "./MobileDocsNav";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/components/ui/sheet";

interface MobileNavProps {
    docsSections?: DocsSection[];
    currentPath?: string;
}

export default function MobileNav({
    docsSections = [],
    currentPath = "/",
}: MobileNavProps) {
    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button
                        className="rounded-none h-full m-0 px-6 self-stretch ring-0 border-0 border-l border-border bg-transparent"
                        variant="ghost"
                    >
                        <MenuIcon className="size-5" />
                    </Button>
                }
            />
            <SheetContent
                side="right"
                className="bg-background flex flex-col gap-0 p-0 border-x"
            >
                <SheetHeader className="gap-0 p-0 space-y-0">
                    <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                    <SheetDescription className="sr-only">
                        Site navigation, documentation, theme and GitHub links
                    </SheetDescription>
                    <div className="flex items-center gap-2 px-6 py-4 border-b">
                        <Plus className="size-3 text-muted-foreground" />
                        <span className="text-xs tracking-widest text-muted-foreground">
                            CDIN
                        </span>
                    </div>
                </SheetHeader>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain border-t border-border">
                    <nav className="flex flex-col">
                        {navLinks.map((link, i) => (
                            <SheetClose
                                key={link.href}
                                render={
                                    <a
                                        href={link.href}
                                        className="flex items-center justify-between gap-4 px-6 py-4 border-b text-sm hover:bg-muted transition-colors group last:border-b-0"
                                    />
                                }
                            >
                                <span className="font-medium">
                                    {link.title}
                                </span>
                                <span className="text-[10px] tracking-widest text-muted-foreground group-hover:text-foreground">
                                    0{i + 1}
                                </span>
                            </SheetClose>
                        ))}
                    </nav>

                    {docsSections.length > 0 && (
                        <MobileDocsNav
                            sections={docsSections}
                            currentPath={currentPath}
                        />
                    )}
                </div>

                <div className="flex border-t">
                    <Button
                        className="flex-[2] gap-4 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                        render={
                            <a
                                href="https://github.com/cdin-editor/cdin"
                                target="_blank"
                                rel="noreferrer"
                            />
                        }
                    >
                        <img
                            src="/github.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="size-5 invert dark:invert-0"
                        />
                        <span>GitHub</span>
                    </Button>
                    <div className="flex-1 flex [&>button]:flex-1 [&>button]:w-full [&>button]:rounded-none">
                        <ModeToggle />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
