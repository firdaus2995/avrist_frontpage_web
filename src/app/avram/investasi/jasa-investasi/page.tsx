import React from 'react';

import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import DetailHeader from '@/components/molecules/specifics/avram/DetailHeader/DetailHeader';
import { ParamsProps } from '@/utils/globalTypes';

const JasaInvestasi: React.FC<ParamsProps> = ({ searchParams }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-purple_dark/[.03]">
      <DetailHeader title="Jasa Investasi" />
      {/* Main Content */}
      <div className="max-w-[100rem] w-full mx-auto p-8">
        <CustomerFund searchParams={searchParams} />
      </div>
    </div>
  );
};

export default JasaInvestasi;
