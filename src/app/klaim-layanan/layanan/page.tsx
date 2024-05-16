'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import FOOTER_NASABAH_1 from '@/assets/images/avrast/component/footer-klaim/footer-img-1.svg';
import FOOTER_NASABAH_2 from '@/assets/images/avrast/component/footer-klaim/footer-img-2.svg';
import FOOTER_NASABAH_3 from '@/assets/images/avrast/component/footer-klaim/footer-img-3.svg';
import FOOTER_NASABAH_4 from '@/assets/images/avrast/component/footer-klaim/footer-img-4.svg';
import ARROW_CIRCLE_RIGHT from '@/assets/images/common/arrow-circle-right.svg';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import EMAIL from '@/assets/images/common/email.svg';
import HEART_CHECK from '@/assets/images/common/heart-check.svg';
import HOME_ADD from '@/assets/images/common/home-add.svg';
import MESSAGE from '@/assets/images/common/message.svg';
import PERSON_HOME_YELLOW from '@/assets/images/common/person-home-yellow.svg';
import RECEIPT from '@/assets/images/common/receipt.svg';
import UMBRELLA_GREEN from '@/assets/images/common/umbrella-green.svg';
import Icon from '@/components/atoms/Icon';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import { FormulirPendaftaran } from '@/components/molecules/specifics/avrast/FormulirPendaftaran';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { MainContent } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';
import { PerformaInvestasi } from '@/components/molecules/specifics/avrast/PerformaInvestasi';
import { RSRekanan } from '@/components/molecules/specifics/avrast/RSRekanan';
import { getContentPage } from '@/services/content-page.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const dataInformasiNasabah = [
  {
    icon: FOOTER_NASABAH_1,
    title: 'Kelola Polis',
    subtitle: 'Login Akun',
    href: 'https://my.avrist.com/welcome'
  },
  {
    icon: FOOTER_NASABAH_2,
    title: 'Download Formulir',
    subtitle: 'Lihat Lainnya',
    href: '/klaim-layanan/layanan?tab=Formulir+%26+Buku+Panduan'
  },
  {
    icon: FOOTER_NASABAH_3,
    title: 'Avrist Terkini',
    subtitle: 'Lebih Lanjut',
    href: '/promo-berita/berita?tab=Avrist+Terkini&category=Berita'
  },
  {
    icon: FOOTER_NASABAH_4,
    title: 'Prosedur Pengaduan',
    subtitle: 'Lihat Prosedur',
    href: '/klaim-layanan/layanan/penanganan-pengaduan'
  }
];

const dataFormulirPendaftaran = [
  {
    icon: ARROW_CIRCLE_RIGHT,
    title: 'Kelola Polis',
    subtitle: 'Login Akun',
    href: 'https://my.avrist.com/welcome'
  },
  {
    icon: RECEIPT,
    title: 'Ajukan Klaim',
    subtitle: 'Lebih Lanjut',
    href: '/klaim-layanan/klaim?tab=Panduan+%26+Pengajuan'
  },
  {
    icon: DOCUMENT_SEARCH,
    title: 'Prosedur Pengaduan',
    subtitle: 'Lihat Prosedur',
    href: '/klaim-layanan/layanan/penanganan-pengaduan'
  },
  {
    icon: MESSAGE,
    title: 'Tanya Avrista',
    subtitle: 'Lebih Lanjut',
    href: '/tanya-avrista'
  }
];

const dataPerformaInvestasi = [
  {
    icon: HEART_CHECK,
    title: 'Asuransi Jiwa',
    subtitle: 'Lihat Produk',
    href: '/produk/individu'
  },
  {
    icon: HOME_ADD,
    title: 'Asuransi Korporasi',
    subtitle: 'Lihat Produk',
    href: '/produk/korporasi'
  },
  {
    icon: UMBRELLA_GREEN,
    title: 'Avrist Syariah',
    subtitle: 'Lihat Produk',
    textColor: 'text-syariah_green',
    href: '/avrist-syariah/produk'
  },
  {
    icon: PERSON_HOME_YELLOW,
    title: 'Avrist DPLK',
    subtitle: 'Lihat Produk',
    textColor: 'text-orange_border',
    href: '/avrist-dplk?tab=Produk'
  }
];

