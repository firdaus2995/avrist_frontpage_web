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
import {
  handleGetContent,
  handleGetContentPage
} from '@/services/content-page.api';
import { handleDownload } from '@/utils/helpers';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const LaporanPerusahaan = () => {
  const [contentData, setContentData] = useState<any>();
  const [contentPage, setContentPage] = useState<any>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    maxPage: 5
  });
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    category: '',
    yearFilter: '',
    searchFilter: ''
  });

  useEffect(() => {
    handleGetContentPage('halaman-laporan-perusahaan').then((res: any) => {
      setContentPage(pageTransformer(res));
    });

    handleGetContent('lap-perusahaan', {
      includeAttributes: 'true',
      category: params.category,
      searchFilter: params.searchFilter,
      yearFilter: params.yearFilter
    }).then((res: any) => {
      setContentData(res.data.contentDataList);
    });
  }, [params]);

  useEffect(() => {
    if (contentData && !params.category) {
      setParams({
        ...params,
        category: contentData.map((item: any) => item.title)[0]
      });
    }
  }, [contentData]);

  const filterCategory = (data: any) => {
    return data?.filter((item: any) => item.title === params.category)[0];
  };

  const getContentFile = (data: any) => {
    if (!data) {
      return [];
    }
    const matchedItem = data.filter(
      (item: any) => item.title === params.category
    )[0];

    if (!matchedItem) {
      return [];
    }
    const contentData = matchedItem.contentData;
    if (!contentData || contentData.length < 4) {
      return [];
    }
    const fileData = JSON.parse(contentData[3].value);

    return fileData.filter((item: any) =>
      item.imageUrl.includes(params.searchFilter)
    );
  };

  const renderPages = () => {
    if (contentData) {
      for (
        let i = 0;
        i < Math.ceil(getContentFile(contentData).length / pagination.maxPage);
        i++
      ) {
        return (
          <p
            className={`text-[20px] ${i + 1 === pagination.currentPage ? 'text-purple_dark font-bold' : ''} cursor-pointer`}
            onClick={() => setPagination({ ...pagination, currentPage: i + 1 })}
          >
            {i + 1}
          </p>
        );
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          <h2 className="text-[56px] font-bold mb-6 text-purple_dark">
            {params.category}{' '}
            {params.category.includes('Perusahaan') ? '' : 'Perusahaan'}
          </h2>
          <h2 className="text-[36px] mb-6">
            Temukan {params.category.toLowerCase()}{' '}
            {params.category.includes('Perusahaan') ? '' : 'perusahaan'} di sini
          </h2>
        </div>
        <CategoryWithThreeCards
          defaultSelectedCategory={params.category}
          onCategoryChange={(tab) => setParams({ ...params, category: tab })}
          filterRowLayout={true}
          categories={
            contentData ? contentData.map((item: any) => item.title) : []
          }
          tabs={[
            {
              type: 'dropdown',
              label: 'tahun',
              options: [
                { label: 'Pilih Tahun', value: '-' },
                {
                  label: contentData
                    ? filterCategory(contentData)?.contentData[0].value
                    : '-',
                  value: contentData
                    ? filterCategory(contentData)?.contentData[0].value
                    : '-'
                }
              ]
            },
            {
              type: 'dropdown',
              label: 'Bulan',
              options: [
                { label: 'Pilih Bulan', value: '-' },
                {
                  label: contentData
                    ? filterCategory(contentData)?.contentData[1].value
                    : '-',
                  value: contentData
                    ? filterCategory(contentData)?.contentData[1].value
                    : '-'
                }
              ]
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
                getContentFile(contentData).map((item: any, index: number) => (
                  <div
                    key={index}
                    className="w-full flex flex-row justify-between items-center p-4 border rounded-xl"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <p className="font-bold">{item.imageUrl}</p>
                      <MediumTag title="PDF" />
                    </div>
                    <Button
                      title="Unduh"
                      customButtonClass="rounded-xl bg-purple_dark"
                      customTextClass="text-white"
                      onClick={async () => await handleDownload(item.imageUrl)}
                    />
                  </div>
                ))}
              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <div>
                  <p className="text-[20px]">
                    Menampilkan{' '}
                    <span className="font-bold text-purple_dark">
                      1-{contentData && getContentFile(contentData).length}
                    </span>{' '}
                    dari{' '}
                    <span className="font-bold">
                      {contentData && getContentFile(contentData).length}
                    </span>{' '}
                    hasil
                  </p>
                </div>
                <div className="flex flex-row gap-[8px] items-center">
                  {renderPages()}
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      setPagination({
                        ...pagination,
                        currentPage: pagination.currentPage + 1
                      })
                    }
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
