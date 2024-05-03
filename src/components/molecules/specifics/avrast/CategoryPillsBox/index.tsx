'use client';

import { useState } from 'react';

interface CategoryPillsBoxProps {
  buttonTitle: string[];
  buttonClassname?: string;
  buttonTextClassname?: string;
  onChangeFilter?: (value: string[]) => void;
}

const CategoryPillsBox: React.FC<CategoryPillsBoxProps> = ({
  buttonTitle,
  buttonClassname,
  buttonTextClassname,
  onChangeFilter
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (item: string) => {
    let newData = [] as string[];
    if (selected.includes(item)) {
      newData = selected.filter((i) => i !== item);
    } else {
      newData = [...selected, item];
    }
    setSelected(newData);
    onChangeFilter && onChangeFilter(newData);
  };
  return (
    <div className="flex flex-nowrap gap-2">
      {buttonTitle.map((item, index) => (
        <div
          key={index}
          className={`${buttonClassname} flex flex-row items-center whitespace-nowrap gap-[6px] px-[19px] py-[7px] rounded-[6px] border cursor-default`}
        >
          <input
            id={item}
            type="checkbox"
            value={item}
            onClick={() => handleSelect(item)}
            className="w-4 h-4 border-gray_verylight rounded focus:ring-2 cursor-pointer"
          />
          <label
            htmlFor={item}
            className={`${buttonTextClassname} font-semibold cursor-pointer`}
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryPillsBox;
