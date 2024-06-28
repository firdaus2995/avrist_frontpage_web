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

const DewanPengawasDPLK = (props: Props) => {
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
        tags={['Avrist DPLK', 'Premi Tetap', 'Kecelakaan Diri']}
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
          headingClassname="text-black py-[3.125rem] sm:py-[5rem] !mb-0"
        />
        <PersonCard
          heading="Pengurus DPLK PT Avrist Assurance"
          cards={personsCardGenerator(pengurus)}
          roleClassname="text-dplk_yellow"
          headingClassname="text-black py-[3.125rem] sm:py-[5rem] !mb-0"
        />
      </div>
      <div className="flex mx-[-32px] mb-[-50px] sm:mx-[-136px] sm:mb-[-72px] px-[32px] sm:px-[136px] bg-yellow_light">
        <InformationCard
          heading="Keuntungan memilih DPLK Avrist"
          cards={[
            {
              cardIcon: YellowBinocular,
              cardTitle: 'Experienced',
              cardBody:
                'Berpengalaman dalam mengelola Dana Pensiun sejak 1980 dalam bentuk Yayasan Dana Pensiun. Untuk DPLK sejak tahun 1994'
            },
            {
              cardIcon: YellowHead,
              cardTitle: 'Consultative Approach',
              cardBody: `Kami memiliki tim ahli yang:
              <div class="w-full">
                <p><span class="font-bold">1.</span> Memiliki Pengetahuan Cukup</p>
                <p><span class="font-bold">2.</span> Memiliki Pengalaman Cukup</p>
                <p><span class="font-bold">3.</span> Professional dan Berintegritas</p>
              </div>
              `
            },
            {
              cardIcon: YellowPeople,
              cardTitle: 'Flexible',
              cardBody:
                'Fleksibilitas kami untuk pemilihan atau penempatan investasi yang tidak dibatasi. Fleksibilitas juga untuk program pensiun yang dijalankan.'
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
          idTags="#ManfaatUtama"
        />
      </div>
    </div>
  );
};

export default DewanPengawasDPLK;
