'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import MainContentKeamananOnline from './component/MainContentKeamananOnline';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { InformationAvrastFooter } from '@/components/molecules/specifics/avrast/SyaratPengunaan';
import {
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const SyaratPengunaan = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-front-sit.avristcms.barito.tech/api/page/keamanan-online',
          { method: 'GET' }
        );
        const data = await response.json();
        setData(data);

        const { title, content } = pageTransformer(data);
        const artikel = contentStringTransformer(content['body-jawaban']);
        const bannerImage = singleImageTransformer(content['title-image']);
        const footerImage = singleImageTransformer(content['cta1-mage']);
        setData({ title, artikel, bannerImage, footerImage });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  let bannerImage, footerImage;

  if (data && data.bannerImage && data.footerImage) {
    bannerImage = data.bannerImage.imageUrl;
    footerImage = data.footerImage.imageUrl;
  }
  return (
    <div className="flex flex-col">
      <Hero
        title="Keamanan Online"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Keamanan Online', href: '#' }
        ]}
        imageUrl={bannerImage}
      />
      <MainContentKeamananOnline />
      <FooterInformation
        title={
          <div
            className={`w-full p-5 flex h-full flex-col md:items-start xs:items-center justify-center gap-10`}
          >
            <p className="md:text-4xl xs:text-2xl md:text-left xs:text-center">
              <span className="font-bold text-purple_dark">Komitmen</span> Kami,
              proses klaim yang{' '}
              <span className="font-bold text-purple_dark">efisien</span> dan{' '}
              <span className="font-bold text-purple_dark">solusi</span>
            </p>
            <Link href="/produk/individu" className="font-semibold">
              <div
                role="button"
                className="p-4 bg-purple_dark rounded-xl text-sm font-semibold text-white flex flex-row gap-2"
              >
                Panduan Klaim
              </div>
            </Link>
          </div>
        }
        image={footerImage}
      />
      <RoundedFrameTop />
      <InformationAvrastFooter />
    </div>
  );
};

export default SyaratPengunaan;
