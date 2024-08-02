import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { ISetData } from '@/app/tentang-avrist-life/tentang-avrist-life/page';
import Icon from '@/components/atoms/Icon';
import NotFound from '@/components/atoms/NotFound';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import { handleGetContentPage } from '@/services/content-page.api';
import { getListPenghargaan } from '@/services/penghargaan';
import { PageResponse } from '@/types/page.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import { htmlParser } from '@/utils/helpers';
import {
  handleTransformedContent,
  singleImageTransformer
} from '@/utils/responseTransformer';
const Penghargaan: React.FC<ISetData> = ({ setData }) => {
  const [contentData, setContentData] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    category: '',
    yearFilter: '',
    monthFilter: '',
    searchFilter: ''
  });
  const itemsPerPage = 4;
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!contentData?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(contentData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(contentData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, contentData]);

  useEffect(() => {
    setPageCount(0);
    setItemOffset(0);
  }, [params]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % contentData.length;
    setItemOffset(newOffset);
  };

  const fetchContent = async () => {
    try {
      const apiContent = await getListPenghargaan({
        includeAttributes: 'true',
        category: params.category,
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter
      });

      const transformedContent = apiContent.data.categoryList[''];

      const transformedData = transformedContent?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['judul-artikel'].value;
        const nama = content['nama-penghargaan'].value;
        const waktu = `${
          monthDropdown().find((item) => item.value === content['bulan'].value)
            ?.label
        } ${content['tahun'].value}`;
        const deskripsi = content['artikel-looping'].contentData[0].details;
        const image = singleImageTransformer(
          content['artikel-thumbnail']
        ).imageUrl;
        const id = item.id;

        return { judul, nama, waktu, deskripsi, image, id };
      });

      setContentData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const yearDropdown = (startYear: number) => {
    const currentYear = new Date().getFullYear();

    const years = [
      {
        label: 'Pilih Tahun',
        value: '',
        onClick: () => setParams({ ...params, yearFilter: '' })
      }
    ];

    for (let year = currentYear; year >= startYear; year--) {
      years.push({
        label: year.toString(),
        value: year.toString(),
        onClick: () => setParams({ ...params, yearFilter: year.toString() })
      });
    }

    return years;
  };

  const monthDropdown = () => {
    const month = [
      {
        label: 'Pilih Bulan',
        value: '',
        onClick: () => setParams({ ...params, monthFilter: '' })
      },
      {
        label: 'Januari',
        value: '01',
        onClick: () => setParams({ ...params, monthFilter: '01' })
      },
      {
        label: 'Februari',
        value: '02',
        onClick: () => setParams({ ...params, monthFilter: '02' })
      },
      {
        label: 'Maret',
        value: '03',
        onClick: () => setParams({ ...params, monthFilter: '03' })
      },
      {
        label: 'April',
        value: '04',
        onClick: () => setParams({ ...params, monthFilter: '04' })
      },
      {
        label: 'Mei',
        value: '05',
        onClick: () => setParams({ ...params, monthFilter: '05' })
      },
      {
        label: 'Juni',
        value: '06',
        onClick: () => setParams({ ...params, monthFilter: '06' })
      },
      {
        label: 'Juli',
        value: '07',
        onClick: () => setParams({ ...params, monthFilter: '07' })
      },
      {
        label: 'Agustus',
        value: '08',
        onClick: () => setParams({ ...params, monthFilter: '08' })
      },
      {
        label: 'September',
        value: '09',
        onClick: () => setParams({ ...params, monthFilter: '09' })
      },
      {
        label: 'Oktober',
        value: '10',
        onClick: () => setParams({ ...params, monthFilter: '10' })
      },
      {
        label: 'November',
        value: '11',
        onClick: () => setParams({ ...params, monthFilter: '11' })
      },
      {
        label: 'Desember',
        value: '12',
        onClick: () => setParams({ ...params, monthFilter: '12' })
      }
    ];

    return month;
  };

  useEffect(() => {
    fetchContent();
  }, [params]);

  useEffect(() => {
    handleGetContentPage(BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.PENGHARGAAN).then(
      (res: PageResponse) => {
        setData(res);
      }
    );
  }, []);

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
            forcePage={itemOffset / itemsPerPage}
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center xs:mt-[3.125rem] sm:mt-[5rem]">
      <CategoryWithThreeCards
        outerClass="!py-4 px-[2rem] md:px-[8.5rem]"
        filterRowLayout={true}
        hiddenCategory
        categoryCard="B"
        categories={['Berita dan Kegiatan', 'AvriStory', 'Avrist Life Guide']}
        tabs={[
          {
            type: 'dropdown',
            label: 'tahun',
            options: yearDropdown(new Date().getFullYear() - 10)
          },
          {
            type: 'dropdown',
            label: 'Bulan',
            options: monthDropdown()
          }
        ]}
        defaultSelectedCategory={''}
        hidePagination
        onSearchChange={(e) => {
          setSearch(e.target.value);
        }}
        onSearch={() => {
          setParams({ ...params, searchFilter: search });
        }}
        customContent={
          paginatedData.length > 0 ? (
            <>
              <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4">
                {contentData &&
                  paginatedData?.map((item: any, index: number) => (
                    <Link
                      key={index}
                      href={`/tentang-avrist-life/tentang-avrist-life/tabs/penghargaan/${item.id}`}
                    >
                      <div
                        key={index}
                        className="flex flex-col gap-[12px] border border-gray_light rounded-xl text-left md:h-full"
                      >
                        <Image
                          alt="blank-image"
                          width={0}
                          height={0}
                          src={item.image}
                          className="w-auto aspect-video rounded-t-[12px] xs:object-fill"
                        />
                        <div className="flex flex-col gap-3 p-5 h-full">
                          <p className="text-xs sm:text-sm">{item.waktu}</p>
                          <p
                            className="xs:text-lg sm:text-[1.5rem] font-bold"
                            dangerouslySetInnerHTML={{
                              __html: item.judul
                            }}
                          />
                          <p className="xs:text-lg sm:text-[1.5rem]">
                            {item.nama}
                          </p>
                          {/* <p
                            dangerouslySetInnerHTML={{
                              __html: item.deskripsi[0].value
                                .replace('<br>', '')
                                .replace('&nbsp;', '')
                            }}
                            className="xs:text-sm sm:text-base line-clamp-3 h-full 2xl:py-2"
                          /> */}
                          <p className="xs:text-sm sm:text-[1rem] line-clamp-3 h-full 2xl:py-2 leading-[22.4px] min-h-[64px]">
                            {htmlParser(item.deskripsi[0].value)}
                          </p>
                          <div className="flex flex-row items-end gap-1 text-left h-full">
                            <p className="text-purple_dark font-bold xs:text-sm sm:text-base cursor-pointer text-left">
                              Baca Lebih Lengkap
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

              {renderPage()}
            </>
          ) : (
            <NotFound />
          )
        }
      />
      <RoundedFrameBottom />
    </div>
  );
};

export default Penghargaan;
