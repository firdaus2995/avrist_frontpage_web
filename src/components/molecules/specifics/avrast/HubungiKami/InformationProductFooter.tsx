import FooterCards from '../FooterCards';
import love from '@/assets/images/common/heart-check.svg';
import home from '@/assets/images/common/home-add.svg';
import hospital from '@/assets/images/common/hospital.svg';
import homeYellow from '@/assets/images/common/person-home-yellow.svg';

const cards = [
  {
    icon: love,
    title: 'Asuransi Individu',
    subtitle: 'Lihat Produk',
    href: '/produk/individu?tab=Asuransi+Jiwa'
  },
  {
    icon: home,
    title: 'Asuransi Korporasi',
    subtitle: 'Lihat Produk',
    href: '/produk/korporasi'
  },
  {
    icon: homeYellow,
    title: 'AVRIST DPLK',
    subtitle: 'Lihat Produk',
    href: '/avrist-dplk?tab=Produk',
    textColor: 'text-dplk_yellow'
  },
  {
    icon: hospital,
    title: 'Rumah Sakit',
    subtitle: 'Rekanan',
    href: '/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan'
  }
];

export const InformationProductFooter = () => {
  return (
    <div className="flex flex-col self-stretch items-center justify-center py-24 gap-16 bg-purple_superlight rounded-t-[65px] relative">
      <div className="w-full absolute z-20 top-2 h-20 bg-purple_superlight rounded-t-[65px]"></div>
      <div className="w-full flex flex-row absolute z-10 top-0 h-20 rounded-t-[65px]">
        <div className="w-1/4 h-full bg-purple_light rounded-tl-[65px]"></div>
        <div className="w-1/4 h-full bg-green_border"></div>
        <div className="w-1/4 h-full bg-orange_border"></div>
        <div className="w-1/4 h-full bg-agi_grey rounded-tr-[65px]"></div>
      </div>
      <div className="w-full h-full">
        <FooterCards cards={cards} />
      </div>
    </div>
  );
};
