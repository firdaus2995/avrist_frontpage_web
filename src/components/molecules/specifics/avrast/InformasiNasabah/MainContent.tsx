import { ContentCard, Content, BeAgent } from './MainContentComponent';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';

export const MainContent = () => {
  return (
    <div className=" w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="sm:pt-[100px] sm:pb-[26px] sm:px-[136px] sm:gap-[64px] xs:p-4 xs:gap-[12px]">
          <ButtonMenu
            buttonList={[
              'Informasi Nasabah',
              'Rumah Sakit Rekanan',
              'Formulir & Buku Panduan',
              'Performa Investasi'
            ]}
          />
          <Content />
          <ContentCard />
          <BeAgent />
        </div>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};
