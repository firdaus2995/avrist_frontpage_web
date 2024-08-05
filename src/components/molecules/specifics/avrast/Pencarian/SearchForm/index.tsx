'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import SearchBox from '../../SearchBox';
import SliderComponent from '../../Slider';
import NewsCard from './NewsCard';
import ServiceCard from './ServiceCard';
import { formatTimeDifference } from '@/app/promo-berita/berita/format-time';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import NotFound from '@/components/atoms/NotFound';
import MediumTag from '@/components/atoms/Tag/MediumTag';
import { handleGetContentCategory } from '@/services/content-page.api';
import { handleDownload } from '@/utils/helpers';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState({
    title: 'Asuransi Individu',
    slug: 'Produk-Avras'
  });
  const [searchKeyWords, setSearchKeywords] = useState(
    searchParams.get('searchValue') ?? ''
  );
  const [dataContent, setDataContent] = useState<any>([]);

  const itemsPerPage = 5;
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let listData = [];
        const queryParams: QueryParams = {
          includeAttributes: 'true',
          searchFilter: searchKeyWords ?? ''
        };
        const data = await handleGetContentCategory(
          selectedTab.slug,
          queryParams
        );

        if (selectedTab.title === 'Asuransi Individu') {
          const data1 = contentCategoryTransformer(data, 'Asuransi Jiwa');
          const data2 = contentCategoryTransformer(data, 'Asuransi Kesehatan');
          const newDataContentWithCategory = data1.concat(data2);
          listData = newDataContentWithCategory;
        } else if (selectedTab.title === 'Asuransi Korporasi') {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            'Employee Benefit'
          );
          listData = newDataContentWithCategory;
        } else if (selectedTab.title === 'Berita & Kegiatan') {
          const data1 = contentCategoryTransformer(data, '');
          const data2 = contentCategoryTransformer(data, '-');
          const data3 = contentCategoryTransformer(data, 'Berita Pers');
          const data4 = contentCategoryTransformer(data, 'Berita dan Kegiatan');
          const newDataContentWithCategory = data1.concat(data2, data3, data4);
          listData = newDataContentWithCategory;
        } else if (selectedTab.title === 'Avristory') {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            'AvriStory'
          );
          listData = newDataContentWithCategory;
        } else if (selectedTab.title === 'Avrist Life Guide') {
          const data1 = contentCategoryTransformer(data, 'Financial');
          const data2 = contentCategoryTransformer(data, 'Lifestyle');
          const data3 = contentCategoryTransformer(data, 'Tips and Tricks');
          const newDataContentWithCategory = data1.concat(data2, data3);
          listData = newDataContentWithCategory;
        } else if (selectedTab.title === 'Penghargaan') {
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
          ({ content, id, createdAt, categories, shortDesc }) => {
            if (selectedTab.title === 'Avristory') {
              const namaFile = contentStringTransformer(
                content['nama-file-bulletin']
              );
              const file = singleImageTransformer(
                content['file-bulletin']
              ).imageUrl;

              return { namaFile, file };
            } else if (selectedTab.title === 'Avrist Life Guide') {
              const date = format(new Date(createdAt), 'MMMM yyyy');
              const judul = content['judul-artikel'].value;
              const deskripsi = shortDesc;
              const image = singleImageTransformer(
                content['artikel-thumbnail']
              ).imageUrl;
              const tags = contentStringTransformer(content['tags']);
              const category = categories
                .map((item: any) => item.categoryName)
                .join(', ');
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
                differenceTime,
                category
              };
            } else if (selectedTab.title === 'Penghargaan') {
              const judul = content['judul-artikel'].value;
              const nama = content['nama-penghargaan'].value;
              const waktu = format(new Date(createdAt), 'MMMM yyyy');
              const deskripsi =
                content['artikel-looping'].contentData[0].details[0].value;

              return { judul, nama, waktu, deskripsi, id };
            } else if (selectedTab.title === 'Berita & Kegiatan') {
              const label = '';
              const title = contentStringTransformer(content['judul-artikel']);
              const date = format(new Date(createdAt), 'MMMM yyyy');
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
              const date = format(new Date(createdAt), 'MMMM yyyy');
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

        setDataContent(dataContentValues);

        const endOffset = itemOffset + itemsPerPage;
        setPaginatedData(dataContentValues.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(dataContentValues.length / itemsPerPage));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    setItemOffset(0);
    setPageCount(0);
    fetchData();
  }, [selectedTab.title, searchKeyWords, selectedTab.slug]);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!dataContent.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(dataContent.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataContent.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, dataContent]);

  const handlePageChange = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % dataContent.length;
    setItemOffset(newOffset);
  };

  const tabs = useMemo(
    () => [
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
        title: 'DPLK Avrist',
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
    ],
    []
  );

  return (
    <div className=" w-full flex flex-col -mt-[-0.0625rem]">
      <div className="sm:px-[8.5rem] sm:pt-[6.25rem] pb-[28px] xs:pt-[50px] xs:px-[2.25rem] bg-white rounded-t-[3.75rem] flex flex-col sm:gap-[3rem] xs:gap-[2.25rem]">
        <SearchBox
          onSearch={(value: string) => {
            setSearchKeywords(value);
          }}
          value={searchKeyWords}
          placeHolder="Ketik kata yang ingin dicari"
        />

        <div className="px-[0.1875rem] hidden md:grid md:grid-cols-4 grid-cols-1 gap-[0.75rem]">
          {tabs.map((tab) => (
            <Button
              key={tab.title}
              title={tab.title}
              onClick={() => {
                const { title, slug } = tab;
                setSelectedTab({
                  title,
                  slug
                });
              }}
              customButtonClass={`${selectedTab.title === tab.title && `${tab.color} text-white px-[1.25rem] py-[0.5rem]`} !${tab.borderColor} hover:${tab.color} px-[1.25rem] py-[0.5rem]`}
              customTextClass="text-[1rem] font-semibold leading-[1.48rem] whitespace-nowrap"
            />
          ))}
        </div>

        <div className="md:hidden">
          <SliderComponent
            selected={selectedTab.title}
            slideItems={tabs}
            onClickItem={(item) => {
              const { title, slug } = item;
              setSelectedTab({
                title,
                slug
              });
            }}
            customLabel="title"
          />
        </div>

        <div className="">
          <ServiceCard />
        </div>
        {selectedTab.title === 'Avristory' ? (
          <div className="grid lg:grid-cols-1 gap-[12px] w-full">
            {dataContent.length > 0 ? (
              paginatedData?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="w-full flex flex-col gap-6 md:gap-0 md:flex-row flex-wrap justify-between items-start md:items-center p-[24px] border rounded-xl xm:text-left"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <p className="font-bold text-xl sm:text-2xl break-words">
                      {item.namaFile}
                    </p>
                    <MediumTag title="PDF" />
                  </div>
                  <Button
                    title="Unduh"
                    customButtonClass="font-opensans rounded-xl bg-purple_dark xs:max-lg:min-w-full xs:max-lg:mt-3 lg:mt-0"
                    customTextClass="text-white text-[16px]"
                    onClick={async () => await handleDownload(item.file)}
                  />
                </div>
              ))
            ) : (
              <NotFound
                title="Jawaban Tidak Ditemukan"
                subtitle="Coba sesuaikan pencarian Anda untuk menemukan apa yang anda cari."
              />
            )}
          </div>
        ) : selectedTab.title === 'Avrist Life Guide' ? (
          <div className="grid grid-cols-1 gap-[12px]">
            {dataContent.length > 0 ? (
              paginatedData?.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={{
                    pathname: `/promo-berita/berita/life-guide/avrist-life-guide`,
                    query: { id: item.id }
                  }}
                >
                  <div className="mx-3 rounded-xl border-2 border-gray_light px-[1.5rem] py-[2.25rem] flex flex-col gap-[12px]">
                    <p className="text-sm leading-[19.6px]">{item.date}</p>
                    <p
                      className="text-[24px] font-bold font-opensanspro xs:line-clamp-3 sm:line-clamp-none"
                      dangerouslySetInnerHTML={{
                        __html: item.judul
                      }}
                    />
                    <div
                      className="text-body-text-1 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.deskripsi
                      }}
                    />
                  </div>
                </Link>
              ))
            ) : (
              <NotFound
                title="Jawaban Tidak Ditemukan"
                subtitle="Coba sesuaikan pencarian Anda untuk menemukan apa yang anda cari."
              />
            )}
          </div>
        ) : selectedTab.title === 'Penghargaan' ? (
          <div className="grid grid-cols-1 gap-[24px]">
            {dataContent.length > 0 ? (
              paginatedData?.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={`/tentang-avrist-life/tentang-avrist-life/tabs/penghargaan/${item.id}`}
                >
                  <div
                    key={index}
                    className="flex flex-col gap-[18px] border border-gray_light rounded-xl text-left md:h-full"
                  >
                    <div className="flex flex-col gap-3 px-6 py-9 h-full">
                      <p className="text-sm leading-[19.6px]">{item.waktu}</p>
                      <p
                        className="text-[24px] font-bold font-opensanspro xs:line-clamp-3 sm:line-clamp-none"
                        dangerouslySetInnerHTML={{
                          __html: item.judul
                        }}
                      />
                      <p className="text-[20px]">{item.nama}</p>
                      {!item.deskripsi.includes('-</p>') && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.deskripsi
                          }}
                          className="line-clamp-3"
                        />
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NotFound
                title="Jawaban Tidak Ditemukan"
                subtitle="Coba sesuaikan pencarian Anda untuk menemukan apa yang anda cari."
              />
            )}
          </div>
        ) : selectedTab.title === 'Berita & Kegiatan' ? (
          <div className="grid grid-cols-1 gap-[12px]">
            {dataContent.length > 0 ? (
              paginatedData?.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={{
                    pathname: `/promo-berita/berita/berita-dan-kegiatan/`,
                    query: { id: item.id }
                  }}
                >
                  <div className="mx-3 rounded-xl border-2 border-gray_light px-[1.5rem] py-[2.25rem] flex flex-col gap-[12px]">
                    <p className="text-sm leading-[19.6px]">{item.date}</p>
                    <p
                      className="text-[24px] font-bold font-opensanspro xs:line-clamp-3 sm:line-clamp-none"
                      dangerouslySetInnerHTML={{
                        __html: item.title
                      }}
                    />
                    <div
                      className="text-body-text-1 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: item.description
                      }}
                    />
                  </div>
                </Link>
              ))
            ) : (
              <NotFound
                title="Jawaban Tidak Ditemukan"
                subtitle="Coba sesuaikan pencarian Anda untuk menemukan apa yang anda cari."
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-[0.75rem]">
            {dataContent.length > 0 ? (
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
                    href={`${selectedTab.title === 'Asuransi Individu' ? '/produk/individu/' : selectedTab.title === 'Asuransi Korporasi' ? '/produk/korporasi/' : selectedTab.title === 'DPLK Avrist' ? '/avrist-dplk/produk/' : '/avrist-syariah/produk/'}${item.id}`}
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
              )
            ) : (
              <NotFound
                title="Jawaban Tidak Ditemukan"
                subtitle="Coba sesuaikan pencarian Anda untuk menemukan apa yang anda cari."
              />
            )}
          </div>
        )}

        <div className="flex flex-col gap-[1.5rem] sm:flex-row justify-between">
          <div>
            <p className="text-[1.25rem] leading-[28px]">
              Menampilkan{' '}
              <span className="font-bold text-purple_dark">
                {dataContent?.length === 0 ? 0 : itemOffset + 1}-
                {dataContent?.length === 0
                  ? 0
                  : itemOffset + 1 + itemsPerPage > dataContent?.length
                    ? dataContent?.length
                    : itemOffset + itemsPerPage}
              </span>{' '}
              dari <span className="font-bold">{dataContent?.length}</span>{' '}
              hasil
            </p>
          </div>

          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            nextLabel={<Icon name="chevronRight" color="purple_dark" />}
            previousLabel={<Icon name="chevronLeft" color="purple_dark" />}
            containerClassName={`flex flex-row gap-[12px] items-center ${dataContent.length > 0 ? '' : 'hidden'}`}
            activeClassName="text-purple_dark font-bold"
            pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
            forcePage={itemOffset / itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
