import Image from 'next/image';
import Link from 'next/link';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import EMAIL from '@/assets/images/common/email.svg';
import MESSAGE from '@/assets/images/common/message.svg';

export const CardMenuFooter = () => {
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
          href="tel:021-5789-8188"
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-center items-center cursor-pointer"
        >
          <Image
            src={CUSTOMER_SERVICE}
            alt="contact"
            height={100}
            width={100}
          />
          <p className="mt-[24px]">Layanan Nasabah</p>
          <p className="text-purple_dark">021 5789 8188</p>
        </Link>
        <Link
          href="/tanya-avrista"
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-center items-center cursor-pointer"
        >
          <Image src={MESSAGE} alt="hospital" height={100} width={100} />
          <p className="mt-[24px]">Tanya Avrista</p>
          <p className="text-purple_dark">Lebih Lanjut</p>
        </Link>
        <Link
          href="mailto:customer-service@avrist.com"
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-center items-center cursor-pointer"
        >
          <Image src={EMAIL} alt="ask" height={100} width={100} />
          <p className="mt-[24px]">Tanya Lewat Email</p>
          <p className="text-purple_dark">Kirim Email</p>
        </Link>
        <Link
          href="avrast/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi"
          className="bg-white p-[24px] rounded-3xl border border-gray_light font-opensans font-bold text-[24px] text-center flex flex-col justify-center items-center cursor-pointer"
        >
          <Image src={DOCUMENT_SEARCH} alt="paper" height={100} width={100} />
          <p className="mt-[24px]">Prosedur Pengaduan</p>
          <p className="text-purple_dark">Lihat Prosedur</p>
        </Link>
      </div>
    </div>
  );
};
