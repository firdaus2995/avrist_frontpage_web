'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { UncontrolledPopover, PopoverBody } from 'reactstrap';
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
import CardCategoryB from '@/components/molecules/specifics/avrast/Cards/CategoriB';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import InterestSection from '@/components/molecules/specifics/avrast/InterestSection';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { getPenawaran } from '@/services/berita';
import {
  handleGetContentPage,
  handleGetContent
} from '@/services/content-page.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import { htmlParser, getYouTubeId } from '@/utils/helpers';
import {
  contentDetailTransformer,
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer,
  contentTransformer
} from '@/utils/responseTransformer';

const monthDropdown = () => {
  const month = [
    {
      label: 'Pilih Bulan',
      value: ''
    },
    {
      label: 'Januari',
      value: '01'
    },
    {
      label: 'Februari',
      value: '02'
    },
    {
      label: 'Maret',
      value: '03'
    },
    {
      label: 'April',
      value: '04'
    },
    {
      label: 'Mei',
      value: '05'
    },
    {
      label: 'Juni',
      value: '06'
    },
    {
      label: 'Juli',
      value: '07'
    },
    {
      label: 'Agustus',
      value: '08'
    },
    {
      label: 'September',
      value: '09'
    },
    {
      label: 'Oktober',
      value: '10'
    },
    {
      label: 'November',
      value: '11'
    },
    {
      label: 'Desember',
      value: '12'
    }
  ];

  return month;
};

