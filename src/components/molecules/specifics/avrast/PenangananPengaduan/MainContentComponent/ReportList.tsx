import React, { useState } from 'react';
import { CardMenuDownload } from '../../KelolaPolis/MainContentComponent/CardMenu';
import { Paginate } from './Paginate';
import { PageInfo } from '@/types/provider.type';
import { handleDownload } from '@/utils/helpers';
import { contentStringTransformer, singleImageTransformer } from '@/utils/responseTransformer';

interface Props { 
  categories: string[], 
  reportData: ReportContent, 
  tahunList: string[], 
  selectedCategory: string,
  selectedYear?: string,
  onSelectedCategory: (value: string) => void,
  onSelectedYear: (value: string) => void,
  onChangeSearch: (value: string) => void,
  pageInfo: PageInfo,
  setPageInfo: (pageNumber: any) => void;
}

export const ReportList = ({ 
  categories, reportData, tahunList, 
  selectedCategory, onSelectedCategory, selectedYear, 
  onSelectedYear, onChangeSearch, pageInfo, setPageInfo
  }: Props ) => {
  const [categoriesInitial] = useState<string[]>(categories);
  const [keyword, setKeyword] = useState('');

  const newPageInfo = {
    ...pageInfo,
    pageSize: reportData[selectedCategory]?.length,
    totalData: reportData[selectedCategory]?.length
  }

  const handleClickDownload = async (fileUrl: string) => {
    await handleDownload(fileUrl);
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectedYear(event.target.value);
  }

  const handleSeachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleChangePage = (pageNumber: number) => {
    setPageInfo((prevPageInfo: any) => ({ ...prevPageInfo, pagePos: pageNumber }));
  };
  
  return (
    <div className={`w-full flex flex-col justify-center relative pt-20`}>
      <div className="w-full flex md:flex-row xs:flex-col">
        <div className="xs:hidden md:block">
          <div
            className={`flex flex-col bg-purple_light_bg rounded-lg w-[200px]`}
          >
            {[...categoriesInitial].map((category, index) => (
              <div
                key={index}
                role="button"
                className={`${
                  index === 0 && 'rounded-tl-lg'
                } ${
                  index + 1 === categoriesInitial.length && 'rounded-bl-lg'
                } ${
                  selectedCategory !== category && 'opacity-50'
                } border-l-8 border-l-purple_dark p-4 font-semibold text-purple_dark`}
                onClick={() => onSelectedCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-3/4 xs:w-full flex flex-col gap-4 ml-[48px]">
          <div>
            {/* filter */}
            <div className="flex flex-row justify-between mb-[24px]">
              <div className="text-purple_dark border-1 px-[5px] py-[8px] rounded-md border-purple_dark">
                <select value={selectedYear} onChange={handleYearChange}>
                  <option value="" disabled selected>
                    Pilih Tahun
                  </option>
                  {
                    tahunList.map((item, index) => {
                      return (
                        <option key={index} value={item}>{item}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div>
                <input
                  placeholder="Cari Laporan"
                  className="w-[365px] py-[8px] px-[16px] rounded-xl bg-purple_dark/5"
                  onChange={handleSeachChange}
                  value={keyword}
                />
                <button className="py-[8px] px-[20px] bg-purple_dark text-white rounded-md ml-[12px]" onClick={() => onChangeSearch(keyword)}>
                  Cari
                </button>
              </div>
            </div>
            {/* list */}
            <div>
              {reportData[selectedCategory]?.map((item: any, itemIndex: number) => (
                <CardMenuDownload
                  key={itemIndex}
                  desc={contentStringTransformer(item.content['panduanpenanganan-namafile'])}
                  href={singleImageTransformer(item.content['panduanpenanganan-filelaporanpublikasi']).imageUrl}
                  onDownload={handleClickDownload}          
                />
              ))}
            </div>
            {/* paginate */}
            {pageInfo && <Paginate className="mt-[24px]" dataPage={newPageInfo} onChangePage={handleChangePage}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ReportContent {
    [key: string]: any;
}