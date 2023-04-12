import React from "react";
import browser from "webextension-polyfill";
import { PromptInput } from "../components/PromptInput";
import ChevronDown from "../icons/chevron-down";
import ChevronUp from "../icons/chevron-up";
import css from "./styles.module.css";

export function Popup(): JSX.Element {
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    return (
        <div className={css.popupContainer}>
            <header className="border-b border-b-gray-200">
                <PromptInput />
            </header>
            <section className="flex-grow"></section>
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
