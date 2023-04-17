import {
    PromptCommand,
    PromptCommandType,
    PromptQuery,
} from "../types/commands";

const COMMANDS = [
    {
        type: PromptCommandType.CURRENT_TAB_PIN,
        key: `tab-current-pin`,
        id: `tab-current-pin`,
        title: "Pin current tab",
    },
    {
        type: PromptCommandType.CURRENT_TAB_UNPIN,
        key: `tab-current-unpin`,
        id: `tab-current-unpin`,
        title: "Unpin current tab",
    },
] as PromptCommand[];

export default function useTabTools(input: string): PromptQuery {
    const isLoading = false;
    if (!input) return { results: [], isLoading };

    const results = COMMANDS.filter(({ title }) =>
        title.toLowerCase().includes(input.toLowerCase()),
    );

    return { results, isLoading };
}
