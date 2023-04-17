import React, { FormEvent, useCallback, useRef, useState } from "react";
import { useKeyPressEvent } from "react-use";
import browser from "webextension-polyfill";

import { PromptInput } from "../components/PromptInput";
import { Suggestion } from "../components/Suggestion";
import { PromptCommand } from "../types/commands";
import useBookmarks from "../hooks/use-bookmarks";
import ChevronDown from "../icons/chevron-down";
import ChevronUp from "../icons/chevron-up";
import css from "./styles.module.css";
import useExistingTabs from "@src/hooks/use-existing-tabs";
import useExecute from "@src/hooks/use-execute";

const useSuggestionFocus = (
    suggestions: PromptCommand[],
    onFocusChange: (index: number) => void,
): PromptCommand | undefined => {
    const [focusedLine, setFocus] = useState(0);
    const moveFocus = useCallback(
        (value) => {
            const newIndex =
                (suggestions.length + focusedLine + value) % suggestions.length;
            setFocus(newIndex);
            onFocusChange(newIndex);
        },
        [focusedLine, setFocus, suggestions.length, onFocusChange],
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

    // Manage focus suggestion
    const suggestionListRef = useRef<HTMLUListElement>(null);
    const onFocusChange = (index: number) => {
        if (!suggestionListRef || !suggestionListRef.current) return;
        const selectedOption = suggestionListRef.current.childNodes[
            index
        ] as HTMLLIElement;
        if (selectedOption) {
            selectedOption.scrollIntoView({
                block: "nearest",
                inline: "center",
            });
        }
    };
    const focusedSuggestion = useSuggestionFocus(suggestions, onFocusChange);

    // Form validation
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        useExecute(focusedSuggestion);
    };

    return (
        <div className={css.popupContainer}>
            <form className="border-b border-b-gray-200" onSubmit={onSubmit}>
                <PromptInput onChange={updateInput} />
            </form>
            <ul
                ref={suggestionListRef}
                className="flex flex-grow flex-col items-stretch overflow-y-scroll"
            >
                {suggestions.map((suggestion, index) => (
                    <Suggestion
                        suggestion={suggestion}
                        key={suggestion.key}
                        hasFocus={suggestion.key === focusedSuggestion?.key}
                    />
                ))}
            </ul>
            <footer className="flex justify-end border-t border-t-gray-200 p-2 bg-gray-50">
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
