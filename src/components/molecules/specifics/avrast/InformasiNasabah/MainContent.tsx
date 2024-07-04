'use client';
import { useEffect, useState } from 'react';
import { ContentCard, Content, BeAgent } from './MainContentComponent';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';
import { getContentPage } from '@/services/content-page.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

export const MainContent = () => {
  const [tenagaPemasaranFile, setTenagaPemasaranFile] = useState<any>('');
  useEffect(() => {
    const fetchDataTenagaPemasaran = async () => {
      const response = await getContentPage('informasi-nasabah');
      const { content } = pageTransformer(response);
      const fileName = content['nama-file-tenaga-pemasar']?.value;
      const filePath = singleImageTransformer(
        content['file-tenaga-pemasar']
      ).imageUrl;
      const fileData = { fileName, filePath };
      setTenagaPemasaranFile(fileData);
    };

    fetchDataTenagaPemasaran();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="bg-white flex flex-col sm:pt-[100px] xs:pt-[3.125rem] px-[2rem] md:px-[8.5rem] pb-[28px]">
          <ButtonMenu
            buttonList={[
              'Informasi Nasabah',
              'Rumah Sakit Rekanan',
              'Formulir & Buku Panduan',
              'Performa Investasi'
            ]}
          />
          <Content />
          <ContentCard tenagaPemasaranFile={tenagaPemasaranFile} />
          <BeAgent />
        </div>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};
