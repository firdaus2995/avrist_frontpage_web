'use client';
import { useSearchParams } from 'next/navigation';
import { FormulirPendaftaran } from '@/components/molecules/specifics/avrast/FormulirPendaftaran';
import { MainContent } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import KlaimHeader from '@/components/molecules/specifics/avrast/Klaim/KlaimHeader/KlaimHeader';
import KlaimVideo from '@/components/molecules/specifics/avrast/Klaim/KlaimVideo';

const InformationCustomer = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get('tab') ?? '';

  return (
    <div className="flex flex-col bg-avrast_product_bg">
      <KlaimHeader title={params} />
      {params.includes('Informasi Nasabah') ? (
        <MainContent />
      ) : params.includes('Formulir & Buku Panduan') ? (
        <FormulirPendaftaran />
      ) : (
        <></>
      )}

      <KlaimVideo />
      <FooterKlaim />
    </div>
  );
};

export default InformationCustomer;
