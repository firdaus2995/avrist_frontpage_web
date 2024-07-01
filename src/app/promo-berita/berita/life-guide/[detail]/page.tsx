'use client';
import React, { useState, useEffect, Key } from 'react';
import { useSearchParams } from 'next/navigation';
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
  pageTransformer,
  singleImageTransformer,
  handleTransformedContent,
  contentDetailTransformer
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
        const category = item.categoryName;
        const tagline = content['tags'].value;
        const judul = content['judul-artikel'].value;
        const penulis = content['penulis-artikel'].value;
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
    const category = jsonData.data.categoryName;
    const judul = content['judul-artikel'].value;
    const penulis = content['penulis-artikel'].value;
    const bulan = content['bulan'].value;
    const tahun = content['tahun'].value;
    const thumbnail = singleImageTransformer(
      content['artikel-thumbnail']
    ).imageUrl;
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

  useEffect(() => {
    if (currentCategory) {
      fetchCategory();
    }
  }, [currentCategory]);

  const scrollToview = (idx: number) => {
    const lastIndex = idx === contentData?.daftarIsi.length - 1;
    if (selectedIndex !== idx) {
      setSelectedIndex(idx);
      document
        .getElementsByTagName('h1')
        [
          lastIndex ? idx - 1 : idx
        ].scrollIntoView({ behavior: 'smooth', block: !lastIndex ? 'nearest' : 'start', inline: 'end' });
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
                    {isContentNotEmpty(contentData?.differenceTime ?? '-') && (
                      <p className="font-opensans text-base">
                        {`${contentData?.differenceTime} yang lalu`} |{' '}
                        {contentData.penulis ?? ''}
                      </p>
                    )}
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
