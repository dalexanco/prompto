import { PromptCommand, PromptCommandType } from "@src/types/commands";

export default function useExecute(command?: PromptCommand): void {
    if (!command) return;

    switch (command.type) {
        case PromptCommandType.BOOKMARK:
            chrome.tabs.create({ url: command.url, active: true });
        case PromptCommandType.EXISTING_TAB:
            chrome.tabs.update(parseInt(command.id, 10), { active: true });
    }
}
