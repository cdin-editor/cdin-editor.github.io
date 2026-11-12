export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerLinks: FooterSection[] = [
  {
    title: "docs",
    links: [
      {
        label: "overview",
        href: "/docs/architecture/overview",
      },
      {
        label: "getting started",
        href: "/docs/guides/getting-started",
      },
      {
        label: "extension contract",
        href: "/docs/architecture/extension-contract",
      },
      {
        label: "plugins",
        href: "/docs/guides/plugins",
      },
      {
        label: "buildings",
        href: "/docs/guides/building",
      },
    ],
  },
  {
    title: "project",
    links: [
      {
        label: "docs",
        href: "/docs",
      },
      {
        label: "about",
        href: "/about",
      },
      {
        label: "download",
        href: "/download",
      },
    ],
  },
  {
    title: "community",
    links: [
      {
        label: "organization",
        href: "https://github.com/cdin-editor",
        external: true,
      },
      {
        label: "repository",
        href: "https://github.com/cdin-editor/cdin",
        external: true,
      },
      {
        label: "changelog",
        href: "https://github.com/cdin-editor/cdin/blob/main/CHANGELOG.md",
        external: true,
      },
      {
        label: "issues",
        href: "https://github.com/cdin-editor/cdin/issues",
        external: true,
      },
      // {
      //   label: "discussions",
      //   href: "https://github.com/cdin-editor/cdin/discussions",
      //   external: true,
      // },
    ],
  },
];

export const copyrightlinks: FooterLink[] = [
  {
    label: "license",
    href: "/docs/others/license",
  },
  {
    label: "contribute",
    href: "/docs/others/contributing",
  },
  {
    label: "security",
    href: "/docs/others/security",
  },
];

