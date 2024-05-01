import React, { Suspense } from 'react';

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

const DetailTanyaAvrista = async ({
  params
}: {
  params: { detail: string };
}) => {
  const data = await handleGetContentPage('halaman-tanya-avrista-detail');
  const detail = await handleGetContentDetail(params.detail);
  // page
  const { title, content } = pageTransformer(data);
  const bannerImage = singleImageTransformer(content['title-image']);
  const footerImage = singleImageTransformer(content['cta1-image']);
  // contrent
  const { content: contentDetail } = contentDetailTransformer(detail);
  const titleContent = contentStringTransformer(
    contentDetail['pertanyaan-tanya-avrista']
  );
  const mainContent = contentStringTransformer(
    contentDetail['jawaban-tanya-avrista']
  );

  return (
    <Suspense>
      <Hero
        title={title}
        imageUrl={bannerImage.imageUrl}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Tanya Avrista', href: '/tanya-avrista' },
          {
            title: title,
            href: '#'
          },
          {
            title: titleContent,
            href: '#'
          }
        ]}
      />
      <ArtikelTanyaAvrista
        title={titleContent}
        content={mainContent as string}
      />
      <RoundedFrameBottom />
      <FooterInformation
        title={
          <p className="font-karla text-[56px]">
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
  );
};

export default DetailTanyaAvrista;
