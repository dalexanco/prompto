import { useCallback, useState } from 'react';

interface UseFocuseLoopArgs {
  itemCount: number;
  onFocusChange: (index: number) => void;
}

export default function useFocusLoop({
  itemCount,
  onFocusChange
}: UseFocuseLoopArgs): {
  setFocus: (index: number) => void;
  moveFocus: (index: number) => void;
  focusedIndex: number;
} {
  const [focusedIndex, setFocusLine] = useState(0);
  const setFocus = useCallback(
    (newIndex: number) => {
      setFocusLine(newIndex);
      onFocusChange(newIndex);
    },
    [setFocusLine, onFocusChange]
  );
  const moveFocus = useCallback(
    (offset: number) => {
      const newIndex = (itemCount + focusedIndex + offset) % itemCount;
      setFocus(newIndex);
    },
    [focusedIndex, setFocus, itemCount]
  );

  return { setFocus, moveFocus, focusedIndex };
}
