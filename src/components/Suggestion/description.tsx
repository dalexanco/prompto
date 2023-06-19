import React, { Fragment } from "react";
import { CommandSuggestion, CommandSuggestionType } from "@src/types/commands";

interface DescriptionProps {
    suggestion: CommandSuggestion;
    hasFocus: boolean;
}

export const simplifyUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    const { host, pathname } = new URL(url);
    const line = `${host}${pathname}`;
    return line.endsWith("/") ? line.substring(0, line.length - 1) : line;
};

export default function Description({
    suggestion,
    hasFocus,
}: DescriptionProps): JSX.Element | null {
    if (!hasFocus) return null;

    const { url, type } = suggestion;
    let body: JSX.Element;
    switch (type) {
        case CommandSuggestionType.BOOKMARK:
            body = (
                <Fragment>
                    {`Open `}
                    <span className="font-medium">{simplifyUrl(url)}</span>
                </Fragment>
            );
            break;
        case CommandSuggestionType.FOCUS_TAB:
            body = (
                <Fragment>
                    {`Focus tab `}
                    <span className="font-medium">{simplifyUrl(url)}</span>
                </Fragment>
            );
            break;
        default:
            return null;
    }

    return (
        <p className="text-xs text-gray-500 overflow-ellipsis whitespace-nowrap overflow-hidden">
            {body}
        </p>
    );
}
