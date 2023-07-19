import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import { SearchWordType } from '../../types';
import { searchAPI } from '../../services/search.service';
import { DEFAULT_INDEX } from '../../constants';
import useKeyword from '../../hooks/useKeyword';
import useDebounce from '../../hooks/useDebounce';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [resultWords, setResultWords] = useState<SearchWordType[]>([]);

  const { handleKeyDown, focusIndex, setFocusIndex } = useKeyword(
    resultWords,
    isOnFocus,
    setIsOnFocus,
    setKeyword,
  );

  const debouncedInputValue = useDebounce(keyword);

  const handleSearch = (searchKeyword: string) => {
    if (searchKeyword.trim().length === 0) return;

    setIsOnFocus(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const fetchAutocompleteWords = async () => {
      setIsLoading(true);
      const words = await searchAPI(debouncedInputValue.trim().toLowerCase());

      setIsLoading(false);
      setFocusIndex(DEFAULT_INDEX);
      setResultWords(words);
    };

    fetchAutocompleteWords();
  }, [debouncedInputValue, setFocusIndex]);

  return (
    <div
      onFocus={() => setIsOnFocus(true)}
      onBlur={() => setIsOnFocus(false)}
      className="relative w-full max-w-[500px] m-auto"
    >
      <SearchInput
        keyword={keyword}
        isOnFocus={isOnFocus}
        onSearch={handleSearch}
        setkeyword={setKeyword}
      />
      {isOnFocus && (
        <div className="mt-2">
          <SearchResult
            isLoading={isLoading}
            debouncedInputValue={debouncedInputValue}
            setKeyword={setKeyword}
            onSearch={handleSearch}
            resultWords={resultWords}
            focusIndex={focusIndex}
            setFocusIndex={setFocusIndex}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBox;
