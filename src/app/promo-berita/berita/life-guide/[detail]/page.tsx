'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { formatTimeDifference } from '../../format-time';
import Icon1 from '@/assets/images/avrast/component/informasi-klaim/bantuan.svg';
import Icon3 from '@/assets/images/avrast/component/panduan-pengajuan/icon-1.svg';
import Icon2 from '@/assets/images/avrast/component/proses-klaim/step-4-icon-4.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import Email from '@/assets/images/common/email_color.svg';
import Facebook from '@/assets/images/common/facebook_color.svg';
import Icon4 from '@/assets/images/common/heart-check.svg';
import Linkedin from '@/assets/images/common/linkedin_color.svg';
import Whatsapp from '@/assets/images/common/wa.svg';
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
import { getAvristLifeGuide } from '@/services/berita';
import { handleGetContentPage } from '@/services/content-page.api';
import {
  contentDetailTransformer,
  pageTransformer,
  singleImageTransformer,
  handleTransformedContent
} from '@/utils/responseTransformer';

const DetailAvristLifeGuide = ({ params }: { params: { detail: string } }) => {
  console.log(params);
  const param = useSearchParams();
  const id = param.get('id');

  const [isOpenPopover, setIsOPenPopover] = useState<boolean>(false);
  const [contentData, setContentData] = useState<any>({
    tagline: '',
    judul: '',
    penulis: '',
    bulan: '',
    tahun: '',
    paragrafSatu: '',
    artikelImage: '',
    paragrafDua: '',
    artikelVideo: '',
    paragrafTiga: '',
    tags: '',
    artikelPIC: '',
    artikelPICJabatan: '',
    waktuBaca: ''
  });
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [currentCategory, setCurrentCategory] = useState('');
  const [listArticle, setListArticle] = useState<any>();

  const fetchCategory = async () => {
    try {
      const fetchData = await getAvristLifeGuide({
        includeAttributes: 'true',
        category: currentCategory
      });

      const data = fetchData.data.categoryList;

      const transformedData = data[currentCategory]?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['judul-artikel'].value;
        const id = item.id;

        return { judul, id };
      });

      setListArticle(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = () => {
    try {
      handleGetContentPage('halaman-avrist-life-guide-detail').then(
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
    const response = await fetch(`/api/berita-dan-kegiatan/${id}`);
    const jsonData = await response.json();

    const { content } = contentDetailTransformer(jsonData);

    setCurrentCategory(jsonData.data.categoryName);

    const tagline = content['tags'].value;
    const judul = content['judul-artikel'].value;
    const penulis = content['penulis-artikel'].value;
    const bulan = content['bulan'].value;
    const tahun = content['tahun'].value;
    const thumbnail = singleImageTransformer(
      content['artikel-thumbnail']
    ).imageUrl;
    const artikel = content['artikel-looping'].contentData[0]?.details;
    const paragrafSatu = artikel[0]?.value;
    const artikelImage = (artikel[1])?.imageUrl ? singleImageTransformer(artikel[1])?.imageUrl : null;
    const paragrafDua = artikel[2]?.value;
    const artikelVideo = artikel[3]?.value;
    const paragrafTiga = artikel[4]?.value;
    const tags = content['tags']?.value;
    const artikelPIC = content['artikel-pic']?.value;
    const artikelPICJabatan = content['artikel-pic-jabatan']?.value;
    const waktuBaca = content['waktu-baca-artikel']?.value;
    const daftarIsi = content['artikel-looping']?.contentData;
    const differenceTime = formatTimeDifference(new Date(jsonData?.data?.createdAt), new Date())

    const transformedData = {
      tagline,
      judul,
      penulis,
      bulan,
      tahun,
      thumbnail,
      paragrafSatu,
      artikelImage,
      paragrafDua,
      artikelVideo,
      paragrafTiga,
      tags,
      artikelPIC,
      artikelPICJabatan,
      waktuBaca,
      daftarIsi,
      differenceTime
    };

    setContentData(transformedData);

    return transformedData;
  };

  useEffect(() => {
    fetchData();
    fetchDetailData();
  }, []);

  useEffect(() => {
    if (currentCategory) {
      fetchCategory();
    }
  }, [currentCategory]);

  return (
    <div className="flex flex-col">
      <Hero
        title="Avrist Terkini"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Avrist Life Guide',
            href: '/promo-berita/berita?tab=Avrist+Terkini&category=Avrist+Life+Guide'
          }
        ]}
        imageUrl={data?.titleImage}
        bottomImage={data?.bannerImage ?? BlankImage}
      />
      <div className="flex flex-row px-[136px] py-[72px] gap-[48px]">
        <div className="flex flex-col gap-10 py-10">
          <p className="font-semibold">Daftar Isi</p>
          <div className="flex flex-col shrink min-w-[210px] bg-purple_light_bg rounded-r-[12px] rounded-l-[4px] overflow-hidden">
            {listArticle?.slice(0, 5).map((item: any, index: number) =>
              item?.judul === contentData?.judul ? (
                <div
                  key={index}
                  className="border-l-4 border-purple_dark px-[15px] py-[10px] cursor-pointer text-left"
                >
                  <div
                    className="font-bold text-purple_dark text-[18px]"
                    dangerouslySetInnerHTML={{
                      __html: item.judul
                    }}
                  />
                </div>
              ) : (
                <Link
                  href={{
                    pathname: `/promo-berita/berita/life-guide/avrist-life-guide`,
                    query: { id: item.id }
                  }}
                  key={index}
                  role="button"
                  className="border-l-4 border-purple_mediumlight px-[15px] py-[10px] cursor-pointer text-left"
                >
                  <div
                    className="font-bold text-purple_mediumlight text-[18px]"
                    dangerouslySetInnerHTML={{
                      __html: item.judul
                    }}
                  />
                </Link>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col grow">
          <div className="flex items-center justify-start w-full">
            <div className="flex flex-col gap-10 w-2/3 py-10">
              <div className="flex flex-col gap-5">
                <p className="text-purple_dark font-semibold">
                  {contentData?.tags}
                </p>
                <p
                  className="font-semibold text-[48px]"
                  dangerouslySetInnerHTML={{
                    __html: contentData?.judul
                  }}
                />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className='text-base'>
                      {`${contentData?.differenceTime} yang lalu`} |{' '}
                      {contentData.penulis}
                    </p>
                    <div className="flex flex-row gap-2">
                      <MediumTag title={contentData?.tags} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="flex items-center" id="PopoverFocus" role="button" onClick={() => setIsOPenPopover(!isOpenPopover)}>
                      <Icon
                        width={16}
                        height={16}
                        name="share"
                        color="purple_verylight"
                      />
                    </div>

                    <div className="text-xs font-bold">Share</div>
                    <UncontrolledPopover
                      placement="right"
                      target="PopoverFocus"
                      trigger="focus"
                      isOpen={isOpenPopover}
                      toggle={() => setIsOPenPopover(false)}
                    >
                      <PopoverBody className="absolute right-0 mt-[30px] z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2 lg:min-w-[350px]">
                      <div className="py-1 flex flex-row gap-5 xs:max-md:flex-wrap" role="none">
                          <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                            <Image
                              role="button"
                              // onClick={() => setIsVisible(!isVisible)}
                              className="h-auto w-5"
                              src={Whatsapp}
                              alt="whatsapp"
                            />
                            <div className="text-xs font-bold cursor-pointer">Whatsapp</div>
                          </div>
                          <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                            <Image
                              role="button"
                              // onClick={() => setIsVisible(!isVisible)}
                              className="h-auto w-5"
                              src={Email}
                              alt="email"
                            />
                            <div className="text-xs font-bold cursor-pointer">Email</div>
                          </div>
                          <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                            <Image
                              role="button"
                              // onClick={() => setIsVisible(!isVisible)}
                              className="h-auto w-5"
                              src={Linkedin}
                              alt="linkedin"
                            />
                            <div className="text-xs font-bold cursor-pointer">LinkedIn</div>
                          </div>
                          <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                            <Image
                              role="button"
                              // onClick={() => setIsVisible(!isVisible)}
                              className="h-auto w-5"
                              src={Facebook}
                              alt="facebook"
                            />
                            <div className="text-xs font-bold cursor-pointer">Facebook</div>
                          </div>
                          <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                            <div
                              role="button"
                              className="items-center"
                              // onClick={() => setIsVisible(!isVisible)}
                            >
                              <Icon
                                width={18}
                                height={18}
                                name="copyUrl"
                                color="purple_verylight"
                              />
                            </div>
                            <div className="text-xs font-bold cursor-pointer">Copy URL</div>
                          </div>
                        </div>
                      </PopoverBody>
                    </UncontrolledPopover>
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

              <div className="w-full h-[650px] mb-10">
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
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default DetailAvristLifeGuide;
