export interface PromptQuery {
  results: CommandSuggestion[];
  isLoading: boolean;
}

export interface CommandSuggestion {
  key: string;
  type: CommandType;
  title: string;
  colorCode?: string;

  id?: string;
  url?: string;
}

export enum CommandType {
  UNKNOWN,
  BOOKMARK,
  BOOKMARK_SAVE,
  GROUP_CURRENT,
  GROUP_CREATE,
  UNGROUP_CURRENT,
  FOCUS_TAB,
  PIN_CURRENT_TAB,
  UNPIN_CURRENT_TAB,
  SORT_TABS,
}

export interface CommandTemplate {
  type: CommandType;
  keywordRequired: boolean;
  keywords: string[];
  initialize?: () => void;
  generateSuggestions: (input: string) => Promise<CommandSuggestion[]>;
  execute: (suggestion: CommandSuggestion) => Promise<boolean>;
}
