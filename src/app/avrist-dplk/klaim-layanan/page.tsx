import { Suspense } from 'react';

import KlaimDanLayanan from '../tabs/KlaimDanLayanan';
import CONTACTS from '@/assets/images/common/contacts.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import HOSPITAL from '@/assets/images/common/hospital.svg';
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
  singleImageTransformer
} from '@/utils/responseTransformer';

const KlaimLayanan = async () => {
  const pageBase = await handleGetContentPage('halaman-klaim-dan-layanan-dplk');
  const { content } = pageTransformer(pageBase);
  const titleImage = singleImageTransformer(content['title-image']);
  const bannerImage = singleImageTransformer(content['banner-image']);
  const cta1Image = singleImageTransformer(content['cta1-image']);

  // const contentBase = await handleGetContent('Halaman-Klaim-dan-Layanan-DPLK', {
  //   includeAttributes: 'true'
  // });
  // const products = contentBase.data.contentDataList;

  return (
    <Suspense fallback={null}>
      <Hero
        title="Klaim dan Layanan"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Klaim dan Layanan', href: '#' }
        ]}
        bottomImage={bannerImage.imageUrl}
        imageUrl={titleImage.imageUrl}
      />
      <KlaimDanLayanan />
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      <FooterInformation
        bgColor="bg-dplk_yellow"
        outerClassName="bg-white"
        buttonVariant="dplk"
        title={
          <p className="xs:text-[2.25rem] sm:text-[3.5rem] text-white md:text-black font-karla xs:leading-[2.5rem] md:leading-[3.125rem]">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={cta1Image.imageUrl}
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
            title: 'Kelola Polis',
            subtitle: 'Pengkinian Data',
            href: 'https://my.avrist.com/welcome',
            icon: CONTACTS
          },
          {
            title: 'Rumah Sakit Rekanan',
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

export default KlaimLayanan;
