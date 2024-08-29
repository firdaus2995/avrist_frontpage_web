'use client';

import React, { useEffect, useState } from 'react';
import NotFound from '@/components/atoms/NotFound';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import Accordion from '@/components/molecules/specifics/avrast/Accordion';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';
import ButtonMenuVertical from '@/components/molecules/specifics/avrast/ButtonMenuVertical';
import DownloadFileButton from '@/components/molecules/specifics/avrast/DownloadFileButton';
import SearchBox from '@/components/molecules/specifics/avrast/SearchBox';
import { handleGetContentCategory } from '@/services/content-page.api';
import { BASE_URL } from '@/utils/baseUrl';
import { QueryParams } from '@/utils/httpService';

const Form = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [transformedData, setTransFormedData] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyWords, setSearchKeywords] = useState('');

  useEffect(() => {
    try {
      fetchContentDataWithCategory({}).then((data: any) => {
        setCategories(data.kategoriFormulirList);
        setSelectedCategory(data.kategoriFormulirList[0]);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchContentDataWithCategory({ selectedCategory, searchKeyWords }).then(
        (data: any) => {
          setTransFormedData(data.transformedData);
          if (categories && categories.length !== 0) {
            setSelectedCategory(selectedCategory);
          }
        }
      );
    }
  }, [searchKeyWords, categories]);

  const btnVerticalData = categories?.map((item) => {
    return {
      title: item,
      onClick: () => {
        setSelectedCategory(item);
        fetchContentDataWithCategory({
          selectedCategory: item,
          searchKeyWords
        }).then((data: any) => {
          if (selectedCategory) {
            setTransFormedData(data.transformedData);
            if (categories && categories.length !== 0) {
              setSelectedCategory(selectedCategory);
            }
          }
        });
      }
    };
  });

  const renderDownloadListFileButton = (listData: any) => {
    return listData.map((item: any, index: number) => {
      const filePath = `${BASE_URL.image}/${item?.url ?? ''}`;
      return (
        <div key={index} className="xs:text-[18px]">
          <DownloadFileButton
            title={item.namaFile}
            fileType={item?.fileType}
            filePath={filePath}
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full bg-purple_dark">
      <div className="bg-white flex flex-col pt-[50px] md:pt-[6.25rem] px-[2rem] md:px-[8.5rem] pb-[28px] sm:gap-[5rem] xs:gap-[5rem]">
        <ButtonMenu
          buttonList={[
            'Informasi Nasabah',
            'Rumah Sakit Rekanan',
            'Formulir & Buku Panduan',
            'Performa Investasi'
          ]}
        />

        <section className="w-full flex flex-col items-center text-center">
          <h1 className="text-purple_dark font-karla text-center font-extrabold sm:text-[3.5rem] xs:text-[2.25rem] xs:-tracking-[1.44px] sm:-tracking-[2.56px] sm:leading-[67.2px] xs:leading-[43.2px]">
            List formulir dan buku panduan yang mungkin Anda butuhkan
          </h1>
          <h2 className="font-karla font-normal sm:text-[2.25rem] xs:text-[1.5rem] text-gray_bold sm:leading-[43.2px] xs:leading-[28.8px]">
            Silahkan pilih dan unduh formulir dan buku panduan yang Anda
            butuhkan
          </h2>
        </section>

        <section className="">
          <div className="flex xs:flex-col md:flex-row sm:gap-[48px] xs:gap-[36px]">
            <div className="xs:w-[100%] md:w-[23%] h-full bg-purple_light_bg rounded-xl">
              {btnVerticalData && <ButtonMenuVertical item={btnVerticalData} />}
            </div>
            <div className="xs:w-[100%] md:w-[77%] -mt-3">
              <SearchBox
                onSearch={(value: string) => {
                  setSearchKeywords(value);
                }}
                placeHolder="Cari Formulir"
                customButton="max-w-[119px]"
                customClassName="xs:!flex-row"
              />
              <div className="flex flex-col gap-3">
                {Object.keys(transformedData).length <= 0 ? (
                  <NotFound />
                ) : (
                  transformedData &&
                  Object.keys(transformedData).map((category: string) => (
                    <Accordion
                      key={category}
                      bgColor={`bg-purple_light_bg ${transformedData[category]?.Subkategori?.length > 0 ? '' : 'hidden'}`}
                      title={category}
                      description={
                        transformedData[category].categoryDescription
                      }
                    >
                      <Accordion.Item>
                        {transformedData[category]?.Subkategori &&
                          transformedData[category].Subkategori.map(
                            (subcategory: string) => (
                              <Accordion key={subcategory} title={subcategory}>
                                {transformedData[category]?.subCategoryDetail[
                                  subcategory
                                ] &&
                                  renderDownloadListFileButton(
                                    transformedData[category].subCategoryDetail[
                                      subcategory
                                    ]
                                  )}
                              </Accordion>
                            )
                          )}
                      </Accordion.Item>
                    </Accordion>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default Form;

const fetchContentDataWithCategory = async (params: any) => {
  const queryParams: QueryParams = {
    includeAttributes: 'true',
    searchFilter: params?.searchKeyWords || ''
  };

  try {
    const apiContent = await handleGetContentCategory(
      'Formulir-dan-Buku-Panduan',
      queryParams
    );
    return transformsData(apiContent, params.selectedCategory);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

function transformsData(responseData: any, selectedCategory?: string) {
  const transformedData: any = {};
  const kategoriFormulirList: string[] = [];
  for (const categoryName of Object.keys(responseData.data.categoryList)) {
    const categoryEntries = responseData.data.categoryList[categoryName];
    const categoryObject: any = {
      Subkategori: [],
      categoryDescription: '',
      subCategoryDetail: {}
    };
    categoryEntries.forEach((entry: any) => {
      const subkategori = entry.contentData.find(
        (data: any) => data.fieldId === 'subkategori'
      ).value;
      const namaFile = entry.contentData.find(
        (data: any) => data.fieldId === 'formulirdanbukupanduan-namafile'
      ).value;
      const url = JSON.parse(
        entry.contentData.find(
          (data: any) => data.fieldId === 'formulirdanbukupanduan-file'
        ).value
      )[0].imageUrl;

      const kategoriFormulir = entry.contentData.find(
        (data: any) => data.fieldId === 'kategori-formulir'
      ).value;
      categoryObject.categoryDescription = entry.categoryDescription;

      if (!kategoriFormulirList.includes(kategoriFormulir)) {
        kategoriFormulirList.push(kategoriFormulir);
      }

      if (!categoryObject['Subkategori'].includes(subkategori)) {
        categoryObject['Subkategori'].push(subkategori);
      }

      const formulirObject = {
        namaFile: namaFile,
        url: url,
        kategoriFormulir: kategoriFormulir
      };

      if (!categoryObject['subCategoryDetail'][subkategori]) {
        categoryObject['subCategoryDetail'][subkategori] = [];
      }
      categoryObject['subCategoryDetail'][subkategori].push(formulirObject);
    });
    if (selectedCategory) {
      for (const subkategori of Object.keys(categoryObject.subCategoryDetail)) {
        const foundedDetail = categoryObject.subCategoryDetail[
          subkategori
        ].filter(
          (formulir: any) => formulir.kategoriFormulir === selectedCategory
        );
        categoryObject.subCategoryDetail[subkategori] = foundedDetail;
        categoryObject.Subkategori =
          foundedDetail.length !== 0 ? categoryObject.Subkategori : undefined;
        categoryObject.categoryDescription =
          foundedDetail.length !== 0 ? categoryObject.categoryDescription : '';
      }
    }

    transformedData[categoryName] = categoryObject;
  }

  return { transformedData, kategoriFormulirList };
}
