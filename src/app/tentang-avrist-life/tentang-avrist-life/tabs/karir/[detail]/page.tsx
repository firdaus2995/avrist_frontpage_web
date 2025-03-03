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
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import {
  KarirModal,
  SuccessModal
} from '@/components/molecules/specifics/avrast/Modal';
import { handleGetContent } from '@/services/content-page.api';
import { getDetailKarir } from '@/services/detail-karir.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  contentTransformer,
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
  const [popUpImage, setPopUpImage] = useState<string>('');
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
      getDetailKarir(BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.DETAIL_KARIR).then(
        (res: any) => {
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
          const subjudul = contentStringTransformer(
            content['subjudul-section']
          );
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
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchModalImage = () => {
    try {
      handleGetContent(BASE_SLUG.POP_UP_SUBMIT_FORM, {
        includeAttributes: 'true'
      }).then((res: any) => {
        const { content } = contentTransformer(res);
        const submitImage = singleImageTransformer(content['pop-up-image']);
        setPopUpImage(submitImage.imageUrl);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchModalImage();
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

      <CustomContainer className="pb-2 w-full justify-between gap-2 items-stretch rounded-t-[60px] bg-white xs:-mt-[3.4rem] md:-mt-[6.3rem] z-[10]">
        <div className="flex flex-col gap-[3rem]">
          <p className="!mb-0 mt-[5rem] text-[3.5rem] font-karla font-bold leading-[67.2px] -tracking-[2.24px]">
            {data?.judul ?? ''}
          </p>

          <p
            className="text-xl font-opensans flex flex-col leading-[28px]"
            dangerouslySetInnerHTML={{
              __html: data?.deskripsiJudul
            }}
          />

          <div className="flex flex-col gap-[1rem]">
            <h2 className="text-[2.25rem] font-karla font-bold text-purple_dark -tracking-[2.56px] leading-[42.3px]">
              {data?.subjudul}
            </h2>
            <p
              className="text-xl font-opensans flex flex-col leading-[28px] text-wrap xs:pl-[1rem] sm:pl-[1.5rem]"
              dangerouslySetInnerHTML={{
                __html: data?.deskripsiSubjudul.replace(
                  '<ul>',
                  "<ul class='list-disc list-outside font-opensans'>"
                )
              }}
            />
          </div>

          <div className="w-full flex xs:justify-center md:justify-start">
            <Button
              customButtonClass="rounded-xl bg-purple_dark hover:bg-purple_light !px-[40px] !py-[12px]"
              customTextClass="text-white font-opensans text-xl font-semibold my-2 mx-[2.5rem] leading-[28px]"
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
                customButtonClass="rounded-xl bg-purple_dark hover:bg-purple_light"
                customTextClass="text-white font-opensans font-semibold leading-[23.68px]"
                title="List Lowongan"
              />
            </Link>
          </div>
        </div>
      </CustomContainer>

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
                  className="py-4 xs:px-[1.25rem] sm:px-[3.25rem] border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark xs:text-[1.25rem] md:text-[2.25rem] font-bold bg-white font-karla"
                >
                  <Image src={Phone} alt="phone" className="w-10" />
                  <p>021 5789 8188</p>
                </Link>
              </div>

              <p className="text-xl">
                <span className="font-bold">Waktu Operasional:</span>{' '}
                <br className="sm:hidden" /> Senin - Jumat, 08.00 - 17.00 WIB
              </p>
            </div>
          }
          image={data?.footerImage ?? BlankImage}
        />
        <RoundedFrameTop bgColor="xs:bg-white sm:bg-purple_superlight" />
      </div>
      <div className="w-full h-full xs:bg-white sm:bg-purple_superlight xs:-mt-1 md:mt-0">
        <FooterCards
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
              title: 'Prosedur Pengaduan',
              icon: Icon4,
              subtitle: 'Lihat Prosedur',
              href: '/klaim-layanan/layanan/penanganan-pengaduan'
            }
          ]}
        />
      </div>
      <div className="absolute">
        <KarirModal
          id={data?.formId}
          show={show}
          onClose={() => {
            setShow(false);
          }}
          setSuccess={setShowSuccess}
        />
        <SuccessModal
          popUpImage={popUpImage}
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
