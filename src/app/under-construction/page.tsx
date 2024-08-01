'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div className="xs:py-[50px] xs:pb-[100px] xs:px-[32px] sm:py-[100px] sm:px-[136px] w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-[36px]">
          <p className="font-karla font-extrabold md:text-[80px] xs:text-[60px] md:leading-[80px] xs:leading-[60px] -tracking-[0.04em] text-purple_verylight text-center">
            Under Construction
          </p>
          <div className="text-center">
            <p className="font-karla font-bold text-[24px] leading-[28.8px] -tracking-[0.03em]">
              Halaman dalam proses pembuatan
            </p>
            <p className="font-opensans text-[16px] mt-[12px] font-normal leading-[22.4px]">
              Sepertinya halaman yang Anda cari belum tersedia. Silakan periksa
              kembali URL atau kembali ke halaman utama kami.
            </p>
          </div>
          <Link
            href="/"
            className="bg-purple_dark hover:bg-purple_light text-white font-opensans font-semibold text-xl rounded-lg py-[12px] px-[40px]"
          >
            Kembali Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
