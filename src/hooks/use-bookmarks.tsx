import { useEffect, useState } from "react";
import {
    PromptCommand,
    PromptCommandType,
    PromptQuery,
} from "../types/commands";
import { limit } from "@src/helpers/list";

const MAX_RESULTS = 5;

export default function useBookmarks(input: string): PromptQuery {
    const [isLoading, setLoading] = useState(false);
    const [results, setResults] = useState([] as PromptCommand[]);

    useEffect(() => {
        (async () => {
            if (!input) return;
            setLoading(true);
            const nodes = await chrome.bookmarks.search(input);
            const results = nodes
                .filter(limit(MAX_RESULTS))
                .map((treeNode) => ({
                    id: treeNode.id,
                    key: `bookmark-${treeNode.id}`,
                    type: PromptCommandType.BOOKMARK,
                    title: treeNode.title,
                    url: treeNode.url,
                }));
            setResults(results);
            setLoading(false);
        })();
    }, [input]);

    return { results, isLoading };
}
