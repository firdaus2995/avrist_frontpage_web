'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import YellowHome from '@/assets/images/avrast/dplk/yellow-dplk-home-sun.svg';

import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import CategoryPillsBox from '@/components/molecules/specifics/avrast/CategoryPillsBox';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';
import { ContentData } from '@/types/content.type';
import {
  contentStringTransformer,
  handleTransformedContent,
  singleImageTransformer
} from '@/utils/responseTransformer';

type Props = {
  products: ContentData[];
};

const DPLKProductList = (props: Props) => {
  const { products } = props;
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string[]>([]);
  const pathname = usePathname();

  const tags = products
    .map((i) => {
      const { content } = handleTransformedContent(i.contentData, i.title);
      return contentStringTransformer(content['tags']);
    })
    .filter((i) => i && i !== '-');

  function filterBySearch(query: string): ContentData[] {
    const filtered = products.filter((person) =>
      person.title.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  }

  function filterByTags(): ContentData[] {
    if (filter.length === 0) {
      return filterBySearch(search);
    } else {
      const filteredData = filterBySearch(search).filter((product) => {
        const { content } = handleTransformedContent(
          product.contentData,
          product.title
        );
        const tag = contentStringTransformer(content['tags']);
        return filter.includes(tag);
      });
      return filteredData;
    }
  }

  return (
    <div className='flex flex-col gap-[64px] sm:py-[80px] sm:px-[136px] xs:p-4'>
      <CategoryPills
        buttonTitle={[
          'Tentang Avrist DPLK',
          'Dewan Pengawas DPLK',
          'Manfaat Utama',
          'Produk',
          'Klaim & Layanan'
        ]}
        selectedCategory="Produk"
        buttonActiveClassname="bg-dplk_yellow border-dplk_yellow"
        buttonInactiveClassname="bg-transparent border-dplk_yellow text-black hover:bg-dplk_yellow hover:border-dplk_yellow hover:text-white"
        buttonActiveTextClassname="text-white"
        links={{
          'Tentang Avrist DPLK': '/avrist-dplk/#TentangAvristDPLK',
          'Dewan Pengawas DPLK': '/avrist-dplk/#DewanPengawasDPLK',
          'Manfaat Utama': '/avrist-dplk/#ManfaatUtama',
          Produk: '/avrist-dplk/produk',
          'Klaim & Layanan': '/avrist-dplk/klaim-layanan'
        }}
      />
      <div className="flex sm:flex-row xs:flex-col-reverse xs:items-center sm:items-start sm:gap-0 xs:gap-4">
        <div className="sm:w-1/2 xs:w-full flex-wrap">
          <CategoryPillsBox
            buttonTitle={tags}
            buttonClassname="accent-dplk_yellow border-dplk_yellow w-[240px]"
            buttonTextClassname="text-black whitespace-normal"
            onChangeFilter={setFilter}
          />
        </div>
        <div className="sm:w-1/2 xs:w-full">
          <SearchBar
            placeholder="Cari Produk"
            searchButtonTitle="Cari"
            searchButtonClassname="bg-dplk_yellow text-white"
            onSearch={setSearch}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-[24px]">
        {filterByTags().map((i, index) => {
          const { content } = handleTransformedContent(i.contentData, i.title);
          const produkImage = singleImageTransformer(content['produk-image']);
          const namaProduk = contentStringTransformer(content['nama-produk']);
          const tags = contentStringTransformer(content['tags']) as string;
          const deskripsiSingkatProduk = contentStringTransformer(
            content['deskripsi-singkat-produk']
          );
          return (
            <CardProduct
              key={index}
              imageProduk={produkImage.imageUrl}
              symbol={YellowHome}
              title={'Avrist DPLK'}
              summary={namaProduk}
              href={`${pathname}/${i.id}`}
              description={deskripsiSingkatProduk}
              // tags={['Avrist Syariah', 'Premi Tetap', 'Premi Berkala']}
              tags={tags.length ? tags.split(',') : []}
              cardClassname="bg-white border-b-dplk_yellow"
              cardTitleClassname="text-dplk_yellow"
              cardTagsClassname="bg-dplk_yellow/[.2] text-dplk_yellow"
              cardButtonClassname="bg-dplk_yellow text-white"
            />
          );
        })}
      </div>
      {/* <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <p className="text-[20px]">
            Menampilkan <span className="font-bold text-dplk_yellow">1-9</span>{' '}
            dari <span className="font-bold">20</span> hasil
          </p>
        </div>
        <div className="flex flex-row gap-[8px] items-center">
          <p className="text-[20px] text-dplk_yellow font-bold">1</p>
          <p className="text-[20px]">2</p>
          <p className="text-[20px]">3</p>
          <p className="text-[20px]">4</p>
          <Icon name="chevronRight" color="dplk_yellow" />
        </div>
      </div> */}
    </div>
  );
};

export default DPLKProductList;
