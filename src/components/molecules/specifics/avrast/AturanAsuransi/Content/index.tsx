import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';
import ButtonMenuVertical from '@/components/molecules/specifics/avrast/ButtonMenuVertical';
import { getContent } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';

const Content = () => {
  const [tab, setTab] = useState(0);
  const [leftTabData, setLeftTabData] = useState<any>();

  useEffect(() => {
    const fetchLastContentData = async () => {
      const queryParams: QueryParams = {
        includeAttributes: 'true'
      };
      try {
        const temp: any = [];
        const fetchedContent = await getContent('Hak-Nasabah', queryParams);

        fetchedContent?.data?.contentDataList?.map(
          (item: any, index: number) => {
            temp.push({
              title: item.title,
              onClick: () => setTab(index),
              content: {
                title: item?.contentData[0]?.value,
                description: item?.contentData[1]?.value
              }
            });
          }
        );
        setLeftTabData(temp);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchLastContentData().then();
  }, [tab]);

  return (
    <div className="bg-purple_dark -mt-1">
      {leftTabData && (
        <div className="bg-white sm:pt-[6.25rem] xs:pt-[50px] px-[2rem] md:px-[8.5rem] pb-[28px] rounded-t-[4.063rem] flex xs:flex-col md:flex-row justify-between sm:gap-[2.5rem] xs:gap-[2.25rem]">
          <ButtonMenuVertical
            item={leftTabData}
            outerClass="xs:w-full md:w-[12.5rem]"
          />
          <div className="xs:w-full md:w-[82%] flex flex-col gap-[24px]">
            <h1 className="xs:text-[1.5rem] md:text-[2.25rem] font-karla text-purple_dark font-medium leading-[43.2px] -tracking-[1.08px]">
              {leftTabData[tab]?.title}
            </h1>
            <div
              className="text-[1.25rem] font-bold font-opensans leading-[28px]"
              dangerouslySetInnerHTML={{
                __html: leftTabData[tab]?.content?.title
              }}
            />
            <div
              className="text-[1.25rem] font-bold font-opensans leading-[28px]"
              dangerouslySetInnerHTML={{
                __html: leftTabData[tab]?.content?.description
              }}
            />
            <div className="p-[1.5rem] border border-gray_light rounded-[0.75rem] flex xs:flex-col md:flex-row justify-between xs:items-start md:items-center gap-[20px]">
              <p className="font-bold text-[1.5rem] font-opensanspro text-purple_dark">
                Kami berkomitmen menyelesaikan masalah adil dan konsisten{' '}
              </p>
              <Link href={'/klaim-layanan/layanan/penanganan-pengaduan'}>
                <Button customButtonClass="bg-purple_dark text-white py-[0.5rem] px-[16px] font-opensans text-[16px] font-semibold leading-[23.68px]">
                  Ajukan Pengaduan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
