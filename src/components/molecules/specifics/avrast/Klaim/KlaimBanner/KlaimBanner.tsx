'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';

interface KlaimBannerComponentProps {
  data: dataKlaim;
}

const KlaimBanner: React.FC<KlaimBannerComponentProps> = ({ data }) => {
  return (
    <div className="flex w-full">
      <div className="w-full h-[640px] flex md:items-center xs:items-start justify-center relative bg-white rounded-t-[60px] md:-mt-28 xs:-mt-20 relative">
        <Image
          className="bg-purple_dark absolute bottom-0 object-bottom rounded-t-[60px]"
          src={data!.bannerImageUrl || ''}
          alt={data!.bannerAltText || ''}
          width={0}
          height={0}
          layout="fill"
          objectFit="cover"
          object-position="top"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default KlaimBanner;
