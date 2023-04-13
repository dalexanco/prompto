import React from "react";
import classNames from "classnames";

import MagnifyingGlassIcon from "../../icons/magnifying-glass";
import { PromptCommandType } from "../../types/commands";
import BookmarkIcon from "../../icons/bookmark";

interface SuggestionProps {
    title: string;
    description?: string;
    type: PromptCommandType;
    hasFocus?: boolean;
}

const mapTypeIcon = (type: PromptCommandType): JSX.Element => {
    switch (type) {
        case PromptCommandType.BOOKMARK:
            return <BookmarkIcon className="w-4 h-4 stroke-gray-500" />;
        default:
            return <MagnifyingGlassIcon className="w-4 h-4 stroke-gray-500" />;
    }
};

export function Suggestion({
    title,
    description,
    type = PromptCommandType.UNKNOWN,
    hasFocus = false,
}: SuggestionProps): JSX.Element {
    const wrapperClass = classNames("flex flex-row items-start bg-white", {
        ["bg-slate-50"]: hasFocus,
    });
    const iconClass = classNames(
        "flex self-center rounded-md p-2 m-2 bg-gray-200",
        {
            ["bg-gray-200"]: hasFocus,
            ["bg-gray-100"]: !hasFocus,
        },
    );
    const Icon = mapTypeIcon(type);

    return (
        <div className={wrapperClass}>
            <div className={iconClass}>{Icon}</div>
            <div className="mx-2 self-center min-w-0">
                <p className="text-sm font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
                    {title}
                </p>
                {hasFocus && description && (
                    <p className="text-xs text-gray-500 overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
