import React from 'react';

import YellowContact from '@/assets/images/avrast/dplk/yellow-contact.svg';
import YellowForm from '@/assets/images/avrast/dplk/yellow-form.svg';
import YellowHelpDesk from '@/assets/images/avrast/dplk/yellow-head.svg';
import YellowPaper from '@/assets/images/avrast/dplk/yellow-paper.svg';
import YellowRecipt from '@/assets/images/avrast/dplk/yellow-receipt.svg';

import InformationCard from '@/components/molecules/specifics/avrast/Cards/InformationCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';

const KlaimDanLayanan = () => {
  return (
    <div className="flex flex-col xs:mt-[3.125rem] md:mt-[5rem] xs:px-[2rem] sm:px-[8.5rem]">
      <CategoryPills
        buttonTitle={[
          'Tentang DPLK Avrist',
          'Dewan Pengawas DPLK',
          'Manfaat DPLK',
          'Program DPLK',
          'Klaim & Layanan'
        ]}
        selectedCategory="Klaim & Layanan"
        buttonActiveClassname="bg-dplk_yellow border-dplk_yellow"
        buttonInactiveClassname="bg-transparent border-dplk_yellow text-black hover:bg-dplk_yellow hover:border-dplk_yellow"
        buttonInactiveTextClassname="text-dplk_yellow hover:text-white"
        buttonActiveTextClassname="text-white"
        links={{
          'Tentang DPLK Avrist': '/avrist-dplk?tab=Tentang+DPLK+Avrist',
          'Dewan Pengawas DPLK': '/avrist-dplk?tab=Dewan+Pengawas+DPLK',
          'Manfaat DPLK': '/avrist-dplk?tab=Manfaat+DPLK',
          'Program DPLK': '/avrist-dplk/produk',
          'Klaim & Layanan': '/avrist-dplk/klaim-layanan'
        }}
      />
      <InformationCard
        heading="Pusat Informasi Layanan DPLK Avrist"
        subHeading="Informasi seputar panduan dan layanan DPLK Avrist Assurance"
        cardContainerClassName="sm:gap-y-[1.5rem]"
        cards={[
          {
            cardIcon: YellowRecipt,
            cardTitle: 'Pengajuan Klaim',
            cardBody:
              'Perkembangan informasi dan keputusan secara jelas, efektif dan transparansi.',
            cardButtonText: 'Panduan Klaim',
            href: '/klaim-layanan/klaim?tab=Panduan+%26+Pengajuan'
          },
          {
            cardIcon: YellowContact,
            cardTitle: 'Pengkinian Data',
            cardBody:
              'Tim kami menganalisa pengajuan dan membayarkan dengan ketentuan polis.',
            cardButtonText: 'Login Employer',
            href: 'https://polis.avrist.com/pgeSqplxruif.aspx?src=per&trx=inf'
          },
          {
            cardIcon: YellowContact,
            cardTitle: 'Pengkinian Data',
            cardBody: 'Bukti Komitmen kami untuk memberikan rasa Aman',
            cardButtonText: 'Login Employee',
            href: 'https://polis.avrist.com/pgeSqplxruif.aspx?src=pee&trx=inf'
          },
          {
            cardIcon: YellowForm,
            cardTitle: 'Formulir dan Buku Panduan',
            cardBody: 'Akses dokumen cepat, untuk kebutuhan Anda.',
            cardButtonText: 'Unduh dan Baca',
            href: '/klaim-layanan/layanan?tab=Formulir+%26+Buku+Panduan'
          },
          {
            cardIcon: YellowPaper,
            cardTitle: 'Penanganan Pengaduan',
            cardBody: 'Mekanisme Penanganan Pengaduan.',
            cardButtonText: 'Selengkapnya',
            href: 'https://avrist.com/Prosedur%20Singkat%20Pelayanan%20Nasabah%20Avrist%20_updated.pdf',
            isFile: true
          },
          {
            cardIcon: YellowHelpDesk,
            cardTitle: 'Bantuan',
            cardBody: 'Kami di sini siap membantu Anda.',
            cardButtonText: 'Hubungi Kami',
            href: '/hubungi-kami'
          }
        ]}
        cardClassname="border-b-dplk_yellow"
        cardButtonClassname="bg-dplk_yellow hover:bg-dplk_yellow_highlight border-dplk_yellow"
        cardButtonTextClassname="text-white"
      />
    </div>
  );
};

export default KlaimDanLayanan;
