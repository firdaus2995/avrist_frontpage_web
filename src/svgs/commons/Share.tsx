import React from 'react';

import { IIcon } from '@/components/atoms/Icon';

const Share: React.FC<IIcon> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 8C20.1569 8 21.5 6.65685 21.5 5C21.5 3.34315 20.1569 2 18.5 2C16.8431 2 15.5 3.34315 15.5 5C15.5 6.65685 16.8431 8 18.5 8Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.5 15C8.15685 15 9.5 13.6569 9.5 12C9.5 10.3431 8.15685 9 6.5 9C4.84315 9 3.5 10.3431 3.5 12C3.5 13.6569 4.84315 15 6.5 15Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.5 22C20.1569 22 21.5 20.6569 21.5 19C21.5 17.3431 20.1569 16 18.5 16C16.8431 16 15.5 17.3431 15.5 19C15.5 20.6569 16.8431 22 18.5 22Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.08984 13.5098L15.9198 17.4898"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.9098 6.50977L9.08984 10.4898"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Share;
