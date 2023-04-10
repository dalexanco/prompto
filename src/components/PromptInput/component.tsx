import React from "react";
import css from "./styles.module.css";

export function PromptInput() {
    return (
        <div className="w-full">
            <input type="text" className={css.prompt} />
        </div>
    );
}
