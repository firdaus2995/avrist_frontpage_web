'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import {
  KarirModal,
  SuccessModal
} from '@/components/molecules/specifics/avrast/Modal';
import { getDetailKarir } from '@/services/detail-karir.api';
import {
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const DetailKarir = () => {
  const router = useRouter();
  // const pathSegments = pathname.split('/');
  // const slug = pathSegments[pathSegments.length - 1];
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: '',
    judul: '',
    deskripsiJudul: '',
    subjudul: '',
    deskripsiSubjudul: '',
    formId: ''
  });

  const fetchData = () => {
    try {
      getDetailKarir('halaman-detail-karir-avras').then((res: any) => {
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
        const judul = contentStringTransformer(content['judul-section']);
        const deskripsiJudul = contentStringTransformer(
          content['deskripsi-judul']
        );
        const subjudul = contentStringTransformer(content['subjudul-section']);
        const deskripsiSubjudul = contentStringTransformer(
          content['deskripsi-subjudul']
        );
        const formId = contentStringTransformer(content['form-karir']);
        setData({
          titleImage,
          bannerImage,
          footerImage,
          judul,
          deskripsiJudul,
          subjudul,
          deskripsiSubjudul,
          formId
        });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showSuccess) {
      setShow(false);
    }
  }, [showSuccess]);

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
            {data.judul ?? ''}
          </h1>

          <p
            className="text-xl font-opensans flex flex-col"
            dangerouslySetInnerHTML={{
              __html: data.deskripsiJudul
            }}
          />

          <div className="flex flex-col gap-[1rem]">
            <h2 className="xs:text-[1.5rem] md:text-[2.25rem] font-karla font-bold text-purple_dark">
              {data.subjudul}
            </h2>
            <p
              className="text-xl font-opensans flex flex-col"
              dangerouslySetInnerHTML={{
                __html: data.deskripsiSubjudul.replace(
                  '<ul>',
                  "<ul class='list-disc list-inside font-opensans'>"
                )
              }}
            />
          </div>

          <div className="w-full flex xs:justify-center md:justify-start">
            <Button
              customButtonClass="rounded-xl bg-purple_dark"
              customTextClass="text-white font-opensans text-xl font-semibold my-2 mx-[2.5rem]"
              title="Yuk, isi form berikut!"
              onClick={() => {
                setShow(true);
              }}
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
        <RoundedFrameTop bgColor="xs:bg-white sm:bg-purple_superlight" />
      </div>
      <div className="w-full h-full bg-purple_superlight xs:-mt-2 md:mt-0">
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
      <div className="absolute">
        <KarirModal
          id={data.formId}
          show={show}
          onClose={() => {
            setShow(false);
          }}
          setSuccess={setShowSuccess}
        />
        <SuccessModal
          show={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            router.refresh();
          }}
        />
      </div>
    </div>
  );
};

export default DetailKarir;
