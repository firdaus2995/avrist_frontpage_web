'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBox from '../../SearchBox';
import NewsCard from './NewsCard';
import ServiceCard from './ServiceCard';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import { handleGetContentCategory } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  contentStringTransformer
} from '@/utils/responseTransformer';

export interface IDataContent {
  label: string;
  date: string;
  title: string;
  description: string;
  tags: string;
}

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState('Asuransi Individu');
  const [currentSlug, setCurrentSlug] = useState('Produk-Avras');
  const [searchKeyWords, setSearchKeywords] = useState('');
  const [dataContent, setDataContent] = useState<IDataContent[]>();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let listData = [];
        const queryParams: QueryParams = {
          includeAttributes: 'true',
          searchFilter: searchKeyWords
        };
        const data = await handleGetContentCategory(currentSlug, queryParams);
        console.log(data);

        if (activeTab === 'Asuransi Individu') {
          const data1 = contentCategoryTransformer(data, 'Asuransi Jiwa');
          const data2 = contentCategoryTransformer(data, 'Asuransi Kesehatan');
          const newDataContentWithCategory = data1.concat(data2);
          listData = newDataContentWithCategory;
        } else if (activeTab === 'Asuransi Korporasi') {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            'Employee Benefit'
          );
          listData = newDataContentWithCategory;
        } else {
          const newDataContentWithCategory = contentCategoryTransformer(
            data,
            '-'
          );
          listData = newDataContentWithCategory;
        }

        const dataContentValues = listData?.map(
          ({ content, id, createdAt }) => {
            const label = contentStringTransformer(content['jenis-produk']);
            const date = createdAt;
            const title = contentStringTransformer(content['nama-produk']);
            const description = contentStringTransformer(
              content['deskripsi-lengkap-produk']
            );
            const tags = contentStringTransformer(content['tags']);

            return {
              label,
              date,
              title,
              description,
              tags,
              id
            };
          }
        );

        setCurrentPage(1);
        setDataContent(dataContentValues);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [activeTab, searchKeyWords]);

  const paginatedData = dataContent
    ? dataContent.slice(startIndex, endIndex)
    : [];
  const totalPages = dataContent
    ? Math.ceil(dataContent.length / itemsPerPage)
    : 0;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-purple_dark w-full flex flex-col -mt-[1px]">
      <div className="sm:px-10 md:px-40 2xl:px-96 pt-12 bg-white rounded-t-[80px] flex flex-col gap-6">
        <SearchBox
          onSearch={(value: string) => {
            setSearchKeywords(value);
          }}
        />

        <div className="px-3 grid grid-cols-4 gap-x-4">
          <Button
            title={'Asuransi Individu'}
            onClick={() => {
              setActiveTab('Asuransi Individu');
              setCurrentSlug('Produk-Avras');
            }}
            customButtonClass={`${activeTab === 'Asuransi Individu' && 'bg-purple_dark text-white'}`}
          />
          <Button
            title={'Asuransi Korporasi'}
            onClick={() => {
              setActiveTab('Asuransi Korporasi');
              setCurrentSlug('Produk-Avras');
            }}
            customButtonClass={`${activeTab === 'Asuransi Korporasi' && 'bg-purple_dark text-white'}`}
          />
          <Button
            title={'Avrist Syariah'}
            onClick={() => {
              setActiveTab('Avrist Syariah');
              setCurrentSlug('Produk-Avrast-Syariah');
            }}
            customButtonClass={`${activeTab === 'Avrist Syariah' && 'bg-olive_green text-white'} !border-olive_green hover:bg-olive_green`}
          />
          <Button
            title={'Avrist DPLK'}
            onClick={() => {
              setActiveTab('Avrist DPLK');
              setCurrentSlug('Produk-Avrast-DPLK');
            }}
            customButtonClass={`${activeTab === 'Avrist DPLK' && 'bg-yellow_alternate text-white'} !border-yellow_alternate hover:bg-yellow_alternate`}
          />
        </div>

        <ServiceCard />

        <div className="flex flex-col gap-3">
          {dataContent &&
            paginatedData.map((item, index) => (
              <Link href="" key={index}>
                <NewsCard
                  label={item.label}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  tags={item.tags.split(',')}
                />
              </Link>
            ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div>
            <p className="text-[20px]">
              Menampilkan{' '}
              <span className="font-bold text-purple_dark">
                {dataContent?.length === 0 ? 0 : startIndex + 1}-
                {Math.min(endIndex, dataContent ? dataContent.length : 0)}
              </span>{' '}
              dari <span className="font-bold">{dataContent?.length}</span>{' '}
              hasil
            </p>
          </div>
          <div className="flex flex-row gap-[8px] items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div
                key={page}
                role="button"
                onClick={() => handlePageChange(page)}
                className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                  currentPage === page ? 'text-purple_dark font-bold' : ''
                }`}
              >
                {page}
              </div>
            ))}
            <span
              className="mt-[3px]"
              role="button"
              onClick={() => handlePageChange(totalPages)}
            >
              <Icon name="chevronRight" color="purple_dark" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
