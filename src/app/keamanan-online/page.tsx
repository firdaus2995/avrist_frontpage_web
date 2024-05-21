'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import MainContentKeamananOnline from './component/MainContentKeamananOnline';
import CONTACTS from '@/assets/images/common/contacts.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import HOSPITAL from '@/assets/images/common/hospital.svg';
import MESSAGE from '@/assets/images/common/message.svg';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
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
    <div className="flex flex-col bg-purple_superlight">
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
                className="px-[2.5rem] py-[0.75rem] bg-purple_dark rounded-xl text-[1.25rem] font-semibold text-white flex flex-row gap-2"
              >
                Panduan Klaim
              </div>
            </Link>
          </div>
        }
        image={footerImage}
      />
      <RoundedFrameTop />
      <FooterCards
        bgColor="bg-purple_superlight"
        cards={[
          {
            title: 'Kelola Polis',
            subtitle: 'Pengkinian Data',
            href: 'https://my.avrist.com/welcome',
            openInNewTab: true,
            icon: CONTACTS
          },
          {
            title: 'Rumah Sakit \n \n Rekanan',
            subtitle: 'Lebih Lanjut',
            href: '/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan',
            icon: HOSPITAL
          },
          {
            title: 'Tanya Avrista',
            subtitle: 'Lebih Lanjut',
            href: '/tanya-avrista',
            icon: MESSAGE
          },
          {
            title: 'Prosedur Pengaduan',
            subtitle: 'Lihat Prosedur',
            href: '/klaim-layanan/layanan/penanganan-pengaduan',
            icon: DOCUMENT_SEARCH
          }
        ]}
      />
    </div>
  );
};

export default SyaratPengunaan;
