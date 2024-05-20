import Image from 'next/image';
import Link from 'next/link';
import contact from '@/assets/images/common/contacts.svg';
import hospital from '@/assets/images/common/hospital.svg';
import ask from '@/assets/images/common/message.svg';
import paper from '@/assets/images/common/procedure.svg';

export const InformationAvrastFooter = () => {
  return (
    <div className="flex flex-col self-stretch items-center justify-center py-24 gap-16 bg-purple_superlight relative">
      <div className="grid sm:grid-cols-4 xs:grid-cols-1 gap-6 w-full sm:px-[8.5rem] xs:px-[1.5rem]">
        <Link
          href={'/klaim-layanan/layanan/kelola-polis'}
          className="bg-white p-[1.5rem] rounded-3xl border border-gray_light font-opensans font-bold text-[1.5rem] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={contact} alt="contact" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[1.5rem]">Kelola Polis</p>
            <p className="text-purple_dark">Pengkinian Data</p>
          </div>
        </Link>
        <Link
          href={'/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan'}
          className="bg-white p-[1.5rem] rounded-3xl border border-gray_light font-opensans font-bold text-[1.5rem] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={hospital} alt="hospital" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[1.5rem]">Rumah Sakit Rekanan</p>
          </div>
        </Link>
        <Link
          href={'/tanya-avrista'}
          className="bg-white p-[1.5rem] rounded-3xl border border-gray_light font-opensans font-bold text-[1.5rem] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={ask} alt="ask" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[1.5rem]">Tanya Avrista</p>
            <p className="text-purple_dark">Lebih Lanjut</p>
          </div>
        </Link>
        <Link
          href={'/klaim-layanan/layanan/penanganan-pengaduan'}
          className="bg-white p-[1.5rem] rounded-3xl border border-gray_light font-opensans font-bold text-[1.5rem] text-center flex flex-col justify-between items-center cursor-pointer"
        >
          <Image src={paper} alt="paper" height={100} width={100} />
          <div className="pb-5 h-full flex flex-col items-center justify-between">
            <p className="mt-[1.5rem]">Prosedur Pengaduan</p>
            <p className="text-purple_dark">Lihat Prosedur</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
