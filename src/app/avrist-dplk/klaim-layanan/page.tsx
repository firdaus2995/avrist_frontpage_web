'use client';
import { useState, useEffect, Suspense } from 'react';

import KlaimDanLayanan from '../tabs/KlaimDanLayanan';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import EMAIL from '@/assets/images/common/email.svg';
import MESSAGE from '@/assets/images/common/message.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import {
  handleGetContentPage
  // handleGetContent
} from '@/services/content-page.api';
import {
  pageTransformer,
  customImageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const KlaimLayanan = () => {
  const [bannerImage, setBannerImage] = useState('');
  const [bannerImageFit, setBannerImageFit] = useState('');
  const [titleImage, setTitleImage] = useState('');
  const [cta1Image, setCta1Image] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageBase = await handleGetContentPage(
          'halaman-klaim-dan-layanan-dplk'
        );
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
        title="Klaim dan Layanan"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Klaim dan Layanan', href: '#' }
        ]}
        bottomImage={bannerImage}
        bottomImageFit={bannerImageFit}
        imageUrl={titleImage}
      />
      <KlaimDanLayanan />
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
            icon: CUSTOMER_SERVICE,
            title: 'Layanan Nasabah',
            subtitle: '021 5789 8188',
            href: 'tel:021-5789-8188'
          },
          {
            icon: MESSAGE,
            title: 'Tanya Avrista',
            subtitle: 'Lebih Lanjut',
            href: '/tanya-avrista'
          },
          {
            icon: EMAIL,
            title: 'Tanya Lewat Email',
            subtitle: 'Kirim Email',
            href: 'mailto:customer-service@avrist.com'
          },
          {
            icon: DOCUMENT_SEARCH,
            title: 'Prosedur Pengaduan',
            subtitle: 'Lihat Prosedur',
            href: '/klaim-layanan/layanan/penanganan-pengaduan'
          }
        ]}
      />
    </Suspense>
  );
};

export default KlaimLayanan;
