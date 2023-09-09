import { useEffect } from 'react';
import { useKeyPressEvent } from 'react-use';

import { Suggestion } from '../Suggestion/component';
import { useFocusedIndexStore, useSuggestionsStore } from '@src/stores';
import useScrollToIndex from '@src/hooks/useScrollToIndex';

type SuggestionListProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  onClickSuggestion: (index: number) => void;
};

export default function SuggestionList({
  className,
  onClickSuggestion
}: SuggestionListProps) {
  const { suggestions } = useSuggestionsStore();
  const { focusedIndex, focusedIndexSet, focusedIndexMove } =
    useFocusedIndexStore();
  const [suggestionListRef, scrollToIndex] =
    useScrollToIndex<HTMLUListElement>();
  useEffect(
    () => scrollToIndex(focusedIndex % suggestions.length),
    [focusedIndex, scrollToIndex, suggestions.length]
  );
  useKeyPressEvent('ArrowUp', () => focusedIndexMove(-1, suggestions.length));
  useKeyPressEvent('ArrowDown', () => focusedIndexMove(1, suggestions.length));
  const onClick = (index: number) => {
    focusedIndexSet(index);
    onClickSuggestion(index);
  };

  if (!suggestions) return null;

  return (
    <ul ref={suggestionListRef} className={className}>
      {suggestions.map((suggestion, index) => (
        <Suggestion
          onClick={() => onClick(index)}
          onMouseEnter={() => focusedIndexSet(index)}
          suggestion={suggestion}
          key={suggestion.key}
          hasFocus={index === focusedIndex}
        />
      ))}
    </ul>
  );
}
