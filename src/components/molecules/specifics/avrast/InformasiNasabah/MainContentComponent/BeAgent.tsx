import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';

export const BeAgent = () => {
  return (
    <div className="flex flex-1 border-[1px] mt-[4rem] sm:flex-row xs:flex-col rounded-xl justify-between items-start p-[1.5rem] gap-[1.5rem]">
      <span className="font-opensans text-purple_dark font-bold text-[1.5rem]">
        Tertarik menjadi tenaga pemasar Avrist Assurance
      </span>
      <Link href={'/tentang-avrist-life/tentang-avrist-life/tabs/karir/detail'}>
        <Button
          title="Selengkapnya"
          customButtonClass="bg-purple_dark hover:bg-purple_light mr-[1.5rem]"
          customTextClass="text-white text-[1rem]"
        />
      </Link>
    </div>
  );
};
