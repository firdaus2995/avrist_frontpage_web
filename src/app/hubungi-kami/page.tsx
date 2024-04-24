'use client';
import BANNER_IMAGE from '@/assets/images/avrast/hubungi-kami/banner-hubungi-kami.svg';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import {
  MainContent,
  BannerFooter,
  InformationProductFooter
} from '@/components/molecules/specifics/avrast/HubungiKami';

const CallMe = () => {
  return (
    <div className="flex flex-col bg-avrast_product_bg ">
      <Hero
        title="Hubungi Kami"
        breadcrumbsData={[
          { title: 'Beranda', href: '/avrast' },
          {
            title: 'Hubungi Kami',
            href: '/hubungi-kami'
          }
        ]}
        bottomImage={BANNER_IMAGE}
      />
      <MainContent />
      <BannerFooter />
      <InformationProductFooter />
    </div>
  );
};

export default CallMe;
