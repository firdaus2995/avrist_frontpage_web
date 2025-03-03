import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { ISetData } from '@/app/tentang-avrist-life/tentang-avrist-life/page';
import Icon from '@/components/atoms/Icon';
import NotFound from '@/components/atoms/NotFound';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import { handleGetContentPage } from '@/services/content-page.api';
import { getListPenghargaanNew } from '@/services/penghargaan';
import { PageResponse } from '@/types/page.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import { htmlParser } from '@/utils/helpers';
import {
  handleTransformedContent,
  singleImageTransformer
} from '@/utils/responseTransformer';
const Penghargaan: React.FC<ISetData> = ({ setData }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
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
  const [initialRender, setInitialRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!contentData?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(contentData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(contentData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, contentData]);

  useEffect(() => {
    const page = searchParams.get('page');
    setPageCount(0);
    if (!page) {
      setItemOffset(0);
    } else {
      setItemOffset(
        parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * itemsPerPage
      );
    }
  }, [
    params.category,
    params.searchFilter,
    params.monthFilter,
    params.searchFilter
  ]);

  const createQueryStringPage = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % contentData.length;
    const page =
      newOffset === 0 ? '1' : (newOffset / itemsPerPage + 1).toString();
    router.push(pathname + '?' + createQueryStringPage('page', page), {
      scroll: false
    });
    setItemOffset(newOffset);
  };

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const queryParams = {
        includeAttributes: true,
        searchRequest: {
          keyword: params.searchFilter ?? '',
          fieldIds: ['judul-artikel', 'tags'],
          postData: true
        },
        filters: [
          ...(params.yearFilter && params.yearFilter !== ''
            ? [
                {
                  fieldId: 'tahun',
                  keyword: params.yearFilter
                }
              ]
            : []),
          ...(params.monthFilter && params.monthFilter !== ''
            ? [
                {
                  fieldId: 'bulan',
                  keyword: params.monthFilter
                }
              ]
            : [])
        ],
        category: params.category
      };
      const apiContent = await getListPenghargaanNew(queryParams);

      const transformedContent = apiContent?.data?.categoryList[''];

      const transformedData = transformedContent?.map((item: any) => {
        const { content } = handleTransformedContent(
          item?.contentData,
          item?.title
        );

        const judul = content['judul-artikel']?.value;
        const nama = content['nama-penghargaan']?.value;
        const tanggal = content['tanggal']?.value;
        const bulan = content['bulan']?.value;
        const tahun = content['tahun']?.value;
        const fullDate = `${tahun}-${bulan}-${tanggal}`;
        const waktu =
          bulan !== '-' && tahun !== '-'
            ? `${
                monthDropdown().find((item) => item.value === bulan)?.label
              } ${tahun}`
            : '';
        const deskripsi = content['artikel-looping']?.contentData[0]?.details;
        const image = singleImageTransformer(
          content['artikel-thumbnail']
        )?.imageUrl;
        const id = item?.id;

        return { judul, nama, fullDate, waktu, deskripsi, image, id };
      });

      const sortedData = transformedData.sort((a: any, b: any) => {
        const dateA = new Date(a?.fullDate).getTime();
        const dateB = new Date(b?.fullDate).getTime();

        if (isNaN(dateA)) {
          return 1;
        }
        if (isNaN(dateB)) {
          return -1;
        }

        return dateB - dateA;
      });

      setContentData(sortedData);
    } catch (err) {
      console.error(err);
      setContentData([]);
    }
    setInitialRender(false);
    setIsLoading(false);
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
        label: year?.toString(),
        value: year?.toString(),
        onClick: () => setParams({ ...params, yearFilter: year?.toString() })
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
    if (params.searchFilter || params.monthFilter || params.yearFilter) {
      setItemOffset(0);
      setPageCount(0);
    }
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
              {contentData?.length === 0 || contentData === undefined
                ? 0
                : itemOffset + 1 + itemsPerPage > contentData?.length
                  ? contentData.length
                  : itemOffset + itemsPerPage}
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
          setItemOffset(0);
        }}
        customContent={
          contentData && contentData.length > 0 ? (
            <>
              <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4">
                {contentData &&
                  paginatedData?.map((item: any, index: number) => (
                    <Link
                      key={index}
                      href={`/tentang-avrist-life/tentang-avrist-life/tabs/penghargaan/${item?.id}`}
                    >
                      <div
                        key={index}
                        className="flex flex-col gap-[12px] border border-gray_light rounded-xl text-left md:h-full"
                      >
                        <Image
                          alt="blank-image"
                          width={0}
                          height={0}
                          src={item?.image}
                          className={`w-auto aspect-video rounded-t-[12px] xs:object-fill ${isLoading && 'opacity-0'}`}
                        />
                        <div className="flex flex-col gap-3 p-5 h-full">
                          <p className="text-xs sm:text-sm">
                            {!isLoading && item?.waktu}
                          </p>
                          <p
                            className="xs:text-lg sm:text-[1.5rem] font-bold"
                            dangerouslySetInnerHTML={{
                              __html: !isLoading
                                ? item?.judul
                                : 'Loading Data...'
                            }}
                          />
                          {item.nama !== '-' && !isLoading && (
                            <p className="xs:text-lg sm:text-[1.5rem]">
                              {item?.nama}
                            </p>
                          )}
                          {/* <p
                            dangerouslySetInnerHTML={{
                              __html: item.deskripsi[0].value
                                .replace('<br>', '')
                                .replace('&nbsp;', '')
                            }}
                            className="xs:text-sm sm:text-base line-clamp-3 h-full 2xl:py-2"
                          /> */}
                          <p className="xs:text-sm sm:text-[1rem] line-clamp-3 h-full 2xl:py-2 leading-[22.4px] min-h-[64px]">
                            {item?.deskripsi[0]?.value !== '<p>-</p>' &&
                              item?.deskripsi[0]?.value !== '["-"]' &&
                              item?.deskripsi[0]?.value !== '-' &&
                              !item?.deskripsi[0]?.value.includes('>-<') &&
                              !isLoading &&
                              htmlParser(item?.deskripsi[0].value)}
                          </p>
                          <div
                            className={`flex flex-row items-end gap-1 text-left h-full ${isLoading && 'opacity-0'}`}
                          >
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
          ) : !initialRender ? (
            <NotFound />
          ) : (
            <></>
          )
        }
      />
      <RoundedFrameBottom />
    </div>
  );
};

export default Penghargaan;
