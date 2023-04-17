import { useEffect, useState } from "react";
import {
    PromptCommand,
    PromptCommandType,
    PromptQuery,
} from "../types/commands";

const MAX_RESULTS = 20;
const limit = (max: number) => (value: any, index: number) => index < max;

export default function useExistingTabs(input: string): PromptQuery {
    const [isLoading, setLoading] = useState(false);
    const [results, setResults] = useState([] as PromptCommand[]);

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
                    type: PromptCommandType.EXISTING_TAB,
                    title: tabElement.title || "Existing tab",
                    url: tabElement.url,
                }));

            setResults(results);
            setLoading(false);
        })();
    }, [input]);

    return { results, isLoading };
}
