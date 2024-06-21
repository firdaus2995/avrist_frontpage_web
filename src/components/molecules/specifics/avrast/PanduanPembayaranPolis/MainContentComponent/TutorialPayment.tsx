'use client';
import React, { useEffect, useState } from 'react';
import Accordion from '../../Accordion';
import ButtonMenuVertical from '../../ButtonMenuVertical';
import { handleGetContentCategory } from '@/services/content-page.api';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  contentStringTransformer
} from '@/utils/responseTransformer';

export const TutorialPayment = () => {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [dataContent, setDataContent] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams: QueryParams = {
          includeAttributes: 'true'
        };
        const data = await handleGetContentCategory(
          'Cara-Pembayaran-Premi',
          queryParams
        );

        setCategoryList(Object.keys(data.data.categoryList));
        setSelectedCategory(Object.keys(data.data.categoryList)[0]);
        const transformedDataContent = contentCategoryTransformer(
          data,
          selectedCategory
        );

        const dataContentValues = transformedDataContent?.map(
          ({ content, id }) => {
            const nama = contentStringTransformer(
              content['panduanpembayaranpremi-namapanduanpembayaran']
            );
            const desc = contentStringTransformer(
              content['panduanpembayaranpremi-listdeskripsi']
            );

            return {
              nama,
              desc,
              id
            };
          }
        );

        setDataContent(dataContentValues);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const btnVerticalData = categoryList?.map((item) => {
    return {
      title: item,
      onClick: () => {
        setSelectedCategory(item);
      }
    };
  });

  return (
    <div className={`w-full flex flex-col justify-center relative`}>
      <div className="w-full flex md:flex-row xs:flex-col">
        <div className="xs:hidden md:block">
          {btnVerticalData && <ButtonMenuVertical item={btnVerticalData} />}
        </div>

        <div className="md:w-3/4 xs:w-full flex flex-col gap-4 sm:ml-[3rem] xs:ml-0">
          {dataContent &&
            dataContent.map((value, idx) => (
              <Accordion
                key={idx}
                bgColor="bg-purple_light_bg"
                title={value.nama}
                htmlDescription={value.desc}
              ></Accordion>
            ))}
        </div>
      </div>
    </div>
  );
};
