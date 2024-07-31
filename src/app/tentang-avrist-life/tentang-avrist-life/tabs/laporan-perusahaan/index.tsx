import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { ISetData } from '@/app/tentang-avrist-life/tentang-avrist-life/page';
import BlankImage from '@/assets/images/blank-image.svg';
import Phone from '@/assets/images/common/phone.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import NotFound from '@/components/atoms/NotFound';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import MediumTag from '@/components/atoms/Tag/MediumTag';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import { handleGetContentPage } from '@/services/content-page.api';
import { getListLaporanPerusahaan } from '@/services/laporan-perusahaan';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const LaporanPerusahaan: React.FC<ISetData> = ({ setData }) => {
  const [contentData, setContentData] = useState<any>();
  const [contentPage, setContentPage] = useState<any>();
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    category: '',
    yearFilter: '',
    monthFilter: '',
    searchFilter: ''
  });
  const [categories, setCategories] = useState<any>([]);
  const [itemsPerPage] = useState(3);

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

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % contentData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    handleGetContentPage(
      BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.LAPORAN_PERUSAHAAN
    ).then((res: any) => {
      setData(res);
      setContentPage(pageTransformer(res));
    });
  }, []);

  useEffect(() => {
    fetchContent();
  }, [params]);

  useEffect(() => {
    categories.length > 0 && setParams({ ...params, category: categories[0] });
  }, [categories]);

  const fetchContent = async () => {
    try {
      const apiContent = await getListLaporanPerusahaan({
        includeAttributes: 'true',
        category: params.category,
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter
      });
      const categoryList = Object.keys(apiContent.data.categoryList);

      categories.length < 1 && setCategories(categoryList);

      if (Object.keys(apiContent.data.categoryList).length <= 0) {
        setPaginatedData([]);
      }
      setContentData(apiContent.data.categoryList[params.category]);
    } catch (err) {
      console.error(err);
    }
  };

  const getContentFile = (data: any) => {
    const fileData = data
      ? data.map((item: any) => {
          return {
            name: item?.contentData[2]?.value,
            file: singleImageTransformer(item.contentData[3]).imageUrl
          };
        })
      : [];

    return fileData;
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

  const renderPage = () => {
    return (
      <div className="flex flex-col gap-4 md:flex-row items-start justify-between font-opensans ">
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
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          nextLabel={<Icon name="chevronRight" color="purple_dark" />}
          previousLabel={<Icon name="chevronLeft" color="purple_dark" />}
          containerClassName="flex flex-row gap-[12px] items-center"
          activeClassName="text-purple_dark font-bold"
          pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
        />
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <div className="flex flex-col gap-4">
        {params.category ? (
          // <CustomContainer className="w-full flex flex-col items-center justify-center text-center font-karla xs:mt-[2.25rem] sm:mt-[5rem]">
          //   <TitleContainer className="text-purple_dark !mb-[2.25rem] sm:leading-normal !-tracking-[2.24px] font-extrabold">
          //     {params.category} Perusahaan
          //   </TitleContainer>
          //   <h2 className="md:text-4xl xs:text-2xl mb-6 -tracking-[1.08px]">
          //     Temukan {params.category.toLowerCase()} perusahaan di sini
          //   </h2>
          // </CustomContainer>
          <div className="px-[2rem] xs:my-[2.25rem] py-[5rem]">
            <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
              Temukan {params.category.replace('Perusahaan', '')} di Sini
            </p>
          </div>
        ) : null}

        <CategoryWithThreeCards
          defaultSelectedCategory={params.category}
          onCategoryChange={(tab) => setParams({ ...params, category: tab })}
          filterRowLayout={true}
          categories={categories ?? []}
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
          searchPlaceholder="Cari laporan"
          onSearchChange={(e) => {
            setSearch(e.target.value);
          }}
          onSearch={() => {
            setParams({ ...params, searchFilter: search });
          }}
          hidePagination
          customContent={
            <>
              {paginatedData.length > 0 ? (
                <div className="w-full flex flex-col gap-6">
                  {contentData &&
                    getContentFile(paginatedData)?.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className="w-full flex xs:flex-col sm:flex-row xs:justify-start sm:justify-between  p-[1.5rem] border rounded-xl gap-2"
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <p className="font-bold text-2xl font-karla">
                              {item.name}
                            </p>
                            <MediumTag title="PDF" />
                          </div>
                          <div>
                            <Button
                              title="Unduh"
                              customButtonClass="rounded-xl bg-purple_dark"
                              customTextClass="text-white font-opensans font-semibold leading-[23.68px]"
                              onClick={async () =>
                                window.open(item.file, '_blank')
                              }
                            />
                          </div>
                        </div>
                      )
                    )}
                </div>
              ) : (
                <NotFound />
              )}

              {renderPage()}
            </>
          }
          outerClass="sm:!py-[0px] px-[2rem] md:px-[8.5rem]"
        />
      </div>
      <div className="flex flex-col w-full">
        <RoundedFrameBottom />
        <FooterInformation
          bgColor="bg-gray_bglightgray"
          title={
            <div className="flex flex-col items-center justify-center gap-4 bg-gray_bglightgray">
              <p className="xs:text-[2.25rem] md:text-[3.5rem] font-extrabold font-karla">
                Hubungi Kami
              </p>
              <div>
                <Link
                  href="tel:02157898188"
                  role="button"
                  className="py-4 xs:px-[1.25rem] sm:px-[3.25rem] border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark xs:text-[1.25rem] md:text-[2.25rem] font-bold bg-white font-karla"
                >
                  <Image src={Phone} alt="phone" className="w-10" />
                  <p>021 5789 8188</p>
                </Link>
              </div>
              <p className="text-xl">
                <span className="font-bold">Waktu Operasional:</span>
                <br className="sm:hidden" /> Senin - Jumat, 08.00 - 17.00 WIB
              </p>
            </div>
          }
          image={
            contentPage
              ? singleImageTransformer(contentPage?.content['cta1-image'])
                  .imageUrl
              : BlankImage
          }
        />
        <div className="">
          <RoundedFrameTop bgColor="xs:bg-white sm:bg-purple_superlight" />
        </div>
      </div>
    </div>
  );
};

export default LaporanPerusahaan;
