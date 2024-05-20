'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { month } from './month';
import Icon1 from '@/assets/images/avrast/component/informasi-klaim/bantuan.svg';
import Icon3 from '@/assets/images/avrast/component/panduan-pengajuan/icon-1.svg';
import Icon2 from '@/assets/images/avrast/component/proses-klaim/step-4-icon-4.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import Email from '@/assets/images/common/email_color.svg';
import Facebook from '@/assets/images/common/facebook_color.svg';
import Icon4 from '@/assets/images/common/heart-check.svg';
import Linkedin from '@/assets/images/common/linkedin_color.svg';
import Office from '@/assets/images/common/office.svg';
import Phone from '@/assets/images/common/phone.svg';
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
import { handleGetContentPage } from '@/services/content-page.api';
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
    const paragrafSatu = artikel[0].value;
    const artikelImage = singleImageTransformer(artikel[1])?.imageUrl;
    const paragrafDua = artikel[2]?.value;
    const artikelVideo = artikel[3]?.value;
    const paragrafTiga = artikel[4]?.value;
    const tags = content['tags']?.value;
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

      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col gap-10 w-2/3 p-10">
          <div className="flex flex-col gap-5">
            <span className="text-purple_dark font-semibold">
              {
                contentData[0] === '<' ? <span dangerouslySetInnerHTML={{ __html: contentData?.tagline }} /> :
                <span className='text-[24px]'>{contentData?.tagline}</span>
              }
              
            </span>
            <p
              className="font-semibold text-[56px]"
              dangerouslySetInnerHTML={{ __html: contentData.judul }}
            />

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-2">
                <p>
                  {`${contentData?.date} ${contentData.monthInText} ${contentData.tahun}`} |{' '}
                  {contentData.penulis}
                </p>

                <div className="flex flex-row gap-2">
                  <MediumTag title={contentData.tags} />
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div className="flex items-center" role="button" id="PopoverFocus" onClick={() => setIsOPenPopover(!isOpenPopover)}>
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
              className='text-xl'
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
              className='text-xl'
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
              className='text-xl'
              dangerouslySetInnerHTML={{
                __html: contentData.paragrafTiga
              }}
            />
          }

          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-4">
              <p className="text-sm font-medium">
                Artikel ini telah di liput di:
              </p>
              {
                contentData?.externalLink?.map((item:any, index:number) => (
                  <div key={index} className="flex flex-row gap-2 items-center text-sm font-medium text-purple_dark">
                    {item.details[0]?.value}
                    {item.details[0]?.value !== '-' && <Icon name="externalLink" color="purple_dark" width={10} />}
                  </div>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5 border border-b-8 border-b-purple_dark rounded-xl">
            <p className="font-bold text-2xl">
              Informasi lebih lanjut, hubungi:
            </p>
            <div className="flex flex-col">
              <p className="font-bold text-xl">{contentData?.artikelPIC}</p>
              <p className="text-xl">{contentData?.artikelPICJabatan}</p>
            </div>
            <div className="flex flex-row items-center justify-between xs:max-md:flex-wrap">
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
                <p className="font-bold text-sm">Sekilas Avrist Life Insurance</p>
              </div>
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
