'use client';
import React, { useState, useEffect, Key } from 'react';
import { useSearchParams } from 'next/navigation';
import { month } from '../../[detail]/month';
import { formatTimeDifference } from '../../format-time';
import ContentPopover from './content-popover';
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
import { LoopingContent } from '@/components/molecules/specifics/avrast/LifeGuide/LoopingContent';
import { SubmittedFormModal } from '@/components/molecules/specifics/avrast/Modal';
import { getAvristLifeGuide, subscribeApi } from '@/services/berita';
import { handleGetContentPage } from '@/services/content-page.api';
import { generateDaftarIsi, isContentNotEmpty } from '@/utils/helpers';
import {
  // contentDetailTransformer
  customImageTransformer,
  pageTransformer,
  singleImageTransformer,
  handleTransformedContent,
  contentDetailTransformer
} from '@/utils/responseTransformer';
import { validateEmail } from '@/utils/validation';

const DetailAvristLifeGuide = ({ params }: { params: { detail: string } }) => {
  console.log(params);
  const param = useSearchParams();
  const id = param.get('id');
  const [isOpenPopover, setIsOPenPopover] = useState<boolean>(false);
  const [isValidEmailContent, setIsValidEmailContent] =
    useState<boolean>(false);
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
    waktuBaca: '',
    category: ''
  });
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [currentCategory, setCurrentCategory] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [email, setEmail] = useState<any>('');
  const [failedMsg, setFailedMsg] = useState('');
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);

  const fetchCategory = async () => {
    try {
      const fetchData = await getAvristLifeGuide({
        includeAttributes: 'true',
        category: currentCategory
      });

      const data = fetchData.data.categoryList;

      data[currentCategory]?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const id = item.id;
        const category = item.categories
          .map((item: any) => item.categoryName)
          .join(', ');
        const tagline = content['tags'].value;
        const judul = content['judul-artikel'].value;
        const penulis = content['penulis-artikel'].value;
        const tanggal = content['tanggal'].value;
        const bulan = content['bulan'].value;
        const tahun = content['tahun'].value;
        const thumbnail = singleImageTransformer(
          content['artikel-thumbnail']
        ).imageUrl;
        const artikel = content['artikel-looping'].contentData;
        const tags =
          !!content['tags']?.value || content['tags']?.value !== '-'
            ? content['tags']?.value.split(',')
            : content['tags']?.value;
        const waktuBaca = content['waktu-baca-artikel']?.value;
        const daftarIsi = generateDaftarIsi(artikel, 'subjudul');
        const differenceTime = formatTimeDifference(
          new Date(item?.createdAt),
          new Date()
        );
        const transformedData = {
          tagline,
          judul,
          penulis,
          tanggal,
          bulan,
          tahun,
          thumbnail,
          artikel,
          tags,
          waktuBaca,
          daftarIsi,
          differenceTime,
          id,
          category
        };
        return transformedData;
      });
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
          const bannerImage = customImageTransformer(
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

    setCurrentCategory(
      jsonData.data.categories.map((item: any) => item.categoryName).join(', ')
    );

    const tagline = content['tags'].value;
    const category = jsonData.data.categories
      .map((item: any) => item.categoryName)
      .join(', ');
    const judul = content['judul-artikel'].value;
    const penulis = content['penulis-artikel'].value;
    const bulan = content['bulan'].value;
    const tahun = content['tahun'].value;
    const thumbnail = customImageTransformer(
      content['artikel-thumbnail']
    ).imageUrl;
    const thumbnailFit = content['artikel-thumbnail']?.config
      ? JSON.parse(content['artikel-thumbnail']?.config)?.image_fit
      : '';
    const artikel = content['artikel-looping'].contentData;
    // const paragrafSatu = artikel[0]?.value;
    // const artikelImage = (artikel[2])?.imageUrl ? singleImageTransformer(artikel[2])?.imageUrl : null;
    // const paragrafDua = artikel[2]?.value;
    // const artikelVideo = artikel[3]?.value;
    // const paragrafTiga = artikel[4]?.value;
    const tags =
      !!content['tags']?.value || content['tags']?.value !== '-'
        ? content['tags']?.value.split(',')
        : content['tags']?.value;
    const artikelPIC = content['artikel-pic']?.value;
    const artikelPICJabatan = content['artikel-pic-jabatan']?.value;
    const waktuBaca = content['waktu-baca-artikel']?.value;
    const daftarIsi = generateDaftarIsi(artikel, 'subjudul');
    const differenceTime = formatTimeDifference(
      new Date(jsonData?.data?.createdAt),
      new Date()
    );

    const transformedData = {
      tagline,
      judul,
      penulis,
      bulan,
      tahun,
      thumbnail,
      thumbnailFit,
      // paragrafSatu,
      // artikelImage,
      // paragrafDua,
      // artikelVideo,
      // paragrafTiga,
      tags,
      artikelPIC,
      artikelPICJabatan,
      waktuBaca,
      daftarIsi,
      differenceTime,
      artikel,
      category
    };

    setContentData(transformedData);

    return transformedData;
  };

  const handleSubscribeButton = async () => {
    try {
      const isEmail = validateEmail(email);
      if (!isEmail) return setIsValidEmailContent(true);
      const response: any = await subscribeApi({
        email: email,
        entity: 'avrist'
      });
      if (response?.code === 200) {
        setFailedMsg('');
        setVisibleSubscribeModal(true);
        setEmail('');
      }
    } catch (e: any) {
      setFailedMsg(e?.body.errors.message[0]);
    }
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

  const scrollToview = (idx: number) => {
    const headings = document.getElementsByTagName('h1');

    if (selectedIndex !== idx) {
      setSelectedIndex(idx);

      const targetHeading = headings[idx - 1];

      const offsetTop = targetHeading.offsetTop - 150;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="flex flex-col">
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
            title: 'Avrist Life Guide',
            href: '/promo-berita/berita?tab=Avrist+Terkini&category=Avrist+Life+Guide'
          }
        ]}
        imageUrl={data?.titleImage}
        bottomImage={contentData?.thumbnail ?? BlankImage}
        bottomImageFit={contentData?.thumbnailFit}
      />
      <div className="flex flex-col lg:flex-row px-[2rem] md:px-[8.5rem] pt-[80px] pb-[14px] gap-[36px]">
        <div className="flex flex-col gap-6">
          <p className="text-[24px]/[24px] -tracking-[0.72px] font-light font-karla">
            Daftar Isi
          </p>
          <div className="flex flex-col shrink min-w-[210px] bg-purple_light_bg rounded-r-[12px] rounded-l-[4px] overflow-hidden">
            {contentData?.daftarIsi?.map((item: any, index: number) =>
              item?.label === '-' ? null : item?.label ===
                contentData?.judul ? (
                <div
                  key={index}
                  className="border-l-4 border-purple_dark py-3 pr-3 pl-4 cursor-pointer text-left"
                >
                  <div
                    className="font-bold text-purple_dark text-[18px]/[25.2px] font-['Source Sans Pro']"
                    dangerouslySetInnerHTML={{
                      __html: item.judul
                    }}
                  />
                </div>
              ) : (
                <button
                  key={index}
                  role="button"
                  className={`border-l-4 ${index === selectedIndex ? 'border-purple_dark' : 'border-purple_mediumlight'} px-[15px] py-[10px] cursor-pointer text-left`}
                  onClick={() => scrollToview(index)}
                >
                  <div
                    className={`font-bold  ${index === selectedIndex ? 'text-purple_dark' : 'text-purple_mediumlight'} text-lg font-['Source Sans Pro']`}
                    dangerouslySetInnerHTML={{
                      __html: item.label
                    }}
                  />
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col grow">
          <div className="flex items-center justify-start w-full">
            <div className="flex flex-col gap-12 w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {isContentNotEmpty(contentData?.category ?? '-') && (
                    <p className="font-karla text-purple_dark font-bold text-[1.5rem]/[28.8px] -tracking-[0.72px]">
                      {contentData?.category}
                    </p>
                  )}
                  {isContentNotEmpty(contentData?.judul ?? '-') && (
                    <p
                      className="font-karla font-bold text-[3.5rem]/[67.2px] -tracking-[2.24px] xs:max-lg:text-4xl"
                      dangerouslySetInnerHTML={{
                        __html: contentData?.judul
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="flex flex-col gap-4">
                    <p className="font-opensans text-base">
                      {contentData?.bulan !== '-' && contentData?.tahun !== '-'
                        ? `${
                            contentData?.tanggal && contentData?.tanggal !== '-'
                              ? contentData?.tanggal
                              : ''
                          } ${month.find((item) => item.value === contentData.bulan)?.label} ${contentData?.tahun}  | `
                        : ''}
                      {contentData.penulis ? `${contentData.penulis}` : ''}
                    </p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {!!contentData?.tags &&
                        contentData.tags?.map((tag: string, idx: Key) => (
                          <MediumTag
                            key={idx}
                            title={tag}
                            customClass="font-opensans font-semibold text-[14px]/[19.6px] py-1 px-2 whitespace-nowrap"
                          />
                        ))}
                    </div>
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
              <LoopingContent data={contentData?.artikel} />
            </div>
          </div>
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
                  Avrist Life Insurance
                </p>
              </div>
              <div className="flex xs:flex-col sm:flex-row gap-4 xs:flex-wrap md:flex-wrap">
                <Input
                  type="text"
                  placeholder="Masukkan email Anda"
                  customInputClass="xs:w-full sm:w-[90%] xs:w-full md:w-full md:text-xs"
                  value={email}
                  onChange={(e) => {
                    setFailedMsg('');
                    setIsValidEmailContent(false);
                    setEmail(e.target.value);
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
    </div>
  );
};

export default DetailAvristLifeGuide;
