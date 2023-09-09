export interface CommandSuggestion {
  key: string;
  type: CommandType;
  title: string;
  description?: string;
  colorCode?: string;
  iconKey?: CommandIcon;
  hasDetails?: boolean;
  focused?: boolean;
}

export enum CommandType {
  UNKNOWN,
  HERO,
  BOOKMARK,
  BOOKMARK_SAVE,
  GROUP_CURRENT,
  GROUP_CREATE,
  UNGROUP_CURRENT,
  FOCUS_TAB,
  PIN_CURRENT_TAB,
  CLEAN,
  UNPIN_CURRENT_TAB,
  SORT_TABS
}

export interface SuggestionHookOptions {
  extractedKeyword?: string;
  extractedInputWithoutKeyword?: string;
}

export interface SuggestionsFactoryOptions {
  extractedKeyword?: string;
  extractedInputWithoutKeyword?: string;
}

export interface CommandTemplate {
  type: CommandType;
  keywords: string[];
  generateSuggestions: (
    input: string,
    options?: SuggestionsFactoryOptions
  ) => Promise<CommandSuggestion[]>;
  execute: (suggestion: CommandSuggestion) => Promise<boolean>;
}

export enum CommandIcon {
  BOLT,
  BOOKMARK,
  INFORMATION_CIRCLE,
  MAGNIFYING_GLASS,
  PINNED,
  PINNED_OFF,
  RECTANGLE_STACK,
  SQUARE_HELP,
  SQUARE_PLUS,
  SQUARE_X
}
