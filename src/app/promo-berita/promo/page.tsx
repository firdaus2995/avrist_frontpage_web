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
import NotFound from '@/components/atoms/NotFound';
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
  contentStringTransformer,
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';
import { validateEmail } from '@/utils/validation';

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
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 640,
        settings: {
          centerMode: false
        }
      }
    ],
    appendDots: (dots: any) => (
      <div
        style={{
          position: 'absolute',
          bottom: -40
          // zIndex: -1
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    )
  };

  const searchParams = useSearchParams();
  const [, setTab] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [listData, setListData] = useState<any>([]);
  const [sliderData, setSliderData] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);
  const [isValidEmailContent, setIsValidEmailContent] =
    useState<boolean>(false);
  const [emailContent, setEmailContent] = useState('');
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
  const paginatedData = listData ? listData?.slice(startIndex, endIndex) : [];
  const totalPages = listData
    ? Math.ceil(listData?.length / pagination.itemsPerPage)
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

        const judul = contentStringTransformer(content['judul-artikel']);
        const waktu = `${
          monthDropdown().find(
            (item) => item.label === contentStringTransformer(content['bulan'])
          )?.label
        } ${contentStringTransformer(content['tahun'])}`;
        const deskripsi =
          content['artikel-looping'].contentData[0].details[0].value;
        const image = singleImageTransformer(
          content['artikel-thumbnail']
        ).imageUrl;
        const id = item.id;
        const tags = contentStringTransformer(content['tags'])
          .split(',')
          .map((tag: string) => tag.trim());

        return { judul, waktu, deskripsi, image, id, tags };
      });

      if (!transformedData) {
        setListData([]);
      } else {
        if (sliderData?.length > 0) {
          setListData(getDifference(transformedData, sliderData));
        } else {
          setSliderData(transformedData.slice(0, 5));
          setListData(transformedData.slice(5));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getDifference = (arr1: any, arr2: any) => {
    const map2 = new Map(arr2.map((obj: { id: any }) => [obj.id, obj]));
    const difference = arr1.filter((obj: { id: unknown }) => !map2.has(obj.id));

    return difference;
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
              {paginatedData?.length === 0 || paginatedData === undefined
                ? 0
                : startIndex + 1}
              -{Math.min(endIndex, paginatedData ? paginatedData.length : 0)}
            </span>{' '}
            dari{' '}
            <span className="font-bold">
              {paginatedData && paginatedData.length}
            </span>{' '}
            hasil
          </p>
        </div>
        {paginatedData?.length > 0 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={2}
            onPageChange={() => handlePageChange(totalPages)}
            nextLabel={<Icon name="chevronRight" color="purple_dark" />}
            previousLabel={<Icon name="chevronLeft" color="purple_dark" />}
            containerClassName="flex flex-row gap-[12px] items-center"
            activeClassName="text-purple_dark font-bold"
            pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
          />
        )}
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
        <div className="px-[2rem] md:px-[8.5rem] pb-[5rem]">
          <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Avrist Promo Terbaru
          </p>
          <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
            Ikuti terus kuis menarik di Instagram{' '}
            <Link
              className="font-semibold text-purple_dark"
              href="https://www.instagram.com/avristsolution/"
              target="blank"
            >
              @avristsolution{' '}
            </Link>
            untuk mendapatkan giveaway gratis dari Avrist Life Insurance
          </p>
        </div>

        <div className="w-full pb-[80px] px-[2rem] md:px-[8.5rem]">
          <div className="w-full relative">
            <Slider
              ref={(slider) => {
                sliderRef.current = slider;
              }}
              {...sliderSettings}
            >
              {sliderData?.map((item: any, index: number) => (
                <SliderInformation
                  key={index}
                  bgColor="purple_superlight"
                  imageClassName="object-fill"
                  title={
                    <div className="flex flex-col justify-between text-left h-full">
                      <div className="flex flex-col gap-6">
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
            <div className="flex flex-row justify-between w-full pt-[16px]">
              <div
                className="p-2 border-2 rounded-full border-purple_dark z-10"
                role="button"
                onClick={previous}
              >
                <Icon name="chevronLeft" color="purple_dark" />
              </div>
              <div
                className="p-2 border-2 rounded-full border-purple_dark z-10"
                role="button"
                onClick={next}
              >
                <Icon name="chevronRight" color="purple_dark" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mb-2">
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
                {listData?.length > 0 ? (
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
                ) : (
                  <NotFound />
                )}

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
            <div className="flex flex-col gap-4 px-2">
              <p className="text-4xl 2xl:text-[3.5rem]">
                Subscribe Informasi Terkini!
              </p>
              <div className="bg-purple_dark rounded-xl px-[1.25rem] py-[0.5rem] text-purple_dark border-purple_dark hover:bg-purple_dark hover:text-white">
                <p className="text-white text-center font-bold md:w-full cursor-default">
                  Avrist Life Insurance
                </p>
              </div>
              <div className="flex flex-row gap-2 xs:max-md:flex-wrap md:flex-wrap">
                <Input
                  type="text"
                  placeholder="Masukkan email Anda"
                  customInputClass="w-[90%] xs:max-md:w-full md:w-full md:text-xs"
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
                  title="Subscribe"
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
