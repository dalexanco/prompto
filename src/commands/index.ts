import {
  CommandTemplate,
  CommandSuggestion,
  CommandResult
} from '@src/types/commands';

import saveCurrentTab from './tab-save';
import groupCurrentTab from './group-attach';
import groupCreate from './group-create';
import pinCurrentTab from './tab-pin';
import unpinCurrentTab from './tab-unpin';
import ungroupCurrentTab from './group-detach';
import sortTabs from './all-tabs-sort';
import clean from './all-tabs-clean';
import { useAppStore } from '@src/stores';

export const COMMANDS_REGISTRY = [
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
): Promise<CommandResult> {
  if (!command) return Promise.reject('no suggestion provided');

  const commandTemplate = templates.find(
    (template) => template.type === command.type
  );

  if (!commandTemplate) return Promise.reject('no template found');

  const result = await commandTemplate.execute(command);
  if (result.succeed) {
    useAppStore.getState().inputValueSet('');
    window.close();
  }

  return result;
}

export default function useCommandExecute(
  templates = COMMANDS_REGISTRY
): (command?: CommandSuggestion | undefined) => Promise<CommandResult> {
  return (command: CommandSuggestion | undefined) =>
    execute(templates, command);
}
