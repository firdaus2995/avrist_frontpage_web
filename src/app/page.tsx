'use client';
import React, { useState } from 'react';
import BannerAvrast from '@/components/molecules/specifics/avrast/Banner/Banner';
import CompanySection from '@/components/molecules/specifics/avrast/CompanySection';
import LayananNasabah from '@/components/molecules/specifics/avrast/LayananNasabah';
import { HomeBannerModal } from '@/components/molecules/specifics/avrast/Modal';
import TotalSolution from '@/components/molecules/specifics/avrast/TotalSolution';

const Avrist = () => {
  const [popupUrl, setPopupUrl] = useState<string>('');
  return (
    <div className="flex flex-col items-center justify-center bg-purple_light_bg">
      <BannerAvrast onPopUpURL={(val) => setPopupUrl(val)} />
      <TotalSolution />
      <CompanySection />
      <LayananNasabah />
      <HomeBannerModal popupUrl={popupUrl} />
    </div>
  );
};

export default Avrist;
