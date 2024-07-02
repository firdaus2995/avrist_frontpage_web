'use client';

import React, { useCallback, useEffect, useState } from 'react';
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

import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import ButtonSelection from '@/components/molecules/specifics/avrast/ButtonSelection';
import { ButtonHelperItem } from '@/components/molecules/specifics/avrast/ButtonSelection';
import CardCategoryA from '@/components/molecules/specifics/avrast/Cards/CategoryA';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import LeftTabs from '@/components/molecules/specifics/avrast/LeftTabs';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';

import { ParamsProps } from '@/utils/globalTypes';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const IndividuProduk: React.FC<ParamsProps> = () => {
  const initialData = {
    titleImageUrl: '',
    bannerImageUrl: '',
    titleAltText: '',
    bannerAltText: '',
    footerInfoAltText: '',
    footerInfoImageUrl: ''
  };
  const [data, setData] = useState<IDataPage>(initialData);
  const [dataContent, setDataContent] = useState<IDataContent[]>();
  const [channels, setChannels] = useState<any>([]);
  const [selectedChannels, setSelectedChannels] = useState<any>('');
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  const handleTabClick = (tabs: string) => {
    setActiveTab(tabs);
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
        const bannerImage = singleImageTransformer(content['banner-image']);
        const footerImage = singleImageTransformer(content['cta1-image']);
        setData({
          titleImageUrl: titleImage.imageUrl,
          bannerImageUrl: bannerImage.imageUrl,
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

          return dataContentValues;
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };

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

  const paginatedData = dataContent
    ? dataContent.slice(startIndex, endIndex)
    : [];
  const totalPages = dataContent
    ? Math.ceil(dataContent.length / itemsPerPage)
    : 0;

  const handleSelectedChannels = (value: any) => {
    if (selectedChannels === value) {
      setSelectedChannels('');
    } else {
      setSelectedChannels(value);
    }
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
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
        imageUrl={data.titleImageUrl}
      />
      <div className="flex flex-col px-[32px] sm:px-[136px] py-[50px] sm:pt-[5rem] sm:pb-[5rem] gap-[36px] sm:gap-[48px] sm:flex-row">
        <LeftTabs
          tabs={tabs}
          activeTab={activeTab || ''}
          handleTabClick={handleTabClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="flex flex-col gap-[24px] grow">
          <div className="flex flex-col gap-5 justify-between">
            <SearchBar
              placeholder="Cari"
              searchButtonTitle="Cari"
              searchButtonClassname="bg-purple_dark border border-purple_dark text-white font-semibold"
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
          {renderCard()}
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
            <div className="flex flex-row gap-[12px] items-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
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
      <RoundedFrameTop bgColor="bg-white" />
      <FooterCards
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

export default IndividuProduk;

export interface IDataPage {
  titleImageUrl: string;
  titleAltText: string;
  bannerImageUrl: string;
  bannerAltText: string;
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
