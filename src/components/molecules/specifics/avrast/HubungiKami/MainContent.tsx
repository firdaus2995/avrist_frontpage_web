'use client';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  RequirementForm,
  FeedbackForm,
  BranchOffice
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

  const HighOffice = useMemo(() => dynamic(
    () => import('./MainContentComponent/HighOffice').then(mod => mod.default),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), []);

  const onClickMarker = (lat: number, lng: number) => {
    if (lat !== 0 || lng !== 0) {
      setMapCenter([lat, lng]);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-purple_superlight flex flex-col sm:gap-[4rem] xs:gap-[2.25rem] xs:py-[3.125rem] xs:px-[2rem] sm:p-0 sm:px-[8.5rem] sm:py-[6.25rem] xs:px-[1.3125rem]">
        <div className="mx-[2rem] md:mx-[8.5rem]">
          <p className="font-karla font-bold sm:text-[3.5rem] xs:text-[2.25rem] text-center text-purple_dark xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Kebutuhan Anda adalah prioritas kami
          </p>
        </div>
        <RequirementForm Id={formId} />
        {/* <ContactSupport /> */}
      </div>
      <FeedbackForm Id={formSaranId} />
      <div className="bg-purple_superlight sm:px-[8.5rem] sm:pt-[6.25rem] sm:pb-[1.5rem] xs:pb-[2.25rem] xs:px-[2rem] xs:pt-[3.125rem]">
        <HighOffice mapCenter={mapCenter} branchData={branchData} onChangeCenter={onClickMarker} />
      </div>
      <div className="bg-purple_superlight sm:px-[8.5rem] sm:pb-[1.5rem] xs:pb-[2.25rem] xs:px-[2rem]">
        <BranchOffice onChangeCenter={onClickMarker} branchData={branchData} />
      </div>
      <RoundedFrameBottom frameColor="bg-purple_superlight" />
    </div>
  );
};

export default MainContent;
