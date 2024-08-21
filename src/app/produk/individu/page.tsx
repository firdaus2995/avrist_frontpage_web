'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AsuransiJiwa from './tabs/AsuransiJiwa';
import AsuransiKesehatan from './tabs/AsuransiKesehatan';

import AsuransiTambahan from './tabs/AsuransiTambahan';
import Search from '@/assets/images/common/search.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import ButtonSelection from '@/components/molecules/specifics/avrast/ButtonSelection';
import { ButtonHelperItem } from '@/components/molecules/specifics/avrast/ButtonSelection';
import CardCategoryA from '@/components/molecules/specifics/avrast/Cards/CategoryA';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import LeftTabs from '@/components/molecules/specifics/avrast/LeftTabs';
import Pagination from '@/components/molecules/specifics/avrast/Pagination';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';

import { ParamsProps } from '@/utils/globalTypes';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const IndividuProduk: React.FC<ParamsProps> = () => {
  const initialData = {
    titleImageUrl: '',
    bannerImageUrl: '',
    bannerImageFit: '',
    titleAltText: '',
    bannerAltText: '',
    footerInfoAltText: '',
    footerInfoImageUrl: ''
  };
  const [data, setData] = useState<IDataPage>(initialData);
  const [dataContent, setDataContent] = useState<any>();
  const [channels, setChannels] = useState<any>([]);
  const [selectedChannels, setSelectedChannels] = useState<any>('');
  const itemsPerPage = 9;
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs = ['Asuransi Jiwa', 'Asuransi Kesehatan', 'Asuransi Tambahan'];
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') ?? tabs[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryChange, setIsCategoryChange] = useState(true);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!dataContent?.length) {
      setPaginatedData([]);
      setPageCount(0);
      return;
    } // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(dataContent.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataContent.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, dataContent]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % dataContent.length;
    const page =
      newOffset === 0 ? '1' : (newOffset / itemsPerPage + 1).toString();
    router.push(pathname + '?' + createQueryStringPage('page', page), {
      scroll: false
    });
    setItemOffset(newOffset);
    window.scroll(0, 680);
  };

  const handleTabClick = (tabs: string) => {
    setActiveTab(tabs);
    setPageCount(0);
    setItemOffset(0);
    setDataContent(null);
    setSearchValue('');
    setSelectedChannels([]);
    setIsCategoryChange(true);
    router.push(pathname + '?' + createQueryString('tab', tabs), {
      scroll: false
    });
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name === 'tab') {
        params.delete('nameOrTags');
        setSearchValue('');
      }
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const value = searchParams.get('tab');
    if (value !== null) {
      setActiveTab(value);
    } else {
      setActiveTab('Asuransi Jiwa');
    }
  }, [searchParams]);

  const buttonHelper: ButtonHelperItem[] = [
    {
      type: 'button',
      label: 'Individu',
      href: '/produk/individu?tab=Asuransi+Jiwa'
    },
    {
      type: 'button',
      label: 'Korporasi',
      href: '/produk/korporasi?tab=Employee+Benefit',
      variant: 'outlined'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/produk/individu`);
        const data = await response.json();

        const { content } = pageTransformer(data);
        const titleImage = singleImageTransformer(content['title-image']);
        const bannerImage = customImageTransformer(content['banner-image']);
        const bannerImageFit = content['banner-image']?.config
          ? JSON.parse(content['banner-image']?.config)?.image_fit
          : '';
        const footerImage = singleImageTransformer(content['cta1-image']);
        setData({
          titleImageUrl: titleImage.imageUrl,
          bannerImageUrl: bannerImage.imageUrl,
          bannerImageFit,
          titleAltText: titleImage.altText,
          bannerAltText: bannerImage.altText,
          footerInfoAltText: footerImage.altText,
          footerInfoImageUrl: footerImage.imageUrl
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchDataContentWithCategory = async () => {
      try {
        if (activeTab) {
          const contentCategoryResponse = await fetch(
            `/api/produk/content-category?productFilter=individu&category=${activeTab}&channelFilter=${selectedChannels}&searchFilter=${searchValue}`
          );
          const data = await contentCategoryResponse.json();
          const transformedDataContent = contentCategoryTransformer(
            data,
            activeTab
          );

          const dataContentValues = transformedDataContent?.map(
            ({ content, id }) => {
              const namaProduk = contentStringTransformer(
                content['nama-produk']
              );
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
              const produkImage = singleImageTransformer(
                content['produk-image']
              );
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
          const endOffset = itemOffset + itemsPerPage;
          setPaginatedData(dataContentValues.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(dataContentValues.length / itemsPerPage));
          return dataContentValues;
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    setPageCount(0);
    setItemOffset(0);
    fetchData().then();
    fetchDataContentWithCategory().then((dataContentValues) => {
      if (isCategoryChange && dataContentValues) {
        const channelValues = dataContentValues.map((data: any) => {
          return data['channel'];
        });
        const uniqueChannels = new Set(
          channelValues?.filter((channel: string) => channel !== '')
        );
        setIsCategoryChange(false);
        setChannels(Array.from(uniqueChannels));
      }
    });
  }, [searchParams, selectedChannels, searchValue]);

  const createQueryStringPage = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSelectedChannels = (value: any) => {
    if (selectedChannels === value) {
      setSelectedChannels('');
    } else {
      setSelectedChannels(value);
    }
  };

  const handleChangeSearchParams = (value: string) => {
    setSearchValue(value);
  };

  const renderCard = () => {
    if (!activeTab) {
      return (
        dataContent && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
            {paginatedData.map((item: any, index: number) => (
              <CardCategoryA
                key={index}
                imageProduk={item.produkImage.imageUrl}
                symbol={item.kategoriProdukIcon.imageUrl}
                title={item.categoryName}
                summary={item.namaProduk}
                description={item.deskripsiSingkatProduk}
                tags={item.tags.split(',')}
                setStateTags={setSearchValue}
                href={`/produk/individu/${item.id}`}
              />
            ))}
          </div>
        )
      );
    }

    const renderActiveTab = {
      'Asuransi Jiwa': () => (
        <AsuransiJiwa data={paginatedData} setState={setSearchValue} />
      ),
      'Asuransi Kesehatan': () => (
        <AsuransiKesehatan data={paginatedData} setState={setSearchValue} />
      ),
      'Asuransi Tambahan': () => (
        <AsuransiTambahan data={paginatedData} setState={setSearchValue} />
      )
    };

    return (
      renderActiveTab[
        activeTab as keyof typeof renderActiveTab
      ] as () => JSX.Element
    )();
  };

  return (
    <div className="flex flex-col">
      <Hero
        title={activeTab || ''}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Produk', href: '#' }
        ]}
        bottomImage={data.bannerImageUrl}
        bottomImageFit={data.bannerImageFit}
        imageUrl={data.titleImageUrl}
      />
      <div className="flex flex-col px-[32px] sm:px-[136px] xs:pt-[50px] sm:pt-[5rem] pb-[28px] xs:gap-[36px] sm:gap-[24px] sm:flex-row">
        <LeftTabs
          tabs={tabs}
          activeTab={activeTab || ''}
          handleTabClick={handleTabClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="flex flex-col xs:gap-[36px] sm:gap-[24px] grow">
          <div className="flex flex-col xs:gap-[36px] sm:gap-[24px] justify-between">
            <SearchBar
              placeholder="Cari"
              searchButtonTitle="Cari"
              searchButtonClassname="bg-purple_dark hover:bg-purple_light text-white font-semibold"
              onSearch={handleChangeSearchParams}
              activeTab={activeTab}
              value={searchValue}
            />
            <ButtonSelection
              buttonHelper={buttonHelper}
              channels={channels}
              onSelectChannels={handleSelectedChannels}
              selectedChannels={selectedChannels}
            />
          </div>

          {dataContent?.length > 0 ? (
            renderCard()
          ) : (
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
          />
        </div>
      </div>

      <RoundedFrameBottom frameColor="bg-white" />
      <FooterInformation
        title={
          <p className="font-light xs:text-[2.25rem] sm:text-[3.5rem] text-black font-karla xs:leading-[2.5rem] md:leading-[67.2px] xs:-tracking-[2.5px] sm:-tracking-[2.24px]">
            <span className="font-bold text-purple_dark">Hello, </span>Ada yang
            bisa <span className="font-bold text-purple_dark">Avrista</span>{' '}
            bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={data.footerInfoImageUrl}
        href={'/tanya-avrista'}
      />
      <RoundedFrameTop bgColor="xs:bg-white md:bg-purple_superlight" />
      <FooterCards
        bgColor="xs:bg-white md:bg-purple_superlight"
        cards={[
          {
            title: 'Rumah Sakit Rekanan',
            icon: ProdukRumahSakit,
            subtitle: 'Lebih Lanjut',
            href: '/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan'
          },
          {
            title: 'Klaim & Layanan',
            icon: ProdukClaim,
            subtitle: 'Lebih Lanjut',
            href: '/klaim-layanan/klaim?tab=Informasi+Klaim'
          },
          {
            title: 'Kelola Polis',
            icon: ProdukPolis,
            subtitle: 'Login Akun',
            href: 'https://my.avrist.com/welcome'
          },
          {
            title: 'Testimonial',
            icon: ProdukTestimoni,
            subtitle: 'Lebih Lanjut',
            href: '/promo-berita/berita?tab=Testimonial'
          }
        ]}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(IndividuProduk), {
  ssr: false
});

export interface IDataPage {
  titleImageUrl: string;
  titleAltText: string;
  bannerImageUrl: string;
  bannerAltText: string;
  bannerImageFit?: string;
  footerInfoImageUrl: string;
  footerInfoAltText: string;
}

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
