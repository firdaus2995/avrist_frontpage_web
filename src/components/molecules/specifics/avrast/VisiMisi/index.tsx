import React, { useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Plus from '@/assets/images/common/+.svg';
import Minus from '@/assets/images/common/-.svg';

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
      {data.map((val, idx) => (
        <div
          key={idx}
          className="p-10 flex flex-col gap-4 border border-b-8 border-b-purple_dark rounded-xl"
        >
          <div className="flex flex-row justify-between gap-4 items-center">
            <div className="flex flex-row gap-4 items-center">
              <Image
                src={val.icon}
                className="xs:w-[2.25rem] md:w-[5rem]"
                alt="logo"
              />
              <p className="xs:text-[2.25rem] md:text-[3.5rem] font-bold">
                {val.title}
              </p>
            </div>
            {Array.isArray(val.desc) && isExpanded ? (
              <Image
                role="button"
                onClick={() => setIsExpanded(false)}
                src={Minus}
                className="w-5"
                alt="minus"
              />
            ) : null}
          </div>
          {!Array.isArray(val.desc) ? (
            <p className="text-[1.25rem] md:text-[2.25rem] font-light">
              {val.desc}
            </p>
          ) : !isExpanded ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row xs:gap-[2rem] md:gap-[4.75rem] items-center">
                <p className="text-[64px] font-semibold text-purple_dark">1</p>
                <p className="text-[1.25rem] md:text-[2.25rem]">
                  {val.desc[0]}
                </p>
              </div>
              <div
                role="button"
                onClick={() => setIsExpanded(true)}
                className="w-full flex flex-row gap-2 items-end justify-end"
              >
                <p className="font-semibold text-purple_dark">
                  Lihat Lebih Lanjut
                </p>
                <Image src={Plus} className="w-5" alt="plus" />
              </div>
            </div>
          ) : (
            val.desc.map((value, index) => (
              <div
                key={index}
                className="p-10 flex flex-col gap-4 border border-b-8 border-b-purple_dark rounded-xl"
              >
                <div className="flex xs:flex-col md:flex-row items-center w-full text-center">
                  <span className="w-[5rem]">
                    <p className="text-[64px] font-semibold text-purple_dark">
                      {index + 1}
                    </p>
                  </span>

                  <p className="text-[1.25rem] md:text-[2.25rem]">{value}</p>
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
