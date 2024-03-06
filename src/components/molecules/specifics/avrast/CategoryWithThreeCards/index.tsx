'use client';

import React, { useState } from 'react';

import CardCategoryA from '../Cards/CategoryA';
import HeartSymbol from '@/assets/symbols/heart-symbol.svg';
import ButtonSmall from '@/components/atoms/ButtonSmall';
import ButtonSmallWithCheck from '@/components/atoms/ButtonSmallWithCheck';
import Icon from '@/components/atoms/Icon';

interface ICategoryWithThreeCards {
  categories: string[];
  defaultSelectedCategory: string;
  tabs: { type: string; label: string }[];
}

const CategoryWithThreeCards = ({
  categories,
  defaultSelectedCategory,
  tabs
}: ICategoryWithThreeCards) => {
  const [selectedCategory] = useState(defaultSelectedCategory);

  return (
    <div className="flex flex-row px-[136px] py-[72px] gap-[48px]">
      {/* CATEGORIES */}
      <div className="flex flex-col shrink min-w-[210px] bg-purple_light_bg rounded-r-[12px] rounded-l-[4px] overflow-hidden">
        {categories.map((item: string, index: number) =>
          selectedCategory === item ? (
            <div
              key={index}
              className="border-l-4 border-purple_dark px-[15px] py-[10px] cursor-pointer"
            >
              <span className="font-bold text-purple_dark text-[18px]">
                {item}
              </span>
            </div>
          ) : (
            <div
              key={index}
              className="border-l-4 border-purple_mediumlight px-[15px] py-[10px] cursor-pointer"
            >
              <span className="font-bold text-purple_mediumlight text-[18px]">
                {item}
              </span>
            </div>
          )
        )}
      </div>

      {/* ITEMS LIST */}
      <div className="flex flex-col gap-[24px] grow">
        <div className="flex flex-row gap-[12px] ">
          <input
            placeholder="Cari"
            className="focus:outline-none px-[16px] py-[8px] rounded-[12px] bg-purple_dark/[.06] grow"
          />
          <ButtonSmall title="Cari" />
        </div>
        <div className="flex flex-row gap-[12px]">
          {tabs.map((item: { type: string; label: string }, index: number) =>
            item.type === 'button' ? (
              <ButtonSmall key={index} title={item.label} />
            ) : item.type === 'button-checkbox' ? (
              <ButtonSmallWithCheck name={item.label} title={item.label} />
            ) : (
              <React.Fragment />
            )
          )}
        </div>
        <div className="grid grid-cols-3 gap-[24px]">
          {[...Array(9)].map((_, index) => (
            <CardCategoryA
              key={index}
              symbol={HeartSymbol}
              title="Asuransi Jiwa"
              summary="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet"
              tags={['Asuransi Jiwa', 'Premi Tetap', 'Premi Berkala']}
            />
          ))}
        </div>
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
