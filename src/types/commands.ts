export interface PromptQuery {
  results: CommandSuggestion[];
  isLoading: boolean;
}

export interface CommandSuggestion {
  key: string;
  type: CommandType;
  title: string;
  description?: string;
  colorCode?: string;
  iconKey?: CommandIcon;
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

export interface CommandTemplate {
  type: CommandType;
  keywordRequired: boolean;
  keywords: string[];
  initialize?: () => void;
  generateSuggestions: (input: string) => Promise<CommandSuggestion[]>;
  execute: (suggestion: CommandSuggestion) => Promise<boolean>;
}

export enum CommandIcon {
  BOLT,
  BOOKMARK,
  EYE,
  INFORMATION_CIRCLE,
  MAGNIFYING_GLASS,
  PINNED,
  PINNED_OFF,
  RECTANGLE_STACK,
  SQUARE_HELP,
  SQUARE_PLUS,
  SQUARE_X
}
