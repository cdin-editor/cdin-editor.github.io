export interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

export const footerLinks: FooterLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/cdin-editor",
        external: true,
    },
    {
        label: "Docs",
        href: "/docs",
    },
    {
        label: "Changelog",
        href: "https://github.com/cdin-editor/cdin/blob/main/CHANGELOG.md",
        external: true,
    },
    {
        label: "Contribute",
        href: "https://github.com/cdin-editor/cdin/blob/main/CONTRIBUTING.md",
        external: true,
    },
];
