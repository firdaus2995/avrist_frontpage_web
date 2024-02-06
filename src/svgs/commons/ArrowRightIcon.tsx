import React from 'react';

import { IIcon } from '@/components/atoms/Icon';

const ArrowRightIcon: React.FC<IIcon> = ({
  width = 16,
  height = 16,
  color = 'white'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
