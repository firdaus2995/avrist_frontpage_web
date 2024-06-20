'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link as LinkScroll } from 'react-scroll';

import Slider from 'react-slick';
import DewanPengawasSyariah from './tabs/DewanPengawasSyariah';
import KlaimDanLayanan from './tabs/KlaimDanLayanan';
import ManfaatUtama from './tabs/ManfaatUtama';
import Produk from './tabs/Produk';
import TentangAvristSyariah from './tabs/TentangAvristSyariah';

import ProdukEmail from '@/assets/images/avrast/component/proses-klaim/step-4-icon-1.svg';
import ProdukNasabah from '@/assets/images/avrast/component/proses-klaim/step-4-icon-3.svg';
import ProdukTanya from '@/assets/images/avrast/component/proses-klaim/step-4-icon-4.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import HelpCard from '@/components/molecules/specifics/avrast/Cards/HelpCard';

import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  handleGetContentCategory,
  handleGetContentPage
} from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { ParamsProps } from '@/utils/globalTypes';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const tabs = [
  'Tentang Avrist Syariah',
  'Dewan Pengawas Syariah',
  'Manfaat Utama',
  'Produk',
  'Klaim dan Layanan'
];

const AvristSyariah: React.FC<ParamsProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sliderRef = useRef<Slider | null>(null);
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');
  // content
  const [data, setData] = useState<PageResponse>();
  const [manajemenData, setManajemenData] = useState([
    {
      image: '',
      name: '',
      role: ''
    }
  ]);
  const { content } = pageTransformer(data);

  const titleImage = singleImageTransformer(content['title-image']);
  const bannerImage = singleImageTransformer(content['banner-image']);

  const dewanPengawasJudul = contentStringTransformer(
    content['dewanpengawassyariah-judul']
  );
  const dewanPengawasSubJudul = contentStringTransformer(
    content['dewanpengawassyariah-subjudul']
  );
  const dewanPengawasDeskripsi = contentStringTransformer(
    content['dewanpengawassyariah-deskripsi']
  );

  const manfaatUtamaJudul = contentStringTransformer(
    content['manfaatutama-judul']
  );
  const manfaatUtamaDeskripsi = contentStringTransformer(
    content['manfaatutama-deskripsi']
  );

  const footerImage = singleImageTransformer(content['cta1-image']);

  const sliderTabSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1.25,
    slidesToScroll: 1,
    centerPadding: '0px'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams: QueryParams = {
          includeAttributes: 'true'
        };
        const data = await handleGetContentCategory(
          'manajemen-avrist-syariah',
          queryParams
        );
        const newDataContentWithCategory = contentCategoryTransformer(data, '');

        const dataContentValues = newDataContentWithCategory?.map(
          ({ content }) => {
            const data = content['list-pengawas'].contentData;
            return {
              data
            };
          }
        );

        const transformedData = dataContentValues[0].data.map(
          (item: { details: any[] }) => {
            const details = item.details.reduce(
              (
                acc: { image: string; name: any; role: any },
                detail: { fieldId: string; value: any }
              ) => {
                if (detail.fieldId === 'foto') {
                  acc.image = singleImageTransformer(detail).imageUrl;
                } else if (detail.fieldId === 'nama') {
                  acc.name = detail.value;
                } else if (detail.fieldId === 'jabatan') {
                  acc.role = detail.value;
                }
                return acc;
              },
              {}
            );
            return details;
          }
        );

        setManajemenData(transformedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (tabs: string) => {
    setTab(tabs);
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
      setTab(value);
    }
  }, [searchParams]);

  useEffect(() => {
    if (tab === 'Produk') {
      router.push('/avrist-syariah/produk');
    } else if (tab === 'Klaim dan Layanan') {
      router.push('/avrist-syariah/klaim-layanan');
    }
  }, [tab]);

  useEffect(() => {
    handleGetContentPage('halaman-tentang-avrist-syariah-new').then((res) =>
      setData(res)
    );
  }, []);

  useEffect(() => {
    const activeIndex = tabs.findIndex((button) => button === tab);
    if (sliderRef.current && activeIndex !== -1) {
      sliderRef.current.slickGoTo(activeIndex);
    }
  }, [tab, tabs]);

  return (
    <div>
      <Hero
        title={tab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: tab, href: '#' }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
      />
      <div className="flex flex-col justify-center mx-[2rem] my-[3.125rem] sm:mx-[8.5rem] sm:my-[4.5rem] gap-[4rem]">
        <div className="flex-row w-full justify-between gap-[0.75rem] items-stretch xs:hidden md:flex">
          {tabs.map((val, idx) => (
            <LinkScroll
              key={idx}
              to={'#' + val.replace(/\s+/g, '')}
              spy={true}
              smooth={true}
              offset={-12.5}
              duration={500}
              onClick={() => handleTabClick(val)}
              className={`flex justify-center items-center w-full min-h-full border-1 rounded-lg px-[1.25rem] py-[0.5rem] cursor-pointer text-center align-middle border-syariah_green hover:bg-syariah_green hover:text-white ${tab === val ? 'bg-syariah_green text-white' : 'text-syariah_green'} font-semibold`}
            >
              <span className="font-semibold text-[1rem]">{val}</span>
            </LinkScroll>
          ))}
        </div>
        {/* Tab Mobile */}
        <div className="w-[95%] z-20 top-8 md:hidden">
          <div>
            <Slider
              {...sliderTabSettings}
              ref={(slider) => {
                sliderRef.current = slider;
              }}
            >
              {tabs.map((val, idx) => (
                <div className="px-[3.5px]" key={idx}>
                  <LinkScroll
                    to={'#' + val.replace(/\s+/g, '')}
                    spy={true}
                    smooth={true}
                    offset={-12.5}
                    duration={500}
                    onClick={() => handleTabClick(val)}
                    className={`flex justify-center items-center w-full min-h-full border-1 rounded-lg px-[1.25rem] py-[0.5rem] cursor-pointer text-center align-middle border-syariah_green hover:bg-syariah_green hover:text-white ${tab === val ? 'bg-syariah_green text-white' : 'text-syariah_green'} font-semibold`}
                  >
                    <span className="font-semibold text-[1rem]">{val}</span>
                  </LinkScroll>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {tab === 'Tentang Avrist Syariah' && (
          <TentangAvristSyariah
            title={dewanPengawasJudul}
            subTitle={dewanPengawasSubJudul}
            desc={dewanPengawasDeskripsi}
            boards={manajemenData}
          />
        )}
        {tab === 'Dewan Pengawas Syariah' && (
          <DewanPengawasSyariah
            title={dewanPengawasJudul}
            subTitle={dewanPengawasSubJudul}
            desc={dewanPengawasDeskripsi}
            boards={manajemenData}
            manfaatUtamaJudul={manfaatUtamaJudul}
            manfaatUtamaDesc={manfaatUtamaDeskripsi}
          />
        )}
        {tab === 'Manfaat Utama' && (
          <ManfaatUtama
            title={dewanPengawasJudul}
            subTitle={dewanPengawasSubJudul}
            desc={dewanPengawasDeskripsi}
            boards={manajemenData}
            manfaatUtamaJudul={manfaatUtamaJudul}
            manfaatUtamaDesc={manfaatUtamaDeskripsi}
          />
        )}
        {tab === 'Produk' && <Produk />}
        {tab === 'Klaim dan Layanan' && <KlaimDanLayanan />}
      </div>

      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-gray_bglightgray" />
      <HelpCard
        title={
          <p className="text-[3.5rem] text-white">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        cardClassname="bg-syariah_green_informing"
        buttonClassname="bg-white border border-white"
        buttonTextClassname="text-syariah_green_informing"
        buttonTitle="Tanya Avrista"
        image={footerImage.imageUrl}
        href="/tanya-avrista"
      />
      <RoundedFrameTop bgColor="bg-white" frameColor="bg-white" />
      {tab.includes('Klaim dan Layanan') ? (
        <FooterCards
          cards={[
            {
              title: 'Layanan Nasabah',
              icon: ProdukNasabah,
              subtitle: '021 5789 8188'
            },
            {
              title: 'Tanya Avrista',
              icon: ProdukTanya,
              subtitle: 'Lebih Lanjut'
            },
            {
              title: 'Tanya Lewat Email',
              icon: ProdukEmail,
              subtitle: 'Kirim Email'
            },
            {
              title: 'Prosedur Pengaduan',
              icon: ProdukTestimoni,
              subtitle: 'Lihat Prosedur'
            }
          ]}
        />
      ) : (
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
      )}
    </div>
  );
};

export default AvristSyariah;
