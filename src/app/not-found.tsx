'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  // error avrast
  if (pathname.includes('/avrast'))
    return (
      <div>
        <div className="my-[96px] w-full flex flex-col items-center">
          <p className="font-karla font-bold text-[240px] text-purple_verylight">
            404
          </p>
          <div className="w-[324px] text-center">
            <p className="font-karla font-bold text-[24px]">
              Halaman tidak ditemukan
            </p>
            <p className="font-opensans text-[14px] mt-[12px]">
              Sepertinya halaman yang Anda cari tidak tersedia. Silakan periksa
              kembali URL atau kembali ke halaman utama kami.{' '}
            </p>
          </div>
          <Link
            href="/"
            className="bg-purple_dark text-white font-opensans font-semibold text-[20px] rounded-lg py-[18px] px-[40px] mt-[36px]"
          >
            Kembali Ke Beranda
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <div className="my-[96px] w-full flex flex-col items-center xs:max-md:pt-[50px] xs:max-md:pb-[100px] xs:max-md:px-[32px] ">
        <p className="font-karla font-bold md:text-[240px] xs:text-[120px] text-purple_verylight">
          404
        </p>
        <div className="w-[324px] text-center">
          <p className="font-karla font-bold text-[24px]">
            Halaman tidak ditemukan
          </p>
          <p className="font-opensans text-[16px] mt-[12px] font-normal">
            Sepertinya halaman yang Anda cari tidak tersedia. Silakan periksa
            kembali URL atau kembali ke halaman utama kami.{' '}
          </p>
        </div>
        <Link
          href="/"
          className="bg-purple_dark text-white font-opensans font-semibold text-[20px] rounded-lg md:py-[18px] md:px-[40px] xs:px-[40px] xs:py-[12px] mt-[36px]"
        >
          Kembali Ke Beranda
        </Link>
      </div>
    </div>
  );
}
