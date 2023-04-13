export interface PromptQuery {
    results: PromptCommand[];
    isLoading: boolean;
}

export interface PromptCommand {
    key: string;
    id: string;
    type: PromptCommandType;
    title: string;
    description?: string;
    colorCode?: string;
}

export enum PromptCommandType {
    BOOKMARK,
}