const DetailPromoTerbaru = ({ params }: { params: { detail: string } }) => {
  const id = params.detail;

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
  const [otherContent, setOtherContent] = useState<any>();
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: '',
    popUpImage: ''
  });
  const [formId, setFormId] = useState('');
  const [isOpenPopover, setIsOPenPopover] = useState<boolean>(false);

  const fetchData = () => {
    try {
      handleGetContentPage(BASE_SLUG.PROMO_BERITA.PAGE.PENAWARAN_DETAIL).then(
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
          setFormId(contentStringTransformer(content['form-produk']));
          setData({ titleImage, bannerImage, footerImage });
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSlugModal = async () => {
    try {
      handleGetContent('pop-up-submit-form', {
        includeAttributes: 'true'
      }).then((res: any) => {
        const { content } = contentTransformer(res);
        const submitImage = singleImageTransformer(content['pop-up-image']);
        setData({ ...data, popUpImage: submitImage.imageUrl });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDetailData = async () => {
    const response = await fetch(`/api/promo/${id}`);
    const jsonData = await response.json();

    const { content } = contentDetailTransformer(jsonData);

    const tagline = content['tags'].value;
    const judul = content['judul-artikel'].value;
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
      tags
    };

    setContentData(transformedData);

    return transformedData;
  };

  const fetchOtherContent = async () => {
    try {
      const fetchContentCategory = await getPenawaran({
        includeAttributes: 'true'
      });

      const data = fetchContentCategory.data.categoryList;

      const transformedData = data['']?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['judul-artikel'].value;
        const waktu = `${
          monthDropdown().find((item) => item.value === content['bulan'].value)
            ?.label
        } ${content['tahun'].value}`;
        const image = singleImageTransformer(
          content['artikel-thumbnail']
        ).imageUrl;
        const id = item.id;

        return { judul, waktu, image, id };
      });

      setOtherContent(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDetailData();
    fetchOtherContent();
    fetchSlugModal();
  }, []);

  return (
    <>
      <Hero
        title="Promo"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Avrist Promo Terbaru',
            href: '/promo-berita/promo?tab=Promo+Terbaru'
          }
        ]}
        imageUrl={data?.titleImage !== '' ? data?.titleImage : BlankImage}
        bottomImage={data?.bannerImage !== '' ? data?.bannerImage : BlankImage}
      />

      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col xs:py-[3.125rem] xs:px-[2rem] md:py-[5rem] md:px-[23.281rem] xs:gap-[1.5rem] md:gap-[3rem] font-opensans">
          <div className="flex flex-col gap-[0.5rem]">
            <p className="text-purple_dark font-bold font-karla text-2xl">
              {contentData?.tags}
            </p>
            <p className="font-bold font-karla xs:text-[2.25rem] md:text-[3.5rem]">
              {contentData && htmlParser(contentData.judul)}
            </p>
            <div className="flex xs:flex-col md:flex-row justify-between md:items-center gap-1">
              <div className="flex flex-col gap-2">
                <p className="text-base text-gray_body">
                  {`${contentData.bulan} ${contentData.tahun}`} |{' '}
                  {contentData.penulis}
                </p>
              </div>
              <div className="flex flex-col gap-1 md:items-center">
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
                <UncontrolledPopover
                  placement="right"
                  target="PopoverFocus"
                  trigger="focus"
                  isOpen={isOpenPopover}
                  toggle={() => setIsOPenPopover(false)}
                >
                  <PopoverBody className="absolute right-0 mt-[30px] z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2 lg:min-w-[350px]">
                    <div
                      className="py-1 flex flex-row gap-5 xs:max-md:flex-wrap"
                      role="none"
                    >
                      <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                        <Image
                          role="button"
                          // onClick={() => setIsVisible(!isVisible)}
                          className="h-auto w-5"
                          src={Whatsapp}
                          alt="whatsapp"
                        />
                        <div className="text-xs font-bold cursor-pointer">
                          Whatsapp
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                        <Image
                          role="button"
                          // onClick={() => setIsVisible(!isVisible)}
                          className="h-auto w-5"
                          src={Email}
                          alt="email"
                        />
                        <div className="text-xs font-bold cursor-pointer">
                          Email
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                        <Image
                          role="button"
                          // onClick={() => setIsVisible(!isVisible)}
                          className="h-auto w-5"
                          src={Linkedin}
                          alt="linkedin"
                        />
                        <div className="text-xs font-bold cursor-pointer">
                          LinkedIn
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-center xs:max-md:m-auto">
                        <Image
                          role="button"
                          // onClick={() => setIsVisible(!isVisible)}
                          className="h-auto w-5"
                          src={Facebook}
                          alt="facebook"
                        />
                        <div className="text-xs font-bold cursor-pointer">
                          Facebook
                        </div>
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
                        <div className="text-xs font-bold cursor-pointer">
                          Copy URL
                        </div>
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

          <div className="w-full xs:h-[250px] md:h-[650px] mb-16">
            <VideoPlayer
              thumbnail=""
              url={getYouTubeId(contentData.artikelVideo) ?? ''}
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

      <InterestSection formId={formId} popUpImage={data.popUpImage} />

      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center xs:py-[3.125rem] md:py-[5rem] xs:px-[2rem] md:px-[8.5rem] xs:gap-[2.25rem] md:gap-[4rem]">
          <p className="text-purple_dark font-bold xs:text-[2.25rem] md:text-[3.5rem] text-center font-karla">
            Penawaran Promo Lainnya
          </p>
          <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-[24px]">
            {otherContent?.map((item: any, index: number) => (
              <Link
                key={index}
                href={{
                  pathname: `/promo-berita/promo/promo-terbaru`,
                  query: { id: item.id }
                }}
              >
                <CardCategoryB
                  key={index}
                  summary={htmlParser(item.judul)}
                  description={item.waktu}
                  imageUrl={
                    !item.image || item.image?.includes('no-image')
                      ? BlankImage
                      : item.image
                  }
                />
              </Link>
            ))}
          </div>
        </div>
        <RoundedFrameBottom />
        <FooterInformation
          title={
            <div className="flex flex-col gap-4">
              <p className="xs:text-[2.25rem] md:text-[3.5rem]">
                Subscribe Informasi Terkini!
              </p>
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
        <RoundedFrameTop bgColor="xs:bg-white md:bg-purple_superlight" />
      </div>
      <FooterCards
        bgColor="xs:bg-white md:bg-purple_superlight"
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

export default DetailPromoTerbaru;
