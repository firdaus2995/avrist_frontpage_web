'use client';
import { Suspense, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';

import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';

import {
  handleGetContent,
  handleGetContentPage
} from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer
} from '@/utils/responseTransformer';

const DPLKContent = dynamic(() => import('./DPLKContent'), { ssr: false });

const AvristSyariah = () => {
  // const pageBase = await handleGetContentPage(
  //   BASE_SLUG.AVRIST_DPLK.PAGE.AVRIST_DPLK
  // );
  const [data, setData] = useState<PageResponse>();
  const [pengawas, setPengawas] = useState<any>();
  const [pengurus, setPengurus] = useState<any>();
  const { content } = pageTransformer(data);
  const titleImage = singleImageTransformer(content['title-image']);
  const bannerImage = singleImageTransformer(content['banner-image']);
  const bannerImageFit = content['banner-image']?.config
    ? JSON.parse(content['banner-image']?.config)?.image_fit
    : '';
  const dewanpengawasdplkJudul = contentStringTransformer(
    content['dewanpengawasdplk-judul']
  );
  const dewanpengawasdplkSubjudul = contentStringTransformer(
    content['dewanpengawasdplk-subjudul']
  );
  const dewanpengawasdplkDeskripsi = contentStringTransformer(
    content['dewanpengawasdplk-deskripsi']
  );
  const cta1Image = singleImageTransformer(content['cta1-image']);

  useEffect(() => {
    handleGetContentPage(BASE_SLUG.AVRIST_DPLK.PAGE.AVRIST_DPLK).then((res) =>
      setData(res)
    );

    setTimeout(() => {
      const element = document.getElementById('DewanPengawasDplk');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 100);
  }, []);

  useEffect(() => {
    handleGetContent(BASE_SLUG.AVRIST_DPLK.CONTENT.AVRIST_DPLK, {
      includeAttributes: 'true'
    }).then((res) => {
      const filterPengawas = res.data.contentDataList.filter((i) =>
        i?.categories[0]?.categoryName?.toLocaleLowerCase().includes('pengawas')
      );
      const filterPengurus = res.data.contentDataList
        .filter((i) =>
          i?.categories[0]?.categoryName?.toLocaleLowerCase().includes('pengurus')
        )
        .sort((a, b) => a.id - b.id);
      setPengawas(filterPengawas);
      setPengurus(filterPengurus);
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <DPLKContent
        dewanpengawasdplkJudul={dewanpengawasdplkJudul}
        dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
        dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
        pengawas={pengawas ?? []}
        pengurus={pengurus ?? []}
        bottomImage={bannerImage?.imageUrl}
        bannerImageUrl={titleImage?.imageUrl}
        bannerImageFit={bannerImageFit}
      />

      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-yellow_light" />
      <FooterInformation
        bgColor="bg-dplk_yellow"
        outerClassName="bg-white"
        buttonVariant="dplk"
        title={
          <p className="font-light xs:text-[2.25rem] sm:text-[3.5rem] text-white sm:text-black font-karla xs:leading-[2.5rem] md:leading-[67.2px] xs:-tracking-[2.5px] sm:-tracking-[2.24px]">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={cta1Image?.imageUrl}
        href={'/tanya-avrista'}
      />
      <div>
        <RoundedFrameTop
          frameColor="bg-white"
          bgColor="xs:bg-white md:bg-purple_superlight"
        />
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
    </Suspense>
  );
};

export default AvristSyariah;
