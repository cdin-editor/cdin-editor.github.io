import { getCollection } from "astro:content";

export interface DocsSection {
    name: string;
    items: {
        href: string;
        label: string;
    }[];
}

export interface DocsSearchEntry {
    href: string;
    title: string;
    section: string;
    bodyText: string;
}

function stripMarkdown(md: string): string {
    return md
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/[*_~>|-]+/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function titleFromDoc(id: string, body: string): string {
    const match = body.match(/^#\s+(.+)$/m);
    if (match) return match[1].trim();
    return id.split("/").slice(1).join("/") || id;
}

export async function getDocsSections(): Promise<DocsSection[]> {
    const docs = await getCollection("docs");

    return [...new Set(docs.map((d) => d.id.split("/")[0]))].map(
        (section) => ({
            name: section,
            items: docs
                .filter((d) => d.id.split("/")[0] === section)
                .map((d) => ({
                    href: d.id,
                    label: titleFromDoc(d.id, d.body ?? ""),
                })),
        }),
    );
}

export async function getDocsSearchEntries(
    readmeBody: string,
): Promise<DocsSearchEntry[]> {
    const docs = await getCollection("docs");
    const entries: DocsSearchEntry[] = [
        {
            href: "/docs",
            title: "README / welcome",
            section: "Docs",
            bodyText: stripMarkdown(readmeBody),
        },
    ];

    for (const doc of docs) {
        const body = doc.body ?? "";
        const section = doc.id.split("/")[0] ?? "docs";
        entries.push({
            href: `/docs/${doc.id}`,
            title: titleFromDoc(doc.id, body),
            section,
            bodyText: stripMarkdown(body),
        });
    }

    return entries;
}
