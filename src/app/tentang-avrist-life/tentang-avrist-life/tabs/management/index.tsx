'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import BlankImage from '@/assets/images/blank-image.svg';
import Button from '@/components/atoms/Button/Button';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import PersonCard from '@/components/molecules/specifics/avrast/Cards/PersonCard';
import {
  handleGetContentPage,
  handleGetContent
} from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import { handleDownload } from '@/utils/helpers';
import {
  singleImageTransformer,
  handleTransformedContent,
  pageTransformer
} from '@/utils/responseTransformer';

interface ManagementComponentProps {
  onSelectDetail: (isSelected: boolean) => void;
  setPageData: React.Dispatch<React.SetStateAction<PageResponse | undefined>>;
}

const Manajemen: React.FC<ManagementComponentProps> = ({
  onSelectDetail,
  setPageData
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({
    image: BlankImage,
    name: '',
    role: '',
    desc: <p></p>
  });

  // Page

  const [data, setData] = useState<string>();

  // Content

  const [contentData, setContentData] = useState<any>();

  useEffect(() => {
    handleGetContentPage(BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.MANAJEMEN).then(
      (res: PageResponse) => {
        setPageData(res);
        const { content } = pageTransformer(res);

        const filePdf = singleImageTransformer(
          content['file-struktur-organisasi']
        ).imageUrl;
        return setData(filePdf);
      }
    );

    handleGetContent(BASE_SLUG.TENTANG_AVRIST_LIFE.CONTENT.MANAJEMEN, {
      includeAttributes: 'true'
    }).then((res) => {
      const newDataContent = res.data.contentDataList.map((item: any) => {
        return {
          ...handleTransformedContent(item.contentData, item.title),
          categoryName: item.categoryName,
          id: item.id
        };
      });

      const keyValuePairs = Object.entries(newDataContent[0].content);

      const arrayOfObjects: any = keyValuePairs.map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return {
            section: key,
            ...value
          };
        } else {
          console.error(`Cannot spread non-object value for key: ${key}`);
        }
      });

      setContentData(arrayOfObjects);
    });
  }, []);

  useEffect(() => {
    const value = searchParams.get('tab');
    if (value === 'Manajemen') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowDetail(false);
    } else {
      window.scrollTo({ top: 200 });
      setShowDetail(true);
    }
  }, [searchParams, showDetail]);

  // show Detail Data
  useEffect(() => {
    const value = searchParams.get('tab')?.split('-').pop();
    if (value !== 'Manajemen' && contentData && contentData.length > 0) {
      const data = contentData.map((item: any) => {
        return item.contentData.filter(
          (subItem: any) => subItem.details[1].value === value
        );
      });

      const filteredData = data.filter((item: any) => item.length > 0)[0][0]
        .details;

      setDetailData({
        image: singleImageTransformer(filteredData[0]).imageUrl,
        name: filteredData[1].value,
        role: filteredData[2].value,
        desc: (
          <div className="flex flex-col gap-7">
            <div dangerouslySetInnerHTML={{ __html: filteredData[3].value }} />
          </div>
        )
      });
      onSelectDetail(true);
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [contentData, searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleCardClick = (cardData: {
    image: string;
    name: string;
    role: string;
    desc: string;
  }) => {
    const data = {
      name: cardData.name
    };
    window.scrollTo({ top: 200, behavior: 'smooth' });
    router.push(
      pathname + '?' + createQueryString('tab', `Manajemen-${data.name}`),
      {
        scroll: false
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      {showDetail ? (
        <div
          className="xs:px-[2rem] md:px-[8.5rem]"
          onClick={() => {
            setShowDetail(false);
            router.push(
              pathname + '?' + createQueryString('tab', 'Manajemen'),
              {
                scroll: false
              }
            );
          }}
        >
          <div className="flex flex-col gap-7 border rounded-xl p-4 shadow-lg">
            <div className="flex xs:flex-col md:flex-row gap-5 items-center border rounded-xl">
              <div className="xs:w-full xs:h-full sm:w-[213px] sm:h-[213px] rounded-xl">
                <Image
                  alt="blank-image"
                  src={detailData.image}
                  width={213}
                  height={213}
                  className="xs:rounded-t-xl md:rounded-xl xs:w-full xs:h-full sm:w-[213px] sm:h-[213px]"
                />
              </div>
              <div className="flex flex-col gap-2 xs:text-center md:text-start xs:mb-7 sm:mb-0">
                <p className="text-[36px] font-bold">{detailData.name}</p>
                <p className="text-[24px] font-semibold text-purple_dark">
                  {detailData.role}
                </p>
              </div>
            </div>
            <p className="font-opensans text-xl text-justify">
              {detailData.desc}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[3rem] xs:px-[2rem] md:px-[8.5rem]">
          {contentData &&
            contentData?.map((item: any, index: number) => {
              const transformData = (data: any) => {
                return data.map((i: any) => {
                  // Extract details
                  const details = i.details;

                  // Find relevant data
                  const nameDetail = details.find(
                    (d: any) =>
                      d.fieldId === item.contentData[0].details[1].fieldId
                  );
                  const roleDetail = details.find(
                    (d: any) =>
                      d.fieldId === item.contentData[0].details[2].fieldId
                  );
                  const imageDetail = details.find(
                    (d: any) =>
                      d.fieldId === item.contentData[0].details[0].fieldId
                  );
                  const bioDetail = details.find(
                    (d: any) =>
                      d.fieldId === item.contentData[0].details[3].fieldId
                  );

                  return {
                    name: nameDetail?.value || '', // Default to empty string if not found
                    role: roleDetail?.value || '',
                    image: imageDetail
                      ? singleImageTransformer(imageDetail).imageUrl
                      : '',
                    desc: bioDetail?.value || '',
                    onClick: handleCardClick // Assuming this is a string to represent a function
                  };
                });
              };

              return (
                <>
                  <PersonCard
                    key={index}
                    heading={item.contentData[0].details[2].value}
                    cards={transformData(item.contentData)}
                    roleClassname="text-purple_dark"
                  />
                </>
              );
            })}
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div className="flex justify-center items-center">
              <p className="xs:text-[2.25rem] md:text-[3.5rem] font-bold text-purple_dark xs:text-center md:text-start">
                Struktur Organisasi
              </p>
            </div>
            <div className="w-full flex xs:flex-col md:flex-row justify-between items-center p-4 border rounded-xl">
              <p className="font-bold text-2xl xs:text-center md:text-start xs:mb-4 md:mb-0">
                Struktur Organisasi PT Avrist Assurance
              </p>
              <Button
                title="Lihat Di Sini"
                customButtonClass="bg-purple_dark rounded-lg"
                customTextClass="text-white font-bold"
                onClick={async () => {
                  data ? await handleDownload(data) : null;
                }}
              />
            </div>
          </div>
        </div>
      )}

      <RoundedFrameBottom />
    </div>
  );
};

export default Manajemen;
