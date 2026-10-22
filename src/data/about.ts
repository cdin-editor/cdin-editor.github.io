export const features = [
    "Modal editing built in and on by default. Vim-style Normal / Insert / Visual modes work out of the box.",
    "The codebase is meant to be readable. You should be able to find the edit loop, understand what it does, and change it. Functions are short. Modules are small. There are no clever abstractions that require you to know the whole project before touching any of it.",
    "Features belong in plugins. The core does the minimum that every editor needs. Anything optional is in data/plugins/ where it can be read, copied, modified, or replaced without touching the core. This is how lite-xl approaches things too, and it works.",
    "Startup time and memory use matter. The renderer only redraws what actually changed. Background tasks are coroutines, not threads. An idle cdin draws almost nothing and uses almost no CPU.",
    "Everything is Lua — commands, keybindings, UI behavior, syntax highlighting — all plain Lua loaded from data/ at startup. No recompiling required.",
    "Configurable through data/user/init.lua — plain Lua, no DSL. Change themes, keybindings, or any behavior you can imagine.",
];

export const paragraph =
    "cdin is for people who want a small, fast editor they can actually make their own. If you've used vim, the basics transfer directly. If you're curious how an editor works, the whole thing is readable and modifiable. If you just want a quick, quiet tool to open files and get out of the way, that works too.";
