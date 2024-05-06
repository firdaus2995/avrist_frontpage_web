import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import {
  handleTransformedContent,
  singleImageTransformer
} from '@/utils/responseTransformer';

const Penghargaan = () => {
  const [contentData, setContentData] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    category: '',
    yearFilter: '',
    monthFilter: '',
    searchFilter: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 4
  });
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedData = contentData
    ? contentData?.slice(startIndex, endIndex)
    : [];
  const totalPages = contentData
    ? Math.ceil(contentData.length / pagination.itemsPerPage)
    : 0;

  const fetchContent = async () => {
    try {
      const apiContent = await fetch(
        `/api/penghargaan/content?includeAttributes=true&searchFilter=${params.searchFilter}&yearFilter=${params.yearFilter}&monthFilter=${params.monthFilter}`
      );
      const response = await apiContent.json();

      const transformedContent = response.data.contentDataList;

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

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
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

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <div className="flex flex-col gap-4">
        <CategoryWithThreeCards
          filterRowLayout={true}
          hiddenCategory
          categoryCard="B"
          categories={['Berita dan Kegiatan', 'AvriStory', 'Avrist Life Guide']}
          tabs={[
            {
              type: 'dropdown',
              label: 'tahun',
              options: yearDropdown(2009)
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
            <>
              <div className="grid grid-cols-2 gap-4">
                {contentData &&
                  paginatedData?.map((item: any, index: number) => (
                    <Link
                      key={index}
                      href={`/tentang-avrist-life/tentang-avrist-life/tabs/penghargaan/${item.id}`}
                    >
                      <div
                        key={index}
                        className="flex flex-col gap-[18px] border border-gray_light rounded-xl text-left"
                      >
                        <Image
                          alt="blank-image"
                          width={0}
                          height={170}
                          src={item.image}
                          className="w-auto rounded-t-[12px] h-[400px]"
                        />
                        <div className="flex flex-col gap-2 p-5">
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
                              __html:
                                item.deskripsi[0].value.substring(0, 150) +
                                '...'
                            }}
                            className="text-xs"
                          />
                          <div className="flex flex-row items-start gap-1 text-left">
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

              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <div>
                  <p className="text-[20px]">
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
                <div className="flex flex-row gap-[8px] items-center">
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
                    className="mt-[3px]"
                    role="button"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    <Icon name="chevronRight" color="purple_dark" />
                  </span>
                </div>
              </div>
            </>
          }
        />
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default Penghargaan;
