import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';
import ButtonMenuVertical from '@/components/molecules/specifics/avrast/ButtonMenuVertical';
import { getContent } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';
import { contentStringTransformer, contentTransformer } from '@/utils/responseTransformer';

const titleSideTab = [
  'Hak - Hak Nasabah',
  'Kewajiban Nasabah',
  'Cara Avrist Life Tangani Keluhan Nasabah'
];

const contentTab: any = {
  'Hak - Hak Nasabah': {
    title: 'Sesuai POJK 22 Tahun 2023 tentang Pelindungan Konsumen & Masyarakat di Sektor Jasa Keuangan,',
    subTitle: 'Hak Konsumen meliputi :',
    content: [
      'Mendapatkan keamanan dalam menggunakan produk dan/atau memanfaatkan layanan sesuai yang ditetapkan dalam ketentuan peraturan perundang-undangan dan/atau Polis.',
      'Memilih produk dan/atau layanan.',
      'Mendapatkan produk dan/atau layanan sesuai dengan penawaran yang dijanjikan dan/atau sesuai dengan ketentuan peraturan perundang-undangan dan/atau Polis.',
      'Mendapatkan informasi mengenai produk dan/atau layanan yang jelas, akurat, benar, mudah diakses, dan tidak berpotensi menyesatkan.',
      'Didengar pendapat dan pengaduannya atas produk yang digunakan dan/atau layanan yang dimanfaatkan.',
      'Mendapatkan advokasi, pelindungan, dan upaya penyelesaian Sengketa Konsumen sesuai dengan ketentuan peraturan perundang-undangan dan/atau Polis.',
      'Mendapat edukasi keuangan.',
      'Diperlakukan atau dilayani secara benar.',
      'Mendapatkan ganti rugi apabila produk dan/atau layanan yang diterima tidak sesuai dengan Polis dan/atau ketentuan peraturan perundang-undangan,'
    ]
  },
  'Kewajiban Nasabah': {
    title: 'Sesuai POJK 22 Tahun 2023 tentang Pelindungan Konsumen & Masyarakat di Sektor Jasa Keuangan.',
    subTitle: 'Kewajiban konsumen meliputi :',
    content: [
      'Mendengarkan penjelasan informasi mengenai produk dan/ layanan yang disampaikan dengan metode pemasaran tertentu oleh Perusahaan sebelum membeli produk dan/atau layanan Perusahaan.',
      'Membaca, memahami, dan melaksanakan dengan benar Polis dan/atau dokumen penggunaan produk dan/ layanan.',
      'Beriktikad baik dalam penggunaan produk dan/atau layanan.',
      'Memberikan informasi dan/atau dokumen yang jelas, akurat, benar, dan tidak menyesatkan.',
      'Membayar sesuai dengan nilai/harga dan/atau biaya produk dan/ layanan yang disepakati dengan Perusahaan.',
      'Mengikuti upaya penyelesaian Sengketa Pelindungan Konsumen sesuai dengan ketentuan perundang-undangan.'
    ]
  }
}

  const renderContent = (description: string) => {
    const isOrdered = description.includes('<ol>');
    const isUnordered = description.includes('<ul>');

    if (isOrdered) {
      return (
        <p className="text-xl gap-4" dangerouslySetInnerHTML={{ __html: description.replace('<ol>', '<ol class="list-decimal pl-5">') }} />
      );
    }
    if (isUnordered) {
      return (
        <p className="text-xl gap-4" dangerouslySetInnerHTML={{ __html: description.replace('<ul>', '<ul class="list-disc pl-5">') }} />
      );
    }
    
    return (
      <p className="text-xl gap-4" dangerouslySetInnerHTML={{ __html: description} }/>
  );
  }

  const renderedtabContent = (content: string[]) => (
    <ol className='list-decimal marker:font-bold pl-5 text-xl'>
      {content.map((item: string, index: number) => (
        <li key={index} className='mb-4'>
          <p className="text-xl gap-4">{item}</p>
        </li>
      ))}
    </ol>
);

const Content = () => {
  const [tab, setTab] = useState(0);
  const [lastContentValue, setLastContentValue] = useState<any>();

  useEffect(() => {
    const fetchLastContentData = async () => {
      const queryParams: QueryParams = { 
        includeAttributes: 'true',
      };
      try {
      const fetchedContent = await getContent('Hak-Nasabah', queryParams);
      const { content } = contentTransformer(fetchedContent);
      const title = contentStringTransformer(content['body-judul-konten']);
      const isiKonten = contentStringTransformer(content['body-isi-konten']);

      setLastContentValue({
        title, 
        isiKonten
      });
      }
      catch(error: any) {
        throw new Error(error);
      }
    }

    if (titleSideTab[tab] === 'Cara Avrist Life Tangani Keluhan Nasabah') {
      fetchLastContentData().then();
    }
  }, [tab]);

  return (
    <div className="bg-purple_dark -mt-1">
      <div className="bg-white pt-[100px] px-[32px] md:px-[136px] pb-[0.375rem] rounded-t-[65px] flex xs:flex-col md:flex-row justify-between gap-10">
        <ButtonMenuVertical
          item={[
            {
              title: 'Hak Nasabah',
              onClick: () => {
                setTab(0);
              }
            },
            {
              title: 'Kewajiban Nasabah',
              onClick: () => {
                setTab(1);
              }
            },
            {
              title: 'Cara Avrist Life Tangani Keluhan Nasabah',
              onClick: () => {
                setTab(2);
              }
            }
          ]}
          outerClass="xs:w-full md:w-[12.5rem]"
        />
        <div className="xs:w-full md:w-[82%] flex flex-col gap-8">
          <h1 className="xs:text-2xl md:text-4xl font-karla text-purple_dark font-medium">
            {titleSideTab[tab]}
          </h1>
          {
            !lastContentValue && titleSideTab[tab] !== 'Cara Avrist Life Tangani Keluhan Nasabah' ?
            <>
              <h2 className="xs:text-4xl md:text-[10rem] font-karla font-bold" dangerouslySetInnerHTML={{ __html: contentTab[titleSideTab[tab]].title }} />
              <h2 className="xs:text-4xl md:text-[10rem] font-karla font-bold" dangerouslySetInnerHTML={{ __html: contentTab[titleSideTab[tab]].subTitle }} />
              <div className="flex flex-col gap-8">
                <span className="flex flex-col gap-4">
                  <Suspense>
                    {renderedtabContent(contentTab[titleSideTab[tab]].content)}
                  </Suspense>
                </span>
              </div>
            </>
            :
            ( lastContentValue && <>
              <h2 className="xs:text-4xl md:text-[10rem] font-karla font-bold" dangerouslySetInnerHTML={{ __html: lastContentValue.title }} />                          
              <div className="flex flex-col gap-8">
                <span className="flex flex-col gap-4">
                  <Suspense>
                    {renderContent(lastContentValue.isiKonten)}
                  </Suspense>
                </span>
              </div>
            </>)
          }
          <div className="p-[24px] border border-gray_light rounded-[12px] flex xs:flex-col md:flex-row justify-between xs:items-start md:items-center gap-[24px]">
            <p className="font-bold text-[20px] text-purple_dark">
              Kami berkomitmen menyelesaikan masalah adil dan konsisten{' '}
            </p>
            <Link href={'/klaim-layanan/layanan/penanganan-pengaduan'}>
            <Button customButtonClass="bg-purple_dark text-white py-[8px] px-[20px]">
              Ajukan Pengaduan
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
