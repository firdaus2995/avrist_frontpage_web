'use client';
import React from 'react';
import Image from 'next/image';

const SearchTerm = ({
  bannerImage = '',
  onSearch,
  loading
}: {
  bannerImage?: string;
  onSearch: any;
  loading: boolean;
}) => {
  const [keyword, setKeyword] = React.useState('');
  return (
    <div className="z-[1] w-full bg-purple_dark -mt-[3.125rem]">
      <div className="w-full h-[20rem] md:h-[40rem] flex items-center absolute">
        <div className="w-full h-full grid sm:grid-cols-2 xs:grid-cols-1">
          <span />
          <div className="flex flex-col xs:justify-center sm:gap-1 xs:gap-[36px] xs:px-[36px] sm:px-0 sm:pb-0 xs:pb-[4rem]">
            <div>
              <p className="font-karla text-xl lg:text-5xl font-extrabold text-white text-shadow-h1 sm:leading-[57.6px] tracking-[0.03em]">
                Halo, apa kabar?
              </p>
              <p className="font-karla text-xl lg:text-5xl text-white text-shadow-h1 sm:leading-[57.6px] tracking-[0.03em]">
                Bagaimana Avrista bisa membantumu?
              </p>
            </div>
            <div className="w-full sm:mt-2 mt-6">
              <input
                className="xs:w-full sm:w-[72%] grow !bg-gray_bglightgray !border-none px-[16px] py-[12px] text-[16px] leading-[1.4rem]"
                placeholder="Ketik kata kunci (misal: promosi berlangsung)"
                onChange={(e: any) => setKeyword(e.target.value)}
                value={loading ? 'Loading data...' : keyword}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' || e.keyCode === 13) {
                    onSearch(
                      'List-Pertanyaan-dan-Jawaban-Tanya-Avrista',
                      keyword
                    );
                  }
                }}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
      {bannerImage !== '' && (
        <Image
          className="rounded-t-[65px] w-full sm:object-cover xs:object-none xs:object-right sm:object-center h-[640px]"
          alt="gambar-produk-individu"
          src={bannerImage}
          width={0}
          height={0}
        />
      )}
    </div>
  );
};

export default SearchTerm;
