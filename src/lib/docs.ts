import { getCollection } from "astro:content";

export interface DocsSection {
    name: string;
    items: {
        href: string;
        label: string;
    }[];
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
                    label: d.id.split("/").slice(1).join("/"),
                })),
        }),
    );
}
