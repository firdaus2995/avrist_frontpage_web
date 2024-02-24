import React from 'react';
import { IIcon } from '@/components/atoms/Icon';

const CalculatorIcon: React.FC<IIcon> = ({ width, height, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      d="M36 4H12C9.79086 4 8 5.79086 8 8V40C8 42.2091 9.79086 44 12 44H36C38.2091 44 40 42.2091 40 40V8C40 5.79086 38.2091 4 36 4Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 12H32M32 28V36M32 20H32.02M24 20H24.02M16 20H16.02M24 28H24.02M16 28H16.02M24 36H24.02M16 36H16.02"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CalculatorIcon;
