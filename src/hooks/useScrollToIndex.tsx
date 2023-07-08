import { useCallback, useRef } from 'react';

type ScrollToIndexCallback = (index: number) => void;

export default function useScrollToIndex<T extends HTMLElement>(): [
  React.RefObject<T>,
  ScrollToIndexCallback
] {
  const listRef = useRef<T>(null);
  const callback = useCallback(
    (index: number) => {
      if (!listRef || !listRef.current) return;
      const selectedOption = listRef.current.childNodes[index] as HTMLLIElement;
      if (selectedOption) {
        selectedOption.scrollIntoView({
          block: 'nearest',
          inline: 'center'
        });
      }
    },
    [listRef]
  );

  return [listRef, callback];
}
