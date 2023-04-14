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
    EXISTING_TAB,
}
