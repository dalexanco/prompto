import React, { useCallback, useState } from "react";
import { useKeyPressEvent } from "react-use";
import browser from "webextension-polyfill";

import { PromptInput } from "../components/PromptInput";
import { Suggestion } from "../components/Suggestion";
import ChevronDown from "../icons/chevron-down";
import ChevronUp from "../icons/chevron-up";
import css from "./styles.module.css";

export function Popup(): JSX.Element {
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    const lineCount = 4;
    const [focusedLine, setFocus] = useState(0);
    const moveFocus = useCallback(
        (value) => {
            setFocus((lineCount + focusedLine + value) % lineCount);
        },
        [focusedLine, setFocus, lineCount],
    );
    useKeyPressEvent("ArrowUp", () => moveFocus(-1));
    useKeyPressEvent("ArrowDown", () => moveFocus(1));

    return (
        <div className={css.popupContainer}>
            <header className="border-b border-b-gray-200">
                <PromptInput />
            </header>
            <section className="flex flex-grow flex-col items-stretch">
                <Suggestion hasFocus={focusedLine === 0} />
                <Suggestion hasFocus={focusedLine === 1} />
                <Suggestion hasFocus={focusedLine === 2} />
                <Suggestion hasFocus={focusedLine === 3} />
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
