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
import { getPageBy } from '@/services/klaim-layanan.api';
import { PageResponse } from '@/types/page.type';
import { ParamsProps } from '@/utils/globalTypes';
import { pageTransformer, singleImageTransformer } from '@/utils/responseTransformer';

const handleGetPage = async (slug: string) => {
  try {    
    const data = await getPageBy(slug);    
    return data;
  } catch (error) {
    console.info(error);
    
    return error;
  }
};

const handleDataFetch = async (slug: string, setData: (dataKlaim: dataKlaim) => void) => {
  const dataFetchParams = {
    dataKeyTitle: 'title-image',
    dataKeyBanner: 'banner-image',
    dataKeyFooter: 'cta1-image'
  }

  try {
    const { dataKeyTitle, dataKeyBanner, dataKeyFooter } = dataFetchParams;
    const data = await handleGetPage(slug);
    const { content } = pageTransformer(data as PageResponse);
    const title = singleImageTransformer(content[dataKeyTitle]);
    const banner = singleImageTransformer(content[dataKeyBanner]);
    const footerInformationImage = singleImageTransformer(content[dataKeyFooter]);

    setData({
      titleImageUrl: title.imageUrl,  
      bannerImageUrl: banner.imageUrl, 
      titleAltText: title.altText,
      bannerAltText: banner.altText,
      footerInfoAltText: footerInformationImage.altText,
      footerInfoImageUrl: footerInformationImage.imageUrl
    });
  } catch (error) {
    console.log(error);
  }
};

const InformasiKlaim: React.FC<ParamsProps> = () => {
  const initialData = {
    titleImageUrl: '',
    bannerImageUrl: '',
    titleAltText: '',
    bannerAltText: '',
    footerInfoAltText: '',
    footerInfoImageUrl: ''
}
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState('');
  const [isSelectedDetail, setIsSelectedDetail] = useState(false);
  const [bannerImg, setBannerImg] = useState(0);
  const [data, setData] = useState<dataKlaim>(initialData);

  const handleTabChange = async (tab: string) => {
    setTab(tab);
  };

  useEffect(() => {  
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

  return (
    <div className="flex flex-col items-center justify-center bg-avrast_product_bg">
        <Suspense>
          <KlaimHeader title={tab} data={data}/>
          <KlaimBanner changeImg={bannerImg} data={data}/>
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
