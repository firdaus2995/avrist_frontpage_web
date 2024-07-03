import React from 'react';

import YellowBinocular from '@/assets/images/avrast/dplk/yellow-binocular.svg';
import YellowHead from '@/assets/images/avrast/dplk/yellow-head.svg';
import YellowPeople from '@/assets/images/avrast/dplk/yellow-people.svg';

import AboutHeading from '@/components/molecules/specifics/avrast/AboutHeading';
import InformationCard from '@/components/molecules/specifics/avrast/Cards/InformationCard';
import PersonCard from '@/components/molecules/specifics/avrast/Cards/PersonCard';
import { ContentData } from '@/types/content.type';
import {
  contentStringTransformer,
  handleTransformedContent,
  singleImageTransformer
} from '@/utils/responseTransformer';

type Props = {
  dewanpengawasdplkJudul: string;
  dewanpengawasdplkSubjudul: string;
  dewanpengawasdplkDeskripsi: string;
  pengawas: ContentData[];
  pengurus: ContentData[];
};

const ManfaatDPLK = (props: Props) => {
  const {
    dewanpengawasdplkSubjudul,
    dewanpengawasdplkDeskripsi,
    pengawas,
    pengurus
  } = props;

  const personsCardGenerator = (persons: ContentData[]) => {
    const maping = persons.map((i) => {
      const { content } = handleTransformedContent(i.contentData, i.title);
      return {
        name: contentStringTransformer(content['dewanpengawasdplk-nama']),
        role: contentStringTransformer(content['dewanpengawasdplk-title']),
        image: singleImageTransformer(content['dewanpengawasdplk-image'])
          .imageUrl
      };
    });
    return maping;
  };

  return (
    <div>
      <AboutHeading
        categoriesName="Sejarah"
        categoriesClassname="text-dplk_yellow"
        headingText={
          'Sejarah Singkat Dana Pensiun Lembaga Keuangan (DPLK) Avrist'
        }
        subHeadingText={dewanpengawasdplkSubjudul}
        description={dewanpengawasdplkDeskripsi}
        tags={[]}
        tagsClassname="bg-gray_bglightgray"
        tagsTextClassname="text-dplk_yellow"
        idTags="#TentangAvristDPLK"
      />
      <div className="flex flex-col w-full mb-[3.125rem] sm:mb-[5rem]">
        <PersonCard
          heading="Dewan Pengawas DPLK PT Avrist Assurance"
          cards={personsCardGenerator(pengawas)}
          roleClassname="text-dplk_yellow"
          idTags="#DewanPengawasDPLK"
          headingClassname="text-black py-[3.125rem] sm:pt-[4rem] !sm:pt-[4rem] !-mb-[1.5rem]"
        />
        <PersonCard
          heading="Pengurus DPLK PT Avrist Assurance"
          cards={personsCardGenerator(pengurus)}
          roleClassname="text-dplk_yellow"
          headingClassname="text-black py-[3.125rem] sm:pt-[4rem] !-mb-[1.5rem]"
        />
      </div>

      <div className="flex mx-[-32px] mb-[-50px] sm:mx-[-136px] sm:mb-[-70px] px-[32px] sm:px-[136px] bg-yellow_light">
        <InformationCard
          heading="Keuntungan memilih DPLK Avrist"
          cards={[
            {
              cardIcon: YellowBinocular,
              cardTitle: 'Experienced',
              cardBody:
                'Berpengalaman dalam mengelola program pensiun sejak 1980 '
            },
            {
              cardIcon: YellowHead,
              cardTitle: 'Consultative Approach',
              cardBody: `<ol class="w-full list-decimal list-outside text-justify pl-4">
                <li>Memiliki tim yang memiliki pengetahuan & keahlian serta pengalaman dalam memberikan rancangan program pensiun dan implementasi program pensiun;</li>
                <li>Seperti memiliki konsultan selama menjadi nasabah DPLK Avrist</li>
              </ul>
              `
            },
            {
              cardIcon: YellowPeople,
              cardTitle: 'Flexible',
              cardBody: `<ol class="w-full list-decimal list-outside text-justify pl-4">
                <li>Fleksibilitas dalam menentukan dan menjalankan program pensiun dengan Layanan dan fasilitas yang tersedia</li>
                <li>Fleksibilitas untuk memilih investasi dan mengubahnya dari waktu waktu</li>
              </ul>
              `
            },
            {
              cardIcon: YellowBinocular,
              cardTitle: 'Free Fund Switching',
              cardBody:
                'Tidak dikenakan biaya untuk melakukan perubahan pilhan investasi berapa kali pun dilakukan dalam setahun'
            },
            {
              cardIcon: YellowHead,
              cardTitle: 'Fast & Easy Claim',
              cardBody:
                'Proses klaim yang mudah dibantu oleh <span class="italic">dedicated client relationship</span> dengan TAT 7-10 hari kerja. '
            },
            {
              cardIcon: YellowPeople,
              cardTitle: 'Competitive Fee Charge',
              cardBody:
                'Menerapkan <span class="italic">single fee</span> yang kompetitif dan tidak ada biaya <span class="italic">penalty</span> (<span class="italic">Termination Fee</span>)'
            }
          ]}
          cardClassname="border-b-dplk_yellow"
          idTags="#ManfaatDPLK"
        />
      </div>
    </div>
  );
};

export default ManfaatDPLK;
