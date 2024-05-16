'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import IMPORTANT_DOCUMENT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-1.svg';
import CHECK_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-2.svg';
import CHAT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-3.svg';

const mockData = [
  {
    id: '1',
    title: 'Hak - Hak Nasabah',
    icon: IMPORTANT_DOCUMENT_ICON,
    btn: 'Selengkapnya',
    link: '/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi'
  },
  {
    id: '2',
    title: 'Prosedur dan Form Pengaduan',
    icon: CHECK_ICON,
    btn: 'Selengkapnya',
    link: '/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi'
  },
  {
    id: '3',
    title: 'Saran dari Anda',
    icon: CHAT_ICON,
    btn: 'Selengkapnya',
    link: '/hubungi-kami'
  }
];

export const ContentCard = () => {
  return (
    <div className="mt-[64px] w-full grid sm:grid-cols-3 xs:grid-cols-1 gap-[24px]">
      {mockData.map((i) => (
        <div
          key={i.id}
          className="flex flex-col grow items-center cursor-pointer border-[1px] border-gray_light rounded-xl overflow-hidden pt-[24px] px-[24px] pb-[36px] border-b-8 border-b-purple_dark"
        >
          <Image alt={i.title} src={i.icon} className="w-[100px] h-[100px]" />
          <div className="flex flex-col justify-between grow">
            <h5 className="mb-2 sm:text-[32px] xs:text-[20px] tracking-tight font-bold font-karla text-[32px] text-gray_body mt-5 text-center">
              {i.title}
            </h5>
            <Link href={i.link}>
              <div
                role="button"
                className=" bg-purple_dark mx-10 flex text-white font-semibold rounded-[6px] px-[20px] py-[8px] justify-center"
              >
                {i.btn}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
