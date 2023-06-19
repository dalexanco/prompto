import react from "react";
import { renderHook } from "@testing-library/react";

import { useSuggestions } from "..";

describe("Command engine", () => {
    describe("#useSuggestion hook", () => {
        it("should initialize all command temaplates", () => {
            // Prepare
            const initializeMock = jest.fn();
            const mockTemplate = {
                keywordRequired: true,
                keywords: ["test"],
                initialize: () => initializeMock(),
                generateSuggestions: (input: string) => Promise.resolve([]),
            };
            // Execute
            renderHook(() => useSuggestions(undefined, [mockTemplate]));
            // Assert
            expect(initializeMock).toHaveBeenCalledTimes(1);
        });
    });
});
