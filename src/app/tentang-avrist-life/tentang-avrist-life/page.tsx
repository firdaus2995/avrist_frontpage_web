'use client';
import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import Icon6 from '@/assets/images/common/instagram.svg';
import Icon5 from '@/assets/images/common/linkedIn.svg';
import Icon7 from '@/assets/images/common/procedure.svg';
import Icon8 from '@/assets/images/common/youtube.svg';
import Icon from '@/components/atoms/Icon';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { ParamsProps } from '@/utils/globalTypes';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const TentangAvristLife: React.FC<ParamsProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathState = sessionStorage.getItem('pathState');
  const [tab, setTab] = useState('');
  const [, setData] = useState(null);
  const [transformedData, setTransformedData] = useState({
    titleImage: '',
    ctaImage: ''
  });
  const [isSelectedDetail, setIsSelectedDetail] = useState(false);

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

  const tabs = [
    'Sekilas Perusahaan',
    'Manajemen',
    'Penghargaan',
    'Laporan Perusahaan',
    'Karir Bersama Avrist'
  ];

  useEffect(() => {
    if (tab === 'Manajemen') {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api-front-sit.avristcms.barito.tech/api/page/${pathState ?? 'manajemen'}`,
            {
              method: 'GET'
            }
          );
          const data = await response.json();
          setData(data);

          const { content } = pageTransformer(data);

          const titleImage = singleImageTransformer(content['title-image']);
          const ctaImage = singleImageTransformer(content['cta1-image']);

          setTransformedData({
            ...transformedData,
            titleImage: titleImage.imageUrl,
            ctaImage: ctaImage.imageUrl
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchData();
    }
  }, [tab, pathState]);
  const handleSelectedDetail = (isSelected: boolean) => {
    setIsSelectedDetail(isSelected);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <Hero
        title={tab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: tab, href: '#' }
        ]}
        imageUrl={transformedData.titleImage}
      />
      <div className="w-full grid grid-cols-5 gap-2 px-[136px] py-20 absolute z-20 top-80 rounded-t-[76px] bg-white ">
        {tabs.map((value, idx) => (
          <div
            key={idx}
            role="button"
            onClick={() => {
              handleTabClick(value);
              handleSelectedDetail(false);
            }}
            className={`p-2 border border-purple_dark rounded-lg text-center ${tab === value ? 'bg-purple_dark text-white' : 'text-purple_dark'} font-semibold`}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="mt-44 w-full">
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
                <p className="text-[56px] font-semibold text-purple_dark">
                  Hubungi Kami
                </p>
                <div
                  role="button"
                  className="p-4 bg-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-white font-medium"
                >
                  {tab === 'Penghargaan' ? (
                    <div className="flex flex-row items-center gap-2">
                      <p>Ikuti kami di</p>
                      <Icon name="linkedInIcon" color="white" />
                      <p>LinkedIn</p>
                    </div>
                  ) : tab === 'Manajemen' ? (
                    isSelectedDetail ? (
                      <div className="flex flex-row items-center gap-2">
                        <p>Ikuti kami di</p>
                        <Icon name="facebookIcon" color="white" />
                        <p>Facebook</p>
                      </div>
                    ) : (
                      <Link
                        href="https://www.instagram.com/avristsolution/"
                        target="blank"
                        className="flex flex-row items-center gap-2"
                      >
                        <p>Ikuti kami di</p>
                        <Icon name="instaIcon" color="white" />
                        <p>Instagram</p>
                      </Link>
                    )
                  ) : (
                    <div className="flex flex-row items-center gap-2">
                      <p>Subscribe</p>
                      <Icon name="youtubeIcon" color="white" />
                      <p>Youtube</p>
                    </div>
                  )}
                </div>
              </div>
            }
            image={transformedData.ctaImage ?? BlankImage}
          />
          <RoundedFrameTop />
        </div>
      ) : null}
      <div className="w-full h-full bg-purple_superlight pb-20">
        <FooterCards
          cards={[
            {
              title: 'Layanan Nasabah',
              icon: Icon1,
              subtitle: '021 5789 8188'
            },
            {
              title: 'Tanya Avrista',
              icon: Icon2,
              subtitle: 'Lebih Lanjut'
            },
            {
              title: 'Tanya Lewat Email',
              icon: Icon3,
              subtitle: 'Kirim Email'
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
                      ? Icon6
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
                        : 'Lihat Prosedur'
            }
          ]}
        />
      </div>
    </div>
  );
};

export default TentangAvristLife;
