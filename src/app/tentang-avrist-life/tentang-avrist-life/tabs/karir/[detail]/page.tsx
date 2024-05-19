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
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { handleGetContentPage } from '@/services/content-page.api';
import { getDetailKarir } from '@/services/detail-karir.api';
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
  const [, setContentData] = useState<any>();

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

      getDetailKarir('halaman-detail-karir-avras').then((res) => {
        console.log(res);
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

  return (
    <div className="flex flex-col items-center justify-center bg-purple_dark">
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

      <div className="mb-1 w-full justify-between gap-2 items-stretch px-[2rem] md:px-[8.5rem] pt-[5rem] rounded-t-[76px] bg-white xs:-mt-24 md:-mt-28 z-[10]">
        <div className="flex flex-col gap-[3rem]">
          <h1 className="xs:text-[2.25rem] md:text-[3.5rem] font-karla font-bold">
            Rekrutmen Tenaga Pemasar
          </h1>

          <p className="text-xl font-opensans flex flex-col">
            Bagi kamu yang menyukai tantangan, memiliki jaringan yang luas, dan
            memiliki hasrat membangun bisnis sendiri, mari bergabung sebagai
            Tenaga Pemasar/marketing Asuransi PT Avrist Assurance!
            <br /> <br />
            Sebagai penasihat finansial mandiri, kamu akan dibekali dengan
            berbagai macam produk finansial yang dapat membantu kamu menyediakan
            solusi terbaik sesuai dengan kebutuhan nasabah.
          </p>

          <div className="flex flex-col gap-[1rem]">
            <h2 className="xs:text-[1.5rem] md:text-[2.25rem] font-karla font-bold text-purple_dark">
              Keuntungan Menjadi Tenaga Pemasar / Marketing Asuransi PT Avrist
              Assurance
            </h2>
            <ul className="list-disc list-inside text-xl font-opensans">
              <li>Waktu kerja fleksibel</li>
              <li>Unlimited income</li>
              <li>Bimbingan dan pelatihan bisnis yang berkesinambungan</li>
              <li>Mendapatkan penghargaan sebagai yang terbaik</li>
              <li>Promosi</li>
              <li>Bonus jalan-jalan keluar negeri GRATIS</li>
            </ul>
          </div>

          <div>
            <Button
              customButtonClass="rounded-xl bg-purple_dark"
              customTextClass="text-white font-opensans text-xl font-semibold my-2 mx-[2.5rem]"
              title="Yuk, isi form berikut!"
            />
          </div>

          <div className="w-full border border-gray_light flex xs:flex-col md:flex-row xs:gap-4 md:justify-between items-center p-[1.5rem] rounded-xl">
            <p className="font-bold text-2xl text-purple_dark xs:text-center md:text-start">
              Belum tertarik dengan lowongan ini?
            </p>
            <Link
              href={
                '/tentang-avrist-life/tentang-avrist-life?tab=Karir+Bersama+Avrist'
              }
            >
              <Button
                customButtonClass="rounded-xl bg-purple_dark"
                customTextClass="text-white font-opensans font-semibold"
                title="List Lowongan"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <RoundedFrameBottom />
        <FooterInformation
          bgColor="bg-gray_bglightgray"
          title={
            <div className="flex flex-col items-center justify-center gap-4 bg-gray_bglightgray">
              <p className="xs:text-[2.25rem] md:text-[3.5rem] font-extrabold font-karla">
                Hubungi Kami
              </p>
              <div>
                <Link
                  href="tel:02157898188"
                  role="button"
                  className="py-4 px-[3.25rem] border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark xs:text-[1.25rem] md:text-[2.25rem] font-bold bg-white font-karla"
                >
                  <Image src={Phone} alt="phone" className="w-10" />
                  <p>021 5789 8188</p>
                </Link>
              </div>

              <p className="text-xl">
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
    </div>
  );
};

export default DetailKarir;
