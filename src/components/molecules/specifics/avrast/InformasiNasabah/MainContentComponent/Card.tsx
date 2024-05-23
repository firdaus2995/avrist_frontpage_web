import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CONTACTS from '@/assets/images/common/contacts.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import PERSON from '@/assets/images/common/person.svg';

const mockData = [
  {
    id: '1',
    title: 'Panduan polis Anda',
    desc: 'Lihat detail panduan polis yang anda miliki di sini',
    icon: CONTACTS,
    btn: 'Lihat Di Sini',
    link: 'layanan/kelola-polis',
    isFile: false
  },
  {
    id: '2',
    title: 'Mekanisme Penanganan Pengaduan',
    desc: 'Kami menghargai dan mendengarkan saran dan keluhan dari nasabah Kami.',
    icon: DOCUMENT_SEARCH,
    btn: 'Selengkapnya',
    link: '/pdf/prosedur-singkat-pelayanan-nasabah-avrist.pdf',
    isFile: true
  },
  {
    id: '3',
    title: 'Daftar Tenaga Pemasar',
    desc: 'Temukan daftar tenaga pemasar aktif Avrist Assurance',
    icon: PERSON,
    btn: 'Temukan Di sini',
    link: 'layanan/penanganan-pengaduan',
    isFile: false
  }
];

export const ContentCard = () => {
  return (
    <div className="mt-[64px] grid sm:grid-cols-3 xs:grid-cols-1 gap-[24px]">
      {mockData.map((i) => (
        <div
          key={i.id}
          className="flex flex-col items-center justify-center gap-[24px] px-[24px] pt-[24px] pb-[36px] border border-gray_light border-b-8 border-b-purple_dark rounded-[12px]"
        >
          <Image
            alt={i.toString()}
            src={i.icon}
            className="w-[100px] h-[100px]"
          />
          <p className="text-center font-bold text-[32px] font-karla">
            {i.title}
          </p>
          <div className="flex flex-col justify-between grow items-center gap-[24px]">
            <p className="font-opensans text-[16px] text-center">{i.desc}</p>
            <Link
              href={i.link}
              className="bg-purple_dark max-w-[260px] w-full text-white rounded-md flex items-center justify-center py-[8px] px-[20px]"
              target={i.isFile ? '_blank' : '_self'}
            >
              {i.btn}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
