import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

type SearchInputProps = {
  keyword: string;
  isOnFocus: boolean;
  setkeyword: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (input: string) => void;
};

const SearchInput = ({
  keyword,
  isOnFocus,
  setkeyword,
  onSearch,
}: SearchInputProps) => {
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setkeyword(event.currentTarget.value);
  };

  const handleReset = () => setkeyword('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`py-2 px-4 rounded-3xl shadow-md bg-white overflow-hidden flex items-center border-2 ${
        isOnFocus ? 'border-blue' : 'border-white'
      }`}
    >
      <input
        value={keyword}
        onChange={handleInput}
        placeholder="질환명을 입력해주세요"
        className="w-full outline-none"
      />
      {keyword.length > 0 && (
        <button type="reset" onClick={handleReset}>
          <IoClose className="text-gray-400 px-4" />
        </button>
      )}
      <button type="submit">
        <BiSearch className="w-auto" />
      </button>
    </form>
  );
};

export default SearchInput;
