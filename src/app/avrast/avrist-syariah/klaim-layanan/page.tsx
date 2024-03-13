import Image from 'next/image';

import GreenContact from '@/assets/images/avrast/avrist-syariah/green-contact.svg';
import GreenForm from '@/assets/images/avrast/avrist-syariah/green-form.svg';
import GreenHelpDesk from '@/assets/images/avrast/avrist-syariah/green-helpdesk.svg';
import GreenHospital from '@/assets/images/avrast/avrist-syariah/green-hospital.svg';
import GreenPaper from '@/assets/images/avrast/avrist-syariah/green-paper.svg';
import GreenReceipt from '@/assets/images/avrast/avrist-syariah/green-receipt.svg';
import HelpDesk from '@/assets/images/avrast/avrist-syariah/helpdesk.svg';
import HeroSyariah4 from '@/assets/images/avrast/avrist-syariah/hero-syariah-4.svg';

import ProdukEmail from '@/assets/images/avrast/component/proses-klaim/step-4-icon-1.svg';
import ProdukNasabah from '@/assets/images/avrast/component/proses-klaim/step-4-icon-3.svg';
import ProdukTanya from '@/assets/images/avrast/component/proses-klaim/step-4-icon-4.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';
import ROUNDED_FRAME_TOP from '@/assets/images/rounded-frame-top.svg';

import HelpCard from '@/components/molecules/specifics/avrast/Cards/HelpCard';
import InformationCard from '@/components/molecules/specifics/avrast/Cards/InformationCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import Hero from '@/components/molecules/specifics/avrast/Hero';

const KlaimLayanan = () => {
  const TopSeparator = () => {
    return (
      <div className="w-full bg-white">
        <Image
          alt="border"
          className="w-full h-auto rounded-t-[64px]"
          src={ROUNDED_FRAME_TOP}
          style={{ userSelect: 'none' }}
        />
      </div>
    );
  };

  const BottomSeparator = () => {
    return (
      <div className="w-full bg-white">
        <Image
          alt="border"
          className="w-full h-auto rounded-b-[64px]"
          src={ROUNDED_FRAME_BOTTOM}
          style={{ userSelect: 'none' }}
        />
      </div>
    );
  };

  return (
    <div>
      <Hero
        title="Klaim dan Layanan"
        breadcrumbsData={[
          { title: 'Beranda', href: '/avrast' },
          { title: 'Avrist Syariah', href: '/avrast/avrist-syariah/' },
          {
            title: 'Klaim & Layanan',
            href: '/avrast/avrist-syariah/klaim-layanan'
          }
        ]}
        bottomImage={HeroSyariah4}
      />
      <SimpleContainer>
        <CategoryPills
          buttonTitle={[
            'Tentang Avrist Syariah',
            'Dewan Pengawas Syariah',
            'Manfaat Utama',
            'Produk',
            'Klaim & Layanan'
          ]}
          selectedCategory="Klaim & Layanan"
          buttonActiveClassname="bg-syariah_green border-syariah_green"
          buttonInactiveClassname="bg-transparent border-syariah_green"
          buttonActiveTextClassname="text-white"
          buttonInactiveTextClassname="text-syariah_green"
        />

        <InformationCard
          heading="Cara Kami menangani klaim Anda"
          subHeading="Kami memberikan pelayanan dengan profesionalisme."
          cards={[
            {
              cardIcon: GreenReceipt,
              cardTitle: 'Pengajuan Klaim',
              cardBody:
                'Perkembangan informasi dan keputusan secara jelas, efektif dan transparansi.',
              cardButtonText: 'Panduan Klaim'
            },
            {
              cardIcon: GreenContact,
              cardTitle: 'Kelola Polis',
              cardBody:
                'Tim kami menganalisa pengajuan dan membayarkan dengan ketentuan polis.',
              cardButtonText: 'Informasi Nasabah'
            },
            {
              cardIcon: GreenHospital,
              cardTitle: 'Rumah Sakit Rekanan',
              cardBody:
                'Kami menjamin kelancaran proses klaim dengan ketentuan polis yang ada.',
              cardButtonText: 'Cari Lokasi'
            },
            {
              cardIcon: GreenForm,
              cardTitle: 'Formulir dan Buku Panduan',
              cardBody:
                'Kami memberi kelancaran dengan ketentuan polis yang disepakati bersama.',
              cardButtonText: 'Unduh dan Baca'
            },
            {
              cardIcon: GreenPaper,
              cardTitle: 'Penanganan Pengaduan',
              cardBody:
                'Kami menghargai dan mendengarkan saran dan keluhan dari nasabah Kami.',
              cardButtonText: 'Baca Aturan'
            },
            {
              cardIcon: GreenHelpDesk,
              cardTitle: 'Butuh Bantuan',
              cardBody:
                'Melalui jalur komunikasi yang tersedia, Kami selalu siap untuk membantu Anda.',
              cardButtonText: 'Hubungi Kami'
            }
          ]}
          cardClassname="border-b-syariah_green"
          cardButtonClassname="bg-syariah_green border-syariah_green"
          cardButtonTextClassname="text-white"
        />
      </SimpleContainer>
      <BottomSeparator />
      <SimpleContainer>
        <HelpCard
          title={
            <p className="text-[56px] text-white">
              <span className="font-bold">Hello,</span> Ada yang bisa{' '}
              <span className="font-bold">Avrista</span> bantu?
            </p>
          }
          cardClassname="bg-syariah_green_informing"
          buttonClassname="bg-white border border-white"
          buttonTextClassname="text-syariah_green_informing"
          buttonTitle="Tanya Avrista"
          image={HelpDesk}
        />
      </SimpleContainer>
      <TopSeparator />
      <FooterCards
        cards={[
          {
            title: 'Layanan Nasabah',
            icon: ProdukNasabah,
            actionTitle: '021 5789 8188'
          },
          {
            title: 'Tanya Avrista',
            icon: ProdukTanya,
            actionTitle: 'Lebih Lanjut'
          },
          {
            title: 'Tanya Lewat Email',
            icon: ProdukEmail,
            actionTitle: 'Kirim Email'
          },
          {
            title: 'Prosedur Pengaduan',
            icon: ProdukTestimoni,
            actionTitle: 'Lihat Prosedur'
          }
        ]}
      />
    </div>
  );
};

export default KlaimLayanan;
