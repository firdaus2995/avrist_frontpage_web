'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Modal } from '../component/modal/modal';
import Icon1 from '@/assets/images/avrast/component/informasi-klaim/bantuan.svg';
import Icon2 from '@/assets/images/avrast/component/proses-klaim/step-4-icon-4.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import Icon3 from '@/assets/images/common/email.svg';
import Phone from '@/assets/images/common/phone.svg';
import Icon4 from '@/assets/images/common/procedure.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { handleGetContentPage } from '@/services/content-page.api';
import {
  contentDetailTransformer,
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

const DetailKarir = ({ searchParams }: SearchParamProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const slug = pathSegments[pathSegments.length - 1];
  const show = searchParams?.show;

  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [contentData, setContentData] = useState<any>();

  const fetchData = () => {
    try {
      handleGetContentPage('hlm-karir-detail').then((res: any) => {
        const { content } = pageTransformer(res);
        const titleImage = singleImageTransformer(
          content['title-image']
        ).imageUrl;
        const bannerImage = singleImageTransformer(
          content['banner-image']
        ).imageUrl;
        const footerImage = singleImageTransformer(
          content['cta1-image']
        ).imageUrl;
        setData({ titleImage, bannerImage, footerImage });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDetailData = async () => {
    const response = await fetch(`/api/karir/${slug}`);
    const jsonData = await response.json();

    const { content } = contentDetailTransformer(jsonData);
    const namaLoker = contentStringTransformer(content['nama-loker']);
    const iconLokasiLoker = singleImageTransformer(
      content['icon-lokasi-loker']
    ).imageUrl;
    const lokasiLoker = contentStringTransformer(content['lokasi-loker']);
    const iconStatusLoker = singleImageTransformer(
      content['icon-status-loker']
    ).imageUrl;
    const statusLoker = contentStringTransformer(content['status-loker']);
    const iconWaktuLoker = singleImageTransformer(
      content['icon-waktu-loker']
    ).imageUrl;
    const waktuLoker = contentStringTransformer(content['waktu-loker']);
    const deskripsiPekerjaan = contentStringTransformer(
      content['deskripsi-pekerjaan']
    );
    const deskripsiResponsibilities = contentStringTransformer(
      content['deskripsi-responsibilities']
    );
    const deskripsiKualifikasi = contentStringTransformer(
      content['deskripsi-kualifikasi']
    );

    const detail = {
      namaLoker,
      iconLokasiLoker,
      lokasiLoker,
      iconStatusLoker,
      statusLoker,
      iconWaktuLoker,
      waktuLoker,
      deskripsiPekerjaan,
      deskripsiResponsibilities,
      deskripsiKualifikasi
    };

    setContentData(detail);
  };

  useEffect(() => {
    fetchData();
    fetchDetailData();
  }, []);

  console.log(data);

  return (
    <>
      <Hero
        title="Karir Bersama Avrist"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Karir Bersama Avrist',
            href: '/tentang-avrist-life/tentang-avrist-life?tab=Karir'
          }
        ]}
        imageUrl={data?.titleImage}
      />

      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col gap-5 w-2/3 p-10">
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-[48px]">
              {contentData?.namaLoker}
            </p>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-4 text-nowrap text-md">
                <div className="flex w-full flex-row items-center gap-2">
                  <Image
                    src={contentData?.iconLokasiLoker}
                    alt="lokasi"
                    width={24}
                    height={24}
                  />
                  <p>{contentData?.lokasiLoker}</p>
                </div>
                <div className="flex w-full flex-row items-center gap-2">
                  <Image
                    src={contentData?.iconStatusLoker}
                    alt="status"
                    width={24}
                    height={24}
                  />
                  <p>{contentData?.statusLoker}</p>
                </div>
                <div className="flex w-full flex-row items-center gap-2">
                  <Image
                    src={contentData?.iconWaktuLoker}
                    alt="waktu"
                    width={24}
                    height={24}
                  />
                  <p>{contentData?.waktuLoker}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div className="flex items-center" role="button">
                  <Icon
                    width={16}
                    height={16}
                    name="share"
                    color="purple_verylight"
                  />
                </div>

                <div className="text-xs font-bold">Share</div>
              </div>
            </div>
          </div>
          <p className="text-[32px] font-bold text-purple_dark pt-5 w-full">
            Deskripsi Pekerjaan
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: contentData?.deskripsiPekerjaan
            }}
          />
          <p className="text-[32px] font-bold text-purple_dark pt-5 w-full">
            Responsibilities
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: contentData?.deskripsiResponsibilities
            }}
          />
          <p className="text-[32px] font-bold text-purple_dark pt-5 w-full">
            Kualifikasi
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: contentData?.deskripsiResponsibilities
            }}
          />
          <div className="py-10">
            <Link href="/tentang-avrist-life/tentang-avrist-life/tabs/karir/detail?show=true">
              <Button
                title="Apply For This Job"
                customButtonClass="rounded-xl bg-purple_dark"
                customTextClass="text-white"
              />
            </Link>
          </div>
          <div className="w-full flex flex-row justify-between items-center p-4 border rounded-xl">
            <div className="flex flex-row gap-2 items-center">
              <p className="font-bold text-purple_dark">
                Belum tertarik dengan lowongan ini?
              </p>
            </div>
            <Button
              title="List Lowongan"
              customButtonClass="rounded-xl bg-purple_dark"
              customTextClass="text-white"
              onClick={() => window.history.back()}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <RoundedFrameBottom />
        <FooterInformation
          bgColor="bg-gray_bglightgray"
          title={
            <div className="flex flex-col items-center justify-center gap-4 bg-gray_bglightgray">
              <p className="text-[56px] font-bold">Hubungi Kami</p>
              <Link
                href="tel:02157898188"
                role="button"
                className="p-4 border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark text-2xl font-bold bg-white"
              >
                <Image src={Phone} alt="phone" className="w-10" />
                <p>021 5789 8188</p>
              </Link>
              <p>
                <span className="font-bold">Waktu Operasional:</span> Senin -
                Jumat, 08.00 - 17.00 WIB
              </p>
            </div>
          }
          image={data?.footerImage ?? BlankImage}
        />
        <RoundedFrameTop />
      </div>
      <div className="w-full h-full bg-purple_superlight pb-20">
        <FooterCards
          cards={[
            {
              title: 'Hubungi Kami',
              icon: Icon1,
              subtitle: 'Lebih Lanjut'
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
              title: 'Prosedur Pengaduan',
              icon: Icon4,
              subtitle: 'Lihat Prosedur'
            }
          ]}
        />
      </div>
      {show && <Modal />}
    </>
  );
};

export default DetailKarir;
