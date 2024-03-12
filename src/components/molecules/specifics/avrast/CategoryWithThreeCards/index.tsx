'use client';

import React, { ReactElement } from 'react';

import CardCategoryB from '../Cards/CategoriB';
import CardCategoryA from '../Cards/CategoryA';
import HeartSymbol from '@/assets/symbols/heart-symbol.svg';
import ButtonSmall from '@/components/atoms/ButtonSmall';
import ButtonSmallWithCheck from '@/components/atoms/ButtonSmallWithCheck';
import DropdownInput from '@/components/atoms/DropdownInput';
import Icon from '@/components/atoms/Icon';

interface IOption {
  label: string;
  value: string;
}
interface ICategoryWithThreeCards {
  categories: string[];
  defaultSelectedCategory: string;
  filterRowLayout?: boolean;
  tabs: { type: string; label: string; options?: IOption[] }[];
  categoryCard?: string;
  hiddenCategory?: boolean;
  customContent?: ReactElement;
}

const CategoryWithThreeCards = ({
  categories,
  defaultSelectedCategory,
  tabs,
  filterRowLayout,
  categoryCard,
  hiddenCategory,
  customContent
}: ICategoryWithThreeCards) => {

  return (
    <div className="flex flex-row px-[136px] py-[72px] gap-[48px]">
      {/* CATEGORIES */}
      {!hiddenCategory && (
        <div className="flex flex-col shrink min-w-[210px] bg-purple_light_bg rounded-r-[12px] rounded-l-[4px] overflow-hidden">
          {categories.map((item: string, index: number) =>
            defaultSelectedCategory === item ? (
              <div
                key={index}
                className="border-l-4 border-purple_dark px-[15px] py-[10px] cursor-pointer text-left"
              >
                <span className="font-bold text-purple_dark text-[18px]">
                  {item}
                </span>
              </div>
            ) : (
              <div
                key={index}
                className="border-l-4 border-purple_mediumlight px-[15px] py-[10px] cursor-pointer text-left"
              >
                <span className="font-bold text-purple_mediumlight text-[18px]">
                  {item}
                </span>
              </div>
            )
          )}
        </div>
      )}

      {/* ITEMS LIST */}
      <div className="flex flex-col gap-[24px] grow">
        <div
          className={`flex ${filterRowLayout ? 'flex-row-reverse' : 'flex-col'}  gap-5 justify-between`}
        >
          <div className="flex flex-row gap-[12px] ">
            <input
              placeholder="Cari"
              className="focus:outline-none px-[16px] py-[8px] rounded-[12px] bg-purple_dark/[.06] grow"
            />
            <ButtonSmall title="Cari" />
          </div>
          <div className="flex flex-row gap-[12px]">
            {tabs.map(
              (
                item: {
                  options?: IOption[] | undefined;
                  type: string;
                  label: string;
                },
                index: number
              ) =>
                item.type === 'button' ? (
                  <ButtonSmall
                    variant="outlined"
                    key={index}
                    title={item.label}
                  />
                ) : item.type === 'button-checkbox' ? (
                  <ButtonSmallWithCheck
                    key={index}
                    name={item.label}
                    title={item.label}
                  />
                ) : item.type === 'dropdown' ? (
                  <DropdownInput value={item.label} options={item.options} />
                ) : (
                  <React.Fragment key={index} />
                )
            )}
          </div>
        </div>
        {!customContent ? (
          <div className="grid grid-cols-3 gap-[24px]">
            {[...Array(9)].map((_, index) => (
              categoryCard === "B" ? (
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
            ))}
          </div>
        ) : customContent}
        <div className="flex flex-row justify-between">
          <p className="text-[20px]">
            Menampilkan <span className="font-bold text-purple_dark">1-9</span>{' '}
            dari <span className="font-bold">20</span> hasil
          </p>
          <div className="flex flex-row gap-[8px] items-center">
            <p className="text-[20px] text-purple_dark font-bold">1</p>
            <p className="text-[20px]">2</p>
            <p className="text-[20px]">3</p>
            <p className="text-[20px]">4</p>
            <Icon name="chevronRight" color="purple_dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWithThreeCards;
