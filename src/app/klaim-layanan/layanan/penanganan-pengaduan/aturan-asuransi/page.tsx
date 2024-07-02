'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import EMAIL from '@/assets/images/common/email.svg';
import MESSAGE from '@/assets/images/common/message.svg';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import Content from '@/components/molecules/specifics/avrast/AturanAsuransi';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { getPanduanPembayaran } from '@/services/layanan.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const handleGetContent = async (slug: string) => {
  try {
    const data = await getPanduanPembayaran(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};

const Page = () => {
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('halaman-hak-nasabah');
        const { content } = pageTransformer(data);

        setTitleImage(singleImageTransformer(content['title-image']));
        setBannerImage(singleImageTransformer(content['banner-image']));
        setFooterImage(singleImageTransformer(content['cta1-image']));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero
        title="Penanganan Pengaduan"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Informasi Nasabah',
            href: '/klaim-layanan/layanan?tab=Informasi+Nasabah'
          },
          {
            title: 'Penanganan Pengaduan',
            href: '/klaim-layanan/layanan/penanganan-pengaduan'
          }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
      />
      <Content />
      <RoundedFrameBottom />
      <FooterInformation
        title={
          <div
            className={`md:w-full xs:w-full p-5 flex h-full flex-col md:items-start xs:items-center justify-center gap-10`}
          >
            <p className="-tracking-[2.24px] sm:leading-[67.2px] sm:leading-[43.2px] font-light sm:text-[3.5rem] xs:text-[2.25rem] md:text-left xs:text-center">
              <span className="font-bold text-purple_dark">
                Warisan Kebaikan,
              </span>{' '}
              Solusi Perlindungan Masa Depan
            </p>
            <Link
              href="https://www.youtube.com/@avristian"
              target="blank"
              role="button"
              className="text-[20px] leading-[28px] py-[0.75rem] px-[2.5rem] bg-purple_dark rounded-xl text-xl font-semibold text-white sm:flex flex-row gap-2 items-center font-opensans"
            >
              Cerita Lebih Detail di
              <div className="xs:m-auto w-[27px]">
                <Icon
                  name="youtubeIcon"
                  color="white"
                  width={26.67}
                  height={18.67}
                />
              </div>
            </Link>
          </div>
        }
        image={footerImage.imageUrl}
      />
      <RoundedFrameTop />
      <FooterCards
        bgColor="bg-purple_superlight"
        cards={[
          {
            title: 'Layanan Nasabah',
            icon: CUSTOMER_SERVICE,
            subtitle: '021 5789 8188',
            href: 'tel:021-5789-8188'
          },
          {
            title: 'Tanya Avrista',
            icon: MESSAGE,
            subtitle: 'Lebih Lanjut',
            href: '/tanya-avrista'
          },
          {
            title: 'Tanya Lewat Email',
            icon: EMAIL,
            subtitle: 'Kirim Email',
            href: 'mailto:contact_us@avristsalesforce.com'
          },
          {
            title: 'Prosedur Pengaduan',
            icon: DOCUMENT_SEARCH,
            subtitle: 'Lihat Prosedur',
            href: '/klaim-layanan/layanan/penanganan-pengaduan'
          }
        ]}
      />
    </>
  );
};

export default Page;
