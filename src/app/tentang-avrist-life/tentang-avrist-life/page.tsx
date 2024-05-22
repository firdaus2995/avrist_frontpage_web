'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import { useSearchParams } from 'next/navigation';
import Karir from './tabs/karir';
import LaporanPerusahaan from './tabs/laporan-perusahaan';
import Manajemen from './tabs/management';
import Penghargaan from './tabs/penghargaan';
import SekilasPerusahaan from './tabs/sekilas-perusahaan';
import Icon1 from '@/assets/images/avrast/component/informasi-klaim/bantuan.svg';
import Icon2 from '@/assets/images/avrast/component/proses-klaim/step-4-icon-4.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import Icon3 from '@/assets/images/common/email.svg';
import Icon4 from '@/assets/images/common/facebook.svg';
import Icon5 from '@/assets/images/common/linkedIn.svg';
import Icon7 from '@/assets/images/common/procedure.svg';
import Icon8 from '@/assets/images/common/youtube.svg';
import Icon from '@/components/atoms/Icon';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import CategoryPills from '@/components/molecules/specifics/avrast/CategoryPills';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { handleGetContentPage } from '@/services/content-page.api';
import { PageResponse } from '@/types/page.type';
import { ParamsProps } from '@/utils/globalTypes';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const TentangAvristLife: React.FC<ParamsProps> = () => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');
  const [data, setData] = useState<PageResponse>();
  const [transformedData, setTransformedData] = useState({
    titleImage: '',
    ctaImage: ''
  });
  const [isSelectedDetail, setIsSelectedDetail] = useState(false);

  useEffect(() => {
    const value = searchParams.get('tab');
    if (value !== null) {
      setTab(value);
    }
  }, [searchParams]);

  const tabs = [
    { name: 'Sekilas Perusahaan', url: 'halaman-sekilas-perusahaan' },
    { name: 'Manajemen', url: 'halaman-manajemen-avras' },
    { name: 'Penghargaan', url: 'halaman-penghargaan-dan-sertifikasi-avram' },
    { name: 'Laporan Perusahaan', url: 'halaman-laporan-perusahaan' },
    { name: 'Karir Bersama Avrist', url: 'halaman-karir' }
  ];

  useEffect(() => {
    const url = tabs.find((item: any) => item.name === tab)?.url;

    if (!transformedData.titleImage) {
      handleGetContentPage(url ?? 'halaman-sekilas-perusahaan').then((res) =>
        setData(res)
      );

      const { content } = pageTransformer(data);

      const titleImage = singleImageTransformer(content['title-image']);
      const ctaImage = singleImageTransformer(content['cta1-image']);

      setTransformedData({
        ...transformedData,
        titleImage: titleImage.imageUrl,
        ctaImage: ctaImage.imageUrl
      });
    }
  }, [tab, transformedData]);

  const handleSelectedDetail = (isSelected: boolean) => {
    setIsSelectedDetail(isSelected);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-purple_dark">
      <Hero
        title={tab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: tab, href: '#' }
        ]}
        imageUrl={transformedData.titleImage}
      />
      <div className="xs:-mb-1 md:mb-0 w-full justify-between gap-2 items-stretch px-[2rem] md:px-[8.5rem] pt-[5rem] rounded-t-[60px] bg-white xs:-mt-[9.4rem] md:-mt-[6.2rem] z-[10]">
        <CategoryPills
          buttonTitle={tabs.map((item: any) => item.name)}
          buttonActiveClassname="bg-purple_dark border-purple_dark"
          buttonInactiveClassname="bg-transparent border-purple_dark text-purple_dark hover:bg-purple_dark hover:border-purple_dark hover:text-white"
          buttonActiveTextClassname="text-white"
          links={{
            'Sekilas Perusahaan':
              '/tentang-avrist-life/tentang-avrist-life?tab=Sekilas+Perusahaan',
            Manajemen: '/tentang-avrist-life/tentang-avrist-life?tab=Manajemen',
            Penghargaan:
              '/tentang-avrist-life/tentang-avrist-life?tab=Penghargaan',
            'Laporan Perusahaan':
              '/tentang-avrist-life/tentang-avrist-life?tab=Laporan+Perusahaan',
            'Karir Bersama Avrist':
              '/tentang-avrist-life/tentang-avrist-life?tab=Karir+Bersama+Avrist'
          }}
        />
      </div>
      <div className="w-full z-10 xs:mt-1 md:mt-0">
        {tab === 'Sekilas Perusahaan' && <SekilasPerusahaan />}
        {tab === 'Manajemen' && (
          <Manajemen onSelectDetail={handleSelectedDetail} />
        )}
        {tab === 'Penghargaan' && <Penghargaan />}
        {tab === 'Laporan Perusahaan' && <LaporanPerusahaan />}
        {tab === 'Karir Bersama Avrist' && <Karir />}
      </div>

      {tab === 'Sekilas Perusahaan' ||
      tab === 'Manajemen' ||
      tab === 'Penghargaan' ? (
        <div className="flex flex-col w-full">
          <FooterInformation
            title={
              <div className="flex flex-col gap-4">
                <p className="xs:text-[2.25rem] md:text-[3.5rem] font-bold font-karla text-purple_dark">
                  Hubungi Kami
                </p>
                <div
                  role="button"
                  className=" bg-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-white font-medium"
                >
                  {tab === 'Penghargaan' ? (
                    <Link
                      href={'https://id.linkedin.com/company/avristassurance'}
                      target="blank"
                      className="flex flex-row items-center justify-center gap-2 w-full p-4"
                    >
                      <p>Ikuti kami di</p>
                      <Icon name="linkedInIcon" color="white" />
                      <p>LinkedIn</p>
                    </Link>
                  ) : tab === 'Manajemen' ? (
                    isSelectedDetail ? (
                      <Link
                        href={'https://www.facebook.com/avrist/'}
                        target="blank"
                        className="flex flex-row items-center justify-center gap-2 w-full p-4"
                      >
                        <p>Ikuti kami di</p>
                        <Icon name="facebookIcon" color="white" />
                        <p>Facebook</p>
                      </Link>
                    ) : (
                      <Link
                        href="https://www.instagram.com/avristsolution/"
                        target="blank"
                        className="flex flex-row items-center justify-center gap-2 w-full p-4"
                      >
                        <p>Ikuti kami di</p>
                        <Icon name="instaIcon" color="white" />
                        <p>Instagram</p>
                      </Link>
                    )
                  ) : (
                    <Link
                      href={'https://www.youtube.com/@avristian'}
                      target="blank"
                      className="flex flex-row items-center justify-center gap-2 w-full p-4"
                    >
                      <p>Subscribe</p>
                      <Icon name="youtubeIcon" color="white" />
                      <p>Youtube</p>
                    </Link>
                  )}
                </div>
              </div>
            }
            image={transformedData.ctaImage ?? BlankImage}
          />
          <RoundedFrameTop bgColor="xs:bg-white md:bg-purple_superlight" />
        </div>
      ) : null}
      <div className="w-full h-full bg-purple_superlight">
        <FooterCards
          bgColor="xs:bg-white md:bg-purple_superlight"
          cards={[
            {
              title: 'Layanan Nasabah',
              icon: Icon1,
              subtitle: '021 5789 8188',
              href: '02157898188',
              hrefType: 'phone'
            },
            {
              title: 'Tanya Avrista',
              icon: Icon2,
              subtitle: 'Lebih Lanjut',
              href: '/tanya-avrista/'
            },
            {
              title: 'Tanya Lewat Email',
              icon: Icon3,
              subtitle: 'Kirim Email',
              href: 'contact_us@avristsalesforce.com',
              hrefType: 'email'
            },
            {
              title:
                tab === 'Sekilas Perusahaan'
                  ? 'Facebook'
                  : tab === 'Manajemen'
                    ? isSelectedDetail
                      ? 'Youtube'
                      : 'LinkedIn'
                    : tab === 'Penghargaan'
                      ? 'Prosedur Pengaduan'
                      : tab === 'Laporan Perusahaan'
                        ? 'Prosedur Pengaduan'
                        : 'Prosedur Pengaduan',
              icon:
                tab === 'Sekilas Perusahaan'
                  ? Icon4
                  : tab === 'Manajemen'
                    ? isSelectedDetail
                      ? Icon8
                      : Icon5
                    : tab === 'Penghargaan'
                      ? Icon7
                      : tab === 'Laporan Perusahaan'
                        ? Icon7
                        : Icon7,
              subtitle:
                tab === 'Sekilas Perusahaan'
                  ? 'Ikuti Kami'
                  : tab === 'Manajemen'
                    ? isSelectedDetail
                      ? 'Subscribe'
                      : 'Ikuti Kami'
                    : tab === 'Penghargaan'
                      ? 'Lihat Prosedur'
                      : tab === 'Laporan Perusahaan'
                        ? 'Lihat Prosedur'
                        : 'Lihat Prosedur',
              href:
                tab === 'Sekilas Perusahaan'
                  ? 'https://www.facebook.com/avrist/'
                  : tab === 'Manajemen'
                    ? isSelectedDetail
                      ? 'https://www.youtube.com/@avristian'
                      : 'https://id.linkedin.com/company/avristassurance'
                    : tab === 'Penghargaan'
                      ? '/klaim-layanan/layanan/penanganan-pengaduan'
                      : tab === 'Laporan Perusahaan'
                        ? '/klaim-layanan/layanan/penanganan-pengaduan'
                        : '/klaim-layanan/layanan/penanganan-pengaduan',
              openInNewTab:
                tab === 'Sekilas Perusahaan'
                  ? false
                  : tab === 'Manajemen'
                    ? false
                    : tab === 'Penghargaan'
                      ? false
                      : tab === 'Laporan Perusahaan'
                        ? false
                        : false
            }
          ]}
        />
      </div>
    </div>
  );
};

export default TentangAvristLife;
