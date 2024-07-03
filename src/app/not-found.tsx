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
        <div className="flex flex-col items-center justify-center gap-[36px]">
          <p className="font-karla font-bold md:text-[200px] md:leading-[240px] xs:leading-[144px] -tracking-[0.04em] xs:text-[120px] text-purple_verylight">
            404
          </p>
          <div className="w-[324px] text-center">
            <p className="font-karla font-bold text-[24px] leading-[28.8px] -tracking-[0.03em]">
              Halaman tidak ditemukan
            </p>
            <p className="font-opensans text-[16px] mt-[12px] font-normal leading-[22.4px]">
              Sepertinya halaman yang Anda cari tidak tersedia. Silakan periksa
              kembali URL atau kembali ke halaman utama kami.{' '}
            </p>
          </div>
          <Link
            href="/"
            className="bg-purple_dark text-white font-opensans font-semibold text-xl rounded-lg py-[12px] px-[40px]"
          >
            Kembali Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
