import React, { useState } from 'react';
import Accordion from '../../Accordion';
import ButtonMenuVertical from '../../ButtonMenuVertical';
import DownloadFileButton from '../../DownloadFileButton';
import { Paginate } from '../../HubungiKami/MainContentComponent/Paginate';
import Icon from '@/components/atoms/Icon';
import { PageInfo } from '@/types/provider.type';
import { BASE_URL } from '@/utils/baseUrl';

interface Props {
  categories: string[];
  listData: any;
  selectedCategory: string;
  onSelectedCategory: (value: string) => void;
  pageInfo: PageInfo;
  setPageInfo: (pageNumber: any) => void;
  onBack: (value: boolean) => void;
}

export const ContentList = ({
  categories,
  listData,
  selectedCategory,
  onSelectedCategory,
  pageInfo,
  setPageInfo,
  onBack
}: Props) => {
  const [categoriesInitial] = useState<string[]>(categories);

  const newPageInfo = {
    ...pageInfo,
    pageSize: listData?.length,
    totalData: listData?.length
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
      <div className="w-full flex md:flex-row xs:flex-col mt-10">
        <div className="xs:hidden md:block">
          <div
            className={`flex flex-col bg-purple_light_bg rounded-[12px] w-[200px]`}
          >
            {[...categoriesInitial].map((category, index) => {
              if (category === '-') return null;
              return (
                <div
                  key={index}
                  role="button"
                  className={`${index === 0 && 'rounded-tl-[12px]'} ${
                    index + 1 === categoriesInitial.length &&
                    'rounded-bl-[12px]'
                  } ${
                    selectedCategory !== category && 'opacity-50'
                  } border-l-8 border-l-purple_dark px-[24px] py-[12px] font-bold text-purple_dark text-[18px]`}
                  onClick={() => onSelectedCategory(category)}
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:w-3/4 xs:w-full flex flex-col gap-4 sm:ml-[48px] -mt-10">
          <div className="xs:w-[100%] md:w-[23%] h-full bg-purple_light_bg rounded-xl sm:hidden">
            {btnVerticalData && <ButtonMenuVertical item={btnVerticalData} />}
          </div>
          <div
            className="flex flex-row items-center justify-end gap-2 text-[1.25rem] text-purple_dark font-semibold"
            role="button"
            onClick={() => {
              onBack(true);
            }}
          >
            <Icon name="chevronLeft" color="purple_dark" />
            Kembali
          </div>
          <div className="flex flex-col gap-[0.75rem]">
            {/* list */}
            {listData?.map(
              (
                item: {
                  title: string | undefined;
                  desc: string | undefined;
                  file1Name: string;
                  file1: { imageUrl: any };
                  file2Name: string;
                  file2: { imageUrl: any };
                  file3Name: string;
                  file3: { imageUrl: any };
                },
                index: React.Key | null | undefined
              ) => {
                return (
                  <Accordion
                    key={index}
                    bgColor="bg-purple_light_bg"
                    title={item.title}
                    htmlDescription={item?.desc}
                  >
                    <Accordion.Item>
                      {item.file1Name !== '-' &&
                        item?.file1?.imageUrl !== `${BASE_URL.image}/` && (
                          <DownloadFileButton
                            title={item.file1Name}
                            fileType="PDF"
                            filePath={item?.file1?.imageUrl ?? ''}
                          />
                        )}
                      {item.file2Name !== '-' &&
                        item?.file2?.imageUrl !== `${BASE_URL.image}/` && (
                          <DownloadFileButton
                            title={item.file2Name}
                            fileType="PDF"
                            filePath={item?.file2?.imageUrl ?? ''}
                          />
                        )}
                      {item.file3Name !== '-' &&
                        item?.file3?.imageUrl !== `${BASE_URL.image}/` && (
                          <DownloadFileButton
                            title={item.file3Name}
                            fileType="PDF"
                            filePath={item?.file3?.imageUrl ?? ''}
                          />
                        )}
                    </Accordion.Item>
                  </Accordion>
                );
              }
            )}
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
