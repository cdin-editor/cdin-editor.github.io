export async function getRelease(): Promise<{ tag_name: string }> {
  const DEFAULT_TAG = "v0.2";
  try {
    const res = await fetch(
      "https://api.github.com/repos/cdin-editor/cdin/releases?per_page=1",
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const [latest] = (await res.json()) as { tag_name: string }[];
    if (!latest) throw new Error("Empty response");
    return latest;
  } catch {
    return { tag_name: DEFAULT_TAG };
  }
}
