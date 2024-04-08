'use client';
import { useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import Icon from '@/components/atoms/Icon';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import { FormulirPendaftaran } from '@/components/molecules/specifics/avrast/FormulirPendaftaran';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { MainContent } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import { PerformaInvestasi } from '@/components/molecules/specifics/avrast/PerformaInvestasi';
import { RSRekanan } from '@/components/molecules/specifics/avrast/RSRekanan';
import { getInformasiNasabah } from '@/services/layanan.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const handleGetContent = async (slug: string) => {
  try {
    const data = await getInformasiNasabah(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};

const InformationCustomer = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get('tab') ?? '';
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('informasi-nasabah');
        const { content } = pageTransformer(data);

        setTitleImage(singleImageTransformer(content['image-title']));
        setBannerImage(singleImageTransformer(content['image-banner']));
        setFooterImage(singleImageTransformer(content['image-cta1']));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  // const bannerImage = singleImageTransformer(content['title-image']);
  return (
    <div className="flex flex-col bg-avrast_product_bg">
      <Hero
        title={params}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: params, href: '#' }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
      />
      {params.includes('Informasi Nasabah') ? (
        <MainContent />
      ) : params.includes('Formulir & Buku Panduan') ? (
        <FormulirPendaftaran />
      ) : params.includes('Performa Investasi') ? (
        <PerformaInvestasi />
      ) : params.includes('Rumah Sakit Rekanan') ? (
        <RSRekanan />
      ) : (
        <></>
      )}

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
      <FooterKlaim />
    </div>
  );
};

export default InformationCustomer;
