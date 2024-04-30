'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import BlankImage from '@/assets/images/blank-image.svg';
import Button from '@/components/atoms/Button/Button';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import PersonCard from '@/components/molecules/specifics/avrast/Cards/PersonCard';
import {
  handleGetContentPage,
  handleGetContent
} from '@/services/content-page.api';
import { ContentResponse } from '@/types/content.type';
import { PageResponse } from '@/types/page.type';
import {
  contentTransformer,
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer,
  handleTransformedContent
} from '@/utils/responseTransformer';
interface ManagementComponentProps {
  onSelectDetail: (isSelected: boolean) => void;
}

const Manajemen: React.FC<ManagementComponentProps> = ({ onSelectDetail }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({
    image: BlankImage,
    name: '',
    role: '',
    desc: <p></p>
  });

  // Page

  const [data, setData] = useState<PageResponse>();

  // Content

  const [contentData, setContentData] = useState<any>();

  useEffect(() => {
    handleGetContentPage('manajemen').then((res) => setData(res));

    handleGetContent('Profil-Manajemen', {
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

  const handleCardClick = (cardData: {
    image: string;
    name: string;
    role: string;
    desc: string;
  }) => {
    setShowDetail(true);
    onSelectDetail(true);
    const data = {
      image: cardData.image,
      name: cardData.name,
      role: cardData.role,
      desc: (
        <div className="flex flex-col gap-7">
          <div dangerouslySetInnerHTML={{ __html: cardData.desc }} />
        </div>
      )
    };
    setDetailData(data);
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      {showDetail ? (
        <div className="px-[32px] py-[50px] sm:px-[136px] sm:py-[72px]">
          <div className="flex flex-col gap-7 border rounded-xl p-4">
            <div className="flex flex-row gap-5 items-center border rounded-xl">
              <div className="w-[213px] h-[213px] bg-red-200 rounded-xl">
                <Image
                  alt="blank-image"
                  src={detailData.image}
                  width={213}
                  height={213}
                  className="rounded-xl w-[213px] h-[213px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[36px] font-bold">{detailData.name}</p>
                <p className="text-[24px] font-semibold text-purple_dark">
                  {detailData.role}
                </p>
              </div>
            </div>
            <p>{detailData.desc}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-[32px] py-[50px] sm:px-[136px] sm:py-[72px]">
          {contentData &&
            contentData.map((item: any, index: number) => {
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

          <div className="flex flex-col gap-4 items-center justify-center w-full p-10">
            <div className="flex justify-center items-center p-10">
              <p className="text-[56px] font-bold text-purple_dark">
                Struktur Organisasi
              </p>
            </div>
            <div className="w-full flex flex-row justify-between items-center p-4 border rounded-xl">
              <p className="font-bold">
                Struktur Organisasi PT Avrist Assurance
              </p>
              <Button
                title="Lihat Di Sini"
                customButtonClass="bg-purple_dark rounded-lg"
                customTextClass="text-white font-bold"
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
