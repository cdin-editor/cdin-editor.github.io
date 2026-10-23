const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export const navLinks = [
    { title: "Home", href: `${basePath}/` },
    { title: "Docs", href: `${basePath}/docs` },
    { title: "About", href: `${basePath}/about` },
    { title: "Download", href: `${basePath}/download` },
];
