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
    <div className="flex flex-wrap gap-2">
      {buttonTitle.map((item, index) => (
        <div
          key={index}
          className={`${buttonClassname} flex flex-row items-center whitespace-nowrap gap-[8px] px-[12px] py-[8px] rounded-[6px] border cursor-default`}
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
