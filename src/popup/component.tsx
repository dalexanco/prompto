import React, { useCallback, useState } from "react";
import { useKeyPressEvent } from "react-use";
import browser from "webextension-polyfill";

import { PromptInput } from "../components/PromptInput";
import { Suggestion } from "../components/Suggestion";
import useBookmarks from "../hooks/use-bookmarks";
import ChevronDown from "../icons/chevron-down";
import ChevronUp from "../icons/chevron-up";
import { PromptCommandType } from "../types/commands";
import css from "./styles.module.css";

export function Popup(): JSX.Element {
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    const [inputValue, updateInput] = useState("");
    const { results } = useBookmarks(inputValue);
    const suggestions = [
        { title: "A bug", type: PromptCommandType.UNKNOWN, key: "0" },
        ...results,
    ];
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

    return (
        <div className={css.popupContainer}>
            <header className="border-b border-b-gray-200">
                <PromptInput onChange={updateInput} />
            </header>
            <section className="flex flex-grow flex-col items-stretch">
                {suggestions.map((suggestion, index) => (
                    <Suggestion
                        key={suggestion.key}
                        title={suggestion.title}
                        description={suggestion.description}
                        type={suggestion.type}
                        hasFocus={focusedLine === index}
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
