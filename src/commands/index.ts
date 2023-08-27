import { CommandTemplate, CommandSuggestion } from '@src/types/commands';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { flatten } from 'lodash';

import saveCurrentTab from './save-current-tab';
import groupCurrentTab from './group-current-tab';
import groupCreate from './group-create';
import pinCurrentTab from './pin-current-tab';
import unpinCurrentTab from './unpin-current-tab';
import ungroupCurrentTab from './ungroup-current-tab';
import sortTabs from './sort-tabs';
import { useKey } from 'react-use';
import clean from './clean';

export const DEFAULT_COMMANDS = [
  groupCurrentTab,
  groupCreate,
  pinCurrentTab,
  saveCurrentTab,
  sortTabs,
  ungroupCurrentTab,
  unpinCurrentTab,
  clean
] as CommandTemplate[];

const SPACE = ' ';
const EMPTY_PLACEHOLDER = '';

export const usePlaceholder = (
  rawInput: string,
  setInput: Dispatch<SetStateAction<string>>,
  commands = DEFAULT_COMMANDS
): string => {
  const keywords = useMemo(
    () =>
      flatten(
        commands.map(({ keywords }) =>
          keywords.map((keyword) => keyword.toLowerCase())
        )
      ),
    [commands]
  );
  const [placeholder, setPlaceholder] = useState(EMPTY_PLACEHOLDER);
  useKey(
    'Tab',
    (event) => {
      if (!placeholder || placeholder.length == 0) return;

      event.preventDefault();
      setInput(placeholder + SPACE);
    },
    {},
    [placeholder, setInput]
  );
  useEffect(() => {
    if (!rawInput) {
      setPlaceholder(EMPTY_PLACEHOLDER);
      return;
    }
    const inputValue = rawInput.toLowerCase();
    const firstMatching = keywords.find((keyword) =>
      keyword.startsWith(inputValue)
    );

    setPlaceholder(firstMatching || '');
  }, [setPlaceholder, rawInput, keywords]);

  return placeholder;
};

export const useSuggestions = (
  rawInput?: string,
  commands = DEFAULT_COMMANDS
): { isLoading: boolean; suggestions: CommandSuggestion[] } => {
  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    commands.forEach(({ initialize }) => initialize && initialize());
  }, []);
  useEffect((): void => {
    (async function anyNameFunction() {
      if (rawInput == undefined) return;

      const suggestionsPromises = commands.map((command) => {
        if (!command.keywordRequired)
          return command.generateSuggestions(rawInput);

        const matchingKeyword = command.keywords.find((keyword) =>
          rawInput.startsWith(keyword)
        );

        if (!matchingKeyword) return Promise.resolve([]);

        const inputAfterKeyword = rawInput
          .substring(matchingKeyword.length)
          .trim();

        return command.generateSuggestions(inputAfterKeyword);
      });

      const results = await Promise.all(suggestionsPromises);

      setSuggestions(flatten(results));
      setLoading(false);
    })();
  }, [setSuggestions, rawInput, commands]);

  return { suggestions, isLoading };
};

async function execute(
  templates: CommandTemplate[],
  command?: CommandSuggestion | undefined
): Promise<boolean> {
  if (!command) return Promise.reject('no suggestion provided');

  const commandTemplate = templates.find(
    (template) => template.type === command.type
  );

  if (!commandTemplate) return Promise.reject('no template found');

  return commandTemplate.execute(command);
}

export default function useExecute(
  templates = DEFAULT_COMMANDS
): (command?: CommandSuggestion | undefined) => Promise<boolean> {
  return (command: CommandSuggestion | undefined) =>
    execute(templates, command);
}
