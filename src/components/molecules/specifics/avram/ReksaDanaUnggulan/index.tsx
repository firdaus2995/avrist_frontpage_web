import React from "react";

import Image from "next/image";

import BLUE_SAFIR from "@/assets/images/blue-safir.png";
import MediumTag from "@/components/atoms/Tag/MediumTag";

const ReksaDanaUnggulan = () => {
  const reksaDanaLength: number = 5;

  return (
    <div className="flex flex-col self-stretch items-center justify-center py-32 px-20 gap-16 bg-purple_light_bg">
      <p className="text-5xl text-gray_black_dark">Reksa Dana <span className="font-bold text-purple_dark">Unggulan</span></p>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: reksaDanaLength }, (_, index: number) => (
          <div key={index} className="w-96 p-6 flex flex-col gap-4 rounded-xl bg-white">
            <Image height={100} width={100} alt="loop-image" src={BLUE_SAFIR} />
            <p className="font-bold text-2xl">Avrist Blue Safir</p>
            <p>Melangkah Lebih Jauh dengan Keamanan dan Pertumbuhan Finansial Bersama Avrist Blue Safir</p>
            <div className="flex flex-row gap-2">
              <MediumTag title="Reksa Dana" />
              <MediumTag title="Investasi" />
            </div>
          </div>
        ))}
      </div>
    </div>

  )
};

export default ReksaDanaUnggulan;
