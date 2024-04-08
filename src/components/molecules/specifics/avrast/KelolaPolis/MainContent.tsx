import Image from 'next/image';
import { ButtonMenu } from '../InformasiNasabah/MainContentComponent';
import {
  Content,
  VideoInformation,
  DocumentPolicy
} from './MainContentComponent';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';

export const MainContent = () => {
  return (
    <div className=" w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="mt-[100px] mx-[32px] md:mx-[136px]">
          <ButtonMenu />
          <Content />
          <VideoInformation />
          <DocumentPolicy />
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
