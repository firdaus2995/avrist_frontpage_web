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
  const [contentData, setContentData] = useState<any>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 4
  });
  const [search, setSearch] = useState('');
  const [confirmSearch, setConfirmSearch] = useState('');
  const fetchContent = async () => {
    try {
      const apiContent = await fetch(
        `/api/penghargaan/content?includeAttributes=true&searchFilter=${confirmSearch}`
      );
      const response = await apiContent.json();

      const transformedContent = response.data.contentDataList;

      const transformedData = transformedContent?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['penghargaan-judul'].value;
        const nama = content['penghargaan-nama'].value;
        const waktu = content['penghargaan-waktu'].value;
        const deskripsiSingkat = content['penghargaan-deskripsisingkat'].value;
        const image = singleImageTransformer(
          content['penghargaan-imagedetail']
        ).imageUrl;
        const id = item.id;

        return { judul, nama, waktu, deskripsiSingkat, image, id };
      });

      const chunkArray = (array: any, chunkSize: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          const chunk = array.slice(i, i + chunkSize);
          result.push(chunk);
        }
        return result;
      };

      setContentData({
        length: transformedContent.length,
        content: chunkArray(transformedData, 4)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const renderPages = () => {
    if (contentData) {
      const totalPages =
        Math.ceil(contentData.length / pagination.itemsPerPage) - 1;

      return (
        <>
          {Array.from({ length: totalPages }, (_, i) => (
            <p
              key={i}
              className={`text-[20px] ${
                i + 1 === pagination.currentPage
                  ? 'text-purple_dark font-bold'
                  : ''
              } cursor-pointer`}
              onClick={() =>
                setPagination({ ...pagination, currentPage: i + 1 })
              }
            >
              {i + 1}
            </p>
          ))}
        </>
      );
    }

    return null; // Return null if there's no contentData
  };

  console.log(contentData);

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <div className="flex flex-col gap-4">
        <CategoryWithThreeCards
          filterRowLayout={true}
          hiddenCategory
          categoryCard="B"
          categories={['Berita dan Kegiatan', 'AvriStory', 'Avrist Life Guide']}
          tabs={[]}
          defaultSelectedCategory={''}
          hidePagination
          onSearchChange={(e) => {
            setSearch(e.target.value);
          }}
          onSearch={() => {
            setConfirmSearch(search);
          }}
          customContent={
            <>
              <div className="grid grid-cols-2 gap-4">
                {contentData &&
                  contentData.content[pagination.currentPage]?.map(
                    (item: any, index: number) => (
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
                            <p className="text-[20px] font-bold">
                              {item.judul}
                            </p>
                            <p className="text-[20px]">{item.nama}</p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.deskripsiSingkat
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
                    )
                  )}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <div>
                  <p className="text-[20px]">
                    Menampilkan{' '}
                    <span className="font-bold text-purple_dark">
                      {pagination.currentPage * pagination.itemsPerPage -
                        pagination.itemsPerPage +
                        1}
                      -
                      {contentData &&
                        (contentData.length -
                          (contentData.length - pagination.itemsPerPage)) *
                          pagination.currentPage}
                    </span>{' '}
                    dari{' '}
                    <span className="font-bold">
                      {contentData && contentData.length}
                    </span>{' '}
                    hasil
                  </p>
                </div>
                <div className="flex flex-row gap-[8px] items-center">
                  {renderPages()}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      pagination.currentPage < contentData.length &&
                        setPagination({
                          ...pagination,
                          currentPage: pagination.currentPage + 1
                        });
                    }}
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
