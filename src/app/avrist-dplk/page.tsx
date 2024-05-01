import { Suspense } from 'react';

import DPLKContent from './DPLKContent';
import HeroDplk4 from '@/assets/images/avrast/dplk/hero-dplk-4.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import HelpCard from '@/components/molecules/specifics/avrast/Cards/HelpCard';

import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import Hero from '@/components/molecules/specifics/avrast/Hero';

// import {
//   handleGetContent,
//   handleGetContentPage
// } from '@/services/content-page.api';

const AvristSyariah = async () => {
  // const pageBase = await handleGetContentPage('halaman-tentang-avrist-dplk');
  // const pageContent = await handleGetContent('Dewan-DPLK', {
  //   includeAttributes: 'true'
  // });

  return (
    <Suspense fallback={null}>
      <Hero
        title={'Tentang Avrist DPLK'}
        breadcrumbsData={[
          { title: 'Tentang Avrist DPLK', href: '/' },
          { title: 'Tentang Avrist DPLK', href: '#' }
        ]}
        bottomImage={HeroDplk4}
      />
      <DPLKContent />

      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-gray_bglightgray" />
      <SimpleContainer>
        <HelpCard
          title={
            <p className="text-[56px] text-black">
              <span className="font-bold">Hello,</span> Ada yang bisa{' '}
              <span className="font-bold">Avrista</span> bantu?
            </p>
          }
          cardClassname="bg-dplk_yellow"
          buttonClassname="bg-white border border-white"
          buttonTextClassname="text-dplk_yellow"
          buttonTitle="Tanya Avrista"
          image={BlankImage}
          href="/tanya-avrista"
        />
      </SimpleContainer>
      <RoundedFrameTop bgColor="bg-white" frameColor="bg-white" />

      <FooterCards
        cards={[
          {
            title: 'Rumah Sakit Rekanan',
            icon: ProdukRumahSakit,
            subtitle: 'Lebih Lanjut',
            href: '/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan'
          },
          {
            title: 'Klaim & Layanan',
            icon: ProdukClaim,
            subtitle: 'Lebih Lanjut',
            href: '/avrist-syariah/klaim-layanan'
          },
          {
            title: 'Kelola Polis',
            icon: ProdukPolis,
            subtitle: 'Login Akun',
            href: '/klaim-layanan/layanan/kelola-polis'
          },
          {
            title: 'Testimonial',
            icon: ProdukTestimoni,
            subtitle: 'Lebih Lanjut',
            href: '/promo-berita/berita?tab=Testimonial'
          }
        ]}
      />
    </Suspense>
  );
};

export default AvristSyariah;
