'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Icon from '@/components/atoms/Icon';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import { FormulirPendaftaran } from '@/components/molecules/specifics/avrast/FormulirPendaftaran';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { MainContent } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';
import { PerformaInvestasi } from '@/components/molecules/specifics/avrast/PerformaInvestasi';
import { RSRekanan } from '@/components/molecules/specifics/avrast/RSRekanan';
import { getContentPage } from '@/services/content-page.api';
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
		const paramsSlug = {
			'Rumah Sakit Rekanan': 'halaman-rumah-sakit-rekanan',
			'Performa Investasi': 'halaman-performa-investasi',
			'Formulir & Buku Panduan': 'halaman-formulir-dan-buku-panduan',
			'Informasi Nasabah': 'informasi-nasabah'
		};

		const fetchDataByParam = async (slug: string) => {
			setData(initialData);
			const pageSlug = paramsSlug[slug as keyof typeof paramsSlug];
			try {
        const data = await getContentPage(pageSlug as string)
				const { content } = pageTransformer(data);			
				const banner = singleImageTransformer(content['banner-image']).imageUrl !== '' ?
					singleImageTransformer(content['banner-image']) : singleImageTransformer(content['image-banner']);				
				const title = singleImageTransformer(content['title-image']).imageUrl !== '' ?
					singleImageTransformer(content['title-image']) : singleImageTransformer(content['image-title']);
				const footerInformation = singleImageTransformer(content['cta1-image']).imageUrl !== '' ?
					singleImageTransformer(content['cta1-image']) : singleImageTransformer(content['image-cta1']);

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
	
		if (params){
			fetchDataByParam(params);
		}
		else {
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
