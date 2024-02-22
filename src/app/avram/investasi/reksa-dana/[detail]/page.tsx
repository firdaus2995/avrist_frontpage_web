import React from 'react';

import Disclaimer from '@/components/molecules/specifics/avram/_investasi/Disclaimer';
import FiturTableLike from '@/components/molecules/specifics/avram/_investasi/FiturTableLike';
import SquaresDownload from '@/components/molecules/specifics/avram/_investasi/SquaresDownload';
import Vendor from '@/components/molecules/specifics/avram/_investasi/Vendor';
import DetailHeader from '@/components/molecules/specifics/avram/DetailHeader/DetailHeader';

export const generateStaticParams = () => {
  return [{ detail: 'blue-safir' }];
};

const ReksaDana = ({ params }: { params: { detail: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-purple_dark/[.03]">
      {/* DETAIL HEADER */}
      <DetailHeader title="Avrist Blue Savir" />

      <div className="flex flex-col items-center">
        <h1>INI ADALAH PAGE INVESTASI - DETAIL REKSA DANA</h1>
        <h3>{params.detail}</h3>
      </div>

      {/* TABLE */}
      <FiturTableLike />

      {/* SQUARES DOWNLOAD */}
      <SquaresDownload />

      {/* DISCLAIMER */}
      <Disclaimer />

      {/* VENDORS */}
      <Vendor />
    </div>
  );
};

export default ReksaDana;
