import { Suspense } from 'react';

import DPLKContent from './DPLKContent';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';

import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';

import {
  handleGetContent,
  handleGetContentPage
} from '@/services/content-page.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer
} from '@/utils/responseTransformer';

const AvristSyariah = async () => {
  const pageBase = await handleGetContentPage(
    BASE_SLUG.AVRIST_DPLK.PAGE.AVRIST_DPLK
  );

  const { content } = pageTransformer(pageBase);
  const titleImage = singleImageTransformer(content['title-image']);
  const bannerImage = singleImageTransformer(content['banner-image']);
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

  const pageContent = await handleGetContent(
    BASE_SLUG.AVRIST_DPLK.CONTENT.AVRIST_DPLK,
    {
      includeAttributes: 'true'
    }
  );

  const pengawas = pageContent.data.contentDataList.filter((i) =>
    i.categoryName.toLocaleLowerCase().includes('pengawas')
  );
  const pengurus = pageContent.data.contentDataList
    .filter((i) => i.categoryName.toLocaleLowerCase().includes('pengurus'))
    .sort((a, b) => a.id - b.id);

  return (
    <Suspense fallback={null}>
      <Hero
        title={'DPLK Avrist'}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'DPLK Avrist', href: '#' }
        ]}
        bottomImage={bannerImage.imageUrl}
        imageUrl={titleImage.imageUrl}
      />
      <DPLKContent
        dewanpengawasdplkJudul={dewanpengawasdplkJudul}
        dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
        dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
        pengawas={pengawas}
        pengurus={pengurus}
      />

      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-yellow_light" />
      <FooterInformation
        bgColor="bg-dplk_yellow"
        outerClassName="bg-white"
        buttonVariant="dplk"
        title={
          <p className="xs:text-[2.25rem] sm:text-[3.5rem] text-white md:text-black font-karla xs:leading-[2.5rem] md:leading-[3.125rem] xs:-tracking-[4px] sm:-tracking-[2.56px]">
            <span className="font-bold">Hello,</span> Ada yang bisa{' '}
            <span className="font-bold">Avrista</span> bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={cta1Image.imageUrl}
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
