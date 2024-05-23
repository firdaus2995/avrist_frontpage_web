import { useEffect, useState } from 'react';
import { ButtonMenu } from '../InformasiNasabah/MainContentComponent';
import {
  Content,
  VideoInformation,
  DocumentPolicy
} from './MainContentComponent';
import {
  Item,
  IVideoData
} from '@/app/klaim-layanan/layanan/kelola-polis/page';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import {
  handleGetContentCategory,
  handleGetContent as handleGetMainContent
} from '@/services/content-page.api';
import {
  contentCategoryTransformer,
  handleTransformedContent
} from '@/utils/responseTransformer';

export const MainContent = ({
  videoData
}: {
  videoData: IVideoData[] | undefined;
}) => {
  const [dataMainContent, setDataMainContent] = useState<{
    [key: string]: any;
  }>();
  const [policyGuideData, setPolicyGuideData] = useState<any>();

  useEffect(() => {
    fetchContentData().then((data) => setDataMainContent(data));
    fetchContentCategoryData().then((data) => setPolicyGuideData(data));
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="sm:pt-[6.25rem] xs:pt-[3.125rem] pb-[1.625rem] xs:px-[2rem] sm:px-[8.5rem] flex flex-col gap-[4rem]">
          <ButtonMenu />
          <Content />
          {videoData && <VideoInformation pageVideoData={videoData} />}
          {dataMainContent && policyGuideData && (
            <DocumentPolicy
              policyContentData={dataMainContent}
              policyGuideData={policyGuideData}
            />
          )}
        </div>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

const fetchContentData = async () => {
  try {
    const apiContent = await handleGetMainContent(
      'Panduan-Polis-dan-Formulir-Nasabah',
      { includeAttributes: 'true' }
    );
    const newDataContent = apiContent.data.contentDataList.map((item: any) => {
      return {
        ...handleTransformedContent(item.contentData, item.title),
        categoryName: item.categoryName,
        id: item.id
      };
    });

    return newDataContent.reduce(
      (acc: { [key: string]: Item[] }, item: Item) => {
        const category = item.categoryName;
        acc[category] = [...(acc[category] || []), item];
        return acc;
      },
      {}
    );
  } catch (errors: any) {
    throw new Error(errors.message);
  }
};

const fetchContentCategoryData = async () => {
  try {
    const data = await handleGetContentCategory('DataPanduanPolis', {
      includeAttributes: 'true'
    });
    const newDataContentWithCategory = contentCategoryTransformer(data, '');
    return newDataContentWithCategory;
  } catch (errors: any) {
    throw new Error(errors.message);
  }
};
