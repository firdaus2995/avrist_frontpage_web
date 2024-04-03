import React from 'react';
import BannerAvrast from '@/components/molecules/specifics/avrast/Banner/Banner';
import CompanySection from '@/components/molecules/specifics/avrast/CompanySection';
import LayananNasabah from '@/components/molecules/specifics/avrast/LayananNasabah';
import { HomeBannerModal } from '@/components/molecules/specifics/avrast/Modal';
import TotalSolution from '@/components/molecules/specifics/avrast/TotalSolution';
import { getPopUpModalHome, getPopUpDetailHome } from '@/services/home-banner-modal-api';

const handleGetBannerModal = async () => {
  try {
    const response = await getPopUpModalHome('Pop-Up-Awal?includeAttributes=true');
    if (response.data.contentDataList[0] && response.data.contentDataList[0].contentData.length === 0){
      const detailId = response.data.contentDataList[0].id;
      const responseDetail = await getPopUpDetailHome(detailId.toString());      
      return responseDetail;
    }
    
    throw new Error('content data list empty');
  }
  catch (error) {
    if (error instanceof Error){
      console.log('error message: ', error.message);
    }
    return null;
  }
}

const Avrist = async () => {
  const responseBannerModal = await handleGetBannerModal();
  
  return (
    <div className="flex flex-col items-center justify-center bg-purple_light_bg">
      <BannerAvrast />
      <TotalSolution />
      <CompanySection />
      <LayananNasabah />
      <HomeBannerModal response={responseBannerModal}/>
    </div>
  );
};

export default Avrist;
