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
    FOCUS_TAB,
    CURRENT_TAB_PIN,
    CURRENT_TAB_UNPIN,
}

export interface CommandTemplate {
    type: CommandType;
    keywordRequired: boolean;
    keywords: string[];
    initialize: () => void;
    generateSuggestions: (input: string) => Promise<CommandSuggestion[]>;
    execute: (suggestion: CommandSuggestion) => Promise<boolean>;
}
