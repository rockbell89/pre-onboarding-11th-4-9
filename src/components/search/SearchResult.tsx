import React from 'react';
import { SearchWordType } from '../../types';
import SearchWord from './SearchWord';
import { VscLoading } from 'react-icons/vsc';

type SearchResultProps = {
  isLoading: Boolean;
  debouncedInputValue: string;
  resultWords: SearchWordType[];
  focusIndex: number;

  onSearch: (input: string) => void;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SearchResult = ({
  isLoading,
  debouncedInputValue,
  resultWords,
  focusIndex,

  onSearch,
  setKeyword,
  setFocusIndex,
}: SearchResultProps) => {
  const handleClickWord = (word: string) => {
    setKeyword(word);
    onSearch(word);
  };

  const NoResult = () => {
    return (
      <div className="mt-2 text-center p-4 text-gray-400">
        검색결과가 없습니다
      </div>
    );
  };

  const Result = () => {
    return (
      <ul>
        {resultWords.map(({ sickCd, sickNm }, index) => (
          <SearchWord
            key={sickCd}
            keyword={debouncedInputValue}
            resultWord={sickNm}
            tabIndex={focusIndex}
            onClick={handleClickWord}
            isFocused={focusIndex === index}
            setFocusIndex={setFocusIndex}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className=" bg-white rounded-xl">
      <div className="p-4">
        <h3 className="text-xs text-gray-400">추천 검색어</h3>
        {isLoading ? (
          <div className="p-4 text-center">
            <VscLoading className="inline-block animate-spin" />
          </div>
        ) : (
          <>{resultWords.length > 0 ? <Result /> : <NoResult />}</>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
