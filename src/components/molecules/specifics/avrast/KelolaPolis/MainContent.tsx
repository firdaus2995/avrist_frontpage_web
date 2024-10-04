import { useEffect, useState } from 'react';
import { ButtonMenu } from '../InformasiNasabah/MainContentComponent';
import {
  Content,
  VideoInformation,
  DocumentPolicy
} from './MainContentComponent';
import { IVideoData } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import { handleGetContentCategory } from '@/services/content-page.api';
import { contentCategoryTransformer } from '@/utils/responseTransformer';

export const MainContent = ({
  videoData,
  mute = false
}: {
  videoData: IVideoData[] | undefined;
  mute?: boolean;
}) => {
  const [policyGuideData, setPolicyGuideData] = useState<any>();
  const [isShowDetail, setIsShowDetail] = useState(false);

  useEffect(() => {
    fetchContentCategoryData().then((data) => setPolicyGuideData(data));
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div
        className={`bg-white w-full flex flex-col ${!isShowDetail ? 'sm:pt-[100px]' : 'sm:pt-[80px]'} sm:pb-[28px] xs:pt-[50px] xs:pb-[28px] sm:px-[136px] sm:gap-[5rem] xs:px-[2rem] xs:gap-[5rem]`}
      >
        <ButtonMenu />
        {!isShowDetail && <Content />}
        {!isShowDetail && videoData && (
          <VideoInformation pageVideoData={videoData} mute={mute} />
        )}
        {policyGuideData && (
          <DocumentPolicy
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
