import React from 'react';

import AvramCommunity from '@/components/molecules/specifics/avram/AvramCommunity';
import Banner from '@/components/molecules/specifics/avram/Banner/Banner';
import LeadGenerator from "@/components/molecules/specifics/avram/LeadGenerator/LeadGenerator";
import News from '@/components/molecules/specifics/avram/News/News';
import Notification from '@/components/molecules/specifics/avram/Notification';
import ReksaDanaUnggulan from '@/components/molecules/specifics/avram/ReksaDanaUnggulan';

const Avram = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner />
      <Notification />
      <LeadGenerator />
      <News />
      <AvramCommunity />
      <ReksaDanaUnggulan />
    </div>
  )
};

export default Avram;
