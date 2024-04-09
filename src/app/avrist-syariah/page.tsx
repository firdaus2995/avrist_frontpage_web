'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link as LinkScroll } from 'react-scroll';

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

import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import Hero from '@/components/molecules/specifics/avrast/Hero';

import { handleGetContentPage } from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { ParamsProps } from '@/utils/globalTypes';
import {
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
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');
  // content
  const [data, setData] = useState<PageResponse>();
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
  const dewanPengawasImage = singleImageTransformer(
    content['dewanpengawassyariah-imagedewan']
  );
  const dewanPengawasNama = contentStringTransformer(
    content['dewanpengawassyariah-namadewan']
  );
  const dewanPengawasTitleDewan = contentStringTransformer(
    content['dewanpengawassyariah-titledewan']
  );

  const manfaatUtamaJudul = contentStringTransformer(
    content['manfaatutama-judul']
  );
  const manfaatUtamaDeskripsi = contentStringTransformer(
    content['manfaatutama-deskripsi']
  );

  const footerImage = singleImageTransformer(content['cta1-image']);

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
    handleGetContentPage('halaman-tentang-avrist-syariah').then((res) =>
      setData(res)
    );
  }, []);

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
      <div className="flex flex-col justify-center mx-[32px] my-[50px] sm:mx-[136px] sm:my-[72px] gap-[64px]">
        <div className="flex flex-nowrap w-full justify-between gap-2 items-stretch">
          {tabs.map((val, idx) => (
            <LinkScroll
              key={idx}
              to={'#' + val.replace(/\s+/g, '')}
              spy={true}
              smooth={true}
              offset={-200}
              duration={500}
              onClick={() => handleTabClick(val)}
              className={`flex justify-center items-center w-full min-h-full border-1 rounded-lg px-[15px] py-[8px] cursor-pointer text-center align-middle border-syariah_green hover:bg-syariah_green hover:text-white ${tab === val ? 'bg-syariah_green text-white' : 'text-syariah_green'} font-semibold`}
            >
              <span className="font-semibold text-[16px]">{val}</span>
            </LinkScroll>
          ))}
        </div>
        {tab === 'Tentang Avrist Syariah' && (
          <TentangAvristSyariah
            title={dewanPengawasJudul}
            subTitle={dewanPengawasSubJudul}
            desc={dewanPengawasDeskripsi}
            boards={[
              {
                image: dewanPengawasImage.imageUrl,
                name: dewanPengawasNama,
                role: dewanPengawasTitleDewan
              }
            ]}
            manfaatUtamaJudul={manfaatUtamaJudul}
            manfaatUtamaDesc={manfaatUtamaDeskripsi}
          />
        )}
        {tab === 'Dewan Pengawas Syariah' && (
          <DewanPengawasSyariah
            title={dewanPengawasJudul}
            subTitle={dewanPengawasSubJudul}
            desc={dewanPengawasDeskripsi}
            boards={[
              {
                image: dewanPengawasImage.imageUrl,
                name: dewanPengawasNama,
                role: dewanPengawasTitleDewan
              }
            ]}
            manfaatUtamaJudul={manfaatUtamaJudul}
            manfaatUtamaDesc={manfaatUtamaDeskripsi}
          />
        )}
        {tab === 'Manfaat Utama' && (
          <ManfaatUtama
            title={dewanPengawasJudul}
            subTitle={dewanPengawasSubJudul}
            desc={dewanPengawasDeskripsi}
            boards={[
              {
                image: dewanPengawasImage.imageUrl,
                name: dewanPengawasNama,
                role: dewanPengawasTitleDewan
              }
            ]}
            manfaatUtamaJudul={manfaatUtamaJudul}
            manfaatUtamaDesc={manfaatUtamaDeskripsi}
          />
        )}
        {tab === 'Produk' && <Produk />}
        {tab === 'Klaim dan Layanan' && <KlaimDanLayanan />}
      </div>

      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-gray_bglightgray" />
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
          image={footerImage.imageUrl}
        />
      </SimpleContainer>
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
