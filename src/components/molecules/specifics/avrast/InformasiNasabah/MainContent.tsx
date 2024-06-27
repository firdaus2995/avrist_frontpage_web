import { ContentCard, Content, BeAgent } from './MainContentComponent';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';

export const MainContent = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="bg-white flex flex-col sm:pt-[5rem] xs:pt-[3.125rem] px-[2rem] md:px-[8.5rem] pb-[3rem] sm:gap-[5rem] xs:gap-[2.25rem]">
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
