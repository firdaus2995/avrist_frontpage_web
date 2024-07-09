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
            const replacements = {
              '<ol>':
                "<ol class='list-decimal list-outside font-opensans px-5'>",
              '<ul>': "<ul class='list-disc list-outside font-opensans px-5' >",
              '<table>':
                "<table class='table-auto border-collapse border-spacing-2 border border-slate-400' >",
              '<th>': "<th class='border border-slate-300 p-4' >",
              '<td>': "<td class='border border-slate-300 p-4' >"
            };

            let valueDescription = item?.contentData[1]?.value;

            for (const [key, value] of Object.entries(replacements)) {
              valueDescription = valueDescription.replaceAll(key, value);
            }

            temp.push({
              title: item.title,
              onClick: () => setTab(index),
              content: {
                title: item?.contentData[0]?.value,
                description: valueDescription
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
            <h1 className="xs:text-[1.5rem] md:text-[2.25rem] font-karla text-purple_dark font-medium md:leading-[43.2px] xs:leading-[28.8px] -tracking-[1.08px]">
              {leftTabData[tab]?.title}
            </h1>
            <p
              className="sm:text-[56px] xs:text-[36px] font-bold font-karla md:leading-[67.2px] xs:leading-[43.2px] md:-tracking-[2.24px] md:-tracking-[2.24px] xs:-tracking-[1.44px]"
              dangerouslySetInnerHTML={{
                __html: leftTabData[tab]?.content?.title
              }}
            />
            <p
              className="text-[1.25rem] font-opensans leading-[28px]"
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
