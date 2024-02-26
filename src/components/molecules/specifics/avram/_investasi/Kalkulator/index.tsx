'use client'

import Button from "@/components/atoms/Button/Button";

const Kalkulator = () => {
  return (
    <div className='w-full flex flex-col self-stretch items-center justify-center px-20 gap-12'>
      <div className="w-full flex flex-row justify-center gap-3">
        <Button
          title="Investasi per bulan"
          customTextClass="font-semibold text-xl"
        />
        <Button
          title="Investasi satu kali"
          customTextClass="font-semibold text-xl"
        />
      </div>
    </div>
  )
};

export default Kalkulator;
