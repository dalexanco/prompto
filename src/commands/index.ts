import {
  CommandTemplate,
  CommandSuggestion,
  CommandResult
} from '@src/types/commands';
import { useAppStore } from '@src/stores';

import allTabsClean from './all-tabs-clean';
import allTabsSort from './all-tabs-sort';
import groupAttach from './group-attach';
import groupCreate from './group-create';
import groupDetach from './group-detach';
import tabDuplicate from './tab-duplicate';
import tabPin from './tab-pin';
import tabSave from './tab-save';
import tabUnpin from './tab-unpin';

export const COMMANDS_REGISTRY = [
  groupAttach,
  groupCreate,
  tabPin,
  tabUnpin,
  tabDuplicate,
  allTabsSort,
  tabSave,
  groupDetach,
  allTabsClean
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
