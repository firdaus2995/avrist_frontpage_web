'use client';

import React from 'react';
import Image from 'next/image';
import Input from '@/components/atoms/Input';

const SearchTerm = ({ bannerImage }: { bannerImage: string }) => {
  return (
    <div className="z-[1] w-full bg-purple_dark -mt-1">
      <div className="w-full h-[640px] flex items-center absolute">
        <div className="w-full h-full grid sm:grid-cols-2 xs:grid-cols-1">
          <span />
          <div className="flex flex-col xs:justify-center sm:gap-1 xs:gap-[36px] xs:px-[36px] sm:px-0 sm:pb-0 xs:pb-[4rem]">
            <div>
              <p className="font-karla xs:text-[48px] sm:text-5xl font-extrabold text-white">
                Halo, apa kabar?
              </p>
              <p className="font-karla xs:text-[48px] sm:text-5xl text-white">
                Bagaimana Avrista bisa membantumu?
              </p>
            </div>
            <div className="w-full sm:mt-2 mt-6">
              <Input
                customInputClass="xs:w-full sm:w-[72%] grow !bg-gray_bglightgray !border-none px-[16px] py-[12px] text-[16px] leading-[1.4rem]"
                placeholder="Ketik kata kunci (misal: promosi berlangsung)"
              />
            </div>
          </div>
        </div>
      </div>
      <Image
        className="rounded-t-[65px] w-full sm:object-cover xs:object-none xs:object-right sm:object-center h-[640px]"
        alt="gambar-produk-individu"
        src={bannerImage}
        width={0}
        height={0}
      />
    </div>
  );
};

export default SearchTerm;
