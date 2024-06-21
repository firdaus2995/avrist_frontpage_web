'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ContentPopover from '../life-guide/[detail]/content-popover';
import { month } from './month';
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
import { SubmittedFormModal } from '@/components/molecules/specifics/avrast/Modal';
import { subscribeApi } from '@/services/berita';
import { handleGetContentPage } from '@/services/content-page.api';
import { getYouTubeId } from '@/utils/helpers';
import {
  contentDetailTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const DetailTanyaAvrista = ({ params }: { params: { detail: string } }) => {
  console.log(params);
  const param = useSearchParams();
  const id = param.get('id');

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
    artikelPICJabatan: ''
  });
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [email, setEmail] = useState<any>('');
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);

  const [isOpenPopover, setIsOPenPopover] = useState<boolean>(false);

  const fetchData = () => {
    try {
      handleGetContentPage('avrist-terkini-detail').then((res: any) => {
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
    const response = await fetch(`/api/berita-dan-kegiatan/${id}`);
    const jsonData = await response.json();

    const { content } = contentDetailTransformer(jsonData);

    const tagline = content['topik-artikel'].value;
    const judul = content['judul-artikel'].value;
    const penulis = content['penulis-artikel'].value;
    const bulan = content['bulan'].value;
    const tahun = content['tahun'].value;
    const artikel = content['artikel-looping'].contentData[0].details;
    const dataArtikel = content['artikel-looping'].contentData;
    const paragrafSatu = artikel[0].value;
    const artikelImage = singleImageTransformer(artikel[1])?.imageUrl;
    const paragrafDua = artikel[2]?.value;
    const artikelVideo = artikel[3]?.value;
    const paragrafTiga = artikel[4]?.value;
    const tags = content['tags']?.value?.split(',');
    const artikelPIC = content['artikel-pic']?.value;
    const artikelPICJabatan = content['artikel-pic-jabatan']?.value;
    const date = new Date(jsonData?.data?.createdAt).getDate();
    const monthInText = month.find((item) => item.value === bulan)?.label;
    const externalLink = content['list-external-link'].contentData;

    const transformedData = {
      tagline,
      judul,
      penulis,
      bulan,
      tahun,
      paragrafSatu,
      artikelImage,
      paragrafDua,
      artikelVideo,
      paragrafTiga,
      tags,
      artikelPIC,
      artikelPICJabatan,
      date,
      monthInText,
      externalLink,
      dataArtikel
    };

    setContentData(transformedData);

    return transformedData;
  };

  const handleSubscribeButton = async () => {
    try {
      const response: any = await subscribeApi({
        email: email,
        entity: 'avrist'
      });
      if (response?.code === 200) {
        setVisibleSubscribeModal(true);
        setEmail('');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDetailData();
  }, []);

  const RenderArtikelLooping = () => {
    return contentData?.dataArtikel?.map((item: any, index: number) => {
      const paragrafSatu = item['details'][0]?.value ?? '-';
      const artikelImage = singleImageTransformer(item['details'][1]);
      const paragrafDua = item['details'][2]?.value ?? '-';
      const artikelVideo = item['details'][3]?.value ?? '-';
      const paragrafTiga = item['details'][4]?.value ?? '-';

      return (
        <div key={index}>
          {paragrafSatu !== '-' && (
            <p
              dangerouslySetInnerHTML={{
                __html: paragrafSatu
              }}
              className="font-opensans text-xl"
            />
          )}

          <div className="bg-gray-200">
            {artikelImage && (
              <Image
                src={artikelImage?.imageUrl ?? BlankImage}
                alt="img"
                className="w-full max-h-[900px]"
                width={0}
                height={0}
              />
            )}
          </div>

          {paragrafDua !== '-' ||
            (paragrafDua !== '<p>-</p>' && (
              <span
                dangerouslySetInnerHTML={{
                  __html: paragrafDua
                }}
                className="font-opensans text-xl"
              />
            ))}
          {artikelVideo !== '-' && (
            <div className="w-full xs:h-[200px] md:h-[650px] mb-10">
              {
                <VideoPlayer
                  thumbnail=""
                  url={getYouTubeId(artikelVideo) ?? ''}
                  color="purple_dark"
                  type="Artikel Video"
                />
              }
            </div>
          )}

          {paragrafTiga !== '-' ||
            (paragrafTiga !== '<p>-</p>' && (
              <span
                className="text-xl"
                dangerouslySetInnerHTML={{
                  __html: paragrafTiga
                }}
              />
            ))}

          <div
            className={`flex flex-row gap-4 ${artikelVideo === '-' ? 'mt-10' : 'mt-0'}`}
          >
            <div className="flex flex-row gap-4">
              <p className="text-sm font-medium lg:min-w-[180px]">
                Artikel ini telah di liput di:
              </p>
              <div className="flex flex-wrap gap-3">
                {contentData?.externalLink?.map((el: any, index: number) => (
                  <Link
                    key={index}
                    href={el.details[1]?.value}
                    target="_blank"
                    className="flex flex-row gap-2 items-center text-sm font-medium text-purple_dark"
                  >
                    {el.details[0]?.value}
                    {el.details[0]?.value !== '-' && (
                      <Icon
                        name="externalLink"
                        color="purple_dark"
                        width={10}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="absolute">
        <SubmittedFormModal
          show={visibleSubscribeModal}
          onClose={() => setVisibleSubscribeModal(false)}
        />
      </div>
      <Hero
        title="Avrist Terkini"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Berita dan Kegiatan',
            href: '/promo-berita/berita?tab=Avrist+Terkini&category=Berita+dan+Kegiatan'
          }
        ]}
        imageUrl={data?.titleImage}
        bottomImage={data?.bannerImage ?? BlankImage}
      />
      <div className="w-full xs:px-[2rem] xs:py-[3.125rem] md:px-[8.5rem] md:pt-[5rem] md:pb-[1rem]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <span className="text-purple_dark font-semibold">
              {contentData[0] === '<' ? (
                <span
                  dangerouslySetInnerHTML={{ __html: contentData?.tagline }}
                />
              ) : (
                <span className="text-[24px]">{contentData?.tagline}</span>
              )}
            </span>
            <p
              className="font-bold font-karla xs:text-[2.25rem] md:text-[3.5rem]"
              dangerouslySetInnerHTML={{ __html: contentData.judul }}
            />

            <div className="flex flex-row justify-between items-center font-opensans">
              <div className="flex flex-col gap-2">
                <p>
                  {`${contentData?.date} ${contentData.monthInText} ${contentData.tahun}`}{' '}
                  | {contentData.penulis}
                </p>

                <div className="flex flex-row gap-2">
                  {contentData?.tags.length > 0 &&
                    contentData.tags.map((tag: any, idx: number) => (
                      <MediumTag title={tag} key={idx} />
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div
                  className="flex items-center"
                  role="button"
                  id="PopoverFocus"
                  onClick={() => setIsOPenPopover(!isOpenPopover)}
                >
                  <Icon
                    width={16}
                    height={16}
                    name="share"
                    color="purple_verylight"
                  />
                </div>

                <div className="text-xs font-bold">Share</div>
                <ContentPopover
                  isOpenPopover={isOpenPopover}
                  setIsOPenPopover={() => setIsOPenPopover(false)}
                  message={contentData?.judul}
                />
              </div>
            </div>
          </div>
          {RenderArtikelLooping()}

          {/* <div className="flex flex-col gap-5 p-5 border border-b-8 border-b-purple_dark rounded-xl">
            <p className="font-bold text-2xl">
              Informasi lebih lanjut, hubungi:
            </p>
            <div className="flex flex-col">
              <p className="font-bold text-xl">{contentData?.artikelPIC}</p>
              <p className="text-xl">{contentData?.artikelPICJabatan}</p>
            </div>
            <div className="flex xs:flex-col md:flex-row md:items-center xs:gap-4 justify-between">
              <div className="flex flex-row gap-2 items-center">
                <Image alt={'email'} className="w-6" src={Email} />
                <p className="font-bold text-sm">corcom@avrist.com</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image alt={'phone'} className="w-6" src={Phone} />
                <p className="font-bold text-sm">+62 21 5789 8188</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image alt={'office'} className="w-6" src={Office} />
                <p className="font-bold text-sm">
                  Sekilas Avrist Life Insurance
                </p>
              </div>
            </div>
          </div> */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  title="Subscribe"
                  customButtonClass="rounded-xl"
                  onClick={handleSubscribeButton}
                />
              </div>
            </div>
          }
          image={data?.footerImage ?? BlankImage}
        />
        <RoundedFrameTop bgColor="bg-white" />
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
    </>
  );
};

export default DetailTanyaAvrista;
