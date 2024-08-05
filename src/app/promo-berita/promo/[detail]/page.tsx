'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { month } from '../../berita/[detail]/month';
import ContentPopover from '../../berita/life-guide/[detail]/content-popover';
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
import CardCategoryB from '@/components/molecules/specifics/avrast/Cards/CategoriB';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import InterestSection from '@/components/molecules/specifics/avrast/InterestSection';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { SuccessModal } from '@/components/molecules/specifics/avrast/Modal';
import { getPenawaran, subscribeApi } from '@/services/berita';
import {
  handleGetContentPage,
  handleGetContent
} from '@/services/content-page.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import { htmlParser, getYouTubeId } from '@/utils/helpers';
import {
  contentDetailTransformer,
  customImageTransformer,
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer,
  contentTransformer
} from '@/utils/responseTransformer';
import { validateEmail } from '@/utils/validation';

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
    footerImage: ''
  });
  const [thumbnail, setThumbnail] = useState<string>('');
  const [popUpImage, setPopUpImage] = useState<string>('');
  const [formId, setFormId] = useState('');
  const [isOpenPopover, setIsOPenPopover] = useState<boolean>(false);
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);
  const [isValidEmailContent, setIsValidEmailContent] =
    useState<boolean>(false);
  const [emailContent, setEmailContent] = useState('');

  const fetchData = () => {
    try {
      handleGetContentPage(BASE_SLUG.PROMO_BERITA.PAGE.PENAWARAN_DETAIL).then(
        (res: any) => {
          const { content } = pageTransformer(res);

          const titleImage = singleImageTransformer(
            content['title-image']
          ).imageUrl;
          const footerImage = singleImageTransformer(
            content['cta1-image']
          ).imageUrl;
          setFormId(contentStringTransformer(content['form-produk']));
          setData({
            titleImage,
            footerImage
          });
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
        setPopUpImage(submitImage.imageUrl);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDetailData = async () => {
    const response = await fetch(`/api/promo/${id}`);
    const jsonData = await response.json();

    const { content } = contentDetailTransformer(jsonData);

    const namaProduk = content['nama-produk'].value;
    const namaPromo = content['nama-promo'].value;

    const tagline = content['tags'].value;
    const judul = content['judul-artikel'].value;
    const penulis = content['penulis-artikel'].value;
    const bulan = month.find(
      (item) => item.value === content['bulan'].value
    )?.label;
    const tahun = content['tahun'].value;
    const artikel = content['artikel-looping'].contentData;
    const loopArtikel = artikel.map((item: any, itemIndex: number) => {
      return (
        <div key={itemIndex} className="font-opensans text-[20px]/[28px]">
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
                  className="py-6"
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
                  className="w-full h-full flex justify-center"
                  key={detailIndex}
                >
                  <div className="w-auto sm:w-[1120px] h-auto mb-5">
                    <Image
                      src={
                        singleImageTransformer(detailItem).imageUrl ??
                        BlankImage
                      }
                      alt="img"
                      className="w-auto h-auto py-6"
                      width={0}
                      height={0}
                    />
                  </div>
                </div>
              );
            }
            if (fieldType === 'YOUTUBE_URL' && isNotEmpty) {
              return (
                <div
                  className="w-full h-full flex justify-center py-6"
                  key={detailIndex}
                >
                  <div className="w-auto sm:w-[1120px] xs:h-full md:h-[650px] xs:mb-10 md:mb-0">
                    <VideoPlayer
                      thumbnail=""
                      url={getYouTubeId(detailItem.value) ?? ''}
                      color="purple_dark"
                      mute
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
    const tags = content['tags'].value.split(',');
    const thumbnail = customImageTransformer(
      content['artikel-thumbnail']
    ).imageUrl;
    const thumbnailFit = content['artikel-thumbnail']?.config
      ? JSON.parse(content['artikel-thumbnail']?.config)?.image_fit
      : '';

    const transformedData = {
      namaPromo,
      namaProduk,
      tagline,
      judul,
      penulis,
      bulan,
      tahun,
      loopArtikel,
      tags,
      thumbnail,
      thumbnailFit
    };

    setContentData(transformedData);
    setThumbnail(transformedData.thumbnail);
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
      const otherData = transformedData
        ?.filter((item) => item.id !== parseInt(id))
        .slice(0, 3);
      setOtherContent(otherData);
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
        imageUrl={data?.titleImage}
        bottomImage={thumbnail}
        bottomImageFit={contentData.thumbnailFit}
      />

      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col xs:py-[3.125rem] xs:px-[2rem] md:py-[5rem] md:px-[8.5rem] xs:gap-[1.5rem] md:gap-[3rem] font-opensans">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-purple_dark font-bold font-karla text-[24px]/[28.8px] -tracking-[0.72px]">
                Promo
              </p>
              <p className="font-karla font-bold xs:text-[2.25rem] md:text-[3.5rem]/[67.2px] -tracking-[2.24px]">
                {contentData && htmlParser(contentData.judul)}
              </p>
            </div>
            <div className="flex flex-row justify-between md:items-center gap-1">
              <div className="flex flex-col gap-4">
                <p className="font-opensans text-[16px]/[22.4px] text-gray_body">
                  {`${contentData.bulan} ${contentData.tahun}`}
                  {contentData.penulis !== '-'
                    ? ` | ${contentData.penulis}`
                    : ''}
                </p>

                {Array.isArray(contentData?.tags) && (
                  <div className="flex flex-row gap-2 flex-wrap">
                    {contentData.tags.map((tag: any, idx: number) => (
                      <MediumTag
                        title={tag}
                        key={idx}
                        customClass="font-opensans font-semibold text-[14px]/[19.6px] py-1 px-2 whitespace-nowrap"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 items-center">
                <div
                  className="flex items-center"
                  id="PopoverFocus"
                  role="button"
                  onClick={() => setIsOPenPopover(!isOpenPopover)}
                >
                  <Icon
                    width={24}
                    height={24}
                    name="share"
                    color="purple_verylight"
                  />
                </div>

                <div className="font-opensans text-[14px]/[19.6px] font-bold">
                  Share
                </div>
                <ContentPopover
                  isOpenPopover={isOpenPopover}
                  setIsOPenPopover={() => setIsOPenPopover(false)}
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
      </div>

      <InterestSection
        formId={formId}
        popUpImage={popUpImage}
        productName={contentData?.namaProduk ?? '-'}
        promoName={contentData?.namaPromo ?? '-'}
      />

      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center xs:py-[3.125rem] md:py-[5rem] xs:px-[2rem] md:px-[8.5rem] xs:gap-[2.25rem] md:gap-[4rem]">
          <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Promo Lainnya
          </p>
          <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-[24px]">
            {otherContent?.map((item: any, index: number) => (
              <Link
                key={index}
                href={{
                  pathname: `/promo-berita/promo/${item.id}`
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
      <SuccessModal
        popUpImage={popUpImage}
        show={visibleSubscribeModal}
        onClose={() => {
          setVisibleSubscribeModal(false);
          // window.location.reload();
        }}
        hideImage
        title={'Terima kasih atas langganan Anda!'}
        subtitle={'Cek email untuk konfirmasi email Anda'}
        className="sm:h-[40vh] sm:w-[50vw] xs:w-full xs:h-full transition xs:p-4"
      />
    </>
  );
};

export default DetailPromoTerbaru;
