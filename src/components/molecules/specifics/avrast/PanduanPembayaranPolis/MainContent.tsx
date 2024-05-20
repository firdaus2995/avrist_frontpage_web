import { ButtonMenu } from '../InformasiNasabah/MainContentComponent';
import {
  Content,
  VideoInformation,
  TutorialPayment
} from './MainContentComponent';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';

export const MainContent = () => {
  return (
    <div className=" w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="pt-[6.25rem] pb-[1.625rem] xs:px-[2rem] sm:px-[8.5rem] flex flex-col gap-[4rem]">
          <ButtonMenu />
          <Content />
          <VideoInformation />
          <TutorialPayment />
        </div>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};
