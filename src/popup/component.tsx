import React, { FormEvent, useCallback, useRef, useState } from "react";
import { useKeyPressEvent } from "react-use";
import browser from "webextension-polyfill";

import { PromptInput } from "../components/PromptInput";
import { Suggestion } from "../components/Suggestion";
import { CommandSuggestion } from "../types/commands";
import ChevronDownIcon from "../icons/chevron-down";
import ChevronUpIcon from "../icons/chevron-up";
import css from "./styles.module.css";
import useExecute, { useSuggestions } from "@src/commands";

const KEYBOARD_ARROW_KEYS = ["ArrowUp", "ArrowDown"];

const useSuggestionFocus = (
  suggestions: CommandSuggestion[],
  onFocusChange: (index: number) => void,
): CommandSuggestion | undefined => {
  const [focusedLine, setFocus] = useState(0);
  const moveFocus = useCallback(
    (value) => {
      const newIndex =
        (suggestions.length + focusedLine + value) % suggestions.length;
      setFocus(newIndex);
      onFocusChange(newIndex);
    },
    [focusedLine, setFocus, suggestions.length, onFocusChange],
  );
  useKeyPressEvent("ArrowUp", () => moveFocus(-1));
  useKeyPressEvent("ArrowDown", () => moveFocus(1));

  return suggestions[focusedLine];
};

export function Popup(): JSX.Element {
  React.useEffect(() => {
    browser.runtime.sendMessage({ popupMounted: true });
  }, []);

  const [inputValue, updateInput] = useState("");
  const { suggestions } = useSuggestions(inputValue);

  // Manage focus suggestion
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const onFocusChange = (index: number) => {
    if (!suggestionListRef || !suggestionListRef.current) return;
    const selectedOption = suggestionListRef.current.childNodes[
      index
    ] as HTMLLIElement;
    if (selectedOption) {
      selectedOption.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    }
  };
  const focusedSuggestion = useSuggestionFocus(suggestions, onFocusChange);

  // Form validation
  const execute = useExecute();
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    (async function () {
      const commandSuccess = await execute(focusedSuggestion);
      if (commandSuccess) {
        window.close();
      }
    })();
  };

  return (
    <div className={css.popupContainer}>
      <form onSubmit={onSubmit} className="border-b border-b-gray-200">
        <PromptInput onChange={updateInput} ignoreKeys={KEYBOARD_ARROW_KEYS} />
      </form>
      <ul
        ref={suggestionListRef}
        className="flex flex-grow flex-col items-stretch overflow-y-scroll mt-2"
      >
        {suggestions.map((suggestion) => (
          <Suggestion
            suggestion={suggestion}
            key={suggestion.key}
            hasFocus={suggestion.key === focusedSuggestion?.key}
          />
        ))}
      </ul>
      <footer className="flex border-t border-t-gray-100 px-4 py-2 bg-gray-50">
        <span className="flex-grow font-semibold text-xs">Prompto</span>
        <p className="justify-self-end text-xs text-gray-500 italic">
          Use{" "}
          <span className=" inline-flex bg-gray-200 px-1 py-1 rounded-sm">
            <ChevronUpIcon className="w-2 h-2 inline-flex" />
          </span>{" "}
          <span className=" inline-flex bg-gray-200 px-1 py-1 rounded-sm">
            <ChevronDownIcon className="w-2 h-2 inline-flex" />
          </span>{" "}
          to navigate
        </p>
      </footer>
    </div>
  );
}
