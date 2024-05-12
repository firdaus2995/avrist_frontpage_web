'use client';

import React from 'react';
import Image from 'next/image';
import Input from '@/components/atoms/Input';

const SearchTerm = ({ bannerImage }: { bannerImage: string }) => {
  return (
    <div className="z-[1] w-full bg-purple_dark -mt-1">
      <div className="w-full h-[640px] flex items-center absolute">
        <div className="w-full h-full grid grid-cols-2">
          <span />
          <div className="flex flex-col md:justify-center sm:gap-1 md:gap-[36px] md:ml-20 sm:ml-0">
            <div>
              <p className="font-karla md:text-[48px] 2xl:text-5xl font-extrabold text-white">
                Halo, apa kabar?
              </p>
              <p className="font-karla md:text-[48px] 2xl:text-5xl text-white">
                Bagaimana Avrista bisa membantumu?
              </p>
            </div>
            <div className="w-full sm:mt-2 mt-6">
              <Input
                customInputClass="md:w-[60%] 2xl:w-[72%] grow !bg-gray_bglightgray !border-none px-[16px] py-[12px]"
                placeholder="Ketik kata kunci (misal: promosi berlangsung)"
              />
            </div>
          </div>
        </div>
      </div>
      <Image
        className="rounded-t-[65px] w-full object-cover h-[640px]"
        alt="gambar-produk-individu"
        src={bannerImage}
        width={0}
        height={0}
      />
    </div>
  );
};

export default SearchTerm;
