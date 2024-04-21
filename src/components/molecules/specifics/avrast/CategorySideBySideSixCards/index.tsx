'use client';
import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

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
    urlDownload?: string;
  }[];
  leftTitleClassname?: string;
  rightTitleClassname?: string;
  buttonClassname?: string;
  customLeftSideClassname?: string;
  customRightSideClassname?: string;
}

const CategorySideBySideSixCards = ({
  leftSide,
  rightSide,
  leftTitleClassname = 'text-purple_dark',
  rightTitleClassname = 'text-purple_dark',
  buttonClassname = 'text-purple_dark border-purple_dark',
  customLeftSideClassname = 'border-b-purple_light',
  customRightSideClassname = 'border-b-purple_light'
}: ICategorySideBySideSixCards) => {

  const renderedDescription = (description: string, isRightSide: boolean) => {
    const isOrdered = description.includes('<ol>');
    const isUnordered = description.includes('<ul>');
    const defaultClassName = isRightSide ? "text-[14px] sm:text=[16px]" : "text-[24px] font-light";

    if (isOrdered) {
      return (
        <div dangerouslySetInnerHTML={{ __html: description.replace('<ol>', `<ol class="list-decimal pl-2 ${defaultClassName}">`) }} />
      );
    }
    if (isUnordered) {
      return (
        <div dangerouslySetInnerHTML={{ __html: description.replace('<ul>', `<ul class="list-disc pl-2 ${defaultClassName}">`) }} />
      );
    }
    
    return (
    <p className={defaultClassName} dangerouslySetInnerHTML={{ __html: description }}></p>
  );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[64px]">
      <div className="col-span-1 sm:col-span-2">
        <div
          className={`${customLeftSideClassname} h-full flex flex-col gap-[36px] p-[36px] border border-gray_light border-b-8  rounded-[12px] rounded-b-[12px]`}
        >
          <p className={`${leftTitleClassname} text-[36px] font-bold`}>
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
                    {/* <p
                      className="text-[24px] font-light"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                   ></p>      */}
                   {
                    item.description && renderedDescription(item.description, false)
                    }                
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
                urlDownload?: string;
              },
              index: number
            ) => (
              <div
                key={index}
                className={`${customRightSideClassname} flex flex-col gap-[24px] px-[24px] py-[36px] border border-gray_light border-b-8  rounded-[12px] rounded-b-[12px]`}
              >
                <p className={`${rightTitleClassname}  font-bold text-[36px]`}>
                  {item.title}
                </p>
                {
                  item.description && renderedDescription(item.description, true)
                }
                {item.hasDownloadButton && (
                  <button
                    type="button"
                    onClick={() => window.open(item.urlDownload, '_blank')}
                    className={`${buttonClassname} border-1 px-10 py-3 rounded-[8px] text-[20px] font-semibold`}
                  >
                    <p>Unduh</p>
                  </button>
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
