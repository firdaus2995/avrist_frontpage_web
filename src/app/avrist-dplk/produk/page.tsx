import { Suspense } from 'react';

import DPLKProductList from '../DPLKProduct';
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

import {
  handleGetContentPage,
  handleGetContent
} from '@/services/content-page.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukDplk = async () => {
  const pageBase = await handleGetContentPage('halaman-produk-dplk');
  const { content } = pageTransformer(pageBase);
  const titleImage = singleImageTransformer(content['title-image']);
  const bannerImage = singleImageTransformer(content['banner-image']);
  const cta1Image = singleImageTransformer(content['cta1-image']);

  const contentBase = await handleGetContent('Produk-Avrast-DPLK', {
    includeAttributes: 'true'
  });
  const products = contentBase.data.contentDataList;

  return (
    <Suspense fallback={null}>
      <Hero
        title="Produk DPLK"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Avrist Syariah',
            href: '/avrist-syariah?tab=Tentang+Avrist+Syariah'
          },
          { title: 'Produk DPLK', href: '#' }
        ]}
        bottomImage={bannerImage.imageUrl}
        imageUrl={titleImage.imageUrl}
      />
      <DPLKProductList products={products} />
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
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
          href="/tanya-avrista"
          image={cta1Image.imageUrl}
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

export default ProdukDplk;
