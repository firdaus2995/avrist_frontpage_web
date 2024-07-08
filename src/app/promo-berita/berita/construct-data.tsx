import React from 'react';
import Image from 'next/image';
import ExternalLink from '@/assets/images/external-link.svg';

const RenderData = (label: any, link: any) => (
  <a className="flex" href={link} target="_blank">
    <p className="font-semibold text-[14px] text-purple_dark">{label}</p>
    <Image
      src={ExternalLink}
      width={16}
      height={16}
      alt="external-link"
      className="ml-1"
    />
  </a>
);

export const constructData = (label: any, link: any) => {
  return RenderData(label, link);
};
