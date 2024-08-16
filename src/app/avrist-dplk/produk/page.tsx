'use client';
import { useState, useEffect, Suspense } from 'react';

import DPLKProductList from '../DPLKProduct';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';

import { handleGetContentPage } from '@/services/content-page.api';
import {
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukDplk = () => {
  const [bannerImage, setBannerImage] = useState('');
  const [bannerImageFit, setBannerImageFit] = useState('');
  const [titleImage, setTitleImage] = useState('');
  const [cta1Image, setCta1Image] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageBase = await handleGetContentPage('halaman-produk-dplk');
        const { content } = pageTransformer(pageBase);

        setBannerImage(
          customImageTransformer(content['banner-image']).imageUrl
        );
        setBannerImageFit(
          content['banner-image']?.config
            ? JSON.parse(content['banner-image']?.config)?.image_fit
            : ''
        );
        setTitleImage(singleImageTransformer(content['title-image']).imageUrl);
        setCta1Image(singleImageTransformer(content['cta1-image']).imageUrl);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Suspense fallback={null}>
      <Hero
        title="Program DPLK"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Program DPLK', href: '#' }
        ]}
        bottomImage={bannerImage}
        bottomImageFit={bannerImageFit}
        imageUrl={titleImage}
      />
      <DPLKProductList />
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      <FooterInformation
        bgColor="bg-dplk_yellow"
        outerClassName="bg-white"
        buttonVariant="dplk"
        title={
          <p className="font-light xs:text-[2.25rem] sm:text-[3.5rem] text-white sm:text-black font-karla xs:leading-[2.5rem] md:leading-[67.2px] xs:-tracking-[2.5px] sm:-tracking-[2.24px]">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={cta1Image}
        href={'/tanya-avrista'}
      />
      <RoundedFrameTop
        bgColor="xs:bg-white md:bg-purple_superlight"
        frameColor="bg-white"
      />
      <FooterCards
        bgColor="xs:bg-white md:bg-purple_superlight"
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
            href: '/klaim-layanan/klaim?tab=Informasi+Klaim'
          },
          {
            title: 'Kelola Polis',
            icon: ProdukPolis,
            subtitle: 'Login Akun',
            href: 'https://my.avrist.com/welcome'
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
