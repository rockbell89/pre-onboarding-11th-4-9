import React, { useCallback, useState } from 'react';
import { SearchWordType } from '../types';
import { DEFAULT_INDEX, KEY_NAME } from '../constants';

const useKeyword = (
  searchWords: SearchWordType[],
  isOnFocus: boolean,
  setIsOnFocus: React.Dispatch<React.SetStateAction<boolean>>,
  setKeyword: React.Dispatch<React.SetStateAction<string>>,
) => {
  const [focusIndex, setFocusIndex] = useState<number>(DEFAULT_INDEX);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOnFocus) return;

      if (
        event.key === KEY_NAME.arrowDown ||
        event.key === KEY_NAME.arrowRight
      ) {
        event.preventDefault();

        setFocusIndex((currentIndex) =>
          Math.min(currentIndex + 1, searchWords.length - 1),
        );
        return;
      }

      if (event.key === KEY_NAME.arrowUp || event.key === KEY_NAME.arrowLeft) {
        event.preventDefault();

        setFocusIndex((currentIndex) => Math.max(-1, currentIndex - 1));
        return;
      }

      if (event.key === KEY_NAME.enter) {
        setKeyword(searchWords[focusIndex].sickNm);
        setIsOnFocus(false);
      }
    },
    [searchWords, focusIndex, isOnFocus, setKeyword, setIsOnFocus],
  );

  return { focusIndex, handleKeyDown, setFocusIndex };
};

export default useKeyword;
