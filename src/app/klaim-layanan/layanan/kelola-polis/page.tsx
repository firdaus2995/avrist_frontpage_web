'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FOOTER_NASABAH_1 from '@/assets/images/avrast/component/footer-klaim/footer-img-1.svg';
import FOOTER_NASABAH_2 from '@/assets/images/avrast/component/footer-klaim/footer-img-2.svg';
import FOOTER_NASABAH_3 from '@/assets/images/avrast/component/footer-klaim/footer-img-3.svg';
import FOOTER_NASABAH_4 from '@/assets/images/avrast/component/footer-klaim/footer-img-4.svg';
import Icon from '@/components/atoms/Icon';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { MainContent } from '@/components/molecules/specifics/avrast/KelolaPolis';
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
      <MainContent videoData={videoData} mute={true} />
      <FooterInformation
        title={
          <div
            className={`flex flex-col gap-[2rem] xs:items-center md:items-start min-h-[250px]`}
          >
            <p className="font-karla xs:text-[2.25rem] sm:text-[3.5rem] text-black font-karla xs:leading-[43.2px] md:leading-[67.2px] -tracking-[2.24px]">
              <span className="font-bold text-purple_dark">
                Warisan Kebaikan,
              </span>{' '}
              Solusi Perlindungan Masa Depan
            </p>
            <Link
              href="https://www.youtube.com/@avristian"
              target="blank"
              role="button"
              className="py-[0.75rem] px-[2.5rem] bg-purple_dark rounded-lg text-xl font-semibold text-white flex flex-row gap-2 items-center font-opensans leading-[28px]"
            >
              Cerita Lebih Detail di
              <Icon name="youtubeIcon" color="white" width={32} height={32} />
            </Link>
          </div>
        }
        image={footerImage.imageUrl}
      />
      <RoundedFrameTop bgColor="sm:bg-purple_superlight xs:bg-white" />
      <FooterCards
        bgColor="sm:bg-purple_superlight xs:bg-white"
        cards={[
          {
            icon: FOOTER_NASABAH_1,
            title: 'Kelola Polis',
            subtitle: 'Login Akun',
            href: 'https://my.avrist.com/welcome'
          },
          {
            icon: FOOTER_NASABAH_2,
            title: 'Download Formulir',
            subtitle: 'Lihat Lainnya',
            href: '/klaim-layanan/layanan?tab=Formulir+%26+Buku+Panduan'
          },
          {
            icon: FOOTER_NASABAH_3,
            title: 'Avrist Terkini',
            subtitle: 'Lebih Lanjut',
            href: '/promo-berita/berita?tab=Avrist+Terkini&category=Berita+dan+Kegiatan'
          },
          {
            icon: FOOTER_NASABAH_4,
            title: 'Prosedur Pengaduan',
            subtitle: 'Lihat Prosedur',
            href: '/klaim-layanan/layanan/penanganan-pengaduan'
          }
        ]}
      />
    </div>
  );
};

export default InformationPolicy;

export interface PolicyContent {
  [key: string]: any;
  isShowDetail?: boolean;
  setIsShowDetail?: any;
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
