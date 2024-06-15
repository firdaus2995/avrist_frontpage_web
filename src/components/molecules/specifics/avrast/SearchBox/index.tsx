'use client';

import React, { useCallback, useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input';
const _enterKey = 'Enter';

type SearchBoxProps = {
  buttonText?: string;
  onSearch: (target: string) => void;
  placeHolder?: string;
  value?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({
  buttonText = 'Cari',
  onSearch,
  placeHolder = 'Asuransi',
  value
}) => {
  const [keyword, setKeyword] = useState(value || '');

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      console.log('handle key down event trigger');
      if (event.key === _enterKey) onSearch(keyword);
    },
    [keyword, onSearch]
  );

  return (
    <div className="w-auto flex md:flex-row flex-col items-stretch gap-2 py-3">
      <Input
        customInputClass="grow !bg-gray_bglightgray !border-none py-[12px] px-[16px]"
        placeholder={placeHolder}
        value={keyword}
        onChange={(ev) => setKeyword(ev.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        title={buttonText}
        onClick={() => onSearch(keyword)}
        customButtonClass="!border-none !bg-purple_dark px-[2.5rem] py-[0.75rem]"
        customTextClass="text-white text-[20px] font-semibold leading-7"
      />
    </div>
  );
};

export default SearchBox;
