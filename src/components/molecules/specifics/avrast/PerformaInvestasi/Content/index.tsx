'use client';
import React, { useEffect, useState } from 'react';
import DownloadFileButton from '../../DownloadFileButton';
import { CardMenuLink } from '../../KelolaPolis/MainContentComponent/CardMenu';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import Accordion from '@/components/molecules/specifics/avrast/Accordion';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';
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

      const categoryValues = transformedData.map(
        ({ content, categoryDescription }) => {
          return {
            title: contentStringTransformer(content['kategori-laporan']),
            desc: categoryDescription,
            listTahun: getUniqueYears(
              transformedData,
              contentStringTransformer(content['kategori-laporan'])
            )
          };
        }
      );
      const removeDuplicates = (data: any[]) => {
        const unique = data.reduce((acc: any[], current: { title: any }) => {
          const x = acc.find(
            (item: { title: any }) => item.title === current.title
          );
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        return unique;
      };
      const listData = removeDuplicates(categoryValues);

      setDataContent(listData);
    } catch (err) {
      console.error(err);
    }
  };

  const getUniqueYears = (data: any[], category: any) => {
    const tahunValues = data
      .filter(
        ({ content }) =>
          contentStringTransformer(content['kategori-laporan']) === category
      )
      .map(({ content }) => {
        return contentStringTransformer(content['tahun-periode-laporan']);
      });
    const uniqueYears = new Set(
      tahunValues?.filter((tahun: string) => tahun !== '')
    );
    return Array.from(uniqueYears)?.map((item) => {
      return {
        tahun: item,
        list: data
          ?.filter(
            ({ content }) =>
              contentStringTransformer(content['kategori-laporan']) ===
                category &&
              contentStringTransformer(content['tahun-periode-laporan']) ===
                item
          )
          .map(({ content, id }) => {
            const title = contentStringTransformer(
              content['performainvestasi-namafile']
            );
            const path = singleImageTransformer(
              content['performainvestasi-file']
            );

            return {
              title,
              path,
              id
            };
          })
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-purple_dark">
      <div className="bg-white flex flex-col pt-[5rem] md:pt-[6.25rem] px-[2rem] md:px-[8.5rem] pb-[3rem] sm:gap-[4rem] xs:gap-[2.25rem]">
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
            Performa Investasi
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
          <CardMenuLink
            desc="Tabel Suku Bunga"
            href="https://polis.avrist.com/pages/DailyUnitPrice/latest/pgeLatest.aspx"
            openNewTab
          />
          <Accordion
            bgColor="bg-purple_light_bg"
            title="Kinerja Investasi"
            description="Silahkan dapatkan laporan yang Anda butuhkan di sini"
          >
            {/* <Accordion.Item>
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
            </Accordion.Item> */}
            <Accordion.Item>
              {dataContent &&
                dataContent.map(
                  (
                    item: {
                      listTahun: any;
                      title: string | undefined;
                      desc: string | undefined;
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <Accordion
                      key={index}
                      bgColor="bg-purple_light_bg"
                      title={item.title}
                      description={item.desc}
                    >
                      <Accordion.Item>
                        {item.listTahun &&
                          item.listTahun.map(
                            (
                              value: {
                                tahun: string | undefined;
                                list: any | undefined;
                              },
                              index: React.Key | null | undefined
                            ) => (
                              <Accordion
                                key={index}
                                bgColor="bg-purple_light_bg"
                                title={value.tahun}
                              >
                                {value?.list &&
                                  value?.list?.map(
                                    (
                                      listItem: { title: string; path: any },
                                      index: React.Key | null | undefined
                                    ) => (
                                      <DownloadFileButton
                                        title={listItem.title}
                                        fileType="PDF"
                                        key={index}
                                        filePath={
                                          listItem?.path?.imageUrl ?? ''
                                        }
                                      />
                                    )
                                  )}
                              </Accordion>
                            )
                          )}
                      </Accordion.Item>
                    </Accordion>
                  )
                )}
            </Accordion.Item>
          </Accordion>
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
