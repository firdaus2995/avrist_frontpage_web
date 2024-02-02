import React from 'react';

import { IIcon } from '@/components/atoms/Icon';

const HelpCircle = (props: IIcon) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_756_7281)">
        <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.5752 7.49999C7.77112 6.94304 8.15782 6.47341 8.66682 6.17426C9.17583 5.87512 9.77427 5.76577 10.3562 5.86558C10.9381 5.96539 11.4659 6.26792 11.8461 6.71959C12.2263 7.17126 12.4344 7.74292 12.4335 8.33332C12.4335 9.99999 9.93353 10.8333 9.93353 10.8333" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14.1666H10.0083" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_756_7281">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default HelpCircle;
