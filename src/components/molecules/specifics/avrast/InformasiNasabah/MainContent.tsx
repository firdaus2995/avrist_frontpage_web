import Image from 'next/image';
import {
  ContentCard,
  Banner,
  ButtonMenu,
  Content,
  BeAgent
} from './MainContentComponent';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';

export const MainContent = () => {
  return (
    <div className=" w-full flex flex-col">
      <div className="bg-white rounded-t-[80px] flex flex-col gap-6">
        <Banner />
        <div className="mt-[100px] mx-[32px] md:mx-[136px]">
          <ButtonMenu />
          <Content />
          <ContentCard />
          <BeAgent />
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
