'use client';
import { Header } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import FooterKlaim from '@/components/molecules/specifics/avrast/Klaim/FooterKlaim';
import KlaimVideo from '@/components/molecules/specifics/avrast/Klaim/KlaimVideo';
import { MainContent } from '@/components/molecules/specifics/avrast/PenangananPengaduan';

const HandleComplaint = () => {
  return (
    <div className="flex flex-col bg-avrast_product_bg">
      <Header
        menu={[
          { label: 'Informasi Nasabah', href: '/klaim-layanan/layanan?tab=Informasi+Nasabah' },
          { label: 'Penanganan Pengaduan', href: '#' }
        ]}
        title="Informasi Nasabah"
      />
      <MainContent />
      <KlaimVideo />
      <FooterKlaim />
    </div>
  );
};

export default HandleComplaint;
