'use client';
import React, { useState } from 'react';

// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import InformasiKlaimComponent from '@/components/molecules/specifics/avrast/Klaim/InformasiKlaim';
import KlaimBanner from '@/components/molecules/specifics/avrast/Klaim/KlaimBanner/KlaimBanner';
import KlaimHeader from '@/components/molecules/specifics/avrast/Klaim/KlaimHeader/KlaimHeader';
import KlaimVideo from '@/components/molecules/specifics/avrast/Klaim/KlaimVideo';
import PanduanKlaim from '@/components/molecules/specifics/avrast/Klaim/PanduanKlaim';
import ProsesKlaim from '@/components/molecules/specifics/avrast/Klaim/ProsesKlaim';
import { ParamsProps } from '@/utils/globalTypes';

const InformasiKlaim: React.FC<ParamsProps> = () => {
  const [tab, setTab] = useState('Informasi Klaim');
  const [isSelectedDetail, setIsSelectedDetail] = useState(false);
  const [bannerImg, setBannerImg] = useState(0);
  
  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  const handleSelectedDetail = (val: boolean) => {
    setIsSelectedDetail(val);
  };

  const handleChangeBannerImg = (val: number) => {
    setBannerImg(val);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-avrast_product_bg">
      <KlaimHeader title={tab} />
      <KlaimBanner changeImg={bannerImg} />
      <InformasiKlaimComponent onTabChange={handleTabChange} isSelectedDetail={isSelectedDetail} onChangeBannerImg={handleChangeBannerImg} />
      {tab === 'Informasi Klaim' && <PanduanKlaim />}
      {tab === 'Panduan & Pengajuan' && <ProsesKlaim onSelectDetail={handleSelectedDetail} onChangeBannerImg={handleChangeBannerImg} />}
      <KlaimVideo />
      <FooterKlaim />
    </div>
  );
};

export default InformasiKlaim;
