'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { handleVerifySubscribe } from '@/services/subscribe-service.api';

const message = {
  success: {
    title: 'Subsribe Berhasil',
    subtitle:
      'Selamat, Anda telah berlangganan berita dari Avrist Life Insurance.'
  },
  error: {
    title: 'Subscribe Gagal',
    subtitle:
      'Maaf, Anda belum berhasil berlangganan berita dari Avrist Life Insurance. Pastikan link verifikasi sudah benar dan link tersebut belum expired.'
  },
  internalError: {
    title: 'Subscribe Gagal',
    subtitle:
      'Maaf, telah terjadi kesalahan dalam subscribe, silahkan coba beberapa saat lagi.'
  }
};

const Verification = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [responseCode, setResponseCode] = useState(0);
  const handleVerify = async () => {
    try {
      const response = await handleVerifySubscribe(code ?? '');
      if (response?.code === 200) {
        setResponseCode(200);
      } else if (response?.code === 500) {
        setResponseCode(500);
      } else {
        setResponseCode(response?.code);
      }
    } catch (err) {
      console.error(err);
      setResponseCode(400);
    }
  };

  useEffect(() => {
    if (code) {
      handleVerify();
    } else {
      setResponseCode(400);
    }
  }, [code]);

  return responseCode !== 0 ? (
    <div>
      <div className="my-[96px] w-full flex flex-col items-center xs:max-md:pt-[50px] xs:max-md:pb-[100px] px-[371px]">
        <div className="flex flex-col items-center justify-center gap-[36px]">
          <p className="font-karla font-bold md:text-[80px] -tracking-[0.04em] leading-[60px] xs:text-[60px] text-purple_verylight text-center mb-[4px]">
            {responseCode === 200
              ? message.success.title
              : responseCode === 500
                ? message.internalError.title
                : message.error.title}
          </p>
          <div className="w-full text-center">
            <p className="font-karla font-bold text-[24px] leading-[28.8px] -tracking-[0.03em]">
              {responseCode === 200
                ? message.success.subtitle
                : responseCode === 500
                  ? message.internalError.subtitle
                  : message.error.subtitle}
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
  ) : null;
};

export default Verification;
