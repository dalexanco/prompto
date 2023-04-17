import React from "react";
import classNames from "classnames";

import MagnifyingGlassIcon from "../../icons/magnifying-glass";
import { PromptCommand, PromptCommandType } from "../../types/commands";
import BookmarkIcon from "../../icons/bookmark";
import RectangleStackIcon from "@src/icons/rectangle-stack";
import Title from "./title";
import Description from "./description";

interface SuggestionProps {
    suggestion: PromptCommand;
    hasFocus?: boolean;
}

const mapTypeIcon = ({ type }: PromptCommand): JSX.Element => {
    switch (type) {
        case PromptCommandType.BOOKMARK:
            return <BookmarkIcon className="w-4 h-4 stroke-gray-500" />;
        case PromptCommandType.EXISTING_TAB:
            return <RectangleStackIcon className="w-4 h-4 stroke-gray-500" />;
        default:
            return <MagnifyingGlassIcon className="w-4 h-4 stroke-gray-500" />;
    }
};

export function Suggestion({
    suggestion,
    hasFocus = false,
}: SuggestionProps): JSX.Element | null {
    if (!suggestion) return null;
    const wrapperClass = classNames("flex flex-row items-start bg-white p-1", {
        ["bg-slate-50"]: hasFocus,
    });
    const iconClass = classNames("flex self-center rounded-md p-2 m-2", {
        ["bg-gray-200"]: hasFocus,
        ["bg-gray-100"]: !hasFocus,
    });
    const Icon = mapTypeIcon(suggestion);

    return (
        <li className={wrapperClass}>
            <div className={iconClass}>{Icon}</div>
            <div className="mx-2 self-center min-w-0">
                <Title suggestion={suggestion} />
                <Description suggestion={suggestion} hasFocus={hasFocus} />
            </div>
        </li>
    );
}
