'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Search from '@/assets/images/common/search.svg';
import Icon from '@/components/atoms/Icon';
import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import CategoryPillsBox from '@/components/molecules/specifics/avrast/CategoryPillsBox';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const DPLKProductList = () => {
  const [search, setSearch] = useState('');
  const pathname = usePathname();
  const [channels, setChannels] = useState<any>([]);
  const [selectedChannels, setSelectedChannels] = useState<any>([]);
  const [dataContent, setDataContent] = useState<IDataContent[]>();
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchDataContentWithCategory = async () => {
      try {
        const contentCategoryResponse = await fetch(
          `/api/produk-dplk/content-category?channelFilter=${selectedChannels?.length === channels?.length ? undefined : selectedChannels}&searchFilter=${search}`
        );
        const data = await contentCategoryResponse.json();
        const transformedDataContent = contentCategoryTransformer(data, '-');

        const dataContentValues = transformedDataContent?.map(
          ({ content, id }) => {
            const namaProduk = contentStringTransformer(content['nama-produk']);
            const tags = contentStringTransformer(content['tags']);
            const deskripsiSingkatProduk = contentStringTransformer(
              content['deskripsi-singkat-produk']
            );
            const deskripsiLengkapProduk = contentStringTransformer(
              content['deskripsi-lengkap-produk']
            );
            const jenisProduk = contentStringTransformer(
              content['jenis-produk']
            );
            const channel = contentStringTransformer(content['channel']);
            const produkImage = singleImageTransformer(content['produk-image']);
            const kategoriProdukIcon = singleImageTransformer(
              content['kategori-produk-icon']
            );

            return {
              namaProduk,
              tags,
              deskripsiSingkatProduk,
              deskripsiLengkapProduk,
              jenisProduk,
              channel,
              produkImage,
              kategoriProdukIcon,
              id
            };
          }
        );

        setDataContent(dataContentValues);

        return dataContentValues;
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchDataContentWithCategory().then((dataContentValues) => {
      if (dataContentValues) {
        const channelValues = dataContentValues.map((data: any) => {
          return data['channel'];
        });
        const uniqueChannels = new Set(
          channelValues?.filter((channel: string) => channel !== '')
        );
        setChannels(Array.from(uniqueChannels));
      }
    });
  }, [selectedChannels, search]);

  const paginatedData = dataContent
    ? dataContent.slice(startIndex, endIndex)
    : [];
  const totalPages = dataContent
    ? Math.ceil(dataContent.length / itemsPerPage)
    : 0;

  const handleSelectedChannels = (value: any) => {
    setSelectedChannels(value[0]);
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const handleChangeSearchParams = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="flex flex-col xs:gap-[2.25rem] md:gap-[4rem] mt-[3.125rem] sm:pb-[6px] xs:px-[2rem] md:px-[8.5rem]">
      <CategoryPills
        buttonTitle={[
          'Tentang DPLK Avrist',
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
          'Tentang DPLK Avrist': '/avrist-dplk/#TentangAvristDPLK',
          'Dewan Pengawas DPLK': '/avrist-dplk/#DewanPengawasDPLK',
          'Manfaat Utama': '/avrist-dplk/#ManfaatUtama',
          Produk: '/avrist-dplk/produk',
          'Klaim & Layanan': '/avrist-dplk/klaim-layanan'
        }}
      />
      <div className="flex sm:flex-row xs:flex-col xs:items-center sm:items-start sm:gap-0 xs:gap-[1.5rem]">
        <div className="sm:w-1/2 xs:w-full flex-wrap">
          <CategoryPillsBox
            buttonTitle={channels}
            buttonClassname="accent-dplk_yellow border-dplk_yellow w-[240px]"
            buttonTextClassname="text-black whitespace-normal"
            onChangeFilter={handleSelectedChannels}
          />
        </div>
        <div className="sm:w-1/2 xs:w-full">
          <SearchBar
            placeholder="Cari Produk"
            searchButtonTitle="Cari"
            searchButtonClassname="bg-dplk_yellow text-white"
            onSearch={handleChangeSearchParams}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-[24px]">
        {paginatedData.map((i, index) => {
          return (
            <CardProduct
              key={index}
              imageProduk={i.produkImage.imageUrl}
              symbol={i.kategoriProdukIcon.imageUrl}
              title={'Avrist DPLK'}
              summary={i.namaProduk}
              href={`${pathname}/${i.id}`}
              description={i.deskripsiSingkatProduk}
              tags={i.tags.split(',')}
              cardClassname="bg-white border-b-dplk_yellow"
              cardTitleClassname="text-dplk_yellow"
              cardTagsClassname="bg-dplk_yellow/[.2] text-dplk_yellow"
              cardButtonClassname="bg-dplk_yellow text-white"
            />
          );
        })}
      </div>
      {dataContent?.length === 0 && (
        <div className="w-full flex flex-col md:px-52 2xl:px-[345px] mt-8 mb-10 gap-4 items-center justify-center">
          <Image src={Search} alt="search" />
          <div className="flex flex-col gap-4">
            <div className="w-[324px] text-center">
              <p className="font-karla font-bold text-[24px]">Page Not Found</p>
              <p className="font-opensans text-[16px] mt-[12px]">
                Coba sesuaikan pencarian Anda untuk menemukan apa yang Anda
                cari.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <p className="text-[20px]">
            Menampilkan{' '}
            <span className="font-bold text-purple_dark">
              {dataContent?.length === 0 ? 0 : startIndex + 1}-
              {Math.min(endIndex, dataContent ? dataContent.length : 0)}
            </span>{' '}
            dari <span className="font-bold">{dataContent?.length}</span> hasil
          </p>
        </div>
        <div className="flex flex-row gap-[12px] items-center">
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
  );
};

export default DPLKProductList;

export interface IDataContent {
  categoryName?: string;
  createdAt?: string;
  namaProduk: string;
  tags: string;
  deskripsiSingkatProduk: string;
  deskripsiLengkapProduk: string;
  jenisProduk: string;
  channel: string;
  produkImage: { imageUrl: string; altText: string };
  kategoriProdukIcon: { imageUrl: string; altText: string };
  id: number;
}
