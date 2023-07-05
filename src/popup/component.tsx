import React, { FormEvent, useCallback, useState } from "react";
import { useKeyPressEvent } from "react-use";
import browser from "webextension-polyfill";

import { PromptInput } from "../components/PromptInput";
import { Suggestion } from "../components/Suggestion";
import ChevronDownIcon from "../icons/chevron-down";
import ChevronUpIcon from "../icons/chevron-up";
import css from "./styles.module.css";
import useExecute, { usePlaceholder, useSuggestions } from "@src/commands";
import useFocusLoop from "@src/hooks/useFocusLoop";
import useScrollToIndex from "@src/hooks/useScrollToIndex";
import {
  ExtensionRuntimeRequest,
  ExtensionRuntimeRequestType,
} from "@src/types/extension";
import logger from "@src/logger";

export function Popup(): JSX.Element {
  React.useEffect(() => {
    browser.runtime.sendMessage({
      type: ExtensionRuntimeRequestType.POPUP_MOUNTED,
    } as ExtensionRuntimeRequest);
    logger.info("Popup connected");
  }, []);

  const [inputValue, updateInput] = useState("");
  const { suggestions } = useSuggestions(inputValue);
  const placeholderValue = usePlaceholder(inputValue, updateInput);

  // Manage focus suggestion
  const [suggestionListRef, scrollToIndex] =
    useScrollToIndex<HTMLUListElement>();
  const { focusedIndex, setFocus, moveFocus } = useFocusLoop({
    itemCount: suggestions.length,
    onFocusChange: scrollToIndex,
  });
  useKeyPressEvent("ArrowUp", () => moveFocus(-1));
  useKeyPressEvent("ArrowDown", () => moveFocus(1));
  const focusedSuggestion = suggestions[focusedIndex];

  // Form validation
  const execute = useExecute();
  const executeFocusSuggestion = useCallback(() => {
    (async function () {
      try {
        if (!focusedSuggestion) return;
        const commandSuccess = await execute(focusedSuggestion);
        if (commandSuccess) {
          debugger;
          window.close();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [execute, focusedSuggestion]);
  const onClickSuggestion = (index: number) => {
    setFocus(index);
    executeFocusSuggestion();
  };
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    executeFocusSuggestion();
  };

  return (
    <div className={`${css.popupContainer}`}>
      <div className=" bg-white dark:bg-gray-900">
        <form onSubmit={onSubmit} className="border-b  dark:border-b-gray-600">
          <PromptInput
            placeholder={placeholderValue}
            value={inputValue}
            onChange={updateInput}
          />
        </form>
        <ul
          ref={suggestionListRef}
          className="flex flex-grow flex-col items-stretch overflow-y-scroll mt-2 dark:bg-opacity-10 dark:bg-purple-600"
        >
          {suggestions.map((suggestion, index) => (
            <Suggestion
              onClick={() => onClickSuggestion(index)}
              onMouseEnter={() => setFocus(index)}
              suggestion={suggestion}
              key={suggestion.key}
              hasFocus={suggestion.key === focusedSuggestion?.key}
            />
          ))}
        </ul>
        <footer className="flex border-t border-t-gray-100 dark:border-t-gray-600 px-4 py-2">
          <span className="flex-grow font-medium text-xs text-slate-600">
            Prompto
          </span>
          <p className="justify-self-end text-xs text-gray-500 dark:text-gray-400 italic">
            Use{" "}
            <span className=" inline-flex px-1 py-1 rounded-sm bg-gray-200 dark:bg-gray-500">
              <ChevronUpIcon className="w-2 h-2 inline-flex dark:stroke-slate-100" />
            </span>{" "}
            <span className=" inline-flex px-1 py-1 rounded-sm bg-gray-200 dark:bg-gray-500">
              <ChevronDownIcon className="w-2 h-2 inline-flex dark:stroke-slate-100" />
            </span>{" "}
            to navigate
          </p>
        </footer>
      </div>
    </div>
  );
}
