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
    title: 'Kelola Polis',
    desc: 'Perkembangan informasi dan keputusan secara jelas, efektif dan transparansi.',
    icon: CONTACTS,
    btn: 'Lihat Panduan',
    link: 'layanan/kelola-polis'
  },
  {
    id: '2',
    title: 'Penanganan Pengaduan',
    desc: 'Kami menghargai dan mendengarkan saran dan keluhan dari nasabah Kami.',
    icon: DOCUMENT_SEARCH,
    btn: 'Lihat Prosedur',
    link: 'layanan/penanganan-pengaduan'
  },
  {
    id: '3',
    title: 'Agen Aktif',
    desc: 'Temukan agen asuransi dan dapatkan layanan asuransi sesuai kebutuhan Anda',
    icon: PERSON,
    btn: 'Lihat Agen',
    link: ''
  }
];

export const ContentCard = () => {
  return (
    <div className="mt-[64px] grid grid-cols-3 gap-6">
      {mockData.map((i) => (
        <CardPurple key={i.id}>
          <div className="flex flex-col items-center m-[24px]">
            {/* <Image src={i.icon} height={100} width={100} alt="icon" /> */}
            <Image
            alt={i.toString()}
            src={i.icon}
            className="w-[100px] h-[100px]"
            />
            <p className="text-center font-bold text-[32px] font-karla mt-[24px]">
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
