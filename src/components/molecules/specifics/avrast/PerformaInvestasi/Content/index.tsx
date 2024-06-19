'use client';
import React, { useEffect, useState } from 'react';
import { CardMenuLink } from '../../KelolaPolis/MainContentComponent/CardMenu';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import Accordion from '@/components/molecules/specifics/avrast/Accordion';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';
import DownloadFileButton from '@/components/molecules/specifics/avrast/DownloadFileButton';
import Disclaimer from '@/components/molecules/specifics/avrast/PerformaInvestasi/Disclaimer';
import { handleGetContentCategory } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const Content = () => {
  const [dataContent, setDataContent] = useState<any>();

  const fetchData = async () => {
    const queryParams: QueryParams = {
      includeAttributes: 'true',
      category: 'Kinerja Investasi'
    };
    try {
      const fetchApi = await handleGetContentCategory(
        'Performa-Investasi',
        queryParams
      );
      const transformedData = contentCategoryTransformer(
        fetchApi,
        queryParams.category
      );

      const dataContentValues = transformedData?.map(({ content, id }) => {
        const title = contentStringTransformer(
          content['performainvestasi-namafile']
        );
        const path = singleImageTransformer(content['performainvestasi-file']);

        return {
          title,
          path,
          id
        };
      });

      setDataContent(dataContentValues);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-purple_dark">
      <div className="bg-white flex flex-col pt-[3.125rem] md:pt-[6.25rem] px-[2rem] md:px-[8.5rem] pb-[1.625rem] sm:gap-[4rem] xs:gap-[2.25rem]">
        <ButtonMenu
          buttonList={[
            'Informasi Nasabah',
            'Rumah Sakit Rekanan',
            'Formulir & Buku Panduan',
            'Performa Investasi'
          ]}
        />

        <section className="w-full flex flex-col items-center text-center">
          <h1 className="font-karla xs:text-[2.25rem] sm:text-[3.5rem] text-purple_dark font-medium">
            Kinerja Investasi
          </h1>
          <h2 className="font-karla xs:text-[1.5rem] sm:text-[2.25rem]">
            Laporan kinerja Investasi{' '}
            <span className="font-bold">Avrist Assurance</span>
          </h2>
        </section>

        <section className="flex flex-col gap-3">
          <CardMenuLink
            desc="Informasi Nilai Unit"
            href="https://polis.avrist.com/pages/DailyUnitPrice/pgeUnitPrice.aspx"
            openNewTab
          />

          <Accordion
            bgColor="bg-purple_light_bg"
            title="Kinerja Investasi"
            description="Untuk kemudahan transaksi, silakan unduh formulir berdasarkan jenis transaksi yang diperlukan."
          >
            <Accordion.Item>
              {dataContent &&
                dataContent.map(
                  (
                    item: { title: string; path: any },
                    index: React.Key | null | undefined
                  ) => (
                    <DownloadFileButton
                      title={item.title}
                      fileType="PDF"
                      key={index}
                      filePath={item?.path?.imageUrl ?? ''}
                    />
                  )
                )}
            </Accordion.Item>
          </Accordion>

          <CardMenuLink
            desc="Tabel Suku Bunga"
            href="https://polis.avrist.com/pages/DailyUnitPrice/latest/pgeLatest.aspx"
            openNewTab
          />
        </section>

        <section className="">
          <Disclaimer />
        </section>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default Content;
