import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import Button from '@/components/atoms/Button/Button';

interface ICategorySideBySideSixCards {
  leftSide: {
    symbol: StaticImport | string;
    title: string;
    description: string;
  }[];
  rightSide: {
    title: string;
    description: string;
    hasDownloadButton?: boolean;
  }[];
}

const CategorySideBySideSixCards = ({
  leftSide,
  rightSide
}: ICategorySideBySideSixCards) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[64px]">
      <div className="col-span-1 sm:col-span-2">
        <div className="h-full flex flex-col gap-[36px] p-[36px] border border-gray_light border-b-8 border-b-purple_light rounded-[12px] rounded-b-[12px]">
          <p className="text-[36px] text-purple_dark font-bold">
            Ringkasan Produk
          </p>
          <div className="flex flex-col gap-[24px]">
            {leftSide.map(
              (
                item: {
                  symbol: StaticImport | string;
                  title: string;
                  description: string;
                },
                index: number
              ) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col gap-[18px]">
                    <div className="flex flex-row items-center gap-[12px]">
                      <Image
                        width={36}
                        height={36}
                        alt="symbol"
                        src={item.symbol}
                      />
                      <p className="font-semibold text-[20px]">{item.title}</p>
                    </div>
                    <p className="text-[24px] font-light">{item.description}</p>
                  </div>
                  {index !== leftSide.length - 1 && (
                    <div className="border-b border-b-gray_light" />
                  )}
                </React.Fragment>
              )
            )}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid grid-rows-3 gap-[24px]">
          {rightSide.map(
            (
              item: {
                title: string;
                description: string;
                hasDownloadButton?: boolean;
              },
              index: number
            ) => (
              <div
                key={index}
                className="flex flex-col gap-[24px] px-[24px] py-[36px] border border-gray_light border-b-8 border-b-purple_light rounded-[12px] rounded-b-[12px]"
              >
                <p className="text-purple_dark font-bold text-[36px]">
                  {item.title}
                </p>
                <p className="text-[14px] sm:text=[16px]">
                  {item.description.split('\n').map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line.trim()}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                {item.hasDownloadButton && (
                  <Button
                    title="Unduh"
                    customButtonClass="rounded-[8px]"
                    customTextClass="text-[20px] font-semibold"
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySideBySideSixCards;
