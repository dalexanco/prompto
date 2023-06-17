import { limit } from "@src/helpers/list";
import { PromptCommand, PromptCommandType } from "@src/types/commands";
import { flatten } from "lodash";

const RESULTS_LIMIT = 5;
const MIN_INPUT_LENGTH = 2;

interface SimpleBookmarkNode {
    id: string;
    path: string[];
    index: string;
}

function digBookmarks(
    node: chrome.bookmarks.BookmarkTreeNode,
    parentPath: string[] = [],
): SimpleBookmarkNode[] {
    const currentPath = node.title ? [...parentPath, node.title] : parentPath;
    const currentIndex = currentPath.join("/").toLocaleLowerCase();
    const currentSimpleNode = {
        id: node.id,
        path: currentPath,
        index: currentIndex,
    } as SimpleBookmarkNode;

    if (!node.children) return [];

    const subFolders = node.children.filter((node) => !node.url);
    if (subFolders.length == 0) {
        return [currentSimpleNode];
    }

    return flatten(
        node.children.map((node) => digBookmarks(node, currentPath)),
    );
}

let bookmarksFolderCache = [] as SimpleBookmarkNode[];

export default {
    keywords: ["save"],
    keywordRequired: true,
    initialize: async (): Promise<void> => {
        const [rootNode] = await chrome.bookmarks.getTree();

        bookmarksFolderCache = digBookmarks(rootNode);
    },
    generateSuggestions: async (rawInput: string): Promise<PromptCommand[]> => {
        if (!rawInput || rawInput.length < MIN_INPUT_LENGTH) return [];

        const inputWords = rawInput.toLowerCase().split(" ");

        const folders = bookmarksFolderCache.filter((folder) => {
            const nonMatchingWordsIndex = inputWords.findIndex(
                (word) => !folder.index.includes(word),
            );
            return nonMatchingWordsIndex < 0;
        });

        return folders.filter(limit(RESULTS_LIMIT)).map((folder) => ({
            id: folder.id,
            key: `save-on-${folder.id}`,
            type: PromptCommandType.BOOKMARK_SAVE,
            title: `Save in ${folder.index}`,
            url: "Attach current tab in this folder",
        }));
    },
};
