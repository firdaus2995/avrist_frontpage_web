'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Icon1 from '@/assets/images/avrast/component/informasi-klaim/bantuan.svg';
import Icon3 from '@/assets/images/avrast/component/panduan-pengajuan/icon-1.svg';
import Icon2 from '@/assets/images/avrast/component/proses-klaim/step-4-icon-4.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import Icon4 from '@/assets/images/common/heart-check.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import MediumTag from '@/components/atoms/Tag/MediumTag';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { handleGetContentPage } from '@/services/content-page.api';
import {
  contentDetailTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const DetailPenghargaan = ({ params }: { params: { detail: string } }) => {
  console.log(params);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const slug = pathSegments[pathSegments.length - 1];

  const [contentData, setContentData] = useState<any>();
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });

  const fetchData = () => {
    try {
      handleGetContentPage('halaman-penghargaan-dan-sertifikasi-avram').then(
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
          setData({ titleImage, bannerImage, footerImage });
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDetailData = async () => {
    const response = await fetch(`/api/penghargaan/${slug}`);
    const jsonData = await response.json();

    const { content } = contentDetailTransformer(jsonData);

    const tagline = content['tags'].value;
    const judul = content['judul-artikel'].value;
    const nama = content['nama-penghargaan'].value;
    const penulis = content['penulis-artikel'].value;
    const bulan = content['bulan'].value;
    const tahun = content['tahun'].value;
    const artikel = content['artikel-looping'].contentData[0].details;
    const paragrafSatu = artikel[0].value;
    const artikelImage = singleImageTransformer(artikel[1]).imageUrl;
    const paragrafDua = artikel[2].value;
    const artikelVideo = artikel[3].value;
    const paragrafTiga = artikel[4].value;
    const tags = content['tags'].value;
    const externalLink = content['external-link-info'].value;

    const transformedData = {
      tagline,
      judul,
      nama,
      penulis,
      bulan,
      tahun,
      paragrafSatu,
      artikelImage,
      paragrafDua,
      artikelVideo,
      paragrafTiga,
      tags,
      externalLink
    };

    setContentData(transformedData);

    return transformedData;
  };

  useEffect(() => {
    fetchData();
    fetchDetailData();
  }, []);
  return (
    <>
      <Hero
        title="Penghargaan"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Penghargaan',
            href: '/tentang-avrist-life/tentang-avrist-life?tab=Penghargaan'
          }
        ]}
        imageUrl={data?.titleImage}
        bottomImage={contentData?.artikelImage ?? BlankImage}
      />

      {contentData && (
        <div className="flex items-center justify-center w-full xs:px-[2rem] md:px-[8.5rem] py-[1.25rem]">
          <div className="flex flex-col gap-10 font-opensans">
            <div className="flex flex-col gap-5">
              <span className="text-purple_dark font-semibold">
                <span
                  dangerouslySetInnerHTML={{ __html: contentData.tagline }}
                />
              </span>
              <p
                className="font-bold xs:text-[1.5rem] md:text-[3.5rem] font-karla"
                dangerouslySetInnerHTML={{ __html: contentData.judul }}
              />
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                  <p>
                    {`${contentData.bulan} ${contentData.tahun}`} |{' '}
                    {contentData.penulis}
                  </p>
                  <div className="flex flex-row gap-2">
                    <MediumTag title={contentData.tags} />
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
            {
              <p
                dangerouslySetInnerHTML={{
                  __html: contentData.paragrafSatu
                }}
              />
            }
            <div className="bg-gray-200">
              <Image
                src={contentData.artikelImage ?? BlankImage}
                alt="img"
                className="w-full"
                width={238}
                height={172}
              />
            </div>
            {
              <span
                dangerouslySetInnerHTML={{
                  __html: contentData.paragrafDua
                }}
              />
            }
            <div className="w-full xs:h-[200px] md:h-[650px] mb-10">
              <VideoPlayer
                thumbnail=""
                url={contentData.artikelVideo}
                color="purple_dark"
                type="Artikel Video"
              />
            </div>

            {
              <span
                dangerouslySetInnerHTML={{
                  __html: contentData.paragrafTiga
                }}
              />
            }
            <div className="flex flex-col gap-5 p-5 border border-b-8 border-b-purple_dark rounded-xl">
              {/* <p className="font-semibold text-xl">
                Berita ini telah terbit di:
              </p>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                  Kompas
                  <Icon name="externalLink" color="purple_dark" width={10} />
                </div>
                <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                  Media Indonesia
                  <Icon name="externalLink" color="purple_dark" width={10} />
                </div>
                <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                  Tribun
                  <Icon name="externalLink" color="purple_dark" width={10} />
                </div>
                <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                  Detik
                  <Icon name="externalLink" color="purple_dark" width={10} />
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <Image alt={'email'} className="w-6" src={Email} />
                  <p className="font-bold">corcom@avrist.com</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Image alt={'phone'} className="w-6" src={Phone} />
                  <p className="font-bold">+62 21 5789 8188</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Image alt={'office'} className="w-6" src={Office} />
                  <p className="font-bold">Sekilas Avrist Life Insurance</p>
                </div>
              </div> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: contentData.externalLink
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <RoundedFrameBottom />
        <FooterInformation
          title={
            <div className="flex flex-col gap-4">
              <p className="text-[56px]">Subscribe Informasi Terkini!</p>
              <Button
                title="Avrist Life Insurance"
                customButtonClass="bg-purple_dark rounded-xl"
                customTextClass="text-white font-bold"
              />
              <div className="flex flex-row gap-2">
                <Input
                  type="text"
                  placeholder="Masukkan email Anda"
                  customInputClass="w-[90%]"
                />
                <Button title="Subscribe" customButtonClass="rounded-xl" />
              </div>
            </div>
          }
          image={data?.footerImage ?? BlankImage}
        />
        <RoundedFrameTop />
      </div>
      <div className="w-full h-full bg-purple_superlight">
        <FooterCards
          cards={[
            {
              title: 'Hubungi Kami',
              icon: Icon1,
              subtitle: 'Lebih Lanjut',
              href: '/hubungi-kami/'
            },
            {
              title: 'Tanya Avrista',
              icon: Icon2,
              subtitle: 'Lebih Lanjut',
              href: '/tanya-avrista/'
            },
            {
              title: 'Panduan Klaim',
              icon: Icon3,
              subtitle: 'Lebih Lanjut',
              href: '/klaim-layanan/klaim?tab=Panduan+%26+Pengajuan'
            },
            {
              title: 'Asuransi Individu',
              icon: Icon4,
              subtitle: 'Lihat Produk',
              href: '/produk/individu?tab=Asuransi+Jiwa'
            }
          ]}
        />
      </div>
    </>
  );
};

export default DetailPenghargaan;
