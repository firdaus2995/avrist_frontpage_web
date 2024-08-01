'use client';
import { useEffect, useState } from 'react';
import KlaimDanLayanan from '../tabs/KlaimDanLayanan';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import EMAIL from '@/assets/images/common/email.svg';
import MESSAGE from '@/assets/images/common/message.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { handleGetContentPage } from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const initialData = {
  titleImage: '',
  bannerImage: '',
  bannerImageFit: '',
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
          const bannerImage = customImageTransformer(content['banner-image']);
          const bannerImageFit = content['banner-image']?.config
            ? JSON.parse(content['banner-image']?.config)?.image_fit
            : '';
          const cta1Image = singleImageTransformer(content['cta1-image']);

          setTransformedData({
            ...transformedData,
            titleImage: titleImage.imageUrl,
            bannerImage: bannerImage.imageUrl,
            bannerImageFit: bannerImageFit,
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
        bottomImageFit={transformedData.bannerImageFit}
      />

      <CustomContainer className="xs:mt-[3.125rem] mt-[5rem]">
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
      </CustomContainer>
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      <FooterInformation
        bgColor="bg-syariah_green_informing"
        outerClassName="bg-white"
        buttonVariant="syariah"
        title={
          <p className="font-light xs:text-[2.25rem] sm:text-[3.5rem] text-white font-karla xs:leading-[2.5rem] md:leading-[67.2px] xs:-tracking-[2.5px] sm:-tracking-[2.24px]">
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
    </div>
  );
};

export default ProdukSyariah;
