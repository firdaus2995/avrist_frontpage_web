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
import TagPill from '@/components/molecules/specifics/avram/MutualFundList/components/TagPill';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { LoopingContent } from '@/components/molecules/specifics/avrast/LifeGuide/LoopingContent';
import { getAvristLifeGuide } from '@/services/berita';
import { handleGetContentPage } from '@/services/content-page.api';
import { generateDaftarIsi } from '@/utils/helpers';
import {
  // contentDetailTransformer
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

        setContentData(transformedData);

        return transformedData;
      });

      // setListArticle(transformedData);
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

    // const { content } = contentDetailTransformer(jsonData);

    setCurrentCategory(jsonData.data.categoryName);

    // const tagline = content['tags'].value;
    // const judul = content['judul-artikel'].value;
    // const penulis = content['penulis-artikel'].value;
    // const bulan = content['bulan'].value;
    // const tahun = content['tahun'].value;
    // const thumbnail = singleImageTransformer(
    //   content['artikel-thumbnail']
    // ).imageUrl;
    // const artikel = content['artikel-looping'].contentData[0]?.details;
    // const paragrafSatu = artikel[0]?.value;
    // const artikelImage = (artikel[2])?.imageUrl ? singleImageTransformer(artikel[2])?.imageUrl : null;
    // const paragrafDua = artikel[2]?.value;
    // const artikelVideo = artikel[3]?.value;
    // const paragrafTiga = artikel[4]?.value;
    // const tags = content['tags']?.value;
    // const artikelPIC = content['artikel-pic']?.value;
    // const artikelPICJabatan = content['artikel-pic-jabatan']?.value;
    // const waktuBaca = content['waktu-baca-artikel']?.value;
    // const daftarIsi = content['artikel-looping']?.contentData;
    // const differenceTime = formatTimeDifference(new Date(jsonData?.data?.createdAt), new Date())

    // const transformedData = {
    //   tagline,
    //   judul,
    //   penulis,
    //   bulan,
    //   tahun,
    //   thumbnail,
    //   paragrafSatu,
    //   artikelImage,
    //   paragrafDua,
    //   artikelVideo,
    //   paragrafTiga,
    //   tags,
    //   artikelPIC,
    //   artikelPICJabatan,
    //   waktuBaca,
    //   daftarIsi,
    //   differenceTime
    // };

    // setContentData(transformedData);

    // return transformedData;
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
    if (selectedIndex !== idx) {
      setSelectedIndex(idx);
      document
        .getElementsByTagName('h1')
        [
          idx
        ].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  };

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
      <div className="flex xl:flex-row xs:max-lg:flex-wrap px-[2rem] md:px-[8.5rem] pt-[80px] pb-[100px] gap-[48px]">
        <div className="flex flex-col gap-[24px] py-10">
          <p className="text-2xl font-light font-karla">Daftar Isi</p>
          <div className="flex flex-col shrink min-w-[210px] bg-purple_light_bg rounded-r-[12px] rounded-l-[4px] overflow-hidden">
            {contentData?.daftarIsi?.map((item: any, index: number) =>
              item?.label === contentData?.judul ? (
                <div
                  key={index}
                  className="border-l-4 border-purple_dark px-[15px] py-[12px] cursor-pointer text-left"
                >
                  <div
                    className="font-bold text-purple_dark text-lg font-['Source Sans Pro']"
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
            <div className="flex flex-col gap-10 w-2/3 xs:max-lg:w-full py-10">
              <div className="flex flex-col gap-5">
                <p className="text-purple_dark font-semibold text-[1.5rem]">
                  {contentData?.category}
                </p>
                <p
                  className="font-semibold text-[3.5rem] xs:max-lg:text-4xl"
                  dangerouslySetInnerHTML={{
                    __html: contentData?.judul
                  }}
                />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="text-base">
                      {`${contentData?.differenceTime} yang lalu`} |{' '}
                      {contentData.penulis}
                    </p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {!!contentData?.tags &&
                        contentData.tags?.map((tag: string, idx: Key) => (
                          <TagPill key={idx}>{tag}</TagPill>
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
