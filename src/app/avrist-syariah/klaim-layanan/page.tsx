'use client';
import KlaimDanLayanan from '../tabs/KlaimDanLayanan';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { handleGetContentPage } from '@/services/content-page.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukSyariah = async () => {
  const apiPage = await handleGetContentPage(
    'halaman-klaim-dan-layanan-syariah'
  );
  const { content } = pageTransformer(apiPage);
  const titleImage = singleImageTransformer(content['title-image']);
  const bannerImage = singleImageTransformer(content['banner-image']);
  const cta1Image = singleImageTransformer(content['cta1-image']);
  return (
    <div>
      <Hero
        title="Klaim dan Layanan"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Klaim dan Layanan', href: '#' }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
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
          selectedCategory="Klaim & Layanan"
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
        {/* isi klaim & layanan */}
        <KlaimDanLayanan />
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
        image={cta1Image.imageUrl}
        href={'/tanya-avrista'}
      />
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
