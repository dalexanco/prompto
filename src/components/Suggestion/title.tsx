import React from "react";
import { PromptCommand } from "@src/types/commands";

interface TitleProps {
    suggestion: PromptCommand;
}

export default function Title({ suggestion }: TitleProps): JSX.Element {
    const titleValue = suggestion.title || "Empty bookmark";

    return (
        <p className="text-sm font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
            {titleValue}
        </p>
    );
}
