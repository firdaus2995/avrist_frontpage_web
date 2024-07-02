'use client';
import { useEffect, useState } from 'react';
import { CardMenuLink } from './CardMenu';
import { ContentList } from './ContentList';
import { ContentPolicyList } from './ContentPolicyList';
import { PolicyContent } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import { PageInfo } from '@/types/provider.type';
import {
  contentStringTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

export const DocumentPolicy = ({ policyGuideData }: PolicyContent) => {
  const initialPageInfo: PageInfo = {
    pageSize: 5,
    totalPage: 0,
    pagePos: 1,
    totalData: 0
  };
  const [activeTitle, setActiveTitle] = useState('');
  const [policyData, setPolicyData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [listContent, setListContent] = useState('');
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);

  useEffect(() => {
    if (activeTitle !== '') {
      const data = transformData(activeTitle);
      setSelectedCategory(data?.category[0]);
      setPolicyData(data);
    }
  }, [activeTitle]);

  useEffect(() => {
    if (selectedCategory !== '') {
      const data = policyData?.contentData?.filter(
        (item: any) => item.category === selectedCategory
      );
      setListContent(data);
      setIsShowDetail(true);
    }
  }, [selectedCategory]);

  const transformData = (activeTitle: string) => {
    // Find the active item based on the title
    const activeItem = policyGuideData?.find(
      (item: { title: any }) => item.title === activeTitle
    );

    if (!activeItem) return null;

    const { content } = activeItem;

    // Extract the necessary fields
    const title = contentStringTransformer(content['judul-topik']);
    const desc = contentStringTransformer(content['deskripsi']);

    const category: any = [];
    content['kategori-topik'].contentData.map(
      (item: { details: { value: any }[] }) =>
        category.push(item.details[0].value)
    );

    const contentData: any = [];
    content['isi-topik'].contentData.map((item: { details: any }) => {
      const details = item.details;
      const data = {
        title: details.find(
          (d: { fieldId: string }) => d.fieldId === 'judul-topik'
        ).value,
        desc: details.find(
          (d: { fieldId: string }) => d.fieldId === 'deskripsi-topik'
        ).value,
        file1Name: details.find(
          (d: { fieldId: string }) => d.fieldId === 'nama-file1'
        ).value,
        file1: singleImageTransformer(
          details.find(
            (d: { fieldId: string }) => d.fieldId === 'file-document1'
          )
        ),
        category: details.find(
          (d: { fieldId: string }) => d.fieldId === 'nama-kategori-isi'
        ).value,
        file2Name: details.find(
          (d: { fieldId: string }) => d.fieldId === 'nama-file2'
        ).value,
        file2: singleImageTransformer(
          details.find(
            (d: { fieldId: string }) => d.fieldId === 'file-document2'
          )
        ),
        file3Name: details.find(
          (d: { fieldId: string }) => d.fieldId === 'nama-file3'
        ).value,
        file3: singleImageTransformer(
          details.find(
            (d: { fieldId: string }) => d.fieldId === 'file-document3'
          )
        )
      };
      contentData.push(data);
    });

    return { title, desc, category, contentData };
  };

  const onChangeCategories = (value: string) => {
    setSelectedCategory(value);
  };

  const onBack = (value: boolean) => {
    if (value) {
      setIsShowDetail(false);
      setSelectedCategory('');
      setListContent('');
      setPolicyData(null);
      setActiveTitle('');
    }
  };

  return (
    <div>
      {isShowDetail ? (
        <div className="flex flex-col gap-[5rem] -mt-[1rem] mb-[3rem]">
          <ContentPolicyList
            title={policyData?.title}
            desc={policyData?.desc}
          />
          <ContentList
            categories={policyData?.category}
            listData={listContent}
            selectedCategory={selectedCategory}
            onSelectedCategory={onChangeCategories}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            onBack={onBack}
          />
        </div>
      ) : (
        <div>
          <div className="sm:-mt-[1rem] flex flex-col gap-[1.5rem] xs:-mt-[44px]">
            {policyGuideData?.map((item: any, index: any) => (
              <div
                key={index}
                role="button"
                onClick={() => {
                  setActiveTitle(item.title);
                }}
              >
                <CardMenuLink desc={item.title} />
              </div>
            ))}
          </div>
          <div className="mt-[4rem]">
            <CardMenuLink
              desc="Masuk untuk mengetahui informasi polis Anda"
              href="https://my.avrist.com/welcome"
              openNewTab
            />
          </div>
        </div>
      )}
    </div>
  );
};
