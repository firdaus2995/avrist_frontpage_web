'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import SliderComponent from '@/components/molecules/specifics/avrast/Slider';
import { PageResponse } from '@/types/page.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import { ParamsProps } from '@/utils/globalTypes';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

export interface ISetData {
  setData: React.Dispatch<React.SetStateAction<PageResponse | undefined>>;
}

const TentangAvristLife: React.FC<ParamsProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [tab, setTab] = useState(
    searchParams.get('tab') ?? 'Sekilas Perusahaan'
  );
  const [data, setData] = useState<PageResponse>();
  const [transformedData, setTransformedData] = useState({
    titleImage: '',
    ctaImage: ''
  });
  const [, setIsSelectedDetail] = useState(false);

  useEffect(() => {
    const value = searchParams.get('tab');
    if (value !== null) {
      setTab(value);
    }
  }, [searchParams]);

  const tabs = useMemo(
    () => [
      {
        name: 'Sekilas Perusahaan',
        url: BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.SEKILAS_PERUSAHAAN
      },
      { name: 'Manajemen', url: BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.MANAJEMEN },
      {
        name: 'Penghargaan',
        url: BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.PENGHARGAAN
      },
      {
        name: 'Laporan Perusahaan',
        url: BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.LAPORAN_PERUSAHAAN
      },
      {
        name: 'Karir Bersama Avrist',
        url: BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.KARIR
      }
    ],
    []
  );

  useEffect(() => {
    if (data) {
      const { content } = pageTransformer(data);

      const titleImage = singleImageTransformer(content['title-image']);
      const ctaImage = singleImageTransformer(content['cta1-image']);

      setTransformedData({
        ...transformedData,
        titleImage: titleImage.imageUrl,
        ctaImage: ctaImage.imageUrl
      });
    }
  }, [data]);

  const handleSelectedDetail = (isSelected: boolean) => {
    setIsSelectedDetail(isSelected);
  };

  const handleTabClick = (tab: string) => {
    setTab(tab);
    router.push(pathname + '?' + createQueryString('tab', tab), {
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

  return (
    <div className="flex flex-col items-center justify-center">
      <Hero
        title={tab.includes('Manajemen') ? 'Manajemen' : tab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: tab.includes('Manajemen') ? 'Manajemen' : tab, href: '#' }
        ]}
        imageUrl={transformedData.titleImage}
      />
      <CustomContainer className="xs:pb-2 md:pb-0 xs:-mb-2 md:mb-0 justify-between gap-2 items-stretch xs:pt-[3.125rem] md:pt-[5rem] rounded-t-[60px] bg-white xs:-mt-[3.2rem] md:-mt-[6.2rem] z-[10]">
        {/* Tab Desktop */}
        <div className="w-full xs:hidden md:block">
          <div className="flex sm:w-full xs:w-[90%] md:flex-row xs:flex-col gap-4 rounded-lg gap-[0.75rem] flex-wrap">
            {tabs.map((val, idx) => (
              <div
                key={idx}
                role="button"
                onClick={() => {
                  handleTabClick(val.name);
                }}
                className={`grow flex p-2 items-center justify-center rounded-lg border border-purple_dark text-[1rem] font-semibold ${tab === val.name || (tab.includes('Manajemen') && val.name.includes('Manajemen')) ? 'text-white bg-purple_dark' : 'text-purple_dark bg-white hover:text-white hover:bg-purple_dark'}`}
              >
                {val.name}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Mobile */}
        <div className="w-[100%] md:hidden mt-[20px]">
          <SliderComponent
            selected={tab.includes('Manajemen') ? 'Manajemen' : tab}
            slideItems={tabs}
            onClickItem={(val) => handleTabClick(val.name)}
            customLabel="name"
          />
        </div>
      </CustomContainer>

      <div className="w-full">
        {tab === 'Sekilas Perusahaan' && (
          <SekilasPerusahaan setData={setData} />
        )}
        {(tab === 'Manajemen' || tab.includes('Manajemen')) && (
          <Manajemen
            onSelectDetail={handleSelectedDetail}
            setPageData={setData}
          />
        )}
        {tab === 'Penghargaan' && <Penghargaan setData={setData} />}
        {tab === 'Laporan Perusahaan' && (
          <LaporanPerusahaan setData={setData} />
        )}
        {tab === 'Karir Bersama Avrist' && <Karir setData={setData} />}
      </div>

      {tab === 'Sekilas Perusahaan' ||
      tab === 'Manajemen' ||
      tab.includes('Manajemen') ||
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
                  ) : tab.includes('Manajemen-') ? (
                    <Link
                      href={'https://www.facebook.com/avrist/'}
                      target="blank"
                      className="flex flex-row items-center justify-center gap-2 w-full p-4"
                    >
                      <p>Ikuti kami di</p>
                      <Icon name="facebookIcon" color="white" />
                      <p>Facebook</p>
                    </Link>
                  ) : tab === 'Manajemen' ? (
                    <Link
                      href="https://www.instagram.com/avristsolution/"
                      target="blank"
                      className="flex flex-row items-center justify-center gap-2 w-full p-4"
                    >
                      <p>Ikuti kami di</p>
                      <Icon name="instaIcon" color="white" />
                      <p>Instagram</p>
                    </Link>
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
                    ? 'LinkedIn'
                    : tab.includes('Manajemen-')
                      ? 'YouTube'
                      : tab === 'Penghargaan'
                        ? 'Prosedur Pengaduan'
                        : tab === 'Laporan Perusahaan'
                          ? 'Prosedur Pengaduan'
                          : 'Prosedur Pengaduan',
              icon:
                tab === 'Sekilas Perusahaan'
                  ? Icon4
                  : tab === 'Manajemen'
                    ? Icon5
                    : tab.includes('Manajemen-')
                      ? Icon8
                      : tab === 'Penghargaan'
                        ? Icon7
                        : tab === 'Laporan Perusahaan'
                          ? Icon7
                          : Icon7,
              subtitle:
                tab === 'Sekilas Perusahaan'
                  ? 'Ikuti Kami'
                  : tab === 'Manajemen'
                    ? 'Ikuti Kami'
                    : tab.includes('Manajemen-')
                      ? 'Subscribe'
                      : tab === 'Penghargaan'
                        ? 'Lihat Prosedur'
                        : tab === 'Laporan Perusahaan'
                          ? 'Lihat Prosedur'
                          : 'Lihat Prosedur',
              href:
                tab === 'Sekilas Perusahaan'
                  ? 'https://www.facebook.com/avrist/'
                  : tab === 'Manajemen'
                    ? 'https://id.linkedin.com/company/avristassurance'
                    : tab.includes('Manajemen-')
                      ? 'https://www.youtube.com/@avristian'
                      : tab === 'Penghargaan'
                        ? '/klaim-layanan/layanan/penanganan-pengaduan'
                        : tab === 'Laporan Perusahaan'
                          ? '/klaim-layanan/layanan/penanganan-pengaduan'
                          : '/klaim-layanan/layanan/penanganan-pengaduan',
              openInNewTab:
                tab === 'Sekilas Perusahaan'
                  ? true
                  : tab.includes('Manajemen')
                    ? true
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

export default dynamic(() => Promise.resolve(TentangAvristLife), {
  ssr: false
});
