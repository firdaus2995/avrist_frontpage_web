'use client';

import React, { useState, useEffect } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import HeartIcon from '@/assets/images/avrast/component/panduan-pengajuan/icon-2.svg';
import CHEVRONRIGHTPURPLE from '@/assets/images/avrast/component/product-section/chevron-right-purple.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { handleGetContentCategory } from '@/services/content-page.api';
import { handleDownload } from '@/utils/helpers';
import {
  contentCategoryTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const data = [
  {
    category: 'Asuransi Jiwa Individu',
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
    category: 'Avrist DPLK',
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
  const [params, setParams] = useState({
    includeAttributes: 'true',
    category: data[0].category,
    searchFilter: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5
  });
  const [contentData, setContentData] = useState<any>();
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedData = contentData
    ? contentData.slice(startIndex, endIndex)
    : [];

  const totalPages = contentData
    ? Math.ceil(contentData.length / pagination.itemsPerPage)
    : 0;

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
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
    fetchData();
  }, [params]);

  const renderStep = (idx: number) => {
    return (
      <div className="w-full flex flex-col items-center justify-start py-10 text-left p-[2.25rem] border rounded-[0.75rem] border-t-8 border-t-purple_dark">
        <h2 className="w-full text-[2.25rem] font-bold mb-6 text-purple_dark">
          {detailData[selectedDetailCategory]}
        </h2>
        {contentData && selectedData && renderDetailStep(idx)}
      </div>
    );
  };

  const renderDetailStep = (idx: number) => {
    switch (idx) {
      case 0:
        return (
          <div className="w-full flex flex-col gap-[2.25rem] text-[1.25rem]">
            <p
              dangerouslySetInnerHTML={{
                __html: selectedData.content['tab-1-paragraf-1'].value
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: selectedData.content['tab-1-paragraf-2'].value
              }}
            />
            <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4">
              {selectedData.content['tab-1-list'].contentData.map(
                (val: any, idx: number) =>
                  val.details[1].value && (
                    <div
                      key={idx}
                      className="flex flex-row gap-2 font-semibold items-center"
                    >
                      <Image
                        src={singleImageTransformer(val.details[0]).imageUrl}
                        alt={val.details[1].value}
                        className="w-[2.25rem]"
                        width={2.25}
                        height={2.25}
                      />
                      <p>{val.details[1].value}</p>
                    </div>
                  )
              )}
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: selectedData.content['tab-1-paragraf-3'].value
              }}
            />
          </div>
        );
      case 1:
        return (
          <div className="w-full flex flex-col gap-[2.25rem]">
            {selectedData.content['tab-2-list'].contentData.map(
              (val: any, idx: number) =>
                val.details[1].value && (
                  <div
                    key={idx}
                    className="flex flex-row gap-2 text-[1.25rem] font-semibold items-center"
                  >
                    <Image
                      src={singleImageTransformer(val.details[0]).imageUrl}
                      alt={val.details[1].value}
                      className="w-[2.25rem]"
                      width={2.25}
                      height={2.25}
                    />
                    <p>{val.details[1].value}</p>
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
                      className="flex w-full md:flex-row xs:flex-col gap-[1.5rem] shadow-xl justify-between rounded-[0.75rem] border p-[1.5rem]"
                      key={idx}
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-[1.5rem] font-bold">
                          {val.details[0].value}
                        </p>
                        <div className="flex flex-row gap-2 text-purple_dark font-medium">
                          <p className="bg-purple_dark/[0.06] text-[0.875rem] py-[0.25rem] px-[0.5rem]">
                            {format.toUpperCase()}
                          </p>
                          {/* <p className="p-2 bg-purple_dark/[0.06]">605.59 KB</p> */}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div
                          className="py-[0.5rem] px-[1.25rem] rounded-[0.75rem] text-white font-semibold bg-purple_dark cursor-pointer"
                          onClick={async () =>
                            await handleDownload(
                              singleImageTransformer(val.details[1]).imageUrl
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
              className="text-[1.25rem]"
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
      className={`w-full flex flex-col justify-center gap-[4rem] relative sm:px-[8.5rem] sm:pb-[6.25rem] ${isSelectedData ? 'bg-white' : 'bg-purple_light_bg sm:pt-[5rem]'} rounded-b-[4.0625rem]`}
    >
      {!isSelectedData && (
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          <h2 className="md:text-[3.5rem] xs:text-[2.25rem] font-medium text-purple_dark">
            Kami proses Klaim Anda dengan efisien
          </h2>
          <h2 className="md:text-[2.25rem] xs:text-[1.5rem]">
            Cek jenis klaim yang akan Anda ajukan, dan dokumen pendukung yang
            dibutuhkan
          </h2>
        </div>
      )}

      <div className="w-full flex md:flex-row xs:flex-col gap-5 md:px-[5rem] xs:p-[1.25rem]">
        <div className="w-1/4 xs:hidden md:block">
          <div
            className={`w-full flex flex-col ${isSelectedData ? 'bg-purple_light_bg' : 'bg-white'} rounded-[0.75rem]`}
          >
            {!isSelectedData
              ? data.map((val, idx) => (
                  <div
                    key={idx}
                    role="button"
                    onClick={() => {
                      setParams({
                        ...params,
                        category: val.category
                      });
                    }}
                    className={`${idx === 0 && 'rounded-tl-[0.75rem]'} ${idx + 1 === data.length && 'rounded-bl-[0.75rem]'} ${params.category !== val.category && 'opacity-50'} border-l-8 border-l-purple_dark p-4 text-[1.125rem] font-bold text-purple_dark`}
                  >
                    {val.category}
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
                    className={`${idx === 0 && 'rounded-tl-[0.75rem]'} ${idx + 1 === detailData.length && 'rounded-bl-[0.75rem]'} ${selectedDetailCategory !== idx && 'opacity-50'} border-l-8 border-l-purple_dark p-4 font-semibold text-purple_dark`}
                  >
                    {val}
                  </div>
                ))}
          </div>
        </div>
        <div className="w-full xs:block md:hidden">
          <div
            className={`w-full p-2 flex flex-col ${isSelectedData ? 'bg-purple_light_bg' : 'bg-white'} rounded-[0.75rem] border-l-8 border-l-purple_dark font-semibold text-purple_dark`}
          >
            {!isSelectedData ? (
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
            ) : (
              <select
                id="selected-detail-categories"
                onChange={(e) => {
                  const idx = e.target.selectedIndex;
                  setSelectedDetailCategory(idx);
                  if (idx > 0) {
                    onChangeBannerImg(idx + 2);
                  } else {
                    onChangeBannerImg(2);
                  }
                }}
                className="p-2 bg-purple_light_bg"
              >
                {detailData.map((val, idx) => (
                  <option
                    key={idx}
                    selected={val === selectedData}
                    value={val}
                    className="w-[80%]"
                  >
                    {val}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="md:w-3/4 xs:w-full flex flex-col gap-4">
          {!isSelectedData ? (
            <div className="flex flex-row gap-2">
              <Input
                type="text"
                placeholder="Cari jenis klaim"
                customInputClass="w-[90%] rounded-[0.75rem] px-[1rem] py-[0.75rem]"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button
                title="Cari"
                customButtonClass="bg-purple_dark rounded-[0.75rem] py-[0.75rem] px-[2.5rem]"
                customTextClass="text-white text-[1.25rem] font-semibold"
                onClick={() => {
                  setParams({ ...params, searchFilter: search });
                }}
              />
            </div>
          ) : (
            <div className="flex md:flex-row xs:flex-col xs:divide-y md:divide-y-0 gap-4 justify-between border rounded-[0.75rem] p-4 text-purple_dark font-semibold">
              <div className="flex flex-row items-center gap-2">
                <Image src={HeartIcon} alt="heart-icon" className="w-7" />
                <p className="text-[1.5rem] font-bold">{params.category}</p>
              </div>
              <div
                className="flex flex-row items-center gap-2 text-[1.25rem] font-semibold"
                role="button"
                onClick={() => {
                  setSelectedData('');
                  setIsSelectedData(false);
                  onSelectDetail(false);
                  onChangeBannerImg(1);
                }}
              >
                <Icon name="chevronLeft" color="purple_dark" />
                Kembali
              </div>
            </div>
          )}
          {!isSelectedData && (
            <div className="w-full flex flex-col gap-2">
              {paginatedData.map((val: any, index: number) => (
                <div
                  key={index}
                  role="button"
                  onClick={() => {
                    setSelectedData(val);
                    setIsSelectedData(true);
                    onSelectDetail(true);
                    onChangeBannerImg(2);
                  }}
                  className="w-full p-4 bg-white border-2 text-[1.5rem] rounded-[0.75rem] flex flex-row justify-between font-bold"
                >
                  {val.title}
                  <Image
                    src={CHEVRONRIGHTPURPLE}
                    alt="chevron-right"
                    width={24}
                    height={24}
                  />
                </div>
              ))}
            </div>
          )}
          {!isSelectedData && (
            <div className="flex flex-col gap-4 sm:flex-row justify-between ">
              <div>
                <p className="text-[1.25rem]">
                  Menampilkan{' '}
                  <span className="font-bold text-purple_dark">
                    {contentData?.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(endIndex, contentData ? contentData.length : 0)}
                  </span>{' '}
                  dari{' '}
                  <span className="font-bold">
                    {contentData && contentData.length}
                  </span>{' '}
                  hasil
                </p>
              </div>
              <div className="flex flex-row gap-[0.5rem] items-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <div
                      key={page}
                      role="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                        pagination.currentPage === page
                          ? 'text-purple_dark font-bold'
                          : ''
                      }`}
                    >
                      {page}
                    </div>
                  )
                )}
                <span
                  className="mt-[0.1875rem]"
                  role="button"
                  onClick={() => handlePageChange(totalPages)}
                >
                  <Icon name="chevronRight" color="purple_dark" />
                </span>
              </div>
            </div>
          )}
          {selectedData && (
            <div className="md:text-[3.5rem] xs:text-[1.5rem] font-bold">
              {selectedData.title}
            </div>
          )}
          {selectedData && renderStep(selectedDetailCategory)}
        </div>
      </div>
    </div>
  );
};

export default ProsesKlaim;
