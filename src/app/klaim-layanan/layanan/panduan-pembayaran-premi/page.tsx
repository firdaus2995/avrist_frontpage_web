'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/atoms/Icon';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import { MainContent } from '@/components/molecules/specifics/avrast/PanduanPembayaranPolis';
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

const TutorialPayment = () => {
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('halaman-panduan-pembayaran-premi');
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
    <div className="flex flex-col">
      <Hero
        title={'Informasi Nasabah'}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Informasi Nasabah',
            href: '/klaim-layanan/layanan?tab=Informasi+Nasabah'
          },
          { title: 'Panduan Pembayaran', href: '#' }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
      />
      <MainContent />
      <FooterInformation
        title={
          <div
            className={`md:w-full xs:w-full p-5 flex h-full flex-col md:items-start xs:items-center justify-center gap-10`}
          >
            <p className="md:text-4xl xs:text-2xl md:text-left xs:text-center">
              <span className="font-bold text-purple_dark">
                Warisan Kebaikan,
              </span>{' '}
              Solusi Perlindungan Masa Depan
            </p>
            <Link
              href="https://www.youtube.com/@avristian"
              target="blank"
              role="button"
              className="py-[0.75rem] px-[2.5rem] bg-purple_dark rounded-lg md:text-xl font-semibold text-white flex flex-row gap-[0.667rem] items-center font-opensans"
            >
              Cerita Lebih Detail di
              <Icon
                name="youtubeIcon"
                color="white"
                width={26.67}
                height={18.67}
              />
            </Link>
          </div>
        }
        image={footerImage.imageUrl}
      />
      <RoundedFrameTop bgColor="bg-white" />
      <FooterKlaim />
    </div>
  );
};

export default TutorialPayment;
