import React from 'react';

import { IIcon } from '@/components/atoms/Icon';

const Clock: React.FC<IIcon> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill="none"
      viewBox="0 0 25 25"
    >
      <path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12.5 22.5c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
      ></path>
      <path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12.5 6.5v6l4 2"
      ></path>
    </svg>
  );
};

export default Clock;
