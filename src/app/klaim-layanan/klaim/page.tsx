'use client';
import React, { useEffect, useState } from 'react';

// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import InformasiKlaimComponent from '@/components/molecules/specifics/avrast/Klaim/InformasiKlaim';
import PanduanKlaim from '@/components/molecules/specifics/avrast/Klaim/PanduanKlaim';
import ProsesKlaim from '@/components/molecules/specifics/avrast/Klaim/ProsesKlaim';
import { dataKlaim } from '@/components/molecules/specifics/avrast/Klaim/type';
import { getContentPage } from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { ParamsProps } from '@/utils/globalTypes';
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

const initialData = {
  titleImageUrl: '',
  bannerImageUrl: '',
  titleAltText: '',
  bannerAltText: '',
  footerInfoAltText: '',
  footerInfoImageUrl: ''
};

const handleDataFetch = async (
  slug: string,
  setData: (dataKlaim: dataKlaim) => void
) => {
  const dataFetchParams = {
    dataKeyTitle: 'title-image',
    dataKeyBanner: 'banner-image',
    dataKeyFooter: 'cta1-image'
  };

  try {
    const { dataKeyTitle, dataKeyBanner, dataKeyFooter } = dataFetchParams;
    const data = await getContentPage(slug as string);
    const { content } = pageTransformer(data as PageResponse);
    const title =
      singleImageTransformer(content[dataKeyTitle]).imageUrl !== ''
        ? singleImageTransformer(content[dataKeyTitle])
        : singleImageTransformer(content['image-title']);
    const banner =
      singleImageTransformer(content[dataKeyBanner]).imageUrl !== ''
        ? singleImageTransformer(content[dataKeyBanner])
        : singleImageTransformer(content['image-banner']);
    const footerInformationImage =
      singleImageTransformer(content[dataKeyFooter]).imageUrl !== ''
        ? singleImageTransformer(content[dataKeyFooter])
        : singleImageTransformer(content['imge-cta1']);

    setData({
      titleImageUrl: title.imageUrl,
      bannerImageUrl: banner.imageUrl,
      titleAltText: title.altText,
      bannerAltText: banner.altText,
      footerInfoAltText: footerInformationImage.altText,
      footerInfoImageUrl: footerInformationImage.imageUrl
    });
  } catch (error) {
    setData(initialData);
  }
};

const InformasiKlaim: React.FC<ParamsProps> = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get('tab') ?? '';
  const router = useRouter();
  const [tab, setTab] = useState('');
  const [isSelectedDetail, setIsSelectedDetail] = useState(false);
  const [, setBannerImg] = useState(0);
  const [data, setData] = useState<dataKlaim>(initialData);

  const handleTabChange = async (tab: string) => {
    setTab(tab);
  };

  useEffect(() => {
    setData(initialData);
    const value = searchParams.get('tab');
    if (value === 'Login Polis') {
      router.push('https://my.avrist.com/welcome');
    } else if (value) {
      setTab(value);
    }

    switch (value) {
      case 'Panduan & Pengajuan':
        handleDataFetch('halaman-panduan-dan-pengajuan', setData).then();
        break;
      case 'Informasi Klaim':
        handleDataFetch('informasi-klaim', setData).then();
        break;
      default:
        console.log('default');
    }
  }, [searchParams, router]);

  const handleSelectedDetail = (val: boolean) => {
    setIsSelectedDetail(val);
    handleDataFetch('halaman-panduan-dan-pengajuan-detail', setData).then();
  };

  const handleChangeBannerImg = (val: number) => {
    setBannerImg(val);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Hero
        title={tab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: tab, href: '#' }
        ]}
        imageUrl={data.titleImageUrl}
        bottomImage={data.bannerImageUrl}
      />
      <InformasiKlaimComponent
        onTabChange={handleTabChange}
        isSelectedDetail={isSelectedDetail}
        onChangeBannerImg={handleChangeBannerImg}
        tab={tab}
      />
      {tab === 'Informasi Klaim' && <PanduanKlaim />}
      {tab === 'Panduan & Pengajuan' && (
        <ProsesKlaim
          onSelectDetail={handleSelectedDetail}
          onChangeBannerImg={handleChangeBannerImg}
        />
      )}
      <div className="w-full">
        <RoundedFrameBottom frameColor="bg-purple_light_bg" />
      </div>

      <FooterInformation
        title={
          <div
            className={`md:w-full xs:w-full p-5 flex h-full flex-col md:items-start xs:items-center justify-center gap-10`}
          >
            <p className="md:text-4xl xs:text-2xl md:text-left xs:text-center">
              <span className="font-bold text-purple_dark">
                Asuransi Anti Ribet:
              </span>{' '}
              Premi Seharga kopi...
            </p>
            <Link
              href="https://www.youtube.com/@avristian"
              target="blank"
              role="button"
              className="p-4 bg-purple_dark rounded-xl text-sm font-semibold text-white flex flex-row gap-2"
            >
              Cerita Lebih Detail di
              <Icon name="youtubeIcon" color="white" />
            </Link>
          </div>
        }
        image={data.footerInfoImageUrl}
      />
      <div className="w-full">
        <RoundedFrameTop bgColor="bg-white" />
      </div>
      <div className="w-full">
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
    </div>
  );
};

export default InformasiKlaim;
