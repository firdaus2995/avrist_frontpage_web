'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import EmployeeBenefit from './tabs/EmployeeBenefit';

import Search from '@/assets/images/common/search.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import ButtonSelection from '@/components/molecules/specifics/avrast/ButtonSelection';
import { ButtonHelperItem } from '@/components/molecules/specifics/avrast/ButtonSelection';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';
import LeftTabs from '@/components/molecules/specifics/avrast/LeftTabs';
import Pagination from '@/components/molecules/specifics/avrast/Pagination';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';

import { handleGetContentPage } from '@/services/content-page.api';
import { BASE_URL } from '@/utils/baseUrl';
import { ParamsProps } from '@/utils/globalTypes';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukKorporasi: React.FC<ParamsProps> = () => {
  const initialData = {
    titleImageUrl: '',
    bannerImageUrl: '',
    titleAltText: '',
    bannerAltText: '',
    footerInfoAltText: '',
    footerInfoImageUrl: ''
  };
  const [data, setData] = useState<dataKlaim>(initialData);
  const [dataContent, setDataContent] = useState<any>();
  const itemsPerPage = 9;
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs = ['Employee Benefit'];
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tabs: string) => {
    setActiveTab(tabs);
    router.push(pathname + '?' + createQueryString('tab', tabs), {
      scroll: false
    });
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
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
      href: '/produk/individu?tab=Asuransi+Jiwa',
      variant: 'outlined'
    },
    {
      type: 'button',
      label: 'Korporasi',
      href: '/produk/korporasi?tab=Employee+Benefit'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageBase = await handleGetContentPage('produk-korporasi');
        const { content } = pageTransformer(pageBase);
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
        const queryParams = {
          includeAttributes: true,
          searchRequest: {
            keyword: searchValue ?? '',
            fieldIds: ['nama-produk', 'tags'],
            postData: true
          },
          filters: [
            {
              fieldId: 'jenis-produk',
              keyword: 'Korporasi'
            }
          ],
          category: activeTab
        };
        const contentCategoryResponse = await fetch(
          `${BASE_URL.contentFilter}/Produk-Avras`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryParams)
          }
        );
        const data = await contentCategoryResponse.json();
        const transformedDataContent = contentCategoryTransformer(
          data,
          activeTab
        );
        const dataContentValues = transformedDataContent.map(
          ({ content, id }) => {
            const namaProduk = contentStringTransformer(content['nama-produk']);
            const tags = contentStringTransformer(content['tags']);
            const deskripsiSingkatProduk = contentStringTransformer(
              content['deskripsi-singkat-produk']
            );
            const taglineProduk = contentStringTransformer(
              content['tagline-produk']
            );
            const deskripsiLengkapProduk = contentStringTransformer(
              content['deskripsi-lengkap-produk']
            );
            const videoProduk = contentStringTransformer(
              content['video-produk']
            );
            const captionVideoProduk = contentStringTransformer(
              content['caption-video-produk']
            );
            const deskripsiKeunggulanProduk = contentStringTransformer(
              content['deskripsi-keunggulan-produk']
            );
            const deskripsiManfaatProduk = contentStringTransformer(
              content['deskripsi-manfaat-produk']
            );
            const deskripsiFiturProduk = contentStringTransformer(
              content['deskripsi-fitur-produk']
            );
            const deskripsiInformasiPenting = contentStringTransformer(
              content['deskripsi-informasi-penting']
            );
            const deskripsiRiplay = contentStringTransformer(
              content['deskripsi-riplay']
            );
            const deskripsiBrosur = contentStringTransformer(
              content['deskripsi-brosur']
            );
            const deskripsiJalurPemasaran = contentStringTransformer(
              content['deskripsi-jalur-pemasaran']
            );
            const jenisProduk = contentStringTransformer(
              content['jenis-produk']
            );
            const channel = contentStringTransformer(content['channel']);
            const produkImage = singleImageTransformer(content['produk-image']);
            const kategoriProdukIcon = singleImageTransformer(
              content['kategori-produk-icon']
            );
            const fileRiplay = singleImageTransformer(content['file-riplay']);
            const fileBrosur = singleImageTransformer(content['file-brosur']);

            return {
              namaProduk,
              tags,
              deskripsiSingkatProduk,
              taglineProduk,
              deskripsiLengkapProduk,
              videoProduk,
              captionVideoProduk,
              deskripsiKeunggulanProduk,
              deskripsiManfaatProduk,
              deskripsiFiturProduk,
              deskripsiInformasiPenting,
              deskripsiRiplay,
              deskripsiBrosur,
              deskripsiJalurPemasaran,
              jenisProduk,
              channel,
              produkImage,
              kategoriProdukIcon,
              fileRiplay,
              fileBrosur,
              id
            };
          }
        );
        setDataContent(dataContentValues);
        const endOffset = itemOffset + itemsPerPage;
        setPaginatedData(dataContentValues.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(dataContentValues.length / itemsPerPage));
        return dataContentValues;
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    const page = searchParams.get('page');
    setPageCount(0);
    if (!page || searchValue) {
      setItemOffset(0);
    } else {
      setItemOffset(
        parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * itemsPerPage
      );
    }
    fetchData().then();
    fetchDataContentWithCategory().then();
  }, [searchValue]);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!dataContent?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(dataContent.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataContent.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, dataContent]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % dataContent.length;
    setItemOffset(newOffset);
    window.scroll(0, 680);
  };

  const handleChangeSearchParams = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="flex flex-col">
      <Hero
        title={activeTab}
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
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="flex flex-col xs:gap-[36px] sm:gap-[24px] grow">
          <div className="flex flex-col xs:gap-[36px] sm:gap-[24px] justify-between">
            <SearchBar
              placeholder="Cari"
              searchButtonTitle="Cari"
              searchButtonClassname="bg-purple_dark hover:bg-purple_light border border-purple_dark text-white font-semibold"
              onSearch={handleChangeSearchParams}
              value={searchValue}
            />
            <ButtonSelection buttonHelper={buttonHelper} />
          </div>

          {dataContent?.length > 0 ? (
            activeTab === 'Employee Benefit' && (
              <EmployeeBenefit data={paginatedData} setState={setSearchValue} />
            )
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
            <span className="font-bold text-purple_dark">Hello,</span> Ada yang
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

export default dynamic(() => Promise.resolve(ProdukKorporasi), {
  ssr: false
});

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
