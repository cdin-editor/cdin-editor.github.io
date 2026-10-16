export async function getRelease(): Promise<{ tag_name: string }> {
    const DEFAULT_TAG = "v0.2";
    try {
        const res = await fetch(
            "https://api.github.com/repos/cdin-editor/cdin/releases/latest",
            { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json() as Promise<{ tag_name: string }>;
    } catch {
        return { tag_name: DEFAULT_TAG };
    }
}
