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
  const { content: page } = pageTransformer(data);

  // const profile1Image = singleImageTransformer(page['profil1-image']);
  // const profile1Name = contentStringTransformer(page['profil1-nama']);
  // const profile1Role = contentStringTransformer(page['profil1-jabatan']);

  // const profile2Image = singleImageTransformer(page['profil2-image']);
  // const profile2Name = contentStringTransformer(page['profil2-nama']);
  // const profile2Role = contentStringTransformer(page['profil2-jabatan']);

  // const profile3Image = singleImageTransformer(page['profil3-image']);
  // const profile3Name = contentStringTransformer(page['profil3-nama']);
  // const profile3Role = contentStringTransformer(page['profil3-jabatan']);

  // const profile4Image = singleImageTransformer(page['profil4-image']);
  // const profile4Name = contentStringTransformer(page['profil4-nama']);
  // const profile4Role = contentStringTransformer(page['profil4-jabatan']);

  // const profile5Image = singleImageTransformer(page['profil5-image']);
  // const profile5Name = contentStringTransformer(page['profil5-nama']);
  // const profile5Role = contentStringTransformer(page['profil5-jabatan']);

  // const profile6Image = singleImageTransformer(page['profil6-image']);
  // const profile6Name = contentStringTransformer(page['profil6-nama']);
  // const profile6Role = contentStringTransformer(page['profil6-jabatan']);

  // Content

  const [contentData, setContentData] = useState<any>();

  useEffect(() => {
    handleGetContentPage('manajemen').then((res) => setData(res));

    handleGetContent('Profil-Manajemen', {
      includeAttributes: 'true'
    }).then((res) => {
      // const { content } = contentTransformer(res);

      // const initialContentData = Object.keys(content).reduce(
      //   (acc: any, key) => {
      //     acc[key] = {}; // Assign an empty object to each key
      //     return acc;
      //   },
      //   {}
      // );

      // setContentData(initialContentData);

      // Object.keys(content).map((item: any) => {
      //   setContentData({ ...contentData, [item]: content[item] });
      // });
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

  console.log(contentData && contentData);

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
          {/* {contentData &&
            contentData.map((item: any, index: number) => (
              <>
                <PersonCard
                  key={index}
                  heading={item.contentData[3].details[0].value}
                  cards={[
                    {
                      name: profile1Name,
                      role: profile1Role,
                      image: profile1Image.imageUrl,
                      onClick: handleCardClick
                    }
                  ]}
                  roleClassname="text-purple_dark"
                />
              </>
            ))} */}
          {contentData && (
            <>
              <PersonCard
                heading={contentData[0]?.contentData[3].details[0].value}
                cards={[
                  {
                    name: contentData[0]?.contentData[1].details[1].value,
                    role: contentData[0]?.contentData[3].details[0].value,
                    image: singleImageTransformer(
                      contentData[0]?.contentData[0].details[0]
                    ).imageUrl,
                    desc: contentData[0].contentData[4].details[0].value,
                    onClick: handleCardClick
                  }
                ]}
                roleClassname="text-purple_dark"
              />
              <PersonCard
                heading={contentData[1]?.contentData[3].details[0].value}
                cards={[
                  {
                    name: contentData[1]?.contentData[1].details[1].value,
                    role: contentData[1]?.contentData[3].details[0].value,
                    image: singleImageTransformer(
                      contentData[1]?.contentData[0].details[0]
                    ).imageUrl,
                    desc: contentData[1].contentData[4].details[0].value,
                    onClick: handleCardClick
                  },
                  {
                    name: contentData[1]?.contentData[2].details[0].value,
                    role: contentData[1]?.contentData[3].details[0].value,
                    image: singleImageTransformer(
                      contentData[1]?.contentData[1].details[0]
                    ).imageUrl,
                    desc: contentData[1].contentData[5].details[0].value,
                    onClick: handleCardClick
                  }
                ]}
                roleClassname="text-purple_dark"
              />
              <PersonCard
                heading={contentData[2]?.contentData[3].details[0].value}
                cards={[
                  {
                    name: contentData[2]?.contentData[1].details[1].value,
                    role: contentData[2]?.contentData[3].details[0].value,
                    image: singleImageTransformer(
                      contentData[2]?.contentData[0].details[0]
                    ).imageUrl,
                    desc: contentData[2].contentData[4].details[0].value,
                    onClick: handleCardClick
                  },
                  {
                    name: contentData[2]?.contentData[2].details[0].value,
                    role: contentData[2]?.contentData[3].details[0].value,
                    image: singleImageTransformer(
                      contentData[2]?.contentData[1].details[0]
                    ).imageUrl,
                    desc: contentData[2].contentData[5].details[0].value,
                    onClick: handleCardClick
                  }
                ]}
                roleClassname="text-purple_dark"
              />
            </>
          )}

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
