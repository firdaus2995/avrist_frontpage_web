import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';

export const BeAgent = () => {
  return (
    <div className="flex flex-1 border-[1px] mt-[64px] mb-[26px] rounded-xl justify-between items-center">
      <span className="font-opensans text-purple_dark font-bold text-[24px] mx-[24px] my-[29px]">
        Tertarik menjadi tenaga pemasar Avrist Assurance
      </span>
      <Link href={'/tentang-avrist-life/tentang-avrist-life?tab=Karir+Bersama+Avrist'}>
        <Button
          title="Selengkapnya"
          customButtonClass="bg-purple_dark mr-[24px]"
          customTextClass="text-white"
        />
      </Link>
    </div>
  );
};
