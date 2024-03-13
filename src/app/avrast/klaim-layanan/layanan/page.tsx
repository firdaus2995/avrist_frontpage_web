'use client';
import { MainContent } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import KlaimHeader from '@/components/molecules/specifics/avrast/Klaim/KlaimHeader/KlaimHeader';
import KlaimVideo from '@/components/molecules/specifics/avrast/Klaim/KlaimVideo';

const InformationCustomer = () => {
  return (
    <div className="flex flex-col bg-avrast_product_bg">
      <KlaimHeader title={'Informasi Nasabah'} />
      <MainContent />
      <KlaimVideo />
      <FooterKlaim />
    </div>
  );
};

export default InformationCustomer;
