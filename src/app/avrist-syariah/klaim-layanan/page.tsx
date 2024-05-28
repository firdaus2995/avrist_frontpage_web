'use client';
import { useEffect, useState } from 'react';
import KlaimDanLayanan from '../tabs/KlaimDanLayanan';
import CONTACTS from '@/assets/images/common/contacts.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import HOSPITAL from '@/assets/images/common/hospital.svg';
import MESSAGE from '@/assets/images/common/message.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { handleGetContentPage } from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const initialData = {
  titleImage: '',
  bannerImage: '',
  cta1Image: ''
};

const ProdukSyariah = () => {
  const [transformedData, setTransformedData] =
    useState<typeof initialData>(initialData);

  useEffect(() => {
    if (transformedData === initialData) {
      handleGetContentPage(BASE_SLUG.AVRIST_SYARIAH.PAGE.KLAIM_LAYANAN).then(
        (res: PageResponse) => {
          const { content } = pageTransformer(res);

          const titleImage = singleImageTransformer(content['title-image']);
          const bannerImage = singleImageTransformer(content['banner-image']);
          const cta1Image = singleImageTransformer(content['cta1-image']);

          setTransformedData({
            ...transformedData,
            titleImage: titleImage.imageUrl,
            bannerImage: bannerImage.imageUrl,
            cta1Image: cta1Image.imageUrl
          });
        }
      );
    }
  }, [transformedData]);

  return (
    <div>
      <Hero
        title="Klaim dan Layanan"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Klaim dan Layanan', href: '#' }
        ]}
        imageUrl={transformedData.titleImage}
        bottomImage={transformedData.bannerImage}
      />

      <SimpleContainer>
        <CategoryPills
          buttonTitle={[
            'Tentang Avrist Syariah',
            'Dewan Pengawas Syariah',
            'Manfaat Utama',
            'Produk',
            'Klaim & Layanan'
          ]}
          selectedCategory="Klaim & Layanan"
          buttonActiveClassname="bg-syariah_green border-syariah_green"
          buttonInactiveClassname="bg-transparent border-syariah_green text-syariah_green hover:bg-syariah_green hover:border-syariah_green hover:text-white"
          buttonActiveTextClassname="text-white"
          links={{
            'Tentang Avrist Syariah':
              '/avrist-syariah?tab=Tentang+Avrist+Syariah',
            'Dewan Pengawas Syariah':
              '/avrist-syariah?tab=Dewan+Pengawas+Syariah',
            'Manfaat Utama': '/avrist-syariah?tab=Manfaat+Utama',
            Produk: '/avrist-syariah/produk',
            'Klaim & Layanan': '/avrist-syariah/klaim-layanan'
          }}
        />
        {/* isi klaim & layanan */}
        <KlaimDanLayanan />
      </SimpleContainer>
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      <FooterInformation
        bgColor="bg-syariah_green_informing"
        outerClassName="bg-white"
        buttonVariant="syariah"
        title={
          <p className="xs:text-[2.25rem] sm:text-[3.5rem] text-white font-karla xs:leading-[2.5rem] md:leading-[3.125rem]">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={transformedData.cta1Image}
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
    </div>
  );
};

export default ProdukSyariah;