const dataRSRekanan = [
  {
    icon: CUSTOMER_SERVICE,
    title: 'Layanan Nasabah',
    subtitle: '021 5789 8188',
    href: 'tel:021-5789-8188'
  },
  {
    icon: MESSAGE,
    title: 'Tanya Avrista',
    subtitle: 'Lebih Lanjut',
    href: '/tanya-avrista'
  },
  {
    icon: EMAIL,
    title: 'Tanya Lewat Email',
    subtitle: 'Kirim Email',
    href: 'mailto:customer-service@avrist.com'
  },
  {
    icon: DOCUMENT_SEARCH,
    title: 'Prosedur Pengaduan',
    subtitle: 'Lihat Prosedur',
    href: '/klaim-layanan/layanan/penanganan-pengaduan'
  }
];

const InformationCustomer = () => {
  const initialData = {
    titleImageUrl: '',
    bannerImageUrl: '',
    titleAltText: '',
    bannerAltText: '',
    footerInfoAltText: '',
    footerInfoImageUrl: ''
  };
  const [data, setData] = useState<dataKlaim>(initialData);

  const searchParams = useSearchParams();
  const params = searchParams.get('tab') ?? '';

  useEffect(() => {
    const paramsSlug = {
      'Rumah Sakit Rekanan': 'halaman-rumah-sakit-rekanan',
      'Performa Investasi': 'halaman-performa-investasi',
      'Formulir & Buku Panduan': 'halaman-formulir-dan-buku-panduan',
      'Informasi Nasabah': 'informasi-nasabah'
    };

    const fetchDataByParam = async (slug: string) => {
      setData(initialData);
      const pageSlug = paramsSlug[slug as keyof typeof paramsSlug];
      try {
        const data = await getContentPage(pageSlug as string);
        const { content } = pageTransformer(data);
        const banner =
          singleImageTransformer(content['banner-image']).imageUrl !== ''
            ? singleImageTransformer(content['banner-image'])
            : singleImageTransformer(content['image-banner']);
        const title =
          singleImageTransformer(content['title-image']).imageUrl !== ''
            ? singleImageTransformer(content['title-image'])
            : singleImageTransformer(content['image-title']);
        const footerInformation =
          singleImageTransformer(content['cta1-image']).imageUrl !== ''
            ? singleImageTransformer(content['cta1-image'])
            : singleImageTransformer(content['image-cta1']);

        setData({
          titleImageUrl: title.imageUrl,
          bannerImageUrl: banner.imageUrl,
          titleAltText: title.altText,
          bannerAltText: banner.altText,
          footerInfoAltText: footerInformation.altText,
          footerInfoImageUrl: footerInformation.imageUrl
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (params) {
      fetchDataByParam(params);
    } else {
      setData(initialData);
    }
  }, [params]);

  return (
    <div className="flex flex-col">
      <Hero
        title={params}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: params, href: '#' }
        ]}
        imageUrl={data.titleImageUrl}
        bottomImage={data.bannerImageUrl}
      />
      {params.includes('Informasi Nasabah') ? (
        <MainContent />
      ) : params.includes('Formulir & Buku Panduan') ? (
        <FormulirPendaftaran />
      ) : params.includes('Performa Investasi') ? (
        <PerformaInvestasi />
      ) : params.includes('Rumah Sakit Rekanan') ? (
        <RSRekanan />
      ) : (
        <></>
      )}

      <FooterInformation
        title={
          <div
            className={`md:w-full xs:w-full p-5 flex h-full flex-col md:items-start xs:items-center justify-center gap-10`}
          >
            <p className="md:text-4xl xs:text-2xl md:text-left xs:text-center">
              <span className="font-bold text-purple_dark">
                Warisan Kebaikan,
              </span>{' '}
              Solusi Perlindungan Masa Depan
            </p>
            <Link
              href={'https://www.youtube.com/@avristian'}
              className="p-4 bg-purple_dark rounded-xl text-sm font-semibold text-white flex flex-row gap-2"
            >
              Cerita Lebih Detail di
              <Icon name="youtubeIcon" color="white" />
            </Link>
          </div>
        }
        image={data.footerInfoImageUrl}
      />
      <RoundedFrameTop bgColor='bg-white' />
      <FooterCards
        bgColor="bg-white"
        cards={
          params.includes('Informasi Nasabah')
            ? dataInformasiNasabah
            : params.includes('Formulir & Buku Panduan')
              ? dataFormulirPendaftaran
              : params.includes('Performa Investasi')
                ? dataPerformaInvestasi
                : params.includes('Rumah Sakit Rekanan')
                  ? dataRSRekanan
                  : dataInformasiNasabah
        }
      />
    </div>
  );
};

export default InformationCustomer;
