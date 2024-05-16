'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Search from '@/assets/images/common/search.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import ButtonSelection from '@/components/molecules/specifics/avrast/ButtonSelection';
import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';
import { handleGetContentPage } from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukSyariah = () => {
  const [data, setData] = useState<PageResponse>();
  const [dataContent, setDataContent] = useState<IDataContent[]>([]);
  const [channels, setChannels] = useState<any>([]);
  const [selectedChannels, setSelectedChannels] = useState([]);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const { content } = pageTransformer(data);
  const titleImage = singleImageTransformer(content['title-image']);
  const banner = singleImageTransformer(content['banner-image']);
  const footer = singleImageTransformer(content['cta1-image']);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    handleGetContentPage('halaman-produk-syariah').then((res) => setData(res));

    const fetchDataContentWithCategory = async () => {
      try {
        const contentCategoryResponse = await fetch(
          `/api/produk-syariah/content-category?includeAttributes=true&channelFilter=${selectedChannels}&searchFilter=${searchValue}`
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

  const paginatedData = dataContent
    ? dataContent.slice(startIndex, endIndex)
    : [];
  const totalPages = dataContent
    ? Math.ceil(dataContent.length / itemsPerPage)
    : 0;

  const handleSelectedChannels = (value: any) => {
    setSelectedChannels(value);
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const handleChangeSearchParams = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Hero
        title="Produk Syariah"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Produk Syariah', href: '/avrist-syariah/produk' }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={banner.imageUrl}
      />
      <SimpleContainer>
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
                searchButtonClassname="bg-syariah_green_informing text-white"
                onSearch={handleChangeSearchParams}
              />
            </div>
          </div>

          <div className="xs:flex xs:flex-col md:grid md:grid-cols-3 gap-[24px]">
            {dataContent?.length > 0 &&
              paginatedData.map((item: any, index: number) => (
                <CardProduct
                  key={index}
                  imageProduk={item.produkImage.imageUrl}
                  symbol={item.kategoriProdukIcon.imageUrl}
                  title={item.jenisProduk}
                  summary={item.namaProduk}
                  description={item.deskripsiSingkatProduk}
                  tags={item.tags === '' ? '' : item.tags.split(',')}
                  href={`/avrist-syariah/produk/${item.id}`}
                  cardClassname="bg-white border-b-syariah_green"
                  cardTitleClassname="text-syariah_green"
                  cardTagsClassname="bg-syariah_green/[.2] text-syariah_green_informing"
                  cardButtonClassname="bg-syariah_green_informing text-white"
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
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <div>
              <p className="text-[1.25rem]">
                Menampilkan{' '}
                <span className="font-bold text-syariah_green">
                  {dataContent?.length === 0 ? 0 : startIndex + 1}-
                  {Math.min(endIndex, dataContent ? dataContent.length : 0)}
                </span>{' '}
                dari{' '}
                <span className="font-bold text-syariah_green">
                  {dataContent?.length}
                </span>{' '}
                hasil
              </p>
            </div>
            <div className="flex flex-row gap-[8px] items-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <div
                    key={page}
                    role="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                      currentPage === page ? 'text-syariah_green font-bold' : ''
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
                <Icon name="chevronRight" color="syariah_green" />
              </span>
            </div>
          </div>
        </div>
      </SimpleContainer>
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      <FooterInformation
        bgColor="bg-syariah_green_informing"
        outerClassName="bg-white"
        buttonVariant="syariah"
        title={
          <p className="xs:text-[2.25rem] sm:text-[3.5rem] text-white font-karla xs:leading-[2.5rem] md:leading-[3.125rem]">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={footer.imageUrl}
        href={'/tanya-avrista'}
      />
      <RoundedFrameTop bgColor="bg-purple_superlight" frameColor="bg-white" />
      <FooterCards
        bgColor="bg-purple_superlight"
        cards={[
          {
            title: 'Rumah Sakit Rekanan',
            icon: ProdukRumahSakit,
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
