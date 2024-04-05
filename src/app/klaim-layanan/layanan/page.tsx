'use client';
import { useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import Icon from '@/components/atoms/Icon';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import { FormulirPendaftaran } from '@/components/molecules/specifics/avrast/FormulirPendaftaran';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { MainContent } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';
import { PerformaInvestasi } from '@/components/molecules/specifics/avrast/PerformaInvestasi';
import { RSRekanan } from '@/components/molecules/specifics/avrast/RSRekanan';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const InformationCustomer = () => {
	const initialData = { titleImageUrl: '', bannerImageUrl: '', titleAltText: '', bannerAltText: '', footerInfoAltText: '', footerInfoImageUrl: '' }
  const [data, setData] = useState<dataKlaim>(initialData);

  const searchParams = useSearchParams();
  const params = searchParams.get('tab') ?? '';

  useEffect(() => {
    const fetchData = async () => {
			setData(initialData);
      try {
				const pageSlug = 'informasi-nasabah';
				const response = await fetch(`/api/klaim-layanan/layanan?slug=${pageSlug}`);
				const data = await response.json();
        const { content } = pageTransformer(data);
				const banner = singleImageTransformer(content['image-banner']);
				const title = singleImageTransformer(content['image-title']);
				const footerInformation = singleImageTransformer(content['image-cta1']);

				setData({
					titleImageUrl: title.imageUrl,  
					bannerImageUrl: banner.imageUrl, 
					titleAltText: title.altText,
					bannerAltText: banner.altText,
					footerInfoAltText: footerInformation.altText,
					footerInfoImageUrl: footerInformation.imageUrl
				});
      } catch (error) {
        console.error('Error:', error);
      }
    };

	const fetchDataRumahSakitRekanan = async () => {
		setData(initialData);
		try {
			const pageSlug = 'halaman-rumah-sakit-rekanan';
			const response = await fetch(`/api/klaim-layanan/layanan?slug=${pageSlug}`);
			const data = await response.json();
			const { content } = pageTransformer(data);
			const banner = singleImageTransformer(content['banner-image']);
			const title = singleImageTransformer(content['title-image']);
			const footerInformation = singleImageTransformer(content['cta1-image']);
			setData({
				titleImageUrl: title.imageUrl,  
				bannerImageUrl: banner.imageUrl, 
				titleAltText: title.altText,
				bannerAltText: banner.altText,
				footerInfoAltText: footerInformation.altText,
				footerInfoImageUrl: footerInformation.imageUrl
			});
		}
		catch(error) {
			console.error('Error:', error)
		}
	};

	if (params.includes('Rumah Sakit Rekanan')){
		fetchDataRumahSakitRekanan().then();
	} 
	if (params.includes('Informasi Nasabah')){
		fetchData().then();
	} else {
		setData(initialData);
	}

  }, [params]);	

  return (
    <div className="flex flex-col bg-avrast_product_bg">
      <Hero
        title={params}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: params, href: '#' }
        ]}
        imageUrl={data.titleImageUrl}
        bottomImage={data.bannerImageUrl}
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
        image={data.footerInfoImageUrl}
      />
      <FooterKlaim />
    </div>
  );
};

export default InformationCustomer;
