'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FundListTabItemType } from '../../types';
import styles from './styles.module.css';
import Button from '@/components/atoms/Button/Button';

type TabHeaderProps = {
  items: FundListTabItemType[];
  category: string;
};

const TabHeader: React.FC<TabHeaderProps> = ({ items, category }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabHeaderClick = (newTarget: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('cat', newTarget);
    params.set('page', '1');
    router.push(`${pathname}?${params}`);
  };

  return (
    <div
      className={`flex justify-between gap-2 overflow-auto ${styles['tab-header-container']}`}
    >
      {items.map((item, index) => (
        <Button.Radio
          onClick={() => handleTabHeaderClick(item)}
          customButtonClass="flex-grow whitespace-nowrap"
          key={index}
          isActive={category === item}
        >
          {item}
        </Button.Radio>
      ))}
    </div>
  );
};

export default TabHeader;
