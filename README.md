## 원티드 프리온보딩 인턴십 과제
### 한국임상정보 - 검색 기능 클론 코딩

## Demo
https://pre-onboarding-11th-4-9.vercel.app/

## 개발기간
7월 16일(일) 12:00 ~ 7월 19일(수) 24:00

## 개발환경
- 개발언어 : TypeScript
- 스타일 : tainwindcss
- HTTP Client: axios
- 라우팅 : react-router-dom

## 요구사항
#### 1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
- 검색결과가 없을 시 “검색결과가 없습니다” 표출
```tsx
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

```
---------
#### 2. API 호출별로 로컬 캐싱 구현
#### 3. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- setTimeout을 활용한 useDebounce 커스텀 훅을 만들어 적용
```ts
import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

```
```tsx
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
```
#### 4. API를 호출할 때 마다 console.info("calling api") 출력
- api 가 호출될때 console.log 출력 적용 
```ts
type ErrorResponse = {
  message: string;
};

export const searchAPI = async (keyword: string) => {
  if (keyword === '') return [];

  const config: AxiosRequestConfig = {
    params: {
      q: keyword,
    },
  };
  const queryStr = new URLSearchParams(config.params).toString();
  const responsedCache = await getCachedResponse(API_URL.search, queryStr);

  if (responsedCache) return await responsedCache.json();

  try {
    const { data } = await apiClient.get<SearchWordType[]>(
      API_URL.search,
      config,
    );
    console.info('calling api');

    setCacheStorage(API_URL.search, queryStr, data);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.log(axiosError.response?.data.message);
    return [];
  }
};
```

----------
#### 5. 키보드만으로 추천 검색어들로 이동 가능하도록 구현
- 키보드 이벤트 작동시 focus index 이동
```javascript
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOnFocus) {
        return;
      }

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
        setIsOnFocus(true);
        setFocusIndex(DEFAULT_INDEX);
      }
    },
    [searchWords, focusIndex, isOnFocus, setKeyword, setIsOnFocus],
  );

```
