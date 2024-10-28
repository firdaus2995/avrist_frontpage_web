'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Search from '@/assets/images/common/search.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import ButtonSelection from '@/components/molecules/specifics/avrast/ButtonSelection';
import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import Pagination from '@/components/molecules/specifics/avrast/Pagination';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';
import {
  handleGetContentFilter,
  handleGetContentPage
} from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukSyariah = () => {
  const [data, setData] = useState<PageResponse>();
  const [dataContent, setDataContent] = useState<IDataContent[]>([]);
  const [channels, setChannels] = useState<any>([]);
  const [selectedChannels, setSelectedChannels] = useState('');

  const itemsPerPage = 9;
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const { content } = pageTransformer(data);
  const titleImage = singleImageTransformer(content['title-image']);
  const banner = customImageTransformer(content['banner-image']);
  const bannerImageFit = content['banner-image']?.config
    ? JSON.parse(content['banner-image']?.config)?.image_fit
    : '';
  const footer = singleImageTransformer(content['cta1-image']);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    handleGetContentPage('halaman-produk-syariah').then((res) => setData(res));

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
            ...(selectedChannels && selectedChannels !== ''
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
          'Produk-Avrast-Syariah',
          queryParams
        );
        // const data = await contentCategoryResponse.json();
        const transformedDataContent = contentCategoryTransformer(data, '-');

        const dataContentValues = transformedDataContent?.map(
          ({ content, id }) => {
            const namaProduk = contentStringTransformer(content['nama-produk']);
            const tags = contentStringTransformer(content['tags']);
            const deskripsiSingkatProduk = contentStringTransformer(
              content['deskripsi-singkat-produk']
            );
            const channel = contentStringTransformer(content['channel']);
            const produkImage = singleImageTransformer(content['produk-image']);
            const kategoriProdukIcon = singleImageTransformer(
              content['kategori-produk-icon']
            );
            const jenisProduk = contentStringTransformer(
              content['jenis-produk']
            );

            return {
              namaProduk,
              tags,
              deskripsiSingkatProduk,
              channel,
              produkImage,
              kategoriProdukIcon,
              jenisProduk,
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
      if (selectedChannels?.length === 0 && dataContentValues) {
        const channelValues = dataContentValues.map((data: any) => {
          return data['channel'];
        });
        const uniqueChannels = new Set(
          channelValues?.filter((channel: string) => channel !== '')
        );
        setChannels(Array.from(uniqueChannels));
      }
    });
  }, [selectedChannels, searchValue]);

  const handleSelectedChannels = (value: any) => {
    if (selectedChannels === value) {
      setSelectedChannels('');
    } else {
      setSelectedChannels(value);
    }
  };

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
    setPageCount(0);
    setItemOffset(0);
  };

  return (
    <div>
      <Hero
        title="Produk Syariah"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Produk Syariah', href: '/avrist-syariah/produk' }
        ]}
        imageUrl={titleImage?.imageUrl}
        bottomImage={banner?.imageUrl}
        bottomImageFit={bannerImageFit}
      />
      <CustomContainer className="xs:mt-[3.125rem] sm:mt-[5rem] flex flex-col gap-[3.125rem] sm:gap-[4rem]">
        <CategoryPills
          buttonTitle={[
            'Tentang Avrist Syariah',
            'Dewan Pengawas Syariah',
            'Manfaat Utama',
            'Produk',
            'Klaim & Layanan'
          ]}
          selectedCategory="Produk"
          buttonActiveClassname="bg-syariah_green border-syariah_green"
          buttonInactiveClassname="bg-transparent border-syariah_green text-syariah_green hover:bg-syariah_green hover:border-syariah_green hover:text-white"
          buttonActiveTextClassname="text-white"
          links={{
            'Tentang Avrist Syariah':
              '/avrist-syariah?tab=Tentang+Avrist+Syariah',
            'Dewan Pengawas Syariah':
              '/avrist-syariah?tab=Dewan+Pengawas+Syariah',
            'Manfaat Utama': '/avrist-syariah?tab=Manfaat+Utama',
            Produk: '/avrist-syariah/produk',
            'Klaim & Layanan': '/avrist-syariah/klaim-layanan'
          }}
        />
        <div className="flex flex-col gap-[1.5rem]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="xs:w-full md:w-1/2">
              <ButtonSelection
                buttonHelper={[]}
                channels={channels}
                onSelectChannels={handleSelectedChannels}
                selectedChannels={selectedChannels}
                customColor={{
                  accent: 'accent-syariah_green',
                  border: 'border-syariah_green',
                  text: 'text-syariah_green'
                }}
              />
            </div>
            <div className="xs:w-full md:w-1/2">
              <SearchBar
                placeholder="Cari Produk"
                searchButtonTitle="Cari"
                searchButtonClassname="bg-syariah_green_informing hover:bg-syariah_green_highlight text-white"
                onSearch={handleChangeSearchParams}
              />
            </div>
          </div>

          <div className="xs:flex xs:flex-col md:grid md:grid-cols-3 gap-[24px]">
            {dataContent?.length > 0 &&
              paginatedData.map((item: any, index: number) => (
                <CardProduct
                  key={index}
                  imageProduk={item?.produkImage.imageUrl}
                  symbol={item?.kategoriProdukIcon.imageUrl}
                  title={item?.jenisProduk}
                  summary={item?.namaProduk}
                  description={item?.deskripsiSingkatProduk}
                  tags={item?.tags === '' ? '' : item?.tags.split(',')}
                  href={`/avrist-syariah/produk/${item?.id}`}
                  cardClassname="bg-white border-b-syariah_green"
                  cardTitleClassname="text-syariah_green"
                  cardTagsClassname="bg-syariah_green/[.2] text-syariah_green_informing"
                  cardButtonClassname="bg-syariah_green_informing text-white hover:bg-syariah_green_highlight"
                  onClickTags={(item: string) => {
                    handleChangeSearchParams(item);
                  }}
                />
              ))}
          </div>

          {dataContent.length === 0 && (
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
            customColor="syariah_green"
          />
        </div>
      </CustomContainer>
      <div className="w-full flex flex-col mt-2">
        <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      </div>

      <FooterInformation
        bgColor="bg-syariah_green_informing"
        outerClassName="bg-white"
        buttonVariant="syariah"
        title={
          <p className="font-light xs:text-[2.25rem] sm:text-[3.5rem] text-white font-karla xs:leading-[2.5rem] md:leading-[67.2px] xs:-tracking-[2.5px] sm:-tracking-[2.24px]">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={footer.imageUrl}
        href={'/tanya-avrista'}
      />
      <RoundedFrameTop
        bgColor="xs:bg-white sm:bg-purple_superlight"
        frameColor="bg-white"
      />
      <FooterCards
        bgColor="xs:bg-white sm:bg-purple_superlight"
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
            href: 'https://my.avrist.com/welcome',
            openInNewTab: true
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

export default ProdukSyariah;

export interface IDataContent {
  categoryName?: string;
  createdAt?: string;
  namaProduk: string;
  tags: string;
  deskripsiSingkatProduk: string;
  jenisProduk: string;
  channel: string;
  produkImage: { imageUrl: string; altText: string };
  kategoriProdukIcon: { imageUrl: string; altText: string };
  id: number;
}
