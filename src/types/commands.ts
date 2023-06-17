export interface PromptQuery {
    results: PromptCommand[];
    isLoading: boolean;
}

export interface PromptCommand {
    key: string;
    id: string;
    type: PromptCommandType;
    title: string;
    url?: string;
    colorCode?: string;
}

export enum PromptCommandType {
    UNKNOWN,
    BOOKMARK,
    BOOKMARK_SAVE,
    FOCUS_TAB,
    CURRENT_TAB_PIN,
    CURRENT_TAB_UNPIN,
}
