import type { Contributor } from "@/types/github";

export interface ContributorTile {
    contributor: Contributor;
    /** Position and size as a percentage of the map. */
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ContributorMapOptions {
    /** Reference dimensions used to keep rectangle proportions sensible. */
    width: number;
    height: number;
    /**
     * Compresses the gap between large and small contribution counts so
     * 1-commit contributors still get a usable tile. 1 would be proportional.
     */
    exponent?: number;
}

interface WeightedContributor {
    contributor: Contributor;
    weight: number;
}

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

const totalWeight = (items: WeightedContributor[]) =>
    items.reduce((sum, item) => sum + item.weight, 0);

/**
 * Builds a balanced, recursively split mosaic. Every split consumes the full
 * parent rectangle, so the result always tiles the map with no empty cells.
 */
export function buildContributorMap(
    contributors: Contributor[],
    { width, height, exponent = 0.4 }: ContributorMapOptions,
): ContributorTile[] {
    if (!contributors.length) return [];

    const items: WeightedContributor[] = [...contributors]
        .sort((a, b) => b.contributions - a.contributions)
        .map((contributor) => ({
            contributor,
            weight: Math.max(contributor.contributions, 1) ** exponent,
        }));

    const tiles: ContributorTile[] = [];

    const layout = (
        group: WeightedContributor[],
        rect: Rect,
    ) => {
        if (group.length === 1) {
            tiles.push({
                contributor: group[0].contributor,
                x: (rect.x / width) * 100,
                y: (rect.y / height) * 100,
                w: (rect.w / width) * 100,
                h: (rect.h / height) * 100,
            });
            return;
        }

        const groupWeight = totalWeight(group);
        let runningWeight = 0;
        let splitIndex = 1;
        let closestToHalf = Infinity;

        for (let i = 1; i < group.length; i++) {
            runningWeight += group[i - 1].weight;
            const distance = Math.abs(groupWeight / 2 - runningWeight);

            if (distance < closestToHalf) {
                closestToHalf = distance;
                splitIndex = i;
            }
        }

        const first = group.slice(0, splitIndex);
        const second = group.slice(splitIndex);
        const firstShare = totalWeight(first) / groupWeight;

        if (rect.w >= rect.h) {
            layout(first, { ...rect, w: rect.w * firstShare });
            layout(second, {
                ...rect,
                x: rect.x + rect.w * firstShare,
                w: rect.w * (1 - firstShare),
            });
        } else {
            layout(first, { ...rect, h: rect.h * firstShare });
            layout(second, {
                ...rect,
                y: rect.y + rect.h * firstShare,
                h: rect.h * (1 - firstShare),
            });
        }
    };

    layout(items, { x: 0, y: 0, w: width, h: height });

    // Render in reading order so keyboard focus follows the visual map.
    return tiles.sort((a, b) => a.y - b.y || a.x - b.x);
}
