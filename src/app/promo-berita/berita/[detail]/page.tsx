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
import ArticleContainer from '@/components/molecules/specifics/avrast/ArticleContainer';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { SubmittedFormModal } from '@/components/molecules/specifics/avrast/Modal';
import { subscribeApi } from '@/services/berita';
import { handleGetContentPage } from '@/services/content-page.api';
import { getYouTubeId, tableReplacement } from '@/utils/helpers';
import {
  contentDetailTransformer,
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';
import { validateEmail } from '@/utils/validation';

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
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);
  const [isValidEmailContent, setIsValidEmailContent] =
    useState<boolean>(false);
  const [emailContent, setEmailContent] = useState('');
  const [failedMsg, setFailedMsg] = useState('');

  const [isOpenPopover, setIsOPenPopover] = useState<boolean>(false);

  const fetchData = () => {
    try {
      handleGetContentPage('avrist-terkini-detail').then((res: any) => {
        const { content } = pageTransformer(res);
        const titleImage = singleImageTransformer(
          content['title-image']
        ).imageUrl;
        const bannerImage = customImageTransformer(
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
    try {
      const response = await fetch(`/api/berita-dan-kegiatan/${id}`);
      const jsonData = await response.json();
  
      const { content } = contentDetailTransformer(jsonData);
      const tagline = content['topik-artikel']?.value;
      const judul = content['judul-artikel']?.value;
      const penulis = content['penulis-artikel']?.value;
      const tanggal = content['tanggal']?.value;
      const bulan = content['bulan']?.value;
      const tahun = content['tahun']?.value;
      const artikel = content['artikel-looping']?.contentData[0]?.details;
      const dataArtikel = content['artikel-looping']?.contentData;
      const paragrafSatu = artikel[0]?.value;
      const artikelImage = singleImageTransformer(artikel[1])?.imageUrl;
      const paragrafDua = artikel[2]?.value;
      const artikelVideo = artikel[3]?.value;
      const paragrafTiga = artikel[4]?.value;
      const tags = content['tags']?.value?.split(',');
      const artikelPIC = content['artikel-pic']?.value;
      const artikelPICJabatan = content['artikel-pic-jabatan']?.value;
      const date = new Date(jsonData?.data?.createdAt).getDate();
      const monthInText = month.find((item) => item.value === bulan)?.label;
      const externalLink = content['list-external-link']?.contentData;
      const bottomImage = customImageTransformer(
        content['artikel-thumbnail']
      )?.imageUrl;
      const bottomImageFit = content['artikel-thumbnail']?.config
        ? JSON.parse(content['artikel-thumbnail']?.config)?.image_fit
        : '';
  
      const transformedData = {
        tagline,
        judul,
        penulis,
        tanggal,
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
        dataArtikel,
        bottomImage,
        bottomImageFit
      };
  
      setContentData(transformedData);
  
      return transformedData;
    } catch (error) {
      console.error(error)
    }
  };

  const handleSubscribeButton = async () => {
    const isEmail = validateEmail(emailContent);
    if (!isEmail) return setIsValidEmailContent(true);
    try {
      const response: any = await subscribeApi({
        email: emailContent,
        entity: 'avrist'
      });
      if (response?.code === 200) {
        setFailedMsg('');
        setVisibleSubscribeModal(true);
        setEmailContent('');
      }
    } catch (e: any) {
      setFailedMsg(e?.body.errors.message[0]);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDetailData();
  }, []);

  const RenderArtikelLooping = () => {
    return contentData&&contentData?.dataArtikel?.map((item: any, index: number) => {
      let paragrafSatu = item['details'][0]?.value ?? '-';
      const artikelImage = singleImageTransformer(item['details'][1]);
      let paragrafDua = item['details'][2]?.value ?? '-';
      const artikelVideo = item['details'][3]?.value ?? '-';

      let paragrafTiga = item['details'][4]?.value ?? '-';
      if (paragrafSatu === '<p>-</p>') {
        paragrafSatu = '-';
      }
      if (paragrafDua === '<p>-</p>') {
        paragrafDua = '-';
      }
      if (
        paragrafTiga === '<p>-</p>' ||
        paragrafTiga === '<p>-<br>&nbsp;</p>'
      ) {
        paragrafTiga = '-';
      }
      return (
        <div key={index} className="gap-[48px]">
          {paragrafSatu !== '-' && (
            <p
              dangerouslySetInnerHTML={{
                __html: tableReplacement(paragrafSatu)
              }}
              className="font-opensans text-xl"
            />
          )}

          <div className="w-full flex items-center justify-center">
            {!artikelImage.imageUrl.includes('no-image') &&
              artikelImage.imageUrl !== '' && (
                <div className="w-full h-full flex justify-center">
                  <div className="w-auto sm:w-[1120px] h-auto mb-5">
                    <Image
                      src={artikelImage?.imageUrl ?? BlankImage}
                      alt="img"
                      className="w-auto h-auto"
                      width={0}
                      height={0}
                    />
                  </div>
                </div>
              )}
          </div>

          {paragrafDua !== '-' && (
            <span
              dangerouslySetInnerHTML={{
                __html: paragrafDua
              }}
              className="font-opensans text-xl"
            />
          )}
          {artikelVideo !== '-' && (
            <div className="w-full xs:h-[200px] md:h-[570px] mt-[28px] flex justify-center">
              <div className="w-auto sm:w-[1120px] xs:h-full md:h-[650px] xs:mb-10 md:mb-0">
                <VideoPlayer
                  thumbnail=""
                  url={getYouTubeId(artikelVideo) ?? ''}
                  color="purple_dark"
                  // type="Artikel Video"
                  mute
                />
              </div>
            </div>
          )}

          {paragrafTiga !== '-' && (
            <span
              className="text-xl"
              dangerouslySetInnerHTML={{
                __html: paragrafTiga
              }}
            />
          )}
        </div>
      );
    });
  };

  return (
    <ArticleContainer>
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
        customClassName="!z-[2]"
      />
      <div
        className={`xs:-mt-[3rem] sm:-mt-[6.3rem] md:block rounded-t-[60px] bg-white w-full sm:min-h-[100px] xs:min-h-[50px] z-[2]`}
      ></div>
      <div className="w-full xs:px-[2rem] md:px-[8.5rem] md:pb-[1rem]">
        <div className="flex flex-col gap-[48px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-karla text-2xl text-purple_dark font-bold -tracking-[0.72px]">
                {contentData[0] === '<' ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: contentData?.tagline }}
                  />
                ) : (
                  <span className="text-[24px]">
                    {contentData?.tagline !== '-' ? contentData?.tagline : ''}
                  </span>
                )}
              </span>
              <p
                className="font-bold font-karla xs:text-[2.25rem] md:text-[3.5rem]/[67.2px] -tracking-[2.24px]"
                dangerouslySetInnerHTML={{ __html: contentData?.judul }}
              />
            </div>

            <div className="flex flex-row justify-between items-center font-opensans">
              <div className="flex flex-col gap-4">
                <p className="font-opensans text-[16px]/[22.4px]">
                  {contentData?.tanggal !== '-' &&
                  contentData?.bulan !== '-' &&
                  contentData?.tahun !== '-'
                    ? `${contentData?.tanggal} ${contentData?.monthInText} ${contentData?.tahun}`
                    : ''}{' '}
                  {contentData?.penulis === '-'
                    ? ''
                    : `| ${contentData?.penulis}`}
                </p>

                <div className="font-opensans text-sm font-semibold flex flex-row gap-2 flex-wrap">
                  {contentData?.tags.length > 0 &&
                    contentData?.tags.map((tag: any, idx: number) => {
                      if (tag === '-') return null;
                      return (
                        <MediumTag
                          title={tag}
                          key={idx}
                          customClass="px-2 py-1 whitespace-nowrap"
                        />
                      );
                    })}
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
                    width={24}
                    height={24}
                    name="share"
                    color="purple_verylight"
                  />
                </div>

                <div className="font-opensans text-sm font-bold">Share</div>
                <ContentPopover
                  isOpenPopover={isOpenPopover}
                  setIsOPenPopover={() => setIsOPenPopover(false)}
                  message={contentData?.judul}
                />
              </div>
            </div>
          </div>
          {RenderArtikelLooping()}

          {contentData?.externalLink?.filter(
            (el: any) =>
              el.details[0]?.value !== '-' || el.details[1]?.value !== '-'
          ).length > 0 ? (
            <div className={`flex flex-row gap-4 'mt-0'}`}>
              <div className="flex flex-row gap-4">
                <p className="text-sm font-medium lg:min-w-[180px]">
                  Berita ini juga dimuat di media berikut:
                </p>
                <div className="flex flex-wrap gap-3 pb-5">
                  {contentData?.externalLink?.map((el: any, index: number) => {
                    if (
                      el.details[0]?.value === '-' ||
                      el.details[1]?.value === '-'
                    )
                      return null;
                    return (
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
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

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
                  Sekilas Avrist Assurance
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
            <div className="flex flex-col gap-4 px-2">
              <p className="text-4xl 2xl:text-[3.5rem] mb-[2rem] xs:leading-[43.2px] sm:leading-[67.2px]">
                Dapatkan Informasi Terbaru
              </p>
              <div className="bg-purple_dark rounded-xl px-[1.25rem] py-[0.5rem] text-purple_dark border-purple_dark hover:bg-purple_dark hover:text-white">
                <p className="text-white text-center font-bold md:w-full cursor-default">
                  Avrist Assurance
                </p>
              </div>
              <div className="flex xs:flex-col sm:flex-row gap-4 xs:max-md:flex-wrap md:flex-wrap">
                <Input
                  type="text"
                  placeholder="Masukkan email Anda"
                  customInputClass="xs:w-full sm:mw-[90%] xs:max-md:w-full md:w-full md:text-xs"
                  value={emailContent}
                  onChange={(e) => {
                    setFailedMsg('');
                    setIsValidEmailContent(false);
                    setEmailContent(e.target.value);
                  }}
                />
                {isValidEmailContent && (
                  <p className="text-[10px] text-[red] -mt-4">
                    Masukkan alamat email yang benar!
                  </p>
                )}
                {failedMsg && (
                  <p className="text-[10px] text-[red] -mt-4">{`${failedMsg.toLowerCase().includes('exist') ? 'Email sudah terdaftar' : 'Subscribe gagal'}`}</p>
                )}
                <Button
                  title="Subscribe Sekarang!"
                  customButtonClass="rounded-xl xs:max-md:w-full md:w-full"
                  onClick={handleSubscribeButton}
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
    </ArticleContainer>
  );
};

export default DetailTanyaAvrista;
