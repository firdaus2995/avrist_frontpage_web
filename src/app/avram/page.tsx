'use client';

import React from 'react';

import AvramCommunity from '@/components/molecules/specifics/avram/AvramCommunity';
import News from '@/components/molecules/specifics/avram/News/News';
import ReksaDanaUnggulan from '@/components/molecules/specifics/avram/ReksaDanaUnggulan';

const Avram = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <News />
      <AvramCommunity />
      <ReksaDanaUnggulan />
    </div>
  );
};

export default Avram;
