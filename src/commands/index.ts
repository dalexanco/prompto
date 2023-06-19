import { CommandTemplate, CommandSuggestion } from "@src/types/commands";
import { useEffect, useState } from "react";
import { flatten } from "lodash";

import saveCurrentTab from "./save-current-tab";

export const DEFAULT_COMMANDS = [saveCurrentTab] as CommandTemplate[];

export const useSuggestions = (
    rawInput?: string,
    commands = DEFAULT_COMMANDS,
): { isLoading: boolean; suggestions: CommandSuggestion[] } => {
    const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        commands.forEach((command) => command.initialize());
    }, []);
    useEffect((): void => {
        (async function anyNameFunction() {
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
            setLoading(false);
        })();
    }, [setSuggestions, rawInput]);

    return { suggestions, isLoading };
};
