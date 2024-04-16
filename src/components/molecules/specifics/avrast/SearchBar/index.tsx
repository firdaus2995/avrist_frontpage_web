import { useState } from "react";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  placeholderClassname?: string;
  searchButtonTitle?: string;
  searchButtonClassname?: string;
  onSearch?: (target: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  placeholderClassname,
  searchButtonTitle,
  searchButtonClassname,
  onSearch
}) => {
  const [keyword, setKeyword] = useState('');
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(ev) => setKeyword(ev.target.value)}
        className={`${placeholderClassname} focus:outline-none px-[16px] py-[8px] rounded-[12px] bg-purple_dark/[.06] grow`}
      />
      <button
        className={`${searchButtonClassname} px-[19px] py-[7px] rounded-[6px]`}
        onClick={() => onSearch ? onSearch(keyword) : {}}
      >
        {searchButtonTitle}
      </button>
    </div>
  );
};

export default SearchBar;
