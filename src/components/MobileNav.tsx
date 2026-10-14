import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button
                        className="rounded-none h-full m-0 px-6 self-stretch ring-0 border-0 border-l border-border "
                        variant="ghost"
                    >
                        <MenuIcon />
                    </Button>
                }
            ></SheetTrigger>
            <SheetContent
                side="right"
                className="bg-transparent backdrop-blur-xl"
            >
                <SheetHeader>
                    <SheetTitle>Title</SheetTitle>
                    <SheetDescription>Description</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
