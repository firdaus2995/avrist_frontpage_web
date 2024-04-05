'use client';
import { Header } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import { MainContent } from '@/components/molecules/specifics/avrast/KelolaPolis';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import KlaimVideo from '@/components/molecules/specifics/avrast/Klaim/KlaimVideo';

const InformationPolicy = () => {
  return (
    <div className="flex flex-col bg-avrast_product_bg">
      <Header
        menu={[
          { label: 'Informasi Nasabah', href: '#' },
          { label: 'Panduan Polis', href: '#' }
        ]}
        title="Informasi Nasabah"
      />
      <MainContent />
      <KlaimVideo />
      <FooterKlaim />
    </div>
  );
};

export default InformationPolicy;
