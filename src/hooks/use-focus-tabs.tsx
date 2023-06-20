import { useEffect, useState } from "react";
import { CommandSuggestion, CommandType, PromptQuery } from "../types/commands";
import { limit } from "@src/helpers/list";

const MAX_RESULTS = 20;

export default function useFocusTabs(input: string): PromptQuery {
    const [isLoading, setLoading] = useState(false);
    const [results, setResults] = useState([] as CommandSuggestion[]);

    useEffect(() => {
        (async () => {
            if (!input) return;
            setLoading(true);
            const tabs = await chrome.tabs.query({ currentWindow: true });
            const results = tabs
                .filter(({ title = "" }) =>
                    title
                        ?.toLocaleLowerCase()
                        .includes(input.toLocaleLowerCase()),
                )
                .filter(limit(MAX_RESULTS))
                .map((tabElement) => ({
                    id: tabElement.id ? `${tabElement.id}` : "",
                    key: `bookmark-${tabElement.id}`,
                    type: CommandType.FOCUS_TAB,
                    title: tabElement.title || "Existing tab",
                    url: tabElement.url,
                }));

            setResults(results);
            setLoading(false);
        })();
    }, [input]);

    return { results, isLoading };
}
