import React from 'react';

import FundListItem from './components/FundListItem';
import SAMPLE_DATA from './dummy-data.json';
import styles from './styles.module.css';
import { FundListTabItemType, FundListItemType } from './types';
import Button from '@/components/atoms/Button/Button';

const MutualFundList = async () => {
  const getFundListTabItem = async () => {
    // Simulating the process to get data
    return new Promise<FundListTabItemType[]>((resolve) => {
      setTimeout(() => {
        resolve(SAMPLE_DATA['tabs-list']);
      }, 1000);
    });
  };

  const getFundListItems = async (type?: string) => {
    return new Promise<FundListItemType[]>((resolve) => {
      setTimeout(() => {
        const allData = SAMPLE_DATA['fund-list'] as FundListItemType[];
        if (type) {
          resolve(allData.filter((item) => item.type === type));
        } else {
          resolve(allData);
        }
      }, 1000);
    });
  };

  const tabs = await getFundListTabItem();
  const fundListItems = await getFundListItems();

  return (
    <div className="bg-white p-9 rounded-md shadow-lg flex flex-col gap-4">
      {/* Tab Header */}
      <div
        className={`flex justify-between gap-2 overflow-auto ${styles['tab-header-container']}`}
      >
        {tabs.map((item, index) => (
          <Button.Radio
            customButtonClass="flex-grow whitespace-nowrap"
            key={index}
          >
            {item}
          </Button.Radio>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {fundListItems.map((item, index) => (
          <FundListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MutualFundList;
