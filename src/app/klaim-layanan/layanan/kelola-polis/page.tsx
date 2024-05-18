'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Icon from '@/components/atoms/Icon';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { MainContent } from '@/components/molecules/specifics/avrast/KelolaPolis';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import { getPanduanPembayaran } from '@/services/layanan.api';
import { ContentDatum } from '@/types/page.type';
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

const InformationPolicy = () => {
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });
  const [videoData, setVideoData] = useState<IVideoData[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('halaman-panduan-polis');
        const { content } = pageTransformer(data);
        const dataWithVideo = Object.entries(content)
          .filter(([key]) => key.includes('video'))
          .reduce((obj: any, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});

        setTitleImage(singleImageTransformer(content['title-image']));
        setBannerImage(singleImageTransformer(content['banner-image']));
        setFooterImage(singleImageTransformer(content['cta1-image']));
        setVideoData(dataWithVideo);
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
          { title: 'Panduan Polis', href: '#' }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
      />
      <MainContent videoData={videoData} />
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
            <div
              role="button"
              className="p-4 bg-purple_dark rounded-xl text-sm font-semibold text-white flex flex-row gap-2"
            >
              Cerita Lebih Detail di
              <Icon name="youtubeIcon" color="white" />
            </div>
          </div>
        }
        image={footerImage.imageUrl}
      />
      <RoundedFrameTop bgColor='bg-white' />
      <FooterKlaim />
    </div>
  );
};

export default InformationPolicy;

export interface PolicyContent {
  [key: string]: any;
}
export interface Item {
  title: string;
  content: PolicyContent;
  fieldId: string[];
  categoryName: string;
  id: number;
}

export interface IVideoData {
  [key: string]: ContentDatum;
}
