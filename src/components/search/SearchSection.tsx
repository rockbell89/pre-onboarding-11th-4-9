import SearchBox from './SearchBox';

const SearchSection = () => {
  return (
    <div className="bg-skyblue py-20 h-[85vh]">
      <div className="container mx-auto">
        <header className="text-center">
          <h2 className="text-black font-black text-lg">
            국내 모든 임상시험 검색하고
            <br />
            온라인으로 참여하기
          </h2>
        </header>
        <div className="mt-10">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
