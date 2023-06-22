import React from "react";
import classNames from "classnames";

import MagnifyingGlassIcon from "../../icons/magnifying-glass";
import { CommandSuggestion, CommandType } from "../../types/commands";
import BookmarkIcon from "../../icons/bookmark";
import RectangleStackIcon from "@src/icons/rectangle-stack";
import Title from "./title";
import Description from "./description";
import BoltIcon from "@src/icons/bolt";

interface SuggestionProps {
  suggestion: CommandSuggestion;
  hasFocus?: boolean;
}

const mapTypeIcon = (
  { type }: CommandSuggestion,
  hasFocus: boolean,
): JSX.Element => {
  const styles = classNames("w-4 h-4", {
    ["stroke-purple-500"]: hasFocus,
    ["stroke-gray-500"]: !hasFocus,
  });
  switch (type) {
    case CommandType.BOOKMARK:
    case CommandType.BOOKMARK_SAVE:
      return <BookmarkIcon className={styles} />;
    case CommandType.FOCUS_TAB:
      return <RectangleStackIcon className={styles} />;
    case CommandType.PIN_CURRENT_TAB:
    case CommandType.UNPIN_CURRENT_TAB:
      return <BoltIcon className={styles} />;
    default:
      return <MagnifyingGlassIcon className={styles} />;
  }
};

export function Suggestion({
  suggestion,
  hasFocus = false,
}: SuggestionProps): JSX.Element | null {
  if (!suggestion) return null;
  const wrapperClass = classNames(
    "flex flex-row items-start p-1 mx-2 rounded-md last:mb-2",
    {
      ["bg-purple-50"]: hasFocus,
    },
  );
  const iconClass = classNames("flex self-center rounded-lg p-2 m-2", {
    ["bg-purple-50"]: hasFocus,
    ["bg-gray-50"]: !hasFocus,
  });
  const Icon = mapTypeIcon(suggestion, hasFocus);

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
