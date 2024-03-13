import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/atoms/Button/Button';

const buttonList = [
  'Informasi Nasabah',
  'Rumah Sakit Rekanan',
  'Formulir & Buku Panduan',
  'Performa Investasi'
];
const ButtonMenu = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get('tab') ?? '';

  return (
    <div className="grid gap-[12px] grid-cols-4">
      {buttonList.map((i) => (
        <Link
          href={{
            pathname: '/avrast/klaim-layanan/layanan',
            query: { tab: i }
          }}
          scroll={false}
          key={i}
        >
          <Button
            key={i}
            title={i}
            customButtonClass={`w-full flex-1 h-full ${params === i ? 'bg-purple_dark' : ''}`}
            customTextClass={`${params === i ? 'text-white' : ''}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default ButtonMenu;
