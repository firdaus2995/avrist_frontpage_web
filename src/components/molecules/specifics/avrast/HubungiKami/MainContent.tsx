'use client';
import { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  RequirementForm,
  FeedbackForm,
  BranchOffice,
  ContactSupport
} from './MainContentComponent';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';

type Props = {
  formId?: string;
  formSaranId?: string;
  branchData?: any;
};

export const MainContent = (props: Props) => {
  const { formId, formSaranId, branchData } = props;
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -6.214663280751351, 106.82071668189862
  ]);
  const HighOffice = useMemo(
    () =>
      dynamic(
        () =>
          import('./MainContentComponent/HighOffice').then(
            (mod) => mod.default
          ),
        {
          loading: () => <p>A map is loading</p>,
          ssr: false
        }
      ),
    []
  );

  const onClickMarker = (lat: number, lng: number) => {
    if (lat !== 0 || lng !== 0) {
      setMapCenter([lat, lng]);
      window.scrollTo({ top: 3700, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-purple_superlight flex flex-col gap-[5rem] xs:pb-[3.125rem] xs:pt-[5rem] xs:px-[2rem] sm:p-0 sm:px-[8.5rem] sm:pt-[5rem] sm:pb-[100px] xs:px-[1.3125rem]">
        <div className="">
          <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px] sm:leading-[67.2px] xs:leading-[43.2px]">
            Kebutuhan Anda adalah prioritas kami
          </p>
        </div>
        <RequirementForm Id={formId} />
        <ContactSupport />
      </div>
      <FeedbackForm Id={formSaranId} />
      <div className="bg-purple_superlight sm:px-[8.5rem] sm:pt-[5rem] sm:pb-[1.5rem] xs:pb-[2.25rem] xs:px-[2rem] xs:pt-[5rem]">
        <HighOffice
          mapCenter={mapCenter}
          branchData={branchData}
          onChangeCenter={onClickMarker}
        />
      </div>
      <div className="bg-purple_superlight sm:px-[8.5rem] sm:pb-[1.5rem] xs:pb-[2.25rem] xs:px-[2rem]">
        <BranchOffice onChangeCenter={onClickMarker} branchData={branchData} />
      </div>
      <RoundedFrameBottom frameColor="bg-purple_superlight" />
    </div>
  );
};

export default MainContent;
