import React, { useState } from 'react';
import ButtonMenuVertical from '../../ButtonMenuVertical';
import { CardMenuDownload } from '../../KelolaPolis/MainContentComponent/CardMenu';
import { Paginate } from './Paginate';
import NotFound from '@/components/atoms/NotFound';
import { PageInfo } from '@/types/provider.type';
import {
  contentStringTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

interface Props {
  categories: string[];
  reportData: ReportContent;
  tahunList: string[];
  selectedCategory: string;
  selectedYear?: string;
  onSelectedCategory: (value: string) => void;
  onSelectedYear: (value: string) => void;
  onChangeSearch: (value: string) => void;
  pageInfo: PageInfo;
  setPageInfo: (pageNumber: any) => void;
}

export const ReportList = ({
  categories,
  reportData,
  tahunList,
  selectedCategory,
  onSelectedCategory,
  selectedYear,
  onSelectedYear,
  onChangeSearch,
  pageInfo,
  setPageInfo
}: Props) => {
  const [categoriesInitial] = useState<string[]>(categories);
  const [keyword, setKeyword] = useState('');

  const newPageInfo = {
    ...pageInfo,
    pageSize: reportData[selectedCategory]?.length,
    totalData: reportData[selectedCategory]?.length
  };

  const handleClickDownload = async (fileUrl: string) => {
    window.open(fileUrl, '_blank');
    // await handleDownload(fileUrl);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectedYear(event.target.value);
  };

  const handleSeachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleChangePage = (pageNumber: number) => {
    setPageInfo((prevPageInfo: any) => ({
      ...prevPageInfo,
      pagePos: pageNumber
    }));
  };

  const btnVerticalData = categoriesInitial?.map((item) => {
    return {
      title: item,
      onClick: () => {
        onSelectedCategory(item);
      }
    };
  });

  return (
    <div className={`w-full flex flex-col justify-center relative`}>
      <div className="w-full flex md:flex-row xs:flex-col gap-[48px]">
        <div className="xs:hidden md:block">
          <div
            className={`flex flex-col bg-purple_light_bg rounded-[12px] w-[200px]`}
          >
            {[...categoriesInitial].map((category, index) => (
              <div
                key={index}
                role="button"
                className={`${index === 0 && 'rounded-tl-[12px]'} ${
                  index + 1 === categoriesInitial.length && 'rounded-bl-[12px]'
                } ${
                  selectedCategory !== category && 'opacity-50'
                } border-l-8 border-l-purple_dark py-[12px] pl-[24px] font-bold text-purple_dark text-[18px]`}
                onClick={() => onSelectedCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-full xs:w-full flex flex-col gap-4">
          <div>
            {/* filter */}
            <div className="flex sm:flex-row xs:flex-col justify-between mb-[24px] sm:gap-[24px] xs:gap-[36px]">
              <div className="xs:w-[100%] md:w-[23%] h-full bg-purple_light_bg rounded-xl sm:hidden">
                {btnVerticalData && (
                  <ButtonMenuVertical item={btnVerticalData} />
                )}
              </div>
              <div className="text-purple_dark border-1 px-[12px] py-[8px] rounded-md border-purple_dark xs:w-[7.5rem]">
                <select value={selectedYear} onChange={handleYearChange}>
                  <option value="" selected>
                    Pilih Tahun
                  </option>
                  {tahunList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-row gap-[12px]">
                <input
                  placeholder="Cari Laporan"
                  className="w-[365px] py-[12px] px-[16px] rounded-xl bg-purple_dark/5"
                  onChange={handleSeachChange}
                  value={keyword}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                      onChangeSearch(keyword);
                    }
                  }}
                />
                <button
                  className="py-[8px] px-[20px] bg-purple_dark hover:bg-purple_light text-white rounded-[6px]"
                  onClick={() => onChangeSearch(keyword)}
                >
                  Cari
                </button>
              </div>
            </div>
            {/* list */}
            <div>
              {!reportData[selectedCategory] ? (
                <NotFound />
              ) : (
                reportData[selectedCategory]?.map(
                  (item: any, itemIndex: number) => (
                    <CardMenuDownload
                      key={itemIndex}
                      desc={contentStringTransformer(
                        item.content['panduanpenanganan-namafile']
                      )}
                      href={
                        singleImageTransformer(
                          item.content['panduanpenanganan-filelaporanpublikasi']
                        ).imageUrl
                      }
                      onDownload={handleClickDownload}
                    />
                  )
                )
              )}
            </div>
            {/* paginate */}
            {pageInfo && (
              <Paginate
                className="mt-[24px]"
                dataPage={newPageInfo}
                onChangePage={handleChangePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ReportContent {
  [key: string]: any;
}
