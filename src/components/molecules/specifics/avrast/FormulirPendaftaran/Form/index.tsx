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
    const [categories, setCategories] = useState<string[]>();
    const [transformedData, setTransFormedData] = useState<any>();
    const [selectedCategory, setSelectedCategory] = useState('');  

    useEffect(() => {
      fetchContentDataWithCategory({}).then(
        (data: any) => {
          setCategories(data.categoryList);
          setSelectedCategory(data.categoryList[0]);
          setTransFormedData(data);
        }
      );
    }, []);

    useEffect(() => {
      const params = {
      selectedCategory,
      // searchKeywords
    }
      fetchContentDataWithCategory(params).then(
        (data: any) => {
          if (selectedCategory) {
          setTransFormedData(data);
            if (categories && categories.length !== 0) {
              setSelectedCategory(selectedCategory);
              }
            }
        }
      );
    }, [selectedCategory]);

  const btnVerticalData = categories?.map(item => {    
    return {
      title: item,
      onClick: () => setSelectedCategory(item)
    };
  });

const renderDownloadListFileButton = (listData: any) => {
  return listData.map((item: any, index: number) => {
     const fileUrl = JSON.parse(item.fileUrl)[0];
     const filePath = `${BASE_URL.image}/${fileUrl?.imageUrl ?? ''}`;
    return (
    <DownloadFileButton key={index} title={item.namaFile} fileType={item?.fileType} filePath={filePath}/>
    );
  });
}

  return (
    <div className="z-[1] w-full bg-purple_dark -mt-1">
      <div className="bg-white pt-[100px] px-[32px] md:px-[136px] pb-2">
        <ButtonMenu
          buttonList={[
            'Informasi Nasabah',
            'Rumah Sakit Rekanan',
            'Formulir & Buku Panduan',
            'Performa Investasi'
          ]}
        />

        <section className="w-full flex flex-col items-center text-center my-[60px]">
          <h1 className="font-karla text-[48px] 2xl:text-[56px] text-purple_dark font-medium">
            Kebutuhan formulir dan buku panduan Anda
          </h1>
          <h2 className="font-karla text-[28px] 2xl:text-[36px]">
            <span className="font-bold">Baca</span>,{' '}
            <span className="font-bold">pilih</span>,{' '}
            <span className="font-bold">unduh</span>,{' '}
            <span className="font-bold">isi</span>, dan{' '}
            <span className="font-bold">kirim</span> atau diskusikan dengan
            Kami!
          </h2>
        </section>

        <section className="mb-2">
          <div className="flex xs:flex-col md:flex-row gap-10">
            <div className="xs:w-[100%] md:w-[23%] h-full bg-purple_light_bg rounded-xl">
              { btnVerticalData && <ButtonMenuVertical item={btnVerticalData} />}
            </div>
            <div className="xs:w-[100%] md:w-[77%] -mt-3">
              <SearchBox onSearch={() => {}} placeHolder="Cari Formulir" />
              <div className="flex flex-col gap-3">
              {transformedData && transformedData.contentTypeCategory?.map((category: string) => (
                <Accordion
                  key={category}
                  bgColor="bg-purple_light_bg"
                  title={category}
                  description={`${transformedData.categoryShortDescription[category]}`}
                >
                  <Accordion.Item>
                    {transformedData?.subCategory && transformedData.subCategory[category]?.map((subcategory: string) => (
                      <Accordion key={subcategory} title={subcategory}>
                      {
                        transformedData?.subCategoryDetail[category] &&
                        renderDownloadListFileButton(transformedData?.subCategoryDetail[category][subcategory])
                      }
                      </Accordion>
                    ))}
                  </Accordion.Item>
                </Accordion>
              ))}
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
      searchFilter: params?.searchKeywords || ''
    };

try{
   const apiContent = await handleGetContentCategory('Formulir-dan-Buku-Panduan', queryParams);
    return transformFetchedDataWithSelected(apiContent, params.selectedCategory);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

const transformFetchedDataWithSelected = (data: any, selectedCategory?: string) => {
   const transformedData: any = {
    categoryList: [],
    categorizedData: {},
    contentTypeCategory: [],
    categoryShortDescription: {},
    subCategory: {}, 
    subCategoryDetail: {}
  };

  Object.entries(data.data.categoryList).forEach(([category, contentList]: any) => {
    const categoryName = contentList[0].contentData.find((data: any) => data.fieldId === 'kategori-formulir')?.value;  
    if (categoryName && !transformedData.categoryList.includes(categoryName)) {
      transformedData.categoryList.push(categoryName);
    }

    transformedData.contentTypeCategory.push(category);
    transformedData.categoryShortDescription[category] = contentList[0].shortDesc;
    const subcategories = contentList.map((content: any) => content.contentData.find((data: any) => data.fieldId === 'subkategori')?.value);
    transformedData.subCategory[category] = subcategories;

    transformedData.subCategoryDetail[category] = {};
    contentList.forEach((content: any) => {
      const subcategory = content.contentData.find((data: any) => data.fieldId === 'subkategori')?.value;
      if (!transformedData.subCategoryDetail[category][subcategory]) {
        transformedData.subCategoryDetail[category][subcategory] = [];
      }
      transformedData.subCategoryDetail[category][subcategory].push({
          namaFile: content.contentData.find((data: any) => data.fieldId === 'formulirdanbukupanduan-namafile')?.value,
          fileUrl: content.contentData.find((data: any) => data.fieldId === 'formulirdanbukupanduan-file')?.value
      });
    });

    transformedData.categorizedData[category] = contentList.map((content: any) => ({
      id: content.id,
      title: content.title,
      categoryName: content.categoryName,
      contentData: content.contentData,
      mainCategory: category,
      contentTypeDescription: content.shortDesc
    }));
  });

  if (selectedCategory) {
    const isMatchingData = (data: any) => {
      return data.fieldId === 'kategori-formulir' && data.value === selectedCategory;
    }
    
    const filteredData = Object.entries(transformedData).reduce((filteredResult: any, [key, value]: any) => {
      switch (key) {
        case 'categorizedData':
          filteredResult[key] = Object.fromEntries(
            Object.entries(value).map(([category, categoryData]: any) => [
              category,
              categoryData.filter((content: any) =>
                content.contentData.some(
                  (data: any) => isMatchingData(data)
                )
              ),
            ])
          );
          break;
        case 'subCategory':
          filteredResult[key] = Object.fromEntries(
            Object.entries(value).map(([category, subcategories]: any) => [
              category,
              subcategories.filter(() =>
                data.data.categoryList[category][0].contentData.some(
                  (data: any) => isMatchingData(data)
                )
              ),
            ])
          );
          break;
        case 'subCategoryDetail':
          filteredResult[key] = Object.fromEntries(
            Object.entries(value).map(([category, subCategoryDetails]: any) => [
              category,
              Object.fromEntries(
                Object.entries(subCategoryDetails).map(([subCategory, details]: any) => [
                  subCategory,
                  details.filter((detail: any) =>
                    detail.namaFile &&
                    detail.fileUrl &&
                    data.data.categoryList[category][0].contentData.some(
                      (data: any) => isMatchingData(data)
                    )
                  ),
                ])
              ),
            ])
          );
          break;
        default:
          filteredResult[key] = value;
          break;
      }
      return filteredResult;
    }, {});
    return filteredData;
  }

  return transformedData;
}

