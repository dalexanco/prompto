import useCommandExecute from '@src/commands';
import { CommandSuggestionSaveCurrentTab } from '@src/commands/save-current-tab';
import { useAppStore } from '@src/stores';
import { CommandSuggestion } from '@src/types/commands';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';

const useTitlePlaceHolder = () => {
  const { value: activeTabs } = useAsync(
    async () => await chrome.tabs.query({ active: true })
  );
  return activeTabs?.[0]?.title || '';
};

export default function CommandDetailsSave({
  suggestion: suggestionBase
}: {
  suggestion: CommandSuggestion;
}) {
  const suggestion = suggestionBase as CommandSuggestionSaveCurrentTab;
  const placeHolderValue = useTitlePlaceHolder();
  const navigate = useNavigate();
  const execute = useCommandExecute();
  const [saving, setSaving] = useState(false);
  const { suggestionUpdate } = useAppStore();
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    await execute(suggestion);
    setSaving(false);
  };
  const onTitleChange = (value: string) => {
    suggestionUpdate(suggestion.key, {
      ...suggestion,
      bookmarkTitle: value
    } as CommandSuggestionSaveCurrentTab);
  };

  return (
    <form className="m-3 flex flex-col" onSubmit={onSubmit}>
      <label className="font-medium text-stone-600">Bookmark name</label>
      <input
        autoFocus
        placeholder={placeHolderValue}
        onChange={(event) => onTitleChange(event.currentTarget.value)}
        type="text"
        className="mt-1 rounded-md border-2 border-stone-100 bg-stone-50 p-2 text-stone-600 outline-primary-500"
      />
      <div className="flex flex-row content-center justify-end space-x-2 pt-4">
        <button
          className="p-2 font-semibold text-gray-400"
          onClick={() => navigate('/', { replace: true })}
          type="button"
        >
          Cancel
        </button>
        <button
          className="rounded-md border border-b-2 border-primary-300 border-b-primary-400 bg-primary-200 p-2 font-semibold text-primary-600 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300"
          type="submit"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Validate'}
        </button>
      </div>
    </form>
  );
}
