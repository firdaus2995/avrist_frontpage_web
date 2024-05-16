import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ButtonMenu } from '../InformasiNasabah/MainContentComponent';
import {
  VideoInformation,
  ReportList,
  ContentCard,
  Content,
  ContentReportList,
  ReportForm
} from './MainContentComponent';
import { Item } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom-purple-light.svg';
import { handleGetContent as handleGetMainContent, handleGetContentCategory } from '@/services/content-page.api';
import { PageInfo } from '@/types/provider.type';
import { QueryParams } from '@/utils/httpService';
import { contentCategoryTransformer, handleTransformedContent } from '@/utils/responseTransformer';

export const MainContent = ({ videoData }: any) => {
  const initialPageInfo: PageInfo = {
    pageSize: 5,
    totalPage: 0,
    pagePos: 1,
    totalData: 0
  }
  const [dataMainContent, setDataMainContent] = useState<{[key: string]: any;}>();
  const [selectedYear, setSelectedYear] = useState('');
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
  const tahunSet = new Set();    

  useEffect(() => {
    const params = {
      selectedCategory,
      selectedYear,
      searchKeywords
    }
    fetchContentData(params)
    .then((data) => {
      setDataMainContent(data);
      const categories = data && Object.keys(data).map((category) => category);
      setCategories(categories);      
      if (categories && categories.length !== 0) {
        setSelectedCategory(categories[0]);
      }
    });
  },[]);

  useEffect(() => {
    const params = {
      selectedCategory,
      selectedYear,
      searchKeywords
    }
    fetchContentData(params)
    .then((data) => {
      if (selectedCategory) {
      setDataMainContent(data);
      if (categories && categories.length !== 0) {
        setSelectedCategory(selectedCategory);
      }
      }
    });
  },[selectedCategory, selectedYear, searchKeywords]);

  const getListTahun = useCallback(() => {
    if (dataMainContent && categories && categories.length !== 0) {
      categories?.forEach(category => {
        dataMainContent[category]?.forEach((item: any) => {
            const tahunValue = item.content.tahun?.value;
            tahunSet.add(tahunValue);
        });
      });

      return Array.from(tahunSet);
    }
    return [];
  }, [categories])
  const tahunList = categories && getListTahun();

  const handleSelectedCategory = (value: string) => {
    setSelectedCategory(value);
    setSelectedYear('');
    setSearchKeywords('');
  }

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white flex flex-col gap-6">
        <div className="pt-[100px] px-[32px] md:px-[136px] md:pb-[80px] gap-[64px]">
          <ButtonMenu />
          <Content />
          <VideoInformation pageVideoData={videoData}/>
          <ContentCard />
          <ContentReportList />
          {dataMainContent && categories && 
          <ReportList 
            categories={categories} 
            reportData={dataMainContent} 
            tahunList={tahunList as string[]} 
            selectedCategory={selectedCategory}
            onSelectedCategory={handleSelectedCategory}
            selectedYear={selectedYear}
            onSelectedYear={(value: string) => setSelectedYear(value)}
            onChangeSearch={(value: string) => setSearchKeywords(value)}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
          />}
        </div>
        <ReportForm />
      </div>
      <Image
        alt="border-bottom"
        className="w-full h-auto"
        src={ROUNDED_FRAME_BOTTOM}
        style={{ userSelect: 'none' }}
      />
    </div>
  );
};

const fetchContentData = async (params: { selectedCategory: string, selectedYear: string, searchKeywords: string }) => {
  try {
    const queryParams: QueryParams = { 
      includeAttributes: 'true', 
      category: params.selectedCategory || '',
      ...(params.selectedYear && { yearFilter: params.selectedYear }),
      searchFilter: params.searchKeywords
    };

  if (!params.selectedCategory || params.selectedCategory === 'undefined') {
      const apiContentData = await handleGetMainContent('Laporan-Publikasi', { includeAttributes: 'true' });
      const newDataContent = apiContentData.data.contentDataList.map((item: any) => {
        return { 
          ...handleTransformedContent(item.contentData, item.title), categoryName: item.categoryName, id: item.id
        };
      });    
      return newDataContent.reduce(
        (acc: { [key: string]: Item[] }, item: Item) => { 
          const category = item.categoryName;
          acc[category] = [...(acc[category] || []), item];
          return acc;
          }, {});
    }

    const apiContentCategoryData = await handleGetContentCategory('Laporan-Publikasi', queryParams);    
    const newDataContentWithCategory = contentCategoryTransformer(apiContentCategoryData, params.selectedCategory);        
  return newDataContentWithCategory.reduce(
    (acc: { [key: string]: Item[] }, item: any) => {
          const category = params.selectedCategory;
          acc[category] = [...(acc[category] || []), item];
          return acc;
    }, {});
  }
  catch(errors: any) {
    throw new Error(errors.message);
  }
}

