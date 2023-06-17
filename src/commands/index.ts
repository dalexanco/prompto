import { PromptCommand } from "@src/types/commands";
import { useEffect, useState } from "react";
import { flatten } from "lodash";

import saveCurrentTab from "./save-current-tab";

interface CommandTemplate {
    keywordRequired: boolean;
    keywords: string[];
    initialize: () => void;
    generateSuggestions: (input: string) => Promise<PromptCommand[]>;
}

export const templates = [saveCurrentTab] as CommandTemplate[];

export const useSuggestions = (rawInput: string): PromptCommand[] => {
    const [suggestions, setSuggestions] = useState<PromptCommand[]>([]);
    useEffect(() => {
        templates.forEach((template) => template.initialize());
    }, []);
    useEffect(() => {
        (async () => {
            if (!rawInput) return;

            const suggestionsPromises = templates.map((template) => {
                if (!template.keywordRequired)
                    return template.generateSuggestions(rawInput);

                const matchingKeyword = template.keywords.find((keyword) =>
                    rawInput.startsWith(keyword),
                );

                if (!matchingKeyword) return Promise.resolve([]);

                const inputAfterKeyword = rawInput
                    .substring(matchingKeyword.length)
                    .trim();

                return template.generateSuggestions(inputAfterKeyword);
            });

            const results = await Promise.all(suggestionsPromises);

            setSuggestions(flatten(results));
        })();
    }, [rawInput]);

    return suggestions;
};
