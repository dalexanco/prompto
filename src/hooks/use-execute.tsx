import { CommandSuggestion, CommandType } from "@src/types/commands";

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

async function execute(command?: CommandSuggestion): Promise<boolean> {
    if (!command) return Promise.reject("no command provided");

    switch (command.type) {
        case CommandType.GROUP_CREATE:
            const [currentTab] = await chrome.tabs.query({
                active: true,
                lastFocusedWindow: true,
            });
            console.log("creating group");
            if (!currentTab || !currentTab.id) return false;

            const groupId = await chrome.tabs.group({
                tabIds: [currentTab.id],
            });
            await chrome.tabGroups.update(groupId, { title: command.key });
            return true;
        case CommandType.BOOKMARK:
            await chrome.tabs.create({ url: command.url, active: true });
            return true;

        case CommandType.FOCUS_TAB:
            if (!command.id) return false;
            await chrome.tabs.update(parseInt(command.id, 10), {
                active: true,
            });
            return false;

        case CommandType.CURRENT_TAB_PIN:
            await updateCurrentTab({ pinned: true });
            return true;

        case CommandType.CURRENT_TAB_UNPIN:
            await updateCurrentTab({ pinned: false });
            return true;
    }

    return false;
}

export default function useExecute(): (
    command?: CommandSuggestion | undefined,
) => Promise<boolean> {
    return execute;
}
