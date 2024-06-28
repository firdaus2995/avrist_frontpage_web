import React, { useEffect } from 'react';

import GreenBinocular from '@/assets/images/avrast/avrist-syariah/green-binocular.svg';
import GreenHead from '@/assets/images/avrast/avrist-syariah/green-head.svg';
import GreenPeople from '@/assets/images/avrast/avrist-syariah/green-people.svg';

import AboutHeading from '@/components/molecules/specifics/avrast/AboutHeading';
import InformationCard from '@/components/molecules/specifics/avrast/Cards/InformationCard';
import PersonCard from '@/components/molecules/specifics/avrast/Cards/PersonCard';

type Props = {
  title: string;
  subTitle: string;
  desc: string;
  boards: { name: string; role: string; image: string }[];
};
const TentangAvristSyariah = (props: Props) => {
  const { boards, desc, subTitle, title } = props;
  useEffect(() => {
    const element = document.querySelector('#TentangAvristSyariah');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div>
      <AboutHeading
        categoriesName="Sejarah"
        categoriesClassname="text-syariah_green"
        headingText={title}
        subHeadingText={subTitle}
        description={desc}
        tags={['Avrist Syariah', 'Premi Tetap', 'Kecelakaan Diri']}
        tagsClassname="bg-gray_bglightgray"
        tagsTextClassname="text-syariah_green"
        idTags="#TentangAvristSyariah"
      />
      <PersonCard
        heading="Dewan Pengawas Syariah PT Avrist Assurance"
        cards={boards}
        roleClassname="text-syariah_green"
        idTags="#DewanPengawasSyariah"
        headingClassname="text-black py-[3.125rem] sm:py-[5rem] !mb-0"
      />
      <div className="xs:mb-[2.25rem] sm:mb-[4.125rem]">
        <InformationCard
          heading="Tugas dan Peran"
          subHeading="Tugas dan Peran DPS PT Avrist Assurance sebagai berikut:"
          cards={[
            {
              cardIcon: GreenBinocular,
              cardBody:
                '<strong>Mengawasi,</strong> memberi nasihat dan saran kepada Direksi agar kegiatan Perusahaan sesuai dengan prinsip Syariah.'
            },
            {
              cardIcon: GreenHead,
              cardBody:
                'Berupaya menjaga keseimbangan kepentingan semua pihak, khususnya <strong>kepentingan Nasabah.</strong>'
            },
            {
              cardIcon: GreenPeople,
              cardBody:
                'Menyelenggarakan <strong>rapat DPS</strong> secara berkala paling sedikit enam kali dalam satu tahun.'
            }
          ]}
          cardClassname="border-b-syariah_green"
        />
      </div>

      <div className="flex mx-[-2rem] mb-[-3.125rem] sm:mx-[-8.5rem] sm:mb-[-4.5rem] px-[2rem] sm:px-[8.5rem] bg-gray_bglightgray">
        <InformationCard
          heading="Mengapa Avrist Syariah?"
          cards={[
            {
              cardIcon: GreenBinocular,
              cardTitle: 'Dapat dibeli dengan mudah',
              cardBody:
                'Avrist Unit Syariah memiliki Jalur Distribusi lengkap mencakup Employee Benefit, Bancassurance dan Agency'
            },
            {
              cardIcon: GreenHead,
              cardTitle: 'Pilihan Produk yang lengkap',
              cardBody:
                'Memiliki beragam Produk Avrist Unit Syariah, sesuai dengan kebutuhan keluarga Indonesia'
            },
            {
              cardIcon: GreenPeople,
              cardTitle: 'Menggunakan Prinsip Murni Syariah',
              cardBody:
                "Dengan menggunakan Akad Wakalah Bil Ujrah, Akad Tabarru’, dan Akad Hibah Mu'allaqah bi al-Syarth"
            },
            {
              cardIcon: GreenPeople,
              cardTitle: 'Semakin dekat dengan Anda',
              cardBody:
                'Avrist Unit Syariah berada di 20 kota dengan 21 Kantor Cabang dan 13 Kantor Pemasaran Mandiri'
            }
          ]}
          cardClassname="border-b-syariah_green"
          idTags="#ManfaatUtama"
        />
      </div>
    </div>
  );
};

export default TentangAvristSyariah;
