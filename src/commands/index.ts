import { CommandTemplate, CommandSuggestion } from '@src/types/commands';

import saveCurrentTab from './save-current-tab';
import groupCurrentTab from './group-current-tab';
import groupCreate from './group-create';
import pinCurrentTab from './pin-current-tab';
import unpinCurrentTab from './unpin-current-tab';
import ungroupCurrentTab from './ungroup-current-tab';
import sortTabs from './sort-tabs';
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

export default function useCommandExecute(
  templates = DEFAULT_COMMANDS
): (command?: CommandSuggestion | undefined) => Promise<boolean> {
  return (command: CommandSuggestion | undefined) =>
    execute(templates, command);
}
