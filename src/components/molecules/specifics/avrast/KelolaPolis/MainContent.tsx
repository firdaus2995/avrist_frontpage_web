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
  videoData,
  mute = false
}: {
  videoData: IVideoData[] | undefined;
  mute?: boolean;
}) => {
  const [dataMainContent, setDataMainContent] = useState<{
    [key: string]: any;
  }>();
  const [policyGuideData, setPolicyGuideData] = useState<any>();
  const [isShowDetail, setIsShowDetail] = useState(false);

  useEffect(() => {
    fetchContentData().then((data) => setDataMainContent(data));
    fetchContentCategoryData().then((data) => setPolicyGuideData(data));
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div
        className={`bg-white w-full flex flex-col ${!isShowDetail ? 'sm:pt-[100px]' : 'sm:pt-[80px]'} sm:pb-[28px] xs:pt-[80px] xs:pb-[28px] sm:px-[136px] sm:gap-[5rem] xs:px-[2rem] xs:gap-[5rem]`}
      >
        <ButtonMenu />
        {!isShowDetail && <Content />}
        {!isShowDetail && videoData && (
          <VideoInformation pageVideoData={videoData} mute={mute} />
        )}
        {dataMainContent && policyGuideData && (
          <DocumentPolicy
            policyContentData={dataMainContent}
            policyGuideData={policyGuideData}
            setIsShowDetail={(bool: boolean) => setIsShowDetail(bool)}
            isShowDetail={isShowDetail}
          />
        )}
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
