import React, { useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Chevron from '@/assets/images/common/chevron-right-purple.svg';

interface IDataArray {
  title: string;
  icon: StaticImport;
  desc: string | string[];
}

interface IVisiMisi {
  data: IDataArray[];
}

const VisiMisi = ({ data }: IVisiMisi) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-[1.5rem] font-karla">
      {data && data.map((val, idx) => (
        <div
          key={idx}
          className="p-10 flex flex-col gap-4 border border-b-8 border-b-purple_dark rounded-xl"
        >
          <div className="flex flex-row justify-between gap-4 items-center">
            <div className="flex flex-row gap-4 items-center">
              <Image
                src={val?.icon}
                className="xs:w-[2.25rem] md:w-[5rem]"
                alt="logo"
              />
              <p className="sm:text-5xl xs:text-3xl font-bold xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
                {val?.title}
              </p>
            </div>
            {Array.isArray(val?.desc) && isExpanded ? (
              <Image
                role="button"
                onClick={() => setIsExpanded(false)}
                src={Chevron}
                className="w-5 -rotate-[90deg]"
                alt="minus"
              />
            ) : null}
          </div>
          {!Array.isArray(val?.desc) ? (
            <p className="xs:text-xl md:text-[1.5rem] font-light -tracking-[1.08px]">
              {val?.desc}
            </p>
          ) : !isExpanded ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row xs:gap-[2rem] md:gap-[3.75rem] items-center">
                <p className="xs:text-[4rem] md:text-[5rem] font-bold text-purple_light font-karla">
                  1
                </p>
                <p className="xs:text-xl md:text-[1.5rem] font-light -tracking-[1.08px]">
                  {val?.desc[0]}
                </p>
              </div>
              <div
                role="button"
                onClick={() => setIsExpanded(true)}
                className="w-full flex flex-row gap-2 items-center justify-end"
              >
                <p className="text-2xl font-semibold text-purple_dark font-karla">
                  Lihat Lebih Lanjut
                </p>
                <Image
                  src={Chevron}
                  className="w-5 rotate-[90deg]"
                  alt="plus"
                />
              </div>
            </div>
          ) : (
            val?.desc?.map((value, index) => (
              <div
                key={index}
                className="px-[1.5rem] pb-[2.25rem] pt-[1rem] flex flex-col gap-4 border border-b-8 border-b-purple_dark rounded-xl"
              >
                <div className="flex xs:flex-col md:flex-row items-center w-full xs:text-center md:text-start">
                  <span className="w-[7rem]">
                    <p
                      className={`xs:text-[4rem] md:text-[5rem] font-bold text-purple_light font-karla ${index + 1 === 1 ? 'md:pl-4' : ''}`}
                    >
                      {index + 1}
                    </p>
                  </span>

                  <span className="w-full">
                    <p className="xs:text-xl md:text-[1.5rem] font-light -tracking-[1.08px]">
                      {value}
                    </p>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default VisiMisi;
