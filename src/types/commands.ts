export interface PromptQuery {
    results: CommandSuggestion[];
    isLoading: boolean;
}

export interface CommandSuggestion {
    key: string;
    id: string;
    type: CommandSuggestionType;
    title: string;
    url?: string;
    colorCode?: string;
}

export enum CommandSuggestionType {
    UNKNOWN,
    BOOKMARK,
    BOOKMARK_SAVE,
    FOCUS_TAB,
    CURRENT_TAB_PIN,
    CURRENT_TAB_UNPIN,
}

export interface CommandTemplate {
    keywordRequired: boolean;
    keywords: string[];
    initialize: () => void;
    generateSuggestions: (input: string) => Promise<CommandSuggestion[]>;
}
