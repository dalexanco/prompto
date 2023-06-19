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

export const DEFAULT_COMMANDS = [saveCurrentTab] as CommandTemplate[];

export const useSuggestions = (
    rawInput?: string,
    commands = DEFAULT_COMMANDS,
): PromptCommand[] => {
    const [suggestions, setSuggestions] = useState<PromptCommand[]>([]);
    useEffect(() => {
        commands.forEach((command) => command.initialize());
    }, []);
    useEffect(() => {
        (async () => {
            if (!rawInput) return;

            const suggestionsPromises = commands.map((command) => {
                if (!command.keywordRequired)
                    return command.generateSuggestions(rawInput);

                const matchingKeyword = command.keywords.find((keyword) =>
                    rawInput.startsWith(keyword),
                );

                if (!matchingKeyword) return Promise.resolve([]);

                const inputAfterKeyword = rawInput
                    .substring(matchingKeyword.length)
                    .trim();

                return command.generateSuggestions(inputAfterKeyword);
            });

            const results = await Promise.all(suggestionsPromises);

            setSuggestions(flatten(results));
        })();
    }, [rawInput]);

    return suggestions;
};
