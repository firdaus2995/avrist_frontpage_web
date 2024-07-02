'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IVideoData } from '../kelola-polis/page';
import FOOTER_NASABAH_1 from '@/assets/images/avrast/component/footer-klaim/footer-img-1.svg';
import FOOTER_NASABAH_2 from '@/assets/images/avrast/component/footer-klaim/footer-img-2.svg';
import FOOTER_NASABAH_3 from '@/assets/images/avrast/component/footer-klaim/footer-img-3.svg';
import FOOTER_NASABAH_4 from '@/assets/images/avrast/component/footer-klaim/footer-img-4.svg';
import Icon from '@/components/atoms/Icon';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { MainContent } from '@/components/molecules/specifics/avrast/PenangananPengaduan';
import { handleGetContentPage } from '@/services/content-page.api';
import {
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const HandleComplaint = () => {
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });
  const [videoData, setVideoData] = useState<IVideoData | undefined>();
  const [formId, setFormId] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContentPage('halaman-penanganan-pengaduan');
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
        setFormId(contentStringTransformer(content['form-pengaduan']));
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
          { title: 'Penanganan Pengaduan', href: '#' }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
      />
      <MainContent videoData={videoData} formId={formId} />
      <FooterInformation
        title={
          <div
            className={`md:w-full xs:w-full p-5 flex h-full flex-col md:items-start xs:items-center justify-center gap-10`}
          >
            <p className="-tracking-[2.24px] leading-[67.2px] font-light sm:text-[3.5rem] xs:text-[2.25rem] md:text-left xs:text-center">
              <span className="font-bold text-purple_dark">
                Warisan Kebaikan,
              </span>{' '}
              Solusi Perlindungan Masa Depan
            </p>
            <Link
              href="https://www.youtube.com/@avristian"
              target="blank"
              role="button"
              className="text-[20px] leading-[28px] py-[0.75rem] px-[2.5rem] bg-purple_dark rounded-xl text-xl font-semibold text-white flex flex-row gap-2 items-center font-opensans"
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
      <div className="w-full mt-[6px]">
        <FooterCards
          bgColor="bg-white"
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
              href: '/promo-berita/berita?tab=Avrist+Terkini&category=Berita'
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
    </div>
  );
};

export default HandleComplaint;
