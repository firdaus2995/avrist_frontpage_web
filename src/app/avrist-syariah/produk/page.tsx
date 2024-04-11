'use client';
import { useEffect, useState } from 'react';
import ProdukCard from '@/assets/images/avrast/avrist-syariah/about.svg';

import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import HelpCard from '@/components/molecules/specifics/avrast/Cards/HelpCard';
import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import CategoryPillsBox from '@/components/molecules/specifics/avrast/CategoryPillsBox';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';
import { handleGetContentPage } from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukSyariah = () => {
  const [data, setData] = useState<PageResponse>();
  const { content } = pageTransformer(data);
  const titleImage = singleImageTransformer(content['title-image']);
  const banner = singleImageTransformer(content['banner-image']);
  const footer = singleImageTransformer(content['cta1-image']);

  useEffect(() => {
    handleGetContentPage('halaman-produk-syariah').then((res) => setData(res));
  }, []);

  return (
    <div>
      <Hero
        title="Produk Syariah"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Avrist Syariah', href: '/avrist-syariah' },
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
        <div className="flex">
          <div className="w-1/2">
            <CategoryPillsBox
              buttonTitle={['Via Online', 'Via Bank', 'Via Tenaga Pemasaran']}
              buttonClassname="accent-syariah_green_informing border-syariah_green_informing"
              buttonTextClassname="text-syariah_green"
            />
          </div>
          <div className="w-1/2">
            <SearchBar
              placeholder="Cari Produk"
              searchButtonTitle="Cari"
              searchButtonClassname="bg-syariah_green_informing text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[24px]">
          {[...Array(6)].map((_, index) => (
            <CardProduct
              key={index}
              symbol={ProdukCard}
              title="Avrist Syariah"
              summary="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti."
              tags={['Avrist Syariah', 'Premi Tetap', 'Premi Berkala']}
              cardClassname="bg-white border-b-syariah_green"
              cardTitleClassname="text-syariah_green"
              cardTagsClassname="bg-syariah_green/[.2] text-syariah_green_informing"
              cardButtonClassname="bg-syariah_green_informing text-white"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div>
            <p className="text-[20px]">
              Menampilkan{' '}
              <span className="font-bold text-syariah_green_informing">
                1-9
              </span>{' '}
              dari <span className="font-bold">20</span> hasil
            </p>
          </div>
          <div className="flex flex-row gap-[8px] items-center">
            <p className="text-[20px] text-syariah_green_informing font-bold">
              1
            </p>
            <p className="text-[20px]">2</p>
            <p className="text-[20px]">3</p>
            <p className="text-[20px]">4</p>
            <Icon name="chevronRight" color="syariah_green_informing" />
          </div>
        </div>
      </SimpleContainer>
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      <SimpleContainer>
        <HelpCard
          title={
            <p className="text-[56px] text-white">
              <span className="font-bold">Hello,</span> Ada yang bisa{' '}
              <span className="font-bold">Avrista</span> bantu?
            </p>
          }
          cardClassname="bg-syariah_green_informing"
          buttonClassname="bg-white border border-white"
          buttonTextClassname="text-syariah_green_informing"
          buttonTitle="Tanya Avrista"
          href="/tanya-avrista"
          image={footer.imageUrl}
        />
      </SimpleContainer>
      <RoundedFrameTop bgColor="bg-white" frameColor="bg-white" />
      <FooterCards
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

export default ProdukSyariah;
