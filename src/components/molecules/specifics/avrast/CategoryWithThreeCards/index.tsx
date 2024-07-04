'use client';

import React, { ReactElement, useEffect, useState } from 'react';

import CardCategoryB from '../Cards/CategoriB';
import CardCategoryA from '../Cards/CategoryA';
import HeartSymbol from '@/assets/symbols/heart-symbol.svg';
import ButtonSmall from '@/components/atoms/ButtonSmall';
import ButtonSmallWithCheck from '@/components/atoms/ButtonSmallWithCheck';
import Icon from '@/components/atoms/Icon';
// import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';

interface IOption {
  label: string;
  value: string;
  onClick?: () => void;
}
interface ICategoryWithThreeCards {
  categories: string[];
  defaultSelectedCategory: string;
  filterRowLayout?: boolean;
  tabs: { type: string; label: string; options?: IOption[] }[];
  categoryCard?: string;
  hiddenCategory?: boolean;
  customContent?: ReactElement;
  customLeftContent?: ReactElement | null;
  customRightContent?: ReactElement | null;
  searchPlaceholder?: string;
  onCategoryChange?: (value: string) => void;
  hideSearchBar?: boolean;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  hidePagination?: boolean;
  outerClass?: string;
}

interface DropdownProps {
  categories: string[];
  selectedCategory: string;
}

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
}

const CategoryWithThreeCards = ({
  categories,
  defaultSelectedCategory,
  tabs,
  filterRowLayout,
  categoryCard,
  hiddenCategory,
  customContent,
  customLeftContent,
  customRightContent,
  searchPlaceholder,
  onCategoryChange,
  hideSearchBar,
  searchValue,
  onSearchChange,
  onSearch,
  hidePagination,
  outerClass
}: ICategoryWithThreeCards) => {
  const [selectedCategory, setSelectedCategory] = useState(
    defaultSelectedCategory
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  useEffect(() => {
    setSelectedCategory(defaultSelectedCategory);
  }, [defaultSelectedCategory]);

  const Dropdown: React.FC<DropdownProps> = ({
    categories,
    selectedCategory
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(selectedCategory);

    const handleSelect = (item: string) => {
      setSelected(item);
      setIsOpen(false);
    };

    return (
      <div className="relative sm:hidden block">
        <div
          className="flex justify-between items-center border-l-4 border-purple_dark px-[15px] py-[10px] cursor-pointer rounded-lg font-bold text-purple_dark bg-purple_light_bg text-[18px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selected}</span>
          <div
            className={`transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <Icon name="chevronDown" color="purple_dark" />
          </div>
        </div>
        {isOpen && (
          <div className="absolute w-full mt-1 rounded-lg bg-purple_light_bg shadow-lg">
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className={`border-l-4 px-[15px] py-[12px] cursor-pointer font-bold text-[18px] ${
                  selected === item
                    ? 'border-purple_dark text-purple_dark'
                    : 'border-purple_mediumlight text-purple_mediumlight'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    selectedCategory
  }) => (
    <div className="flex flex-col shrink min-w-[210px] bg-purple_light_bg rounded-r-[12px] rounded-l-[4px] overflow-hidden">
      {categories.map((item: string, index: number) => (
        <div
          key={index}
          className={`border-l-4 ${selectedCategory === item ? 'border-purple_dark' : 'border-purple_mediumlight'} pl-[24px] py-[12px] cursor-pointer text-left`}
          onClick={() => handleCategoryChange(item)}
        >
          <span
            className={`font-bold ${selectedCategory === item ? 'text-purple_dark' : 'text-purple_mediumlight'} text-[18px]/[25.2px]`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`w-full flex flex-col gap-[24px] xs:max-lg:gap-[48px] lg:flex-row ${outerClass}`}
    >
      {/* CATEGORIES */}
      {!hiddenCategory && (
        <span className="hidden">
          <Dropdown
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </span>
      )}
      <div className={`flex flex-col ${hiddenCategory ? 'hidden' : ''}`}>
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
        />
        {customLeftContent ?? null}
      </div>

      {/* ITEMS LIST */}
      <div className="flex flex-col gap-[24px] grow">
        {customRightContent ?? null}
        {!hideSearchBar && (
          <div
            className={`flex ${filterRowLayout ? 'flex-row' : 'flex-col'} flex-wrap gap-5 justify-between`}
          >
            <div className="flex flex-nowrap overflow-x-hidden sm:overflow-x-hidden py-1">
              <div className="flex flex-row gap-[12px] w-full">
                {tabs.map(
                  (
                    item: { type: string; label: string; options?: IOption[] },
                    index: number
                  ) =>
                    item.type === 'button' ? (
                      <ButtonSmall key={index} title={item.label} />
                    ) : item.type === 'button-checkbox' ? (
                      <ButtonSmallWithCheck
                        key={index}
                        name={item.label}
                        title={item.label}
                      />
                    ) : item.type === 'dropdown' ? (
                      <div className="py-[8px] px-[12px] border rounded-md border-purple_dark text-purple_dark font-opensans font-semibold leading-[23.68px]">
                        <select
                          key={index}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            const selectedData = item?.options?.find(
                              (i) => i.value === selectedValue
                            );

                            if (selectedData && selectedData.onClick) {
                              selectedData.onClick();
                            }
                          }}
                        >
                          {item?.options?.map((val, idx) => (
                            <option
                              defaultValue={val.label}
                              key={idx}
                              value={val.value}
                            >
                              {val.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <React.Fragment key={index} />
                    )
                )}
              </div>
            </div>
            <form
              className="flex flex-row gap-[12px] xs:w-full md:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                onSearch ? onSearch : null;
              }}
            >
              <input
                placeholder={searchPlaceholder ?? 'Cari'}
                className="font-karla focus:outline-none xs:w-full md:w-96 px-[16px] py-[12px] rounded-[12px] bg-purple_dark/[.06]"
                onChange={onSearchChange}
                value={searchValue}
              />
              <ButtonSmall title="Cari" onClick={onSearch} type="submit" />
            </form>
          </div>
        )}
        {!customContent ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
            {[...Array(9)].map((_, index) =>
              categoryCard === 'B' ? (
                <CardCategoryB
                  key={index}
                  summary="Lorem ipsum dolor sit amet consectetur."
                  description="2 Januari 2024"
                />
              ) : (
                <CardCategoryA
                  key={index}
                  symbol={HeartSymbol}
                  title="Asuransi Jiwa"
                  summary="Lorem Ipsum"
                  description="Lorem ipsum dolor sit amet"
                  tags={['Asuransi Jiwa', 'Premi Tetap', 'Premi Berkala']}
                />
              )
            )}
          </div>
        ) : (
          customContent
        )}
        {!hidePagination && (
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <div>
              <p className="text-[20px]">
                Menampilkan{' '}
                <span className="font-bold text-purple_dark">1-9</span> dari{' '}
                <span className="font-bold">20</span> hasil
              </p>
            </div>
            <div className="flex flex-row gap-[8px] items-center">
              <p className="text-[20px] text-purple_dark font-bold">1</p>
              <p className="text-[20px]">2</p>
              <p className="text-[20px]">3</p>
              <p className="text-[20px]">4</p>
              <Icon name="chevronRight" color="purple_dark" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryWithThreeCards;
