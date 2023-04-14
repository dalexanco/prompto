import React, { FormEvent, useCallback, useState } from "react";
import { useKeyPressEvent } from "react-use";
import browser from "webextension-polyfill";

import { PromptInput } from "../components/PromptInput";
import { Suggestion } from "../components/Suggestion";
import useBookmarks from "../hooks/use-bookmarks";
import ChevronDown from "../icons/chevron-down";
import ChevronUp from "../icons/chevron-up";
import { PromptCommand, PromptCommandType } from "../types/commands";
import css from "./styles.module.css";
import useExistingTabs from "@src/hooks/use-existing-tabs";
import useExecute from "@src/hooks/use-execute";

const useSuggestionFocus = (
    suggestions: PromptCommand[],
): PromptCommand | undefined => {
    const [focusedLine, setFocus] = useState(0);
    const moveFocus = useCallback(
        (value) => {
            setFocus(
                (suggestions.length + focusedLine + value) % suggestions.length,
            );
        },
        [focusedLine, setFocus, suggestions.length],
    );
    useKeyPressEvent("ArrowUp", () => moveFocus(-1));
    useKeyPressEvent("ArrowDown", () => moveFocus(1));

    return suggestions[focusedLine];
};

export function Popup(): JSX.Element {
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    const [inputValue, updateInput] = useState("");
    const { results: suggestionsBookmarks } = useBookmarks(inputValue);
    const { results: suggestionsTabs } = useExistingTabs(inputValue);
    const suggestions = [
        ...suggestionsTabs,
        ...suggestionsBookmarks,
    ] as PromptCommand[];
    const focusSuggestion = useSuggestionFocus(suggestions);

    // Form validation
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        useExecute(focusSuggestion);
    };

    return (
        <div className={css.popupContainer}>
            <form className="border-b border-b-gray-200" onSubmit={onSubmit}>
                <PromptInput onChange={updateInput} />
            </form>
            <section className="flex flex-grow flex-col items-stretch">
                {suggestions.map((suggestion, index) => (
                    <Suggestion
                        suggestion={suggestion}
                        key={suggestion.key}
                        hasFocus={suggestion.key === focusSuggestion?.key}
                    />
                ))}
            </section>
            <footer className="flex justify-end border-t border-t-gray-200 px-2 py-1 bg-gray-50">
                <p className="justify-self-end text-xs text-gray-500 italic">
                    Use{" "}
                    <span className=" inline-flex bg-gray-200 px-1 py-1 rounded-sm">
                        <ChevronUp className="w-2 h-2 inline-flex" />
                    </span>{" "}
                    <span className=" inline-flex bg-gray-200 px-1 py-1 rounded-sm">
                        <ChevronDown className="w-2 h-2 inline-flex" />
                    </span>{" "}
                    to navigate
                </p>
            </footer>
        </div>
    );
}
