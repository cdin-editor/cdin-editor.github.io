import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
    return (
        <Button
            className="rounded-none h-full m-0 px-6 self-stretch ring-0 border-0 border-l border-border bg-transparent hover:bg-accent/40"
            onClick={() => {
                document.documentElement.classList.toggle("dark");
            }}
            variant="ghost"
        >
            <Sun className="h-[1.8rem] w-[1.8rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.8rem] w-[1.8rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
