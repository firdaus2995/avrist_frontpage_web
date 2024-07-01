import React, { useCallback, useEffect, useState } from 'react';
const _enterKey = 'Enter';

interface SearchBarProps {
  placeholder: string;
  value?: string;
  activeTab?: string;
  placeholderClassname?: string;
  searchButtonTitle?: string;
  searchButtonClassname?: string;
  onSearch?: (target: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  activeTab,
  placeholderClassname,
  searchButtonTitle,
  searchButtonClassname,
  onSearch
}) => {
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    setKeyword('');
  }, [activeTab]);

  useEffect(() => {
    setKeyword(value ?? ''); // Update keyword state based on prop value
  }, [value]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === _enterKey) {
        onSearch ? onSearch(keyword) : {};
      }
    },
    [keyword, onSearch]
  );

  return (
    <div className="flex flex-row items-center gap-[12px] font-opensans">
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(ev) => setKeyword(ev.target.value)}
        className={`${placeholderClassname} focus:outline-none px-[16px] py-[12px] rounded-[12px] bg-purple_dark/[.06] grow`}
        onKeyDown={handleKeyPress}
      />
      <button
        className={`${searchButtonClassname} px-[20px] py-[8px] rounded-[6px]`}
        onClick={() => (onSearch ? onSearch(keyword) : {})}
      >
        {searchButtonTitle}
      </button>
    </div>
  );
};

export default SearchBar;
