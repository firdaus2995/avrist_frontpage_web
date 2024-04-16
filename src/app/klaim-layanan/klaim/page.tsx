'use client';
import React, { Suspense, useEffect, useState } from 'react';

// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import { useRouter, useSearchParams } from 'next/navigation';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import InformasiKlaimComponent from '@/components/molecules/specifics/avrast/Klaim/InformasiKlaim';
import KlaimBanner from '@/components/molecules/specifics/avrast/Klaim/KlaimBanner/KlaimBanner';
import KlaimHeader from '@/components/molecules/specifics/avrast/Klaim/KlaimHeader/KlaimHeader';
import KlaimVideo from '@/components/molecules/specifics/avrast/Klaim/KlaimVideo';
import PanduanKlaim from '@/components/molecules/specifics/avrast/Klaim/PanduanKlaim';
import ProsesKlaim from '@/components/molecules/specifics/avrast/Klaim/ProsesKlaim';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';
import { PageResponse } from '@/types/page.type';
import { ParamsProps } from '@/utils/globalTypes';
import { pageTransformer, singleImageTransformer } from '@/utils/responseTransformer';

const initialData = {
  titleImageUrl: '',
  bannerImageUrl: '',
  titleAltText: '',
  bannerAltText: '',
  footerInfoAltText: '',
  footerInfoImageUrl: ''
}

const handleDataFetch = async (slug: string, setData: (dataKlaim: dataKlaim) => void) => {
  const dataFetchParams = {
    dataKeyTitle: 'title-image',
    dataKeyBanner: 'banner-image',
    dataKeyFooter: 'cta1-image'
  }

  try {
    const { dataKeyTitle, dataKeyBanner, dataKeyFooter } = dataFetchParams;
	  const response = await fetch(`/api/klaim-layanan/klaim?slug=${slug}`);
    const data = await response.json();
    const { content } = pageTransformer(data as PageResponse);
    const title = singleImageTransformer(content[dataKeyTitle]).imageUrl !== '' ?
      singleImageTransformer(content[dataKeyTitle]) : singleImageTransformer(content['image-title']);
    const banner = singleImageTransformer(content[dataKeyBanner]).imageUrl !== '' ?
      singleImageTransformer(content[dataKeyBanner]) : singleImageTransformer(content['image-banner']);
    const footerInformationImage = singleImageTransformer(content[dataKeyFooter]).imageUrl !== '' ?
      singleImageTransformer(content[dataKeyFooter]) : singleImageTransformer(content['image-cta1']);

    setData({
      titleImageUrl: title.imageUrl,  
      bannerImageUrl: banner.imageUrl, 
      titleAltText: title.altText,
      bannerAltText: banner.altText,
      footerInfoAltText: footerInformationImage.altText,
      footerInfoImageUrl: footerInformationImage.imageUrl
    });
  } catch (error) {
   setData(initialData)
  }
};

const InformasiKlaim: React.FC<ParamsProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState('');
  const [isSelectedDetail, setIsSelectedDetail] = useState(false);
  const [, setBannerImg] = useState(0);
  const [data, setData] = useState<dataKlaim>(initialData);

  const handleTabChange = async (tab: string) => {
    setTab(tab);
  };

  useEffect(() => {  
    setData(initialData);
    const value = searchParams.get('tab');
    if (value === 'Login Polis') {
      router.push('https://my.avrist.com/welcome');
    } else if (value) {
      setTab(value);
    }
    
    switch (value) {
      case 'Panduan & Pengajuan':
        handleDataFetch('halaman-panduan-dan-pengajuan', setData).then();
        break;
      case 'Informasi Klaim':
        handleDataFetch('informasi-klaim', setData).then();
        break;
      default: console.log('default');
    }
  }, [searchParams, router]);

  const handleSelectedDetail = (val: boolean) => {
    setIsSelectedDetail(val);
    handleDataFetch('halaman-panduan-dan-pengajuan-detail', setData).then();
  };

  const handleChangeBannerImg = (val: number) => {
    setBannerImg(val);
  };
  console.log({data});
  

  return (
    <div className="flex flex-col items-center justify-center bg-avrast_product_bg">
        <Suspense>
          <KlaimHeader title={tab} data={data}/>
          <KlaimBanner data={data}/>
        </Suspense>      
      <InformasiKlaimComponent
        onTabChange={handleTabChange}
        isSelectedDetail={isSelectedDetail}
        onChangeBannerImg={handleChangeBannerImg}
        tab={tab}
      />
      {tab === 'Informasi Klaim' && <PanduanKlaim />}
      {tab === 'Panduan & Pengajuan' && (
        <ProsesKlaim
          onSelectDetail={handleSelectedDetail}
          onChangeBannerImg={handleChangeBannerImg}
        />
      )}
      <Suspense>
        <KlaimVideo data={data}/>
      </Suspense>
      <FooterKlaim />
    </div>
  );
};

export default InformasiKlaim;
