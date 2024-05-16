'use client';

import React, { useEffect, useState } from 'react';
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
    const [transformedData, setTransFormedData] = useState<any>();
    const [selectedCategory, setSelectedCategory] = useState('');  
    const [searchKeyWords, setSearchKeywords] = useState('');

    useEffect(() => {
      fetchContentDataWithCategory({}).then(
        (data: any) => {
          console.log({data});
          
          setCategories(data.kategoriFormulirList);
          setSelectedCategory(data.kategoriFormulirList[0]);
          setTransFormedData(data.transformedData);
        }
      );
    }, []);

    useEffect(() => {
      const params = {
      selectedCategory,
      searchKeyWords
    }
      fetchContentDataWithCategory(params).then(
        (data: any) => {
          if (selectedCategory) {
          setTransFormedData(data.transformedData);
            if (categories && categories.length !== 0) {
              setSelectedCategory(selectedCategory);
              }
            }
        }
      );
    }, [selectedCategory, searchKeyWords]);

  const btnVerticalData = categories?.map(item => {    
    return {
      title: item,
      onClick: () => setSelectedCategory(item)
    };
  });

const renderDownloadListFileButton = (listData: any) => {
  return listData.map((item: any, index: number) => {
     const filePath = `${BASE_URL.image}/${item?.url ?? ''}`;    
    return (
    <DownloadFileButton key={index} title={item.namaFile} fileType={item?.fileType} filePath={filePath}/>
    );
  });
}

  return (
    <div className="z-[1] w-full bg-purple_dark -mt-1">
      <div className="bg-white flex flex-col pt-[6.25rem] px-[32px] md:px-[8.5rem] pb-[1.625rem] gap-[4rem]">
        <ButtonMenu
          buttonList={[
            'Informasi Nasabah',
            'Rumah Sakit Rekanan',
            'Formulir & Buku Panduan',
            'Performa Investasi'
          ]}
        />

        <section className="w-full flex flex-col items-center text-center">
          <h1 className="font-karla sm:text-[3.5rem] xs:text-[2.25rem] text-purple_dark font-medium">
            List formulir dan buku panduan yang mungkin Anda butuhkan
          </h1>
          <h2 className="font-karla sm:text-4xl xs:text-[1.5rem]">
            Silahkan pilih dan unduh formulir dan buku panduan yang Anda butuhkan
          </h2>
        </section>

        <section className="">
          <div className="flex xs:flex-col md:flex-row gap-10">
            <div className="xs:w-[100%] md:w-[23%] h-full bg-purple_light_bg rounded-xl">
              { btnVerticalData && <ButtonMenuVertical item={btnVerticalData} />}
            </div>
            <div className="xs:w-[100%] md:w-[77%] -mt-3">
              <SearchBox onSearch={(value: string) => {setSearchKeywords(value)}} placeHolder="Cari Formulir" />
              <div className="flex flex-col gap-3">              
              {
                transformedData && Object.keys(transformedData).map((category: string) => (
                  <Accordion
                    key={category}
                    bgColor="bg-purple_light_bg"
                    title={category}
                    description={transformedData[category].shortDescription}
                  >
                    <Accordion.Item>
                      {transformedData[category]?.Subkategori && transformedData[category].Subkategori.map((subcategory: string) => (
                        <Accordion key={subcategory} title={subcategory}>
                          {
                            transformedData[category]?.subCategoryDetail[subcategory] &&
                            renderDownloadListFileButton(transformedData[category].subCategoryDetail[subcategory])
                          }
                        </Accordion>
                      ))}
                    </Accordion.Item>
                  </Accordion>
                ))
              }

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

try{
   const apiContent = await handleGetContentCategory('Formulir-dan-Buku-Panduan', queryParams);
    return transformsData(apiContent, params.selectedCategory);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function transformsData(responseData: any, selectedCategory?: string) {
    const transformedData: any = {};
    const kategoriFormulirList: string[] = [];
    for (const categoryName of Object.keys(responseData.data.categoryList)) {
        const categoryEntries = responseData.data.categoryList[categoryName];
        const categoryObject: any = {
            "Subkategori": [],
            "shortDescription": '',
            "subCategoryDetail": {}
        };
        categoryEntries.forEach((entry: any) => {
            const subkategori = entry.contentData.find((data: any) => data.fieldId === "subkategori").value;
            const namaFile = entry.contentData.find((data: any) => data.fieldId === "formulirdanbukupanduan-namafile").value;
            const url = JSON.parse(entry.contentData.find((data: any) => data.fieldId === "formulirdanbukupanduan-file").value)[0].imageUrl;
            
            const kategoriFormulir = entry.contentData.find((data: any) => data.fieldId === "kategori-formulir").value;
            categoryObject.shortDescription = entry.shortDesc;

            if (!kategoriFormulirList.includes(kategoriFormulir)) {
                kategoriFormulirList.push(kategoriFormulir);
            }

            if (!categoryObject["Subkategori"].includes(subkategori)) {
                categoryObject["Subkategori"].push(subkategori);
            }

            const formulirObject = {
                "namaFile": namaFile,
                "url": url,
                "kategoriFormulir": kategoriFormulir
            };

            if (!categoryObject["subCategoryDetail"][subkategori]) {
                categoryObject["subCategoryDetail"][subkategori] = [];
            }
            categoryObject["subCategoryDetail"][subkategori].push(formulirObject);
        });
        
        if (selectedCategory) {
            for (const subkategori of Object.keys(categoryObject.subCategoryDetail)) {
              const foundedDetail = categoryObject.subCategoryDetail[subkategori].filter((formulir: any) => formulir.kategoriFormulir === selectedCategory);
                categoryObject.subCategoryDetail[subkategori] = foundedDetail;
                categoryObject.Subkategori = foundedDetail.length !== 0 ? categoryObject.Subkategori : undefined;
                categoryObject.shortDescription = foundedDetail.length !== 0 ? categoryObject.shortDescription : '';
            }
        }

        transformedData[categoryName] = categoryObject;
    }

    return { transformedData, kategoriFormulirList};
}
