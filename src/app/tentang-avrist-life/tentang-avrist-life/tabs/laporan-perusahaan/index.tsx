import { useState, useEffect } from 'react';
import Image from 'next/image';
import BlankImage from '@/assets/images/blank-image.svg';
import Phone from '@/assets/images/common/phone.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import MediumTag from '@/components/atoms/Tag/MediumTag';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import { handleGetContentPage } from '@/services/content-page.api';
import { handleDownload } from '@/utils/helpers';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const yearDropdown = (startYear: number) => {
  const currentYear = new Date().getFullYear();

  const years = [{ label: 'Pilih Tahun', value: '' }];

  for (let year = currentYear; year >= startYear; year--) {
    years.push({ label: year.toString(), value: year.toString() });
  }

  return years;
};

const monthDropdown = () => {
  const month = [
    { label: 'Pilih Bulan', value: '' },
    { label: 'Januari', value: '01' },
    { label: 'Februari', value: '02' },
    { label: 'Maret', value: '03' },
    { label: 'April', value: '04' },
    { label: 'Mei', value: '05' },
    { label: 'Juni', value: '06' },
    { label: 'Juli', value: '07' },
    { label: 'Agustus', value: '08' },
    { label: 'September', value: '09' },
    { label: 'Oktober', value: '10' },
    { label: 'November', value: '11' },
    { label: 'Desember', value: '12' }
  ];

  return month;
};

const LaporanPerusahaan = () => {
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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5
  });
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedData = contentData
    ? contentData?.slice(startIndex, endIndex)
    : [];
  const totalPages = contentData
    ? Math.ceil(contentData?.length / pagination.itemsPerPage)
    : 0;

  useEffect(() => {
    handleGetContentPage('halaman-laporan-perusahaan').then((res: any) => {
      setContentPage(pageTransformer(res));
    });

    fetchContent();
  }, [params]);

  useEffect(() => {
    categories.length > 0 && setParams({ ...params, category: categories[0] });
  }, [categories]);

  const fetchContent = async () => {
    try {
      const apiContent = await fetch(
        `/api/laporan-perusahaan/content-category?includeAttributes=true&category=${params.category}&searchFilter=${params.searchFilter}&yearFilter=${params.yearFilter}&monthFilter=${params.monthFilter}`
      );
      const response = await apiContent.json();

      const categoryList = Object.keys(response.data.categoryList);

      categories.length < 1 && setCategories(categoryList);

      setContentData(response.data.categoryList[params.category]);
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

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          {/* <h2 className="text-[56px] font-bold mb-6 text-purple_dark">
            {params.category}{' '}
            {params.category.includes('Perusahaan') ? '' : 'Perusahaan'}
          </h2>
          <h2 className="text-[36px] mb-6">
            Temukan {params.category.toLowerCase()}{' '}
            {params.category.includes('Perusahaan') ? '' : 'perusahaan'} di sini
          </h2> */}
        </div>
        <CategoryWithThreeCards
          defaultSelectedCategory={params.category}
          onCategoryChange={(tab) => setParams({ ...params, category: tab })}
          filterRowLayout={true}
          categories={contentData && categories ? categories : []}
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
              {contentData &&
                getContentFile(paginatedData)?.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="w-full flex flex-row justify-between items-center p-4 border rounded-xl"
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <p className="font-bold">{item.name}</p>
                        <MediumTag title="PDF" />
                      </div>
                      <Button
                        title="Unduh"
                        customButtonClass="rounded-xl bg-purple_dark"
                        customTextClass="text-white"
                        onClick={async () => await handleDownload(item.file)}
                      />
                    </div>
                  )
                )}

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
      <div className="flex flex-col w-full">
        <RoundedFrameBottom />
        <FooterInformation
          bgColor="bg-gray_bglightgray"
          title={
            <div className="flex flex-col items-center justify-center gap-4 bg-gray_bglightgray">
              <p className="text-[56px] font-bold">Hubungi Kami</p>
              <div
                role="button"
                className="p-4 border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark text-2xl font-bold bg-white"
              >
                <Image src={Phone} alt="phone" className="w-10" />
                <p>021 5789 8188</p>
              </div>
              <p>
                <span className="font-bold">Waktu Operasional:</span> Senin -
                Jumat, 08.00 - 17.00 WIB
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
        <RoundedFrameTop />
      </div>
    </div>
  );
};

export default LaporanPerusahaan;
