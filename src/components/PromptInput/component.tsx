import React from "react";
import MagnifyingGlassIcon from "../../icons/magnifying-glass";

export function PromptInput(): JSX.Element {
    return (
        <div className="inline-flex items-center bg-white px-2 py-1">
            <MagnifyingGlassIcon className="w-4 h-4 stroke-gray-500" />
            <input
                autoFocus
                placeholder="Search or command..."
                type="text"
                className="text-sm whitespace-nowrap px-2 my-1 outline-none placeholder:italic"
            />
        </div>
    );
}
