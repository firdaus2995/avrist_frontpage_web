import Image from 'next/image';
import { Card } from './Card';
import { CardAddress } from './CardAddress';
import maps from '@/assets/images/avrast/hubungi-kami/high-office.svg';


export const HighOffice = () => {
  return (
    <div className="mt-[100px]">
      <p className="font-karla font-bold text-[56px] text-center text-purple_dark">
        Lokasi Kantor Pusat Avrist Assurance
      </p>
      <Card className="bg-white h-[601px] mx-[136px] mt-[64px] p-[24px] grid grid-cols-3 gap-6">
        <CardAddress
          title="Kantor Pusat Jakarta"
          address="World Trade Center II Lt. 7 & 8, Jl. Jenderal Sudirman Jl. Setiabudi Raya Kav 29-31, RT.8/RW.3"
          workHour="Senin-Jumat 10.00 - 14.00 WIB"
          contact="(021) 5789 8188"
        />
        <Card className="col-span-2">
          <Image src={maps} className="w-full h-full object-none" alt="maps"/>
        </Card>
      </Card>
    </div>
  );
};
