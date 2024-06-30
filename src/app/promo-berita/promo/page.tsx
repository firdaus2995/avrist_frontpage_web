'use client';
import React, { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import Slider from 'react-slick';
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
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import { SubmittedFormModal } from '@/components/molecules/specifics/avrast/Modal';
import SliderInformation from '@/components/molecules/specifics/avrast/SliderInformation';
import { getPenawaran, subscribeApi } from '@/services/berita';
import { handleGetContentPage } from '@/services/content-page.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import { ParamsProps } from '@/utils/globalTypes';
import { htmlParser } from '@/utils/helpers';
import {
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const Promo: React.FC<ParamsProps> = () => {
  const sliderRef = useRef<Slider | null>(null);
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const sliderSettings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const searchParams = useSearchParams();
  const [, setTab] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [contentData, setContentData] = useState<any>();
  const [search, setSearch] = useState('');
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [params, setParams] = useState({
    yearFilter: '',
    monthFilter: '',
    searchFilter: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6
  });
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedData = contentData
    ? contentData?.slice(startIndex, endIndex)
    : [];
  const totalPages = contentData
    ? Math.ceil(contentData?.length / pagination.itemsPerPage)
    : 0;

  useEffect(() => {
    if (searchParams) {
      const value = searchParams.get('tab');
      const categories = searchParams.get('category');

      if (value !== null) {
        setTab(value);
      }

      if (categories !== null) {
        setCategory(categories);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPage();
    fetchContent();
  }, [params]);

  const fetchPage = async () => {
    try {
      handleGetContentPage(BASE_SLUG.PROMO_BERITA.PAGE.PENAWARAN).then(
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

  const fetchContent = async () => {
    try {
      const fetchContentCategory = await getPenawaran({
        includeAttributes: 'true',
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter
      });

      const data = fetchContentCategory.data.categoryList;

      const transformedData = data['']?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['judul-artikel'].value;
        const waktu = `${
          monthDropdown().find((item) => item.label === content['bulan'].value)
            ?.label
        } ${content['tahun'].value}`;
        const deskripsi =
          content['artikel-looping'].contentData[0].details[0].value;
        const image = singleImageTransformer(
          content['artikel-thumbnail']
        ).imageUrl;
        const id = item.id;
        const tags =
          !!content['tags']?.value || content['tags']?.value !== '-'
            ? content['tags']?.value.split(',')
            : content['tags']?.value;

        return { judul, waktu, deskripsi, image, id, tags };
      });

      setContentData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const yearDropdown = (startYear: number) => {
    const currentYear = new Date().getFullYear();

    const years = [
      {
        label: 'Pilih Tahun',
        value: '',
        onClick: () => setParams({ ...params, yearFilter: '' })
      }
    ];

    for (let year = currentYear; year >= startYear; year--) {
      years.push({
        label: year.toString(),
        value: year.toString(),
        onClick: () => setParams({ ...params, yearFilter: year.toString() })
      });
    }

    return years;
  };

  const monthDropdown = () => {
    const month = [
      {
        label: 'Pilih Bulan',
        value: '',
        onClick: () => setParams({ ...params, monthFilter: '' })
      },
      {
        label: 'Januari',
        value: '01',
        onClick: () => setParams({ ...params, monthFilter: '01' })
      },
      {
        label: 'Februari',
        value: '02',
        onClick: () => setParams({ ...params, monthFilter: '02' })
      },
      {
        label: 'Maret',
        value: '03',
        onClick: () => setParams({ ...params, monthFilter: '03' })
      },
      {
        label: 'April',
        value: '04',
        onClick: () => setParams({ ...params, monthFilter: '04' })
      },
      {
        label: 'Mei',
        value: '05',
        onClick: () => setParams({ ...params, monthFilter: '05' })
      },
      {
        label: 'Juni',
        value: '06',
        onClick: () => setParams({ ...params, monthFilter: '06' })
      },
      {
        label: 'Juli',
        value: '07',
        onClick: () => setParams({ ...params, monthFilter: '07' })
      },
      {
        label: 'Agustus',
        value: '08',
        onClick: () => setParams({ ...params, monthFilter: '08' })
      },
      {
        label: 'September',
        value: '09',
        onClick: () => setParams({ ...params, monthFilter: '09' })
      },
      {
        label: 'Oktober',
        value: '10',
        onClick: () => setParams({ ...params, monthFilter: '10' })
      },
      {
        label: 'November',
        value: '11',
        onClick: () => setParams({ ...params, monthFilter: '11' })
      },
      {
        label: 'Desember',
        value: '12',
        onClick: () => setParams({ ...params, monthFilter: '12' })
      }
    ];

    return month;
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

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const renderPage = () => {
    return (
      <div className="flex flex-col gap-4 md:flex-row items-start justify-between font-opensans ">
        <div>
          <p className="text-[20px]/[28px] font-normal">
            Menampilkan{' '}
            <span className="font-bold text-purple_dark">
              {contentData?.length === 0 || contentData === undefined
                ? 0
                : startIndex + 1}
              -{Math.min(endIndex, contentData ? contentData.length : 0)}
            </span>{' '}
            dari{' '}
            <span className="font-bold">
              {contentData && contentData.length}
            </span>{' '}
            hasil
          </p>
        </div>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          onPageChange={() => handlePageChange(totalPages)}
          nextLabel={<Icon name="chevronRight" color="purple_dark" />}
          previousLabel={<Icon name="chevronLeft" color="purple_dark" />}
          containerClassName="flex flex-row gap-[12px] items-center"
          activeClassName="text-purple_dark font-bold"
          pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white relative">
      <div className="absolute">
        <SubmittedFormModal
          show={visibleSubscribeModal}
          onClose={() => setVisibleSubscribeModal(false)}
        />
      </div>
      <Hero
        title={'Promo Terbaru'}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Promo Terbaru', href: '#' }
        ]}
        imageUrl={data?.titleImage}
        bottomImage={data?.bannerImage ?? BlankImage}
      />
      <div className="w-full flex flex-col items-center justify-center text-center relative xs-px-[32px] md:px-0">
        <div className="xs:-mt-[3.625rem] md:-mt-[6.625rem] absolute z-20 top-2 w-full rounded-t-[60px] bg-white xs:pt-[3.125rem] md:pt-[6.25rem] xs:px-[2rem] md:px-[8.5rem] font-karla" />
        <div className="px-[2rem] md:px-[8.5rem]">
          <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Avrist Promo Terbaru
          </p>
          <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
            Ikuti terus kuis menarik di Instagram{' '}
            <span className="font-semibold text-purple_dark">
              @avristsolution{' '}
            </span>
            untuk mendapatkan giveaway gratis dari Avrist Life Insurance
          </p>
        </div>

        <div className="w-full pb-[80px] px-[2rem] md:px-[8.5rem]">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...sliderSettings}
          >
            {contentData?.slice(0.5).map((item: any, index: number) => (
              <SliderInformation
                key={index}
                bgColor="purple_superlight"
                imageClassName="object-fill"
                title={
                  <div className="flex flex-col gap-6 text-left">
                    <div className="flex flex-col gap-3">
                      <p className="font-karla text-[28px] md:text-[36px]/[43.2px] xs:max-sm:text-[24px] font-bold line-clamp-3 break-word -tracking-[1.08px]">
                        {htmlParser(item.judul)}
                      </p>
                      <p className="line-clamp-4 font-opensans text-[16px]">
                        {htmlParser(item.deskripsi)}
                      </p>
                    </div>
                    <div className="flex flex-row flex-wrap gap-[8px]">
                      {item.tags?.length > 0 &&
                        item.tags?.map((el: any, idx: number) => (
                          <MediumTag
                            title={el}
                            customClass="font-opensans"
                            key={idx}
                          />
                        ))}
                    </div>

                    <Link
                      href={`/promo-berita/promo/${item.id}`}
                      className="flex flex-row items-center flex-wrap gap-[12px] font-bold text-purple_dark font-opensans text-sm cursor-pointer"
                    >
                      Selengkapnya
                      <Icon name="chevronRight" color="purple_dark" />
                    </Link>
                  </div>
                }
                image={
                  !item.image || item.image?.includes('no-image')
                    ? BlankImage
                    : item.image
                }
                rounded={12}
              />
            ))}
          </Slider>
          <div className="flex flex-row justify-between w-full">
            <div
              className="p-2 border-2 rounded-full border-purple_dark"
              role="button"
              onClick={previous}
            >
              <Icon name="chevronLeft" color="purple_dark" />
            </div>
            <div
              className="p-2 border-2 rounded-full border-purple_dark"
              role="button"
              onClick={next}
            >
              <Icon name="chevronRight" color="purple_dark" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <CategoryWithThreeCards
            searchPlaceholder="Cari Promo"
            hidePagination
            defaultSelectedCategory={category}
            filterRowLayout={true}
            hiddenCategory
            categoryCard="B"
            categories={[
              'Berita dan Kegiatan',
              'AvriStory',
              'Avrist Life Guide'
            ]}
            tabs={[
              {
                type: 'dropdown',
                label: 'tahun',
                options: yearDropdown(2009)
              },
              {
                type: 'dropdown',
                label: 'Bulan',
                options: monthDropdown()
              }
            ]}
            onSearchChange={(e) => {
              setSearch(e.target.value);
            }}
            onSearch={() => {
              setParams({ ...params, searchFilter: search });
            }}
            customContent={
              <>
                <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-[24px] w-full">
                  {paginatedData?.map((item: any, index: number) => (
                    <Link
                      key={index}
                      href={`/promo-berita/promo/${item.id}`}
                      className="w-full h-auto flex justify-center"
                    >
                      <Image
                        src={item?.image ?? BlankImage}
                        className="w-full min-h-[220px] shadow-small rounded-lg object-fill"
                        alt="blank"
                        width={0}
                        height={0}
                      />
                    </Link>
                  ))}
                </div>

                {renderPage()}
              </>
            }
            outerClass="px-[2rem] md:px-[8.5rem]"
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  title="Subscribe"
                  customButtonClass="rounded-xl"
                  customTextClass="text-[1rem]"
                  onClick={handleSubscribeButton}
                />
              </div>
            </div>
          }
          image={data?.footerImage ?? BlankImage}
        />
        <RoundedFrameTop bgColor="xs:bg-white md:bg-purple_superlight" />
      </div>
      <div className="w-full">
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
    </div>
  );
};

export default Promo;
