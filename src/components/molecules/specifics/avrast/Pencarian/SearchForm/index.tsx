'use client';

import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import CardCategoryD from '../../Cards/CategoryD';
import SearchBox from '../../SearchBox';
import NewsCard from './NewsCard';
import ServiceCard from './ServiceCard';
import { formatTimeDifference } from '@/app/promo-berita/berita/format-time';
import BOOK from '@/assets/images/common/book.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import MediumTag from '@/components/atoms/Tag/MediumTag';
import { handleGetContentCategory } from '@/services/content-page.api';
import { handleDownload, htmlParser } from '@/utils/helpers';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Asuransi Individu');
  const [currentSlug, setCurrentSlug] = useState('Produk-Avras');
  const [searchKeyWords, setSearchKeywords] = useState(
    searchParams.get('searchValue') ?? ''
  );
  const [dataContent, setDataContent] = useState<any>();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let listData = [];
        const queryParams: QueryParams = {
          includeAttributes: 'true',
          searchFilter: searchKeyWords
        };
        const data = await handleGetContentCategory(currentSlug, queryParams);

        if (activeTab === 'Asuransi Individu') {
          const data1 = contentCategoryTransformer(data, 'Asuransi Jiwa');
          const data2 = contentCategoryTransformer(data, 'Asuransi Kesehatan');
          const newDataContentWithCategory = data1.concat(data2);
          listData = newDataContentWithCategory;
        } else if (activeTab === 'Asuransi Korporasi') {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            'Employee Benefit'
          );
          listData = newDataContentWithCategory;
        } else if (activeTab === 'Berita & Kegiatan') {
          const data1 = contentCategoryTransformer(data, '');
          const data2 = contentCategoryTransformer(data, '-');
          const data3 = contentCategoryTransformer(data, 'Berita Pers');
          const data4 = contentCategoryTransformer(data, 'Berita dan Kegiatan');
          const newDataContentWithCategory = data1.concat(data2, data3, data4);
          listData = newDataContentWithCategory;
        } else if (activeTab === 'Avristory') {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            'AvriStory'
          );
          listData = newDataContentWithCategory;
        } else if (activeTab === 'Avrist Life Guide') {
          const data1 = contentCategoryTransformer(data, 'Financial');
          const data2 = contentCategoryTransformer(data, 'Lifestyle');
          const data3 = contentCategoryTransformer(data, 'Tips and Tricks');
          const newDataContentWithCategory = data1.concat(data2, data3);
          listData = newDataContentWithCategory;
        } else if (activeTab === 'Penghargaan') {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            ''
          );
          listData = newDataContentWithCategory;
        } else {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            '-'
          );
          listData = newDataContentWithCategory;
        }

        const dataContentValues = listData?.map(
          ({ content, id, createdAt }) => {
            if (activeTab === 'Avristory') {
              const namaFile = contentStringTransformer(
                content['nama-file-bulletin']
              );
              const file = singleImageTransformer(
                content['file-bulletin']
              ).imageUrl;

              return { namaFile, file };
            } else if (activeTab === 'Avrist Life Guide') {
              const date = format(new Date(createdAt), 'dd MMMM yyyy');
              const judul = content['judul-artikel'].value;
              const deskripsi =
                content['artikel-looping'].contentData[0].details[0].value;
              const image = singleImageTransformer(
                content['artikel-thumbnail']
              ).imageUrl;
              const tags = contentStringTransformer(content['tags']);
              const waktuBaca = content['waktu-baca-artikel'].value;
              const differenceTime = formatTimeDifference(
                new Date(createdAt),
                new Date()
              );

              return {
                judul,
                deskripsi,
                image,
                id,
                tags,
                waktuBaca,
                date,
                differenceTime
              };
            } else if (activeTab === 'Penghargaan') {
              const judul = content['judul-artikel'].value;
              const nama = content['nama-penghargaan'].value;
              const waktu = format(new Date(createdAt), 'dd MMMM yyyy');
              const deskripsi =
                content['artikel-looping'].contentData[0].details[0].value;

              return { judul, nama, waktu, deskripsi, id };
            } else if (activeTab === 'Berita & Kegiatan') {
              const label = '';
              const title = contentStringTransformer(content['judul-artikel']);
              const date = format(new Date(createdAt), 'dd MMMM yyyy');
              const description =
                content['artikel-looping'].contentData[0].details[0].value;

              return {
                label,
                date,
                title,
                description,
                id
              };
            } else {
              const label = contentStringTransformer(content['jenis-produk']);
              const date = format(new Date(createdAt), 'dd MMMM yyyy');
              const title = contentStringTransformer(content['nama-produk']);
              const description = contentStringTransformer(
                content['deskripsi-lengkap-produk']
              );
              const tags = contentStringTransformer(content['tags']);

              return {
                label,
                date,
                title,
                description,
                tags,
                id
              };
            }
          }
        );

        setCurrentPage(1);
        setDataContent(dataContentValues);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [activeTab, searchKeyWords]);

  const paginatedData = dataContent
    ? dataContent.slice(startIndex, endIndex)
    : [];
  const totalPages = dataContent
    ? Math.ceil(dataContent.length / itemsPerPage)
    : 0;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const tabs = [
    {
      title: 'Asuransi Individu',
      slug: 'Produk-Avras',
      color: 'bg-purple_dark',
      borderColor: 'border-purple_dark'
    },
    {
      title: 'Asuransi Korporasi',
      slug: 'Produk-Avras',
      color: 'bg-purple_dark',
      borderColor: 'border-purple_dark'
    },
    {
      title: 'Berita & Kegiatan',
      slug: 'Berita-dan-Kegiatan-Detail',
      color: 'bg-purple_dark',
      borderColor: 'border-purple_dark'
    },
    {
      title: 'Avristory',
      slug: 'Bulletin-AvriStory',
      color: 'bg-purple_dark',
      borderColor: 'border-purple_dark'
    },
    {
      title: 'Avrist Life Guide',
      slug: 'List-Avrist-Life-Guide',
      color: 'bg-purple_dark',
      borderColor: 'border-purple_dark'
    },
    {
      title: 'Avrist Syariah',
      slug: 'Produk-Avrast-Syariah',
      color: 'bg-olive_green',
      borderColor: 'border-olive_green'
    },
    {
      title: 'Avrist DPLK',
      slug: 'Produk-Avrast-DPLK',
      color: 'bg-yellow_alternate',
      borderColor: 'border-yellow_alternate'
    },
    {
      title: 'Penghargaan',
      slug: 'Artikel-Penghargaan',
      color: 'bg-purple_dark',
      borderColor: 'border-purple_dark'
    }
  ];

  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className=" w-full flex flex-col -mt-[-0.0625rem]">
      <div className="sm:px-[8.5rem] sm:pt-[6.25rem] pb-[1.625rem] xs:pt-[3rem] xs:px-[2.25rem] bg-white rounded-t-[3.75rem] flex flex-col sm:gap-[3rem] xs:gap-[2.25rem]">
        <SearchBox
          onSearch={(value: string) => {
            setSearchKeywords(value);
          }}
          value={searchKeyWords}
        />

        <div className="px-[0.1875rem] xs:hidden sm:grid sm:grid-cols-4 xs:grid-cols-1 gap-[0.75rem]">
          {tabs.map((tab) => (
            <Button
              key={tab.title}
              title={tab.title}
              onClick={() => {
                setActiveTab(tab.title);
                setCurrentSlug(tab.slug);
              }}
              customButtonClass={`${activeTab === tab.title && `${tab.color} text-white px-[1.25rem] py-[0.5rem]`} !${tab.borderColor} hover:${tab.color} px-[1.25rem] py-[0.5rem]`}
              customTextClass="text-[1rem] font-semibold leading-[1.48rem] whitespace-nowrap"
            />
          ))}
        </div>

        <div className="md:hidden">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...sliderSettings}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.title}
                title={tab.title}
                onClick={() => {
                  setActiveTab(tab.title);
                  setCurrentSlug(tab.slug);
                }}
                customButtonClass={`w-[95%] ${activeTab === tab.title && `${tab.color} text-white px-[1.25rem] py-[0.5rem]`} !${tab.borderColor} hover:${tab.color} px-[1.25rem] py-[0.5rem]`}
                customTextClass="text-[1rem] font-semibold leading-[1.48rem]"
              />
            ))}
          </Slider>
        </div>

        <ServiceCard />
        {activeTab === 'Avristory' ? (
          <div className="grid lg:grid-cols-1 gap-[24px] w-full">
            {paginatedData?.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full flex flex-wrap justify-between items-center p-4 border rounded-xl xm:text-left"
              >
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-bold text-2xl">{item.namaFile}</p>
                  <MediumTag title="PDF" />
                </div>
                <Button
                  title="Unduh"
                  customButtonClass="rounded-xl bg-purple_dark xs:max-lg:min-w-full xs:max-lg:mt-3"
                  customTextClass="text-white text-xl"
                  onClick={async () => await handleDownload(item.file)}
                />
              </div>
            ))}
          </div>
        ) : activeTab === 'Avrist Life Guide' ? (
          <div className="grid grid-cols-1 gap-[24px]">
            {paginatedData?.map((item: any, index: number) => (
              <Link
                key={index}
                href={{
                  pathname: `/promo-berita/berita/life-guide/avrist-life-guide`,
                  query: { id: item.id }
                }}
              >
                <CardCategoryD
                  type="row"
                  title={htmlParser(item.judul)}
                  summary={htmlParser(item.deskripsi)}
                  category={item.tags}
                  time={` | ${item.date}`}
                  tags={item.tags.split(',')}
                  image={item.image}
                  readTime={item.waktuBaca}
                />
              </Link>
            ))}
          </div>
        ) : activeTab === 'Penghargaan' ? (
          <div className="grid grid-cols-1 gap-[24px]">
            {paginatedData?.map((item: any, index: number) => (
              <Link
                key={index}
                href={`/tentang-avrist-life/tentang-avrist-life/tabs/penghargaan/${item.id}`}
              >
                <div
                  key={index}
                  className="flex flex-col gap-[18px] border border-gray_light rounded-xl text-left md:h-full"
                >
                  <div className="flex flex-col gap-2 p-5 h-full">
                    <p className="text-xs">{item.waktu}</p>
                    <p
                      className="text-[20px] font-bold"
                      dangerouslySetInnerHTML={{
                        __html: item.judul
                      }}
                    />
                    <p className="text-[20px]">{item.nama}</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.deskripsi
                      }}
                      className="text-xs"
                    />
                    <div className="flex flex-row items-end gap-1 text-left h-full">
                      <p className="text-purple_dark font-bold text-sm cursor-pointer text-left">
                        Baca Berita Pers
                      </p>
                      <Icon
                        width={16}
                        height={16}
                        name="chevronRight"
                        color="purple_dark"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : activeTab === 'Berita & Kegiatan' ? (
          <div className="grid grid-cols-1 gap-[24px]">
            {paginatedData?.map((item: any, index: number) => (
              <Link
                key={index}
                href={{
                  pathname: `/promo-berita/berita/berita-dan-kegiatan/`,
                  query: { id: item.id }
                }}
              >
                <div className="mx-3 rounded-xl border-2 border-gray_light px-[1.5rem] py-[2.25rem] flex flex-col gap-[1.5rem]">
                  <p className="text-sm">{item.date}</p>
                  <p
                    className="text-2xl w-[74%] font-bold"
                    dangerouslySetInnerHTML={{
                      __html: item.title
                    }}
                  />
                  <div
                    className="text-sm text-body-text-1 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: item.description
                    }}
                  />

                  <div className="flex flex-row gap-2">
                    <Image alt="book" src={BOOK} />
                    <p className="text-sm font-bold">Baca 2 Menit</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-[0.75rem]">
            {dataContent &&
              paginatedData.map(
                (
                  item: {
                    id: string;
                    label: string;
                    date: string;
                    title: string;
                    description: string;
                    tags: string;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <Link
                    href={`${activeTab === 'Asuransi Individu' ? '/produk/individu/' : activeTab === 'Asuransi Korporasi' ? '/produk/korporasi/' : activeTab === 'Avrist DPLK' ? '/avrist-dplk/produk/' : '/avrist-syariah/produk/'}${item.id}`}
                    key={index}
                  >
                    <NewsCard
                      label={item.label}
                      date={item.date}
                      title={item.title}
                      description={item.description}
                      tags={item?.tags?.split(',')}
                    />
                  </Link>
                )
              )}
          </div>
        )}

        <div className="flex flex-col gap-[0.25rem] sm:flex-row justify-between">
          <div>
            <p className="text-[1.25rem]">
              Menampilkan{' '}
              <span className="font-bold text-purple_dark">
                {dataContent?.length === 0 ? 0 : startIndex + 1}-
                {Math.min(endIndex, dataContent ? dataContent.length : 0)}
              </span>{' '}
              dari <span className="font-bold">{dataContent?.length}</span>{' '}
              hasil
            </p>
          </div>
          <div className="flex flex-row gap-[0.5rem] items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div
                key={page}
                role="button"
                onClick={() => handlePageChange(page)}
                className={`w-[1.5rem] h-[1.5rem] flex items-center justify-center cursor-pointer ${currentPage === page ? 'text-purple_dark font-bold' : ''}`}
              >
                {page}
              </div>
            ))}
            <span
              className="mt-[0.1875rem]"
              role="button"
              onClick={() => handlePageChange(totalPages)}
            >
              <Icon name="chevronRight" color="purple_dark" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
