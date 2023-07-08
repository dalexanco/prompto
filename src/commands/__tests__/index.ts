import { renderHook, waitFor } from '@testing-library/react';

import {
  CommandSuggestion,
  CommandType,
  CommandTemplate
} from '@src/types/commands';
import { useSuggestions } from '..';

const DEFAULT_SUGGESTION_MOCK = {
  key: 'mock',
  id: 'mock',
  type: CommandType.BOOKMARK_SAVE,
  title: 'test mock'
} as CommandSuggestion;

const DEFAULT_TEMPLATE_MOCK = {
  keywordRequired: true,
  keywords: ['test'],
  initialize: () => void 0,
  generateSuggestions: (_input: string) =>
    Promise.resolve([DEFAULT_SUGGESTION_MOCK])
} as CommandTemplate;

const mockCommand = (override: Partial<CommandTemplate>) => ({
  ...DEFAULT_TEMPLATE_MOCK,
  ...override
});

describe('Command engine', () => {
  describe('#useSuggestion hook', () => {
    it('should initialize all command temaplates', () => {
      // Prepare
      const initializeMock = jest.fn();
      const mock = mockCommand({
        initialize: () => initializeMock()
      });
      const mocks = [mock];
      // Execute
      const { rerender } = renderHook(() => useSuggestions(undefined, mocks));
      rerender();
      // Assert
      expect(initializeMock).toHaveBeenCalledTimes(1);
    });

    it('should return empty with no keyword matching', async () => {
      // Prepare
      const mock = mockCommand({
        keywordRequired: true,
        keywords: ['foo']
      });
      const mocks = [mock];
      // Execute
      const { result } = renderHook(() => useSuggestions('bar toto', mocks));
      // Assert
      await waitFor(() => expect(result.current.isLoading).toBeFalsy());
      expect(result.current.suggestions).toHaveLength(0);
    });

    it('should return results with matching keyword', async () => {
      // Prepare
      const mock = mockCommand({
        keywordRequired: true,
        keywords: ['foo']
      });
      // Execute
      const { result } = renderHook(() => useSuggestions('foo toto', [mock]));
      // Assert
      await waitFor(() => expect(result.current.isLoading).toBeFalsy());
      expect(result.current.suggestions).toHaveLength(1);
    });
  });
});
