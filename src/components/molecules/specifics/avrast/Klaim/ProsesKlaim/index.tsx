'use client';

import React, { useState, useEffect } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import ButtonMenuVertical from '../../ButtonMenuVertical';
import HeartIcon from '@/assets/images/avrast/component/panduan-pengajuan/icon-2.svg';
import CHEVRONRIGHTPURPLE from '@/assets/images/common/chevron-right-purple.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import NotFound from '@/components/atoms/NotFound';
import { handleGetContentCategory } from '@/services/content-page.api';
import {
  contentCategoryTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const data = [
  {
    category: 'Asuransi Individu',
    data: [
      'Klaim Manfaat Hidup',
      'Klaim Kematian',
      'Klaim Rumah Sakit',
      'Klaim Cacat Total dan Tetap',
      'Klaim Kecelakaan',
      'klaim 2',
      'klaim 2 lagi'
    ]
  },
  {
    category: 'Asuransi Jiwa Korporasi',
    data: [
      'Klaim Manfaat Hidup 2',
      'Klaim Kematian 2',
      'Klaim Rumah Sakit 2',
      'Klaim Cacat Total dan Tetap 2',
      'Klaim Kecelakaan 2',
      'klaim 2',
      'klaim 2 lagi'
    ]
  },
  {
    category: 'Avrist Syariah',
    data: [
      'Klaim Manfaat Hidup 3',
      'Klaim Kematian 3',
      'Klaim Rumah Sakit 3',
      'Klaim Cacat Total dan Tetap 3',
      'Klaim Kecelakaan 3',
      'klaim 2',
      'klaim 2 lagi'
    ]
  },
  {
    category: 'DPLK Avrist',
    data: [
      'Klaim Manfaat Hidup 3',
      'Klaim Kematian 3',
      'Klaim Rumah Sakit 3',
      'Klaim Cacat Total dan Tetap 3',
      'Klaim Kecelakaan 3',
      'klaim 2',
      'klaim 2 lagi'
    ]
  }
];

const detailData = [
  'Perhatikan Informasi Sebelum Klaim',
  'Lengkapi Dokumen Pendukung',
  'Isi Formulir Klaim',
  'Kirim Formulir dan Dokumen Pendukung'
];

interface ProsesKlaimComponentProps {
  onSelectDetail: (val: boolean) => void;
  onChangeBannerImg: (val: number) => void;
}

const ProsesKlaim: React.FC<ProsesKlaimComponentProps> = ({
  onSelectDetail,
  onChangeBannerImg
}) => {
  const [selectedDetailCategory, setSelectedDetailCategory] =
    useState<number>(0);
  const [selectedData, setSelectedData] = useState<any>();
  const [isSelectedData, setIsSelectedData] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [params, setParams] = useState({
    includeAttributes: 'true',
    category: categoryList[0],
    searchFilter: ''
  });
  // const [pagination, setPagination] = useState({
  //   currentPage: 1,
  //   itemsPerPage: 5
  // });
  const [contentData, setContentData] = useState<any>();
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!contentData?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(contentData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(contentData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, contentData]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % contentData.length;
    setItemOffset(newOffset);
  };

  const renderPage = () => {
    return (
      <div className="flex flex-col gap-4 md:flex-row items-start justify-between font-opensans">
        <div>
          <p className="text-[20px]/[28px] font-normal">
            Menampilkan{' '}
            <span className="font-bold text-purple_dark">
              {contentData?.length === 0 || contentData === undefined
                ? 0
                : itemOffset + 1}
              -
              {Math.min(
                (itemOffset + 1) * itemsPerPage,
                contentData ? contentData.length : 0
              )}
            </span>{' '}
            dari{' '}
            <span className="font-bold">
              {contentData && contentData.length}
            </span>{' '}
            hasil
          </p>
        </div>
        {contentData?.length > 0 && (
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            nextLabel={<Icon name="chevronRight" color="purple_dark" />}
            previousLabel={<Icon name="chevronLeft" color="purple_dark" />}
            containerClassName="flex flex-row gap-[12px] items-center"
            activeClassName="text-purple_dark font-bold"
            pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
          />
        )}
      </div>
    );
  };

  const fetchCategory = async () => {
    try {
      await handleGetContentCategory('klaim-data', {
        includeAttributes: 'true'
      }).then((res) => {
        setCategoryList(Object.keys(res.data.categoryList));
        setParams({
          ...params,
          category: Object.keys(res.data.categoryList)[0]
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const fetchApi = await handleGetContentCategory('klaim-data', params);
      const transformedData = contentCategoryTransformer(
        fetchApi,
        params.category
      );
      setContentData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (categoryList.length === 0) {
      fetchCategory();
    } else {
      fetchData();
    }
  }, [params, categoryList]);

  useEffect(() => {
    setItemOffset(0);
  }, [params.category]);

  useEffect(() => {
    if (!isSelectedData) {
      setSelectedDetailCategory(0);
    }
  }, [isSelectedData]);

  const btnVerticalData = categoryList?.map((item) => {
    return {
      title: item,
      onClick: () => {
        setParams({
          ...params,
          category: item
        });
      }
    };
  });

  const btnVerticalDetailData = detailData?.map((item, idx) => {
    return {
      title: item,
      onClick: () => {
        setSelectedDetailCategory(idx);
        if (idx > 0) {
          onChangeBannerImg(idx + 2);
        } else {
          onChangeBannerImg(2);
        }
      }
    };
  });

  const renderStep = (idx: number) => {
    return (
      <div className="w-full flex flex-col items-center justify-start p-[2.25rem] text-left border rounded-[0.75rem] border-t-8 border-t-purple_dark">
        <h2 className="w-full text-[2.25rem] font-bold text-purple_dark font-karla xs:mb-[1.5rem] md:mb-[2.25rem] leading-[43.2px] sm:-tracking-[1.08px] xs:-tracking-[0.04px]">
          {detailData[selectedDetailCategory]}
        </h2>
        {contentData && selectedData && renderDetailStep(idx)}
      </div>
    );
  };

  const isEmpty = (data: string) => {
    return (
      data === '<p>-</p>' ||
      data.includes('>-<') ||
      data === '-' ||
      data === '["-"]'
    );
  };

  const renderDetailStep = (idx: number) => {
    switch (idx) {
      case 0:
        return (
          <div className="w-full flex flex-col xs:gap-[1.5rem] md:gap-[2.25rem] text-[1.25rem] font-opensans">
            <p
              dangerouslySetInnerHTML={{
                __html: selectedData.content['tab-1-paragraf-1'].value
                  .replace(
                    '<ul>',
                    "<ul class='list-disc list-outside font-opensans pl-5'>"
                  )
                  .replace(
                    '<ol>',
                    "<ol class='list-decimal list-outside font-opensans pl-5'>"
                  )
              }}
              className={`${isEmpty(selectedData.content['tab-1-paragraf-1'].value) && 'hidden'} text-[20px] leading-[32px]`}
            />
            <div className="flex flex-col gap-[1.25rem]">
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedData.content['tab-1-paragraf-2'].value
                }}
                className={`${isEmpty(selectedData.content['tab-1-paragraf-2'].value) && 'hidden'} text-[20px] leading-[32px]`}
              />
              <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-[2rem]">
                {selectedData.content['tab-1-list'].contentData.map(
                  (val: any, idx: number) =>
                    val.details[1].value && (
                      <div
                        key={idx}
                        className="flex flex-row gap-[0.75rem] font-semibold items-start text-xl"
                      >
                        <Image
                          src={singleImageTransformer(val.details[0]).imageUrl}
                          alt={val.details[1].value}
                          className={`w-[2.25rem] ${singleImageTransformer(val.details[0]).imageUrl.includes('no-image') && 'hidden'}`}
                          width={2.25}
                          height={2.25}
                        />
                        <p
                          className={`${val.details[1].value === '-' && 'hidden'}`}
                        >
                          {val.details[1].value}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>

            <p
              dangerouslySetInnerHTML={{
                __html: selectedData.content['tab-1-paragraf-3'].value
              }}
              className={`${isEmpty(selectedData.content['tab-1-paragraf-3'].value) && 'hidden'} text-[20px] leading-[32px]`}
            />
          </div>
        );
      case 1:
        return (
          <div className="w-full flex flex-col xs:gap-[1.5rem] md:gap-[1.75rem]">
            {selectedData.content['tab-2-list'].contentData.map(
              (val: any, idx: number) =>
                val.details[1].value && (
                  <div
                    key={idx}
                    className="flex flex-row items-start gap-[0.75rem] text-[1.25rem] font-semibold font-opensans"
                  >
                    {singleImageTransformer(val.details[0]).imageUrl?.includes(
                      'no-image'
                    ) ? null : (
                      <Image
                        src={singleImageTransformer(val.details[0]).imageUrl}
                        alt={val.details[1].value}
                        className="w-[2.25rem]"
                        width={2.25}
                        height={2.25}
                      />
                    )}
                    <p className="text-[20px] leading-[28px]">
                      {val.details[1].value}
                    </p>
                  </div>
                )
            )}
          </div>
        );
      case 2:
        return (
          <div className="w-full flex flex-col gap-[2.25rem]">
            {selectedData.content['tab-3-list-file'].contentData.map(
              (val: any, idx: number) => {
                const file = val.details[1].value;
                const getFormat = singleImageTransformer(
                  val.details[1]
                ).imageUrl.split('.');
                const format = getFormat[getFormat.length - 1];
                return (
                  file !== '[]' && (
                    <div
                      className="flex w-full md:flex-row xs:flex-col gap-[1.5rem] shadow-md justify-between rounded-[0.75rem] border p-[1.5rem]"
                      key={idx}
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-[1.5rem] font-bold font-opensanspro leading-[30.17px]">
                          {val.details[0].value}
                        </p>
                        <div className="flex flex-row gap-2 text-purple_dark font-semibold font-opensans">
                          <p className="bg-purple_dark/[0.06] text-sm py-[0.25rem] px-[0.5rem] leading-[19.6px]">
                            {format.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center xs:justify-start sm:justify-center">
                        <div
                          className="py-[0.5rem] px-[1.25rem] flex items-center justify-center w-[96px] rounded-[6px] text-white font-semibold bg-purple_dark hover:bg-purple_light cursor-pointer font-opensans leading-[23.68px]"
                          onClick={async () =>
                            window.open(
                              singleImageTransformer(val.details[1]).imageUrl,
                              '_blank'
                            )
                          }
                        >
                          Unduh
                        </div>
                      </div>
                    </div>
                  )
                );
              }
            )}
          </div>
        );
      case 3:
        return (
          <div className="w-full flex flex-col gap-4">
            <p
              className={`text-[1.25rem] leading-[32px] font-opensans ${isEmpty(selectedData.content['tab-4-paragraf'].value) && 'hidden'}`}
              dangerouslySetInnerHTML={{
                __html: selectedData.content['tab-4-paragraf'].value
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full flex flex-col justify-center gap-[5rem] xs:px-[2rem] xs:pb-[28px] md:px-[8.5rem] relative ${isSelectedData ? 'bg-white' : 'bg-purple_light_bg pt-[5rem]'} mb-1`}
    >
      {!isSelectedData && (
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          <h2 className="font-karla md:text-[3.5rem] xs:text-[2.25rem] font-extrabold text-purple_dark xs:-tracking-[1.44px] md:-tracking-[2.24px] md:leading-[67.2px] xs:leading-[43.2px]">
            Kami proses Klaim Anda dengan efisien
          </h2>
          <h2 className="font-karla md:text-[2.25rem] xs:text-[1.5rem] -tracking-[1.08px] md:leading-[43.2px] xs:leading-[28.8px] mt-[0.75rem]">
            Cek jenis klaim yang akan Anda ajukan, dan dokumen pendukung yang
            dibutuhkan
          </h2>
        </div>
      )}

      <div className="w-full flex md:flex-row xs:flex-col gap-[3rem]">
        <div className="xs:hidden md:block">
          <div
            className={`w-full flex flex-col ${isSelectedData ? 'bg-purple_light_bg' : 'bg-white'} rounded-[0.75rem]`}
          >
            {!isSelectedData && categoryList.length > 0
              ? categoryList.map((val, idx) => (
                  <div
                    key={idx}
                    role="button"
                    onClick={() => {
                      setParams({
                        ...params,
                        category: val
                      });
                    }}
                    className={`min-w-[250px] ${categoryList.length === 1 && 'rounded-l-[0.75rem]'} ${idx === 0 && 'rounded-tl-[0.75rem]'} ${idx + 1 === data.length && 'rounded-bl-[0.75rem]'} ${params.category !== val && 'opacity-50'} border-l-8 border-l-purple_dark pl-6 pr-3 py-3 text-[1.125rem] font-bold text-purple_dark`}
                  >
                    {val}
                  </div>
                ))
              : detailData?.map((val, idx) => (
                  <div
                    key={idx}
                    role="button"
                    onClick={() => {
                      setSelectedDetailCategory(idx);
                      if (idx > 0) {
                        onChangeBannerImg(idx + 2);
                      } else {
                        onChangeBannerImg(2);
                      }
                    }}
                    className={`${idx === 0 && 'rounded-tl-[0.75rem]'} ${idx + 1 === detailData.length && 'rounded-bl-[0.75rem]'} ${selectedDetailCategory !== idx && 'opacity-50'} border-l-8 border-l-purple_dark p-4 font-bold text-purple_dark text-lg font-opensanspro heading-[25.2px]`}
                  >
                    {val}
                  </div>
                ))}
          </div>
        </div>
        <div className="xs:w-full flex flex-col gap-[2.25rem]">
          {!isSelectedData ? (
            <div className="flex flex-col gap-[2.25rem]">
              <div className="xs:w-[100%] md:w-[25%] h-full bg-purple_light_bg rounded-xl sm:hidden">
                {btnVerticalData && (
                  <ButtonMenuVertical item={btnVerticalData} />
                )}
              </div>
              <div className="flex flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Cari jenis klaim"
                  customInputClass="w-full rounded-[0.75rem] px-[1rem] py-[0.75rem] leading-[22.4px]"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setParams({ ...params, searchFilter: search });
                    }
                  }}
                />
                <Button
                  title="Cari"
                  customButtonClass="bg-purple_dark hover:bg-purple_light rounded-[0.75rem] py-[0.75rem] px-[2.5rem]"
                  customTextClass="text-white text-[1.25rem] font-semibold leading-[28px]"
                  onClick={() => {
                    setParams({ ...params, searchFilter: search });
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[36px]">
              <div className="flex md:flex-row xs:flex-col xs:divide-y md:divide-y-0 gap-4 justify-between border rounded-[0.75rem] p-3 text-purple_dark font-semibold">
                <div className="flex flex-row items-center gap-2">
                  <Image src={HeartIcon} alt="heart-icon" className="w-9" />
                  <p className="text-[1.5rem] font-bold font-karla text-[24px] leading-[28.8px] -tracking-[0.72px]">
                    {params.category}
                  </p>
                </div>
                <div
                  className="flex flex-row items-center gap-2 text-[20px] font-semibold xs:pt-2 sm:pt-0 leading-[28px]"
                  role="button"
                  onClick={() => {
                    setSelectedData('');
                    setIsSelectedData(false);
                    onSelectDetail(false);
                    onChangeBannerImg(1);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Icon
                    name="chevronLeft"
                    color="purple_dark"
                    width={24}
                    height={24}
                  />
                  Kembali
                </div>
              </div>
              <div className="w-full flex xs:block md:hidden">
                {!isSelectedData ? (
                  <div
                    className={`w-full p-2 flex flex-col ${isSelectedData ? 'bg-purple_light_bg' : 'bg-white'} rounded-[0.75rem] border-l-8 border-l-purple_dark font-bold text-purple_dark text-lg`}
                  >
                    <select
                      id="selected-categories"
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setParams({
                          ...params,
                          category: selectedValue
                        });
                      }}
                      className="p-2"
                    >
                      {data.map((val, idx) => (
                        <option
                          key={idx}
                          selected={val.category === params.category}
                          value={val.category}
                          className="w-[80%]"
                        >
                          {val.category}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <ButtonMenuVertical
                    item={btnVerticalDetailData}
                    outerClass="border-1 rounded-xl"
                  />
                )}
              </div>
              <div className="md:text-[3.5rem] xs:text-[2.25rem] font-bold font-karla leading-[67.2px] -tracking-[2.24px]">
                {selectedData.title}
              </div>
            </div>
          )}
          {!isSelectedData && (
            <div className="w-full flex flex-col gap-2">
              {paginatedData.length <= 0 ? (
                <NotFound />
              ) : (
                paginatedData.map((val: any, index: number) => (
                  <div
                    key={index}
                    role="button"
                    onClick={() => {
                      setSelectedData(val);
                      setIsSelectedData(true);
                      onSelectDetail(true);
                      onChangeBannerImg(2);
                      window.scrollTo(0, 0);
                    }}
                    className="w-full p-6 bg-white border-2 text-[1.5rem] rounded-[0.75rem] flex flex-row justify-between font-bold font-opensanspro leading-[30.17px]"
                  >
                    {val.title}
                    <Image
                      src={CHEVRONRIGHTPURPLE}
                      alt="chevron-right"
                      width={24}
                      height={24}
                    />
                  </div>
                ))
              )}
            </div>
          )}
          {!isSelectedData && renderPage()}

          {selectedData && renderStep(selectedDetailCategory)}
        </div>
      </div>
    </div>
  );
};

export default ProsesKlaim;
