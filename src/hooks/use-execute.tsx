import { PromptCommand, PromptCommandType } from "@src/types/commands";

async function updateCurrentTab(
    updateProperties: chrome.tabs.UpdateProperties,
) {
    const [currentTab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });
    if (!currentTab?.id)
        return Promise.reject("failed to retreive current tab");

    return chrome.tabs.update(currentTab?.id, updateProperties);
}

async function execute(command?: PromptCommand): Promise<boolean> {
    if (!command) return Promise.reject("no command provided");

    switch (command.type) {
        case PromptCommandType.BOOKMARK:
            await chrome.tabs.create({ url: command.url, active: true });
            return true;

        case PromptCommandType.FOCUS_TAB:
            await chrome.tabs.update(parseInt(command.id, 10), {
                active: true,
            });
            return false;

        case PromptCommandType.CURRENT_TAB_PIN:
            await updateCurrentTab({ pinned: true });
            return true;

        case PromptCommandType.CURRENT_TAB_UNPIN:
            await updateCurrentTab({ pinned: false });
            return true;
    }

    return false;
}

export default function useExecute(): (
    command?: PromptCommand | undefined,
) => Promise<boolean> {
    return execute;
}
