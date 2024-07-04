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
  const [content, setcontent] = useState({
    titleImage: {
      imageUrl: '',
      altText: ''
    },
    ctaImage: { imageUrl: '', altText: '' },
    topik: '',
    pertanyaan: '',
    jawaban: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContentPage(
          'halaman-tanya-avrista-detail-new'
        );
        const detail = await handleGetContentDetail(params.detail);
        // page
        const { content } = pageTransformer(data);
        const titleImage = singleImageTransformer(content['title-image']);
        const ctaImage = singleImageTransformer(content['cta1-image']);
        // content
        const { content: contentDetail } = contentDetailTransformer(detail);
        const topik = contentStringTransformer(contentDetail['tags']);
        const pertanyaan = contentStringTransformer(
          contentDetail['pertanyaan-tanya-avrista']
        );
        const jawaban = contentStringTransformer(
          contentDetail['jawaban-tanya-avrista']
        );
        setcontent({
          titleImage,
          ctaImage,
          topik,
          pertanyaan,
          jawaban
        });
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
          title={content.topik}
          imageUrl={content.titleImage.imageUrl}
          breadcrumbsData={[
            { title: 'Beranda', href: '/' },
            { title: 'Tanya Avrista', href: '/tanya-avrista' },
            {
              title: 'Detail',
              href: '#'
            }
          ]}
        />
        <div className="xs:-mt-[3.4rem] md:-mt-[6.3rem] relative z-[10]">
          <ArtikelTanyaAvrista
            title={content.pertanyaan}
            content={content.jawaban}
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
          image={content.ctaImage.imageUrl}
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
