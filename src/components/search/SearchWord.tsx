import { BiSearch } from 'react-icons/bi';
import { DEFAULT_INDEX } from '../../constants';

type SearchWordProps = {
  keyword?: string;
  resultWord: string;
  isFocused: boolean;
  tabIndex: number;
  onClick: (resultWord: string) => void;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
};

const highlightText = (text: string, value: string) => {
  const title = text.toLowerCase();
  const searchValue = value.toLowerCase();
  if (searchValue !== '' && title.includes(searchValue)) {
    const matchText = text.split(new RegExp(`(${searchValue})`, 'gi'));

    return (
      <>
        {matchText.map((text, index) =>
          text.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={index} className=" text-blue font-bold">
              {text}
            </span>
          ) : (
            text
          ),
        )}
      </>
    );
  }

  return text;
};

const SearchWord = ({
  keyword,
  resultWord,
  isFocused,
  tabIndex,
  onClick,
  setFocusIndex,
}: SearchWordProps) => {
  return (
    <li tabIndex={tabIndex}>
      <button
        type="button"
        onClick={() => onClick(resultWord)}
        onMouseOver={() => setFocusIndex(DEFAULT_INDEX)}
        className={`flex justify-start items-center gap-x-3 px-6 py-2 w-full text-gray-300 hover:bg-gray-50 focus:bg-gray-50${
          isFocused ? ' bg-gray-50' : ''
        }`}
      >
        <BiSearch className="gray-400 w-10" />
        {keyword && (
          <span className="inline-block text-left text-black">
            {highlightText(resultWord, keyword)}
          </span>
        )}
      </button>
    </li>
  );
};

export default SearchWord;
