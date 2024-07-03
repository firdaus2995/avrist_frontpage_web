'use client';
import React, { Suspense, useEffect, useState } from 'react';

import CONTACTS from '@/assets/images/common/contacts.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import HOSPITAL from '@/assets/images/common/hospital.svg';
import MESSAGE from '@/assets/images/common/message.svg';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import ArtikelTanyaAvrista from '@/components/molecules/specifics/avrast/TanyaAvrista/Artikel';
import {
  handleGetContentDetail,
  handleGetContentPage
} from '@/services/content-page.api';
import {
  contentDetailTransformer,
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const DetailTanyaAvrista = ({ params }: { params: { detail: string } }) => {
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });
  const [titleContent, setTitleContent] = useState('');
  const [mainContent, setMainContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContentPage('halaman-tanya-avrista-detail');
        const detail = await handleGetContentDetail(params.detail);
        // page
        const { content } = pageTransformer(data);
        setBannerImage(singleImageTransformer(content['title-image']));
        setFooterImage(singleImageTransformer(content['cta1-image']));
        // contrent
        const { content: contentDetail } = contentDetailTransformer(detail);
        setTitleContent(
          contentStringTransformer(contentDetail['pertanyaan-tanya-avrista'])
        );
        setMainContent(
          contentStringTransformer(contentDetail['jawaban-tanya-avrista'])
        );
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-purple_superlight">
      <Suspense>
        <Hero
          title={titleContent}
          imageUrl={bannerImage.imageUrl}
          breadcrumbsData={[
            { title: 'Beranda', href: '/' },
            {
              title: 'Detail',
              href: '#'
            }
          ]}
        />
        <div className="xs:-mt-[3.4rem] md:-mt-[6.3rem] relative z-[10]">
          <ArtikelTanyaAvrista
            title={titleContent}
            content={mainContent as string}
          />
        </div>
        <RoundedFrameBottom />
        <FooterInformation
          title={
            <p className="font-karla sm:text-[3.5rem] xs:text-[2.5rem] xs:leading-[44px] xs:-tracking-[0.03em] sm:leading-[67.2px] xs:-tracking-[0.04em]">
              <span className="font-bold text-purple_dark">Komitmen</span> Kami,
              proses klaim yang{' '}
              <span className="font-bold text-purple_dark">efisien</span> dan{' '}
              <span className="font-bold text-purple_dark">solusi</span>
            </p>
          }
          buttonTitle="Panduan Klaim"
          href="/klaim-layanan/klaim?tab=Panduan+%26+Pengajuan"
          image={footerImage.imageUrl}
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
      </Suspense>
    </div>
  );
};

export default DetailTanyaAvrista;
