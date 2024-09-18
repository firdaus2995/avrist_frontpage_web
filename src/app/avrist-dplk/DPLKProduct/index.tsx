'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Search from '@/assets/images/common/search.svg';
import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import CategoryPillsBox from '@/components/molecules/specifics/avrast/CategoryPillsBox';
import Pagination from '@/components/molecules/specifics/avrast/Pagination';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';
import { handleGetContentFilter } from '@/services/content-page.api';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const DPLKProductList = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [channels, setChannels] = useState<any>([]);
  const [selectedChannels, setSelectedChannels] = useState<any>([]);
  const [dataContent, setDataContent] = useState<IDataContent[]>();
  const itemsPerPage = 9;
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchDataContentWithCategory = async () => {
      try {
        const queryParams = {
          includeAttributes: true,
          searchRequest: {
            keyword: search ?? '',
            fieldIds: ['nama-produk', 'tags'],
            postData: true
          },
          filters: [
            ...(selectedChannels &&
            selectedChannels !== '' &&
            selectedChannels.length > 0
              ? [
                  {
                    fieldId: 'channel',
                    keyword: selectedChannels
                  }
                ]
              : [])
          ],
          category: ''
        };
        const data = await handleGetContentFilter(
          'Produk-Avrast-DPLK',
          queryParams
        );
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
        if (channels.length === 0) {
          setChannels(Array.from(uniqueChannels));
        }
      }
    });
  }, [selectedChannels, search]);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!dataContent?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(dataContent.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataContent.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, dataContent]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    if (dataContent) {
      const newOffset = (event.selected * itemsPerPage) % dataContent.length;
      const page =
        newOffset === 0 ? '1' : (newOffset / itemsPerPage + 1).toString();
      router.push(pathname + '?' + createQueryStringPage('page', page), {
        scroll: false
      });
      setItemOffset(newOffset);
      window.scroll(0, 680);
    }
  };

  const handleSelectedChannels = (value: any) => {
    setSelectedChannels(value[0]);
  };

  const handleChangeSearchParams = (value: string) => {
    setSearch(value);
    const page = searchParams.get('page');
    setPageCount(0);
    if (!page || search) {
      setItemOffset(0);
    } else {
      setItemOffset(
        parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * itemsPerPage
      );
    }
  };

  const createQueryStringPage = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col xs:gap-[3.125rem] md:gap-[4rem] mt-[3.125rem] sm:mt-[5rem] xs:px-[2rem] md:px-[8.5rem] mb-2">
      <CategoryPills
        buttonTitle={[
          'Tentang DPLK Avrist',
          'Dewan Pengawas DPLK',
          'Manfaat DPLK',
          'Program DPLK',
          'Klaim & Layanan'
        ]}
        selectedCategory="Program DPLK"
        buttonActiveClassname="bg-dplk_yellow border-dplk_yellow"
        buttonInactiveClassname="bg-transparent border-dplk_yellow text-black hover:bg-dplk_yellow hover:border-dplk_yellow hover:text-white"
        buttonInactiveTextClassname="text-dplk_yellow hover:text-white"
        buttonActiveTextClassname="text-white"
        links={{
          'Tentang DPLK Avrist': '/avrist-dplk?tab=Tentang+DPLK+Avrist',
          'Dewan Pengawas DPLK': '/avrist-dplk?tab=Dewan+Pengawas+DPLK',
          'Manfaat DPLK': '/avrist-dplk?tab=Manfaat+DPLK',
          'Program DPLK': '/avrist-dplk/produk',
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
            searchButtonClassname="bg-dplk_yellow hover:bg-dplk_yellow_highlight text-white"
            onSearch={handleChangeSearchParams}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[1.5rem] sm:-mt-[2.5rem]">
        <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-[24px]">
          {dataContent &&
            dataContent?.length > 0 &&
            paginatedData.map((i, index) => {
              return (
                <CardProduct
                  key={index}
                  imageProduk={i.produkImage.imageUrl}
                  symbol={i.kategoriProdukIcon.imageUrl}
                  title={'DPLK Avrist'}
                  summary={i.namaProduk}
                  href={`${pathname}/${i.id}`}
                  description={i.deskripsiSingkatProduk}
                  tags={i.tags.split(',')}
                  cardClassname="bg-white border-b-dplk_yellow"
                  cardTitleClassname="text-dplk_yellow"
                  cardTagsClassname="bg-dplk_yellow/[.2] text-dplk_yellow"
                  cardButtonClassname="bg-dplk_yellow text-white hover:bg-dplk_yellow_highlight"
                />
              );
            })}
        </div>
        {dataContent?.length === 0 && (
          <div className="w-full flex flex-col md:px-52 2xl:px-[345px] mt-8 mb-10 gap-4 items-center justify-center">
            <Image src={Search} alt="search" />
            <div className="flex flex-col gap-4">
              <div className="w-[324px] text-center">
                <p className="font-karla font-bold text-[24px]">
                  Page Not Found
                </p>
                <p className="font-opensans text-[16px] mt-[12px]">
                  Coba sesuaikan pencarian Anda untuk menemukan apa yang Anda
                  cari.
                </p>
              </div>
            </div>
          </div>
        )}
        <Pagination
          data={dataContent}
          itemOffset={itemOffset}
          itemsPerPage={itemsPerPage}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          customColor="dplk_yellow"
        />
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
