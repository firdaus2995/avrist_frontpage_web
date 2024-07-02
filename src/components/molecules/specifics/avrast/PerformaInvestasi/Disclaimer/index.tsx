import React from 'react';
import Image from 'next/image';
import INFO_RED from '@/assets/symbols/info-red-symbol.svg';

const Disclaimer = () => {
  return (
    <>
      <div className="w-full rounded-t-xl border border-gray_light px-6 pt-6 pb-[36px] bg-purple_light_bg flex flex-col gap-6">
        <div className="flex flex-row gap-2">
          <Image alt="info" src={INFO_RED} />
          <h1 className="font-karla font-bold text-xl sm:[24px] leading-[28.8px] -tracking-[0.72px]">
            Disclaimer
          </h1>
        </div>

        <p className="text-sm">
          Nilai investasimu dapat bergerak naik atau turun. Ini artinya kamu
          bisa mendapatkan jumlah lebih sedikit atau lebih besar dari yang kamu
          investasikan. Jadi, sebelum memilih jenis investasi, pastikan kamu
          memiliki semua informasi yang kamu butuhkan.
        </p>
      </div>
      <div className="w-full rounded-b-2xl h-[8px] bg-red_error"></div>
    </>
  );
};

export default Disclaimer;
