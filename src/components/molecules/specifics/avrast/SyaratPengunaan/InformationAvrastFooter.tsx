import Image from 'next/image';
import Link from 'next/link';
import contact from '@/assets/images/common/contacts.svg';
import hospital from '@/assets/images/common/hospital.svg';
import ask from '@/assets/images/common/message.svg';
import paper from '@/assets/images/common/procedure.svg';

export const InformationAvrastFooter = () => {
  return (
    <div className="flex flex-col self-stretch items-center justify-center py-24 gap-16 bg-purple_superlight rounded-t-[65px] relative">
      <div className="w-full absolute z-20 top-2 h-20 bg-purple_superlight rounded-t-[65px]"></div>
      <div className="w-full flex flex-row absolute z-10 top-0 h-20 rounded-t-[65px]">
        <div className="w-1/4 h-full bg-purple_light rounded-tl-[65px]"></div>
        <div className="w-1/4 h-full bg-green_border"></div>
        <div className="w-1/4 h-full bg-orange_border"></div>
        <div className="w-1/4 h-full bg-agi_grey rounded-tr-[65px]"></div>
      </div>
      <div className="grid grid-cols-4 gap-6 w-full px-[136px]">
        <Link
          href={'/klaim-layanan/layanan/kelola-polis'}
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={contact} alt="contact" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[24px]">Kelola Polis</p>
            <p className="text-purple_dark">Pengkinian Data</p>
          </div>
        </Link>
        <Link
          href={'/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan'}
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={hospital} alt="hospital" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[24px]">Rumah Sakit Rekanan</p>
          </div>
        </Link>
        <Link
          href={'/tanya-avrista'}
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={ask} alt="ask" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[24px]">Tanya Avrista</p>
            <p className="text-purple_dark">Lebih Lanjut</p>
          </div>
        </Link>
        <Link
          href={'/klaim-layanan/layanan/penanganan-pengaduan'}
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={paper} alt="paper" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[24px]">Prosedur Pengaduan</p>
            <p className="text-purple_dark">Lihat Prosedur</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
