import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ButtonMenu } from '../InformasiNasabah/MainContentComponent';
import {
  Content,
  VideoInformation,
  DocumentPolicy
} from './MainContentComponent';
import { Item, IVideoData } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';
import { handleGetContent as handleGetMainContent } from '@/services/content-page.api';
import { handleTransformedContent } from '@/utils/responseTransformer';

export const MainContent = ({ videoData } : { videoData: IVideoData[] | undefined }) => {
  const [dataMainContent, setDataMainContent] = useState<{[key: string]: any;}>();

    useEffect(() => {
      fetchContentData().then((data) => setDataMainContent(data));
    }, []);

  return (
    <div className=" w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="mt-[100px] mx-[32px] md:mx-[136px]">
          <ButtonMenu />
          <Content />
          { videoData && <VideoInformation pageVideoData={videoData}/>}
          {dataMainContent && <DocumentPolicy policyContentData={dataMainContent}/>}
        </div>
      </div>
      <Image
        alt="border-bottom"
        className="w-full h-auto"
        src={ROUNDED_FRAME_BOTTOM}
        style={{ userSelect: 'none' }}
      />
    </div>
  );
};

const fetchContentData = async () => {
  try {
    const apiContent = await handleGetMainContent('Panduan-Polis-dan-Formulir-Nasabah', { includeAttributes: 'true' });
    const newDataContent = apiContent.data.contentDataList.map((item: any) => {
      return { 
        ...handleTransformedContent(item.contentData, item.title), categoryName: item.categoryName, id: item.id
      };
    });
    
    return newDataContent.reduce(
    (acc: { [key: string]: Item[] }, item: Item) => { 
      const category = item.categoryName;
      acc[category] = [...(acc[category] || []), item];
      return acc;
      }, {});
  }
  catch(errors: any) {
    throw new Error(errors.message);
  }
}
