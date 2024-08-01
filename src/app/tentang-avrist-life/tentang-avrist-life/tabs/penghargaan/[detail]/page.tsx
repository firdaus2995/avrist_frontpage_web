'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { month } from '@/app/promo-berita/berita/[detail]/month';
import ContentPopover from '@/app/promo-berita/berita/life-guide/[detail]/content-popover';
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
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { SubmittedFormModal } from '@/components/molecules/specifics/avrast/Modal';
import { handleGetContentPage } from '@/services/content-page.api';
import { subscribeApi } from '@/services/form.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  contentDetailTransformer,
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';
import { validateEmail } from '@/utils/validation';

const DetailPenghargaan = ({ params }: { params: { detail: string } }) => {
  console.log(params);
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const slug = pathSegments[pathSegments.length - 1];
  const [, setThumbnail] = useState<string>('');
  const [contentData, setContentData] = useState<any>();
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);
  const [isValidEmailContent, setIsValidEmailContent] =
    useState<boolean>(false);
  const [emailContent, setEmailContent] = useState('');

  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(false);
  const fetchData = () => {
    try {
      handleGetContentPage(BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.PENGHARGAAN).then(
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
    const bulan = month.find(
      (item) => item.value === content['bulan'].value
    )?.label;
    const tahun = content['tahun'].value;
    const artikel = content['artikel-looping'].contentData;
    const loopArtikel = artikel.map((item: any, itemIndex: number) => {
      return (
        <div
          className="flex flex-col gap-10 font-opensans text-xl pb-[14px]"
          key={itemIndex}
        >
          {item.details.map((detailItem: any, detailIndex: number) => {
            const fieldType = detailItem.fieldType;
            const isNotEmpty =
              detailItem.value !== '<p>-</p>' &&
              detailItem.value !== '["-"]' &&
              detailItem.value !== '-' &&
              !detailItem.value.includes('>-<');
            if (fieldType === 'TEXT_EDITOR' && isNotEmpty) {
              return (
                <span
                  dangerouslySetInnerHTML={{
                    __html: detailItem.value
                  }}
                  key={detailIndex}
                  className="font-opensans text-xl"
                />
              );
            }
            if (
              fieldType === 'IMAGE' &&
              isNotEmpty &&
              !singleImageTransformer(detailItem).imageUrl.includes('no-image')
            ) {
              return (
                <div
                  className="w-full flex items-center justify-center"
                  key={detailIndex}
                >
                  <Image
                    src={
                      singleImageTransformer(detailItem).imageUrl ?? BlankImage
                    }
                    alt="img"
                    className="w-auto h-auto"
                    width={0}
                    height={0}
                  />
                </div>
              );
            }
            if (fieldType === 'YOUTUBE_URL' && isNotEmpty) {
              return (
                <div
                  className="w-full h-full flex justify-center"
                  key={detailIndex}
                >
                  <div className="w-auto sm:w-[1120px] xs:h-full md:h-[650px] xs:mb-10 md:mb-0">
                    <VideoPlayer
                      thumbnail=""
                      url={detailItem.value ?? ''}
                      color="purple_dark"
                      type=""
                      mute={true}
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    });
    const tags = content['tags'].value;
    const externalLink = content['external-link-info'].value;
    const thumbnail = customImageTransformer(
      content['artikel-thumbnail']
    ).imageUrl;
    const thumbnailFit = content['artikel-thumbnail']?.config
      ? JSON.parse(content['artikel-thumbnail']?.config)?.image_fit
      : '';

    const transformedData = {
      tagline,
      judul,
      nama,
      penulis,
      bulan,
      tahun,
      tags,
      loopArtikel,
      externalLink,
      thumbnail,
      thumbnailFit
    };

    setContentData(transformedData);
    setThumbnail(transformedData.thumbnail);
    return transformedData;
  };

  const isNotEmpty = (item: string) => {
    return (
      item !== '<p>-</p>' &&
      item !== '["-"]' &&
      item !== '-' &&
      !item.includes('>-<')
    );
  };

  const handleSubscribeContentButton = async () => {
    const isEmail = validateEmail(emailContent);
    if (!isEmail) return setIsValidEmailContent(true);
    try {
      const response: any = await subscribeApi({
        email: emailContent,
        entity: 'avrist'
      });
      if (response?.code === 200) {
        setVisibleSubscribeModal(true);
        setEmailContent('');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDetailData();
  }, []);

  return (
    <>
      <div className="absolute">
        <SubmittedFormModal
          show={visibleSubscribeModal}
          onClose={() => setVisibleSubscribeModal(false)}
        />
      </div>

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
        customClassName="!-z-[2]"
      />
      <div
        className={`xs:-mt-[3rem] sm:-mt-[6.3rem] md:block rounded-t-[60px] bg-white w-full sm:min-h-[100px] xs:min-h-[50px] z-100`}
      ></div>
      {contentData && (
        <CustomContainer className="flex items-center justify-center w-full xs:px-[2rem] xs:pb-[3.125rem] md:px-[8.5rem] md:pb-[28px]">
          <div className="flex flex-col gap-12 font-opensans">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-karla text-2xl text-purple_dark font-bold -tracking-[0.72px]">
                  <span
                    dangerouslySetInnerHTML={{ __html: contentData.nama }}
                    className="text-2xl font-bold"
                  />
                </span>

                <p
                  className="font-bold font-karla xs:text-[2.25rem] md:text-[3.5rem]/[67.2px] -tracking-[2.24px]"
                  dangerouslySetInnerHTML={{ __html: contentData.judul }}
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2 font-opensans leading-[22.4px]">
                  <p>
                    {`${contentData.bulan} ${contentData.tahun}`}
                    {contentData.penulis !== '-'
                      ? ` | ${contentData.penulis}`
                      : ''}
                  </p>
                  {isNotEmpty(contentData.tags) && (
                    <div className="flex flex-row gap-2 flex-wrap">
                      <MediumTag
                        title={contentData.tags}
                        customClass="px-2 py-1 whitespace-nowrap"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div
                    className="flex items-center"
                    role="button"
                    id="PopoverFocus"
                    onClick={() => setIsOpenPopover(!isOpenPopover)}
                  >
                    <Icon
                      width={24}
                      height={24}
                      name="share"
                      color="purple_verylight"
                    />
                  </div>

                  <div className="font-opensans text-sm font-bold">Share</div>
                  <ContentPopover
                    isOpenPopover={isOpenPopover}
                    setIsOPenPopover={() => setIsOpenPopover(false)}
                    message={contentData?.judul}
                  />
                </div>
              </div>
            </div>

            {/* Loop Artikel */}

            {contentData
              ? contentData?.loopArtikel?.map((item: any) => item)
              : null}
          </div>
        </CustomContainer>
      )}

      <div className="flex flex-col">
        <div className="-mt-8">
          <RoundedFrameBottom />
        </div>

        <FooterInformation
          title={
            <div className="flex flex-col gap-4 px-2">
              <p className="text-4xl 2xl:text-[3.5rem] mb-[2rem] xs:leading-[43.2px] sm:leading-[67.2px]">
                Dapatkan Informasi Terbaru
              </p>
              <div className="bg-purple_dark rounded-xl px-[1.25rem] py-[0.5rem] text-purple_dark border-purple_dark hover:bg-purple_dark hover:text-white">
                <p className="text-white text-center font-bold md:w-full cursor-default">
                  Avrist Life Insurance
                </p>
              </div>
              <div className="flex xs:flex-col sm:flex-row gap-4 xs:max-md:flex-wrap md:flex-wrap">
                <Input
                  type="text"
                  placeholder="Masukkan email Anda"
                  customInputClass="xs:w-full sm:w-[90%] xs:max-md:w-full md:w-full md:text-xs"
                  value={emailContent}
                  onChange={(e) => {
                    setIsValidEmailContent(false);
                    setEmailContent(e.target.value);
                  }}
                />
                {isValidEmailContent && (
                  <p className="text-[10px] text-[red]">
                    Masukkan alamat email yang benar!
                  </p>
                )}
                <Button
                  title="Subscribe Sekarang!"
                  customButtonClass="rounded-xl xs:max-md:w-full md:w-full"
                  onClick={handleSubscribeContentButton}
                />
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
