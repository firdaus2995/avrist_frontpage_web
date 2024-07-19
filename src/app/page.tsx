'use client';
import React, { useState, useEffect } from 'react';
import BannerAvrast from '@/components/molecules/specifics/avrast/Banner/Banner';
import CompanySection from '@/components/molecules/specifics/avrast/CompanySection';
import LayananNasabah from '@/components/molecules/specifics/avrast/LayananNasabah';
import { HomeBannerModal } from '@/components/molecules/specifics/avrast/Modal';
import TotalSolution from '@/components/molecules/specifics/avrast/TotalSolution';

const Avrist = () => {
  const [popupUrl, setPopupUrl] = useState<string>('');

  useEffect(() => {
    const requestLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: any = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            if (typeof window !== 'undefined') {
              localStorage.setItem('location', JSON.stringify(location));
            }
          },
          () => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('location');
            }
          }
        );
      }
    };
    requestLocation();
  }, []);
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
