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
  ALL_TABS_CLEAN,
  ALL_TABS_SORT,
  BOOKMARK,
  BOOKMARK_SAVE,
  GROUP_ATTACH,
  GROUP_CREATE,
  GROUP_DETACH,
  TAB_FOCUS,
  TAB_PIN,
  TAB_UNPIN,
  UNKNOWN
}

export interface SuggestionHookOptions {
  extractedKeyword?: string;
  extractedInputWithoutKeyword?: string;
}

export interface SuggestionsFactoryOptions {
  extractedKeyword?: string;
  extractedInputWithoutKeyword?: string;
}

export interface CommandResult {
  succeed: boolean;
}

export interface CommandTemplate {
  type: CommandType;
  keywords: string[];
  generateSuggestions: (
    input: string,
    options?: SuggestionsFactoryOptions
  ) => Promise<CommandSuggestion[]>;
  execute: (suggestion: CommandSuggestion) => Promise<CommandResult>;
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
