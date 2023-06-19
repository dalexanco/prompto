import { useEffect, useState } from "react";
import {
    CommandSuggestion,
    CommandSuggestionType,
    PromptQuery,
} from "../types/commands";

const COMMANDS = [
    {
        type: CommandSuggestionType.CURRENT_TAB_PIN,
        key: `tab-current-pin`,
        id: `tab-current-pin`,
        title: "Pin current tab",
    },
    {
        type: CommandSuggestionType.CURRENT_TAB_UNPIN,
        key: `tab-current-unpin`,
        id: `tab-current-unpin`,
        title: "Unpin current tab",
    },
] as CommandSuggestion[];

export default function useTabTools(input: string): PromptQuery {
    const [ignoredTypes, ignoreTypes] = useState<CommandSuggestionType[]>([]);
    useEffect(() => {
        (async function () {
            const [currentTab] = await chrome.tabs.query({
                lastFocusedWindow: true,
                active: true,
            });
            currentTab?.pinned
                ? ignoreTypes([CommandSuggestionType.CURRENT_TAB_PIN])
                : ignoreTypes([CommandSuggestionType.CURRENT_TAB_UNPIN]);
        })();
    }, []);

    const isLoading = false;
    if (!input) return { results: [], isLoading };

    const results = COMMANDS.filter(({ title }) =>
        title.toLowerCase().includes(input.toLowerCase()),
    ).filter(({ type }) => !ignoredTypes.includes(type));

    return { results, isLoading };
}
