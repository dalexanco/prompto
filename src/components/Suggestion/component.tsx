import React from "react";
import classNames from "classnames";

import MagnifyingGlassIcon from "../../icons/magnifying-glass";
import { PromptCommand, PromptCommandType } from "../../types/commands";
import BookmarkIcon from "../../icons/bookmark";
import RectangleStackIcon from "@src/icons/rectangle-stack";

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

const mapDescription = (command: PromptCommand): string | null => {
    switch (command.type) {
        case PromptCommandType.BOOKMARK:
            return `Open bookmark ${command.url}`;
        case PromptCommandType.EXISTING_TAB:
            return `Open tab ${command.url}`;
        default:
            return null;
    }
};

const mapTitle = (command: PromptCommand): string => {
    switch (command.type) {
        case PromptCommandType.BOOKMARK:
            return command.title || "Empty bookmark";
        default:
            return command.title;
    }
};

export function Suggestion({
    suggestion,
    hasFocus = false,
}: SuggestionProps): JSX.Element | null {
    if (!suggestion) return null;
    const wrapperClass = classNames("flex flex-row items-start bg-white", {
        ["bg-slate-50"]: hasFocus,
    });
    const iconClass = classNames("flex self-center rounded-md p-2 m-2", {
        ["bg-gray-200"]: hasFocus,
        ["bg-gray-100"]: !hasFocus,
    });
    const Icon = mapTypeIcon(suggestion);
    const title = mapTitle(suggestion);
    const description = mapDescription(suggestion);

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
