'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import AsuransiJiwa from './tabs/AsuransiJiwa';
import AsuransiKecelakaan from './tabs/AsuransiKecelakaan';
import AsuransiKesehatan from './tabs/AsuransiKesehatan';
import AsuransiTambahan from './tabs/AsuransiTambahan';

import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import ButtonSelection from '@/components/molecules/specifics/avrast/ButtonSelection';
import { ButtonHelperItem } from '@/components/molecules/specifics/avrast/ButtonSelection';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import LeftTabs from '@/components/molecules/specifics/avrast/LeftTabs';
import SearchBar from '@/components/molecules/specifics/avrast/SearchBar';

import { ParamsProps } from '@/utils/globalTypes';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const IndividuProduk: React.FC<ParamsProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs = [
    'Asuransi Jiwa',
    'Asuransi Kesehatan',
    'Asuransi Kecelakaan',
    'Asuransi Tambahan'
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
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
    }
  }, [searchParams]);

  const buttonHelper: ButtonHelperItem[] = [
    { type: 'button', label: 'Individu', href: '/produk/individu' },
    {
      type: 'button',
      label: 'Korporasi',
      href: '/produk/korporasi',
      variant: 'outlined'
    },
    { type: 'button-checkbox', label: 'Via Online' },
    { type: 'button-checkbox', label: 'Via Bank' },
    { type: 'button-checkbox', label: 'Via Tenaga Pemasar' }
  ];

  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-front-sit.avristcms.barito.tech/api/page/produk-individu-hlm',
          { method: 'GET' }
        );
        const data = await response.json();
        setData(data);

        const { content } = pageTransformer(data);
        const titleImage = singleImageTransformer(content['title-image']);
        const bannerImage = singleImageTransformer(content['banner-image']);
        const footerImage = singleImageTransformer(content['cta1-image']);
        setData({ titleImage, bannerImage, footerImage });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  let titleImage, bannerImage, footerImage;

  if (data && data.bannerImage && data.footerImage) {
    titleImage = data.titleImage.imageUrl;
    bannerImage = data.bannerImage.imageUrl;
    footerImage = data.footerImage.imageUrl;
  }

  return (
    <div className="flex flex-col">
      <Hero
        title={activeTab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: activeTab, href: '#' }
        ]}
        bottomImage={bannerImage}
        imageUrl={titleImage}
      />
      <div className="flex flex-col px-[32px] sm:px-[136px] py-[50px] sm:py-[72px] gap-[36px] sm:gap-[48px] sm:flex-row">
        <LeftTabs
          tabs={tabs}
          activeTab={activeTab}
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
            />
            <ButtonSelection buttonHelper={buttonHelper} />
          </div>

          {activeTab === 'Asuransi Jiwa' && <AsuransiJiwa />}
          {activeTab === 'Asuransi Kesehatan' && <AsuransiKesehatan />}
          {activeTab === 'Asuransi Kecelakaan' && <AsuransiKecelakaan />}
          {activeTab === 'Asuransi Tambahan' && <AsuransiTambahan />}
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <div>
              <p className="text-[20px]">
                Menampilkan{' '}
                <span className="font-bold text-purple_dark">1-9</span> dari{' '}
                <span className="font-bold">20</span> hasil
              </p>
            </div>
            <div className="flex flex-row gap-[8px] items-center">
              <p className="text-[20px] text-purple_dark font-bold">1</p>
              <p className="text-[20px]">2</p>
              <p className="text-[20px]">3</p>
              <p className="text-[20px]">4</p>
              <Icon name="chevronRight" color="purple_dark" />
            </div>
          </div>
        </div>
      </div>

      <RoundedFrameBottom frameColor="bg-white" />
      <FooterInformation
        title={
          <p className="text-[36px] sm:text-[56px] text-center sm:text-left">
            <span className="font-bold text-purple_dark">Hello,</span> Ada yang
            bisa <span className="font-bold text-purple_dark">Avrista</span>{' '}
            bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={footerImage}
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
