import React from "react";
import browser from "webextension-polyfill";
import { PromptInput } from "../components/PromptInput";
import css from "./styles.module.css";

export function Popup() {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    return (
        <div className={css.popupContainer}>
            <PromptInput />
            <div className="mx-4 my-4">
                Hello world !
                <hr />
                Test
            </div>
        </div>
    );
}
