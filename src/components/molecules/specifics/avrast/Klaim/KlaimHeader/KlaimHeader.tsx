'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';

interface IKlaimHeader {
  title: string;
  data?: dataKlaim;
}

const KlaimHeader: React.FC<IKlaimHeader> = ({ title, data }) => {
  return (
    <div className="flex w-full">
      <div className="w-full md:h-[300px] xs:h-[200px] bg-purple_dark flex md:items-center xs:items-start justify-center relative">
        <Image
          className="bg-purple_dark w-full absolute top-0 object-top"
          src={data?.titleImageUrl || '' }                
          alt={data?.titleAltText || 'banner-img'}
          layout="fill"
          width={0}
          height={0}
          objectFit="cover"
          object-position="center"
          loading="lazy"
        />
        <div className="w-full h-full mx-auto max-w-[100rem] px-8 flex md:justify-between md:justify-center xs:justify-start md:items-center items-start absolute flex-col md:flex-row flex-wrap gap-4">
          <h2 className="font-light text-[48px] md:block xs:hidden text-white">
            {title}
          </h2>
          <div className="flex flex-row divide-x gap-2 text-center h-5 text-white text-base flex-wrap md:mt-0 xs:mt-10">
            <Link href={'/'} className={'font-opensans text-white'}>
                Beranda
            </Link>
            <p className="px-2 font-semibold">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KlaimHeader;
