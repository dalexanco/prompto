import React, { useCallback } from "react";

import MagnifyingGlassIcon from "../../icons/magnifying-glass";
import classNames from "classnames";
import css from "./styles.module.css";

interface PromptInputProps {
  onChange?: (value: string) => void;
  placeholderValue: string;
  ignoreKeys?: string[];
}

export function PromptInput({
  onChange,
  placeholderValue,
  ignoreKeys = [],
}: PromptInputProps): JSX.Element {
  const ignoreArrowKeys = useCallback(
    (event: React.KeyboardEvent) =>
      ignoreKeys.includes(event.key) && event.preventDefault(),
    [ignoreKeys],
  );
  const wrapperClassName = classNames(
    "inline-flex items-center bg-white px-6 py-2 dynamicPlaceholder",
    css.dynamicPlaceholder,
  );

  return (
    <div className={wrapperClassName} data-placeholder={placeholderValue}>
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
