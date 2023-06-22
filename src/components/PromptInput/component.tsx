import React, { useCallback } from "react";

import MagnifyingGlassIcon from "../../icons/magnifying-glass";

interface PromptInputProps {
  onChange?: (value: string) => void;
  ignoreKeys?: string[];
}

export function PromptInput({
  onChange,
  ignoreKeys = [],
}: PromptInputProps): JSX.Element {
  const ignoreArrowKeys = useCallback(
    (event: React.KeyboardEvent) =>
      ignoreKeys.includes(event.key) && event.preventDefault(),
    [ignoreKeys],
  );
  return (
    <div className="inline-flex items-center bg-white px-6 py-2">
      <MagnifyingGlassIcon className="w-4 h-4 stroke-gray-500" />
      <input
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        onKeyDown={ignoreArrowKeys}
        onKeyPress={ignoreArrowKeys}
        autoFocus
        placeholder="Search or command..."
        type="text"
        className="text-base whitespace-nowrap px-2 my-1 ml-4 outline-none placeholder:italic"
      />
    </div>
  );
}
