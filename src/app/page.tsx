import React from 'react';
import BannerAvrast from '@/components/molecules/specifics/avrast/Banner/Banner';
import CompanySection from '@/components/molecules/specifics/avrast/CompanySection';
import LayananNasabah from '@/components/molecules/specifics/avrast/LayananNasabah';
import { HomeBannerModal } from '@/components/molecules/specifics/avrast/Modal';
import TotalSolution from '@/components/molecules/specifics/avrast/TotalSolution';
import { getPopUpModalHome } from '@/services/home-banner-modal-api';

const handleGetBannerModal = async () => {
  try {
    const response = await getPopUpModalHome('Pop-Up-Awals?includeAttributes=true');
    return response;
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
