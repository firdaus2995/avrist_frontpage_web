import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CREDIT_CARD from '@/assets/images/common/credit-card.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import HEART_HAND from '@/assets/images/common/heart-hand.svg';

const ServiceCard = () => {
  const router = useRouter();
  return (
    <div className="mx-3 p-6 bg-gray_bglightgray rounded-xl grid grid-cols-3 gap-6">
      <Card
        image={HEART_HAND}
        title="Klaim & Layanan"
        onClick={() => router.push('klaim-layanan/klaim?tab=Informasi%20klaim')}
      />
      <Card
        image={DOCUMENT_SEARCH}
        title="Informasi Polis"
        onClick={() => router.push('klaim-layanan/layanan/kelola-polis')}
      />
      <Card
        image={CREDIT_CARD}
        title="Pembayaran Premi"
        onClick={() =>
          router.push('klaim-layanan/layanan/panduan-pembayaran-premi')
        }
      />
    </div>
  );
};

export default ServiceCard;

interface ICard {
  image: string;
  title: string;
  onClick: () => void;
}

const Card: React.FC<ICard> = ({ image, title, onClick }) => {
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <div className="w-auto h-[220px] bg-white rounded-t-xl pt-[24px] px-[24px] pb-[36px] grow shrink-0 flex flex-col gap-[24px] items-center justify-center">
        <Image alt={title} src={image} />
        <p className="font-bold text-[20px] leading-[1.5rem]">{title}</p>
      </div>
      <div className="w-auto h-[10px] bg-purple_dark rounded-b-xl"></div>
    </div>
  );
};
