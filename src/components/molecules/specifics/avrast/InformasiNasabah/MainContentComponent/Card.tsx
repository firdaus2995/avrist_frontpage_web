import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardPurple } from '../../HubungiKami/MainContentComponent/Card';
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
    link: 'layanan/kelola-polis'
  },
  {
    id: '2',
    title: 'Mekanisme Penanganan Pengaduan',
    desc: 'Kami menghargai dan mendengarkan saran dan keluhan dari nasabah Kami.',
    icon: DOCUMENT_SEARCH,
    btn: 'Selengkapnya',
    link: 'layanan/penanganan-pengaduan'
  },
  {
    id: '3',
    title: 'Daftar Tenaga Pemasar',
    desc: 'Temukan daftar tenaga pemasar aktif Avrist Assurance',
    icon: PERSON,
    btn: 'Temukan Di sini',
    link: 'layanan/penanganan-pengaduan'
  }
];

export const ContentCard = () => {
  return (
    <div className="mt-[64px] grid grid-cols-3 gap-6">
      {mockData.map((i) => (
        <CardPurple key={i.id}>
          <div className="flex flex-col items-center m-[24px]">
          <Image
            alt={i.toString()}
            src={i.icon}
            className="w-[100px] h-[100px]"
            />
            <p className="text-center font-bold text-[28px] font-karla mt-[24px]">
              {i.title}
            </p>
            <p className="font-opensans text-[16px] text-center mt-[12px]">
              {i.desc}
            </p>
            <Link
              href={i.link}
              className="mt-[24px] bg-purple_dark max-w-[260px] w-full text-white rounded-md flex items-center justify-center py-[8px]"
            >
              {i.btn}
            </Link>
          </div>
        </CardPurple>
      ))}
    </div>
  );
};
