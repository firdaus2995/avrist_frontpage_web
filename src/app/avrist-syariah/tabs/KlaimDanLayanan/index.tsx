import React from 'react';

import GreenContact from '@/assets/images/avrast/avrist-syariah/green-contact.svg';
import GreenForm from '@/assets/images/avrast/avrist-syariah/green-form.svg';
import GreenHelpDesk from '@/assets/images/avrast/avrist-syariah/green-helpdesk.svg';
import GreenHospital from '@/assets/images/avrast/avrist-syariah/green-hospital.svg';
import GreenPaper from '@/assets/images/avrast/avrist-syariah/green-paper.svg';
import GreenReceipt from '@/assets/images/avrast/avrist-syariah/green-receipt.svg';

import InformationCard from '@/components/molecules/specifics/avrast/Cards/InformationCard';

const KlaimDanLayanan = () => {
  return (
    <div>
      <InformationCard
        heading="Layanan Avrist Total Solution"
        subHeading="Komitmen kami untuk mejaga kepercayaan Anda dengan pelayanan yang professional dan efisien"
        cards={[
          {
            cardIcon: GreenReceipt,
            cardTitle: 'Kelola Klaim',
            cardBody: 'Informasi seputar panduan dan layanan klaim',
            cardButtonText: 'Panduan Klaim',
            href: '/klaim-layanan/klaim?tab=Panduan+%26+Pengajuan'
          },
          {
            cardIcon: GreenContact,
            cardTitle: 'Kelola Perlindungan Anda',
            cardBody: 'Kelola informasi seputar Polis Anda ',
            cardButtonText: 'Informasi Nasabah',
            href: '/klaim-layanan/layanan/kelola-polis'
          },
          {
            cardIcon: GreenHospital,
            cardTitle: 'Rumah Sakit Rekanan',
            cardBody: 'Jaringan Rekanan Rumah Sakit Avrist Assurance',
            cardButtonText: 'Cari Lokasi',
            href: '/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan'
          },
          {
            cardIcon: GreenForm,
            cardTitle: 'Formulir dan Buku Panduan',
            cardBody: 'Akses dokumen cepat, untuk kebutuhan Anda',
            cardButtonText: 'Unduh dan Baca',
            href: '/klaim-layanan/layanan?tab=Formulir+%26+Buku+Panduan'
          },
          {
            cardIcon: GreenPaper,
            cardTitle: 'Penanganan Pengaduan',
            cardBody: 'Mekanisme Penanganan Pengaduan',
            cardButtonText: 'Selengkapnya',
            href: 'https://avrist.com/Prosedur%20Singkat%20Pelayanan%20Nasabah%20Avrist%20_updated.pdf'
          },
          {
            cardIcon: GreenHelpDesk,
            cardTitle: 'Bantuan',
            cardBody: 'Kami di sini siap membantu Anda',
            cardButtonText: 'Hubungi Kami',
            href: '/hubungi-kami'
          }
        ]}
        cardClassname="border-b-syariah_green"
        cardButtonClassname="bg-syariah_green border-syariah_green"
        cardButtonTextClassname="text-white"
      />
    </div>
  );
};

export default KlaimDanLayanan;
