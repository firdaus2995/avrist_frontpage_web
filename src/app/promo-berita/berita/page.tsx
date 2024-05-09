'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import CardCategoryB from '@/components/molecules/specifics/avrast/Cards/CategoriB';
import CardCategoryC from '@/components/molecules/specifics/avrast/Cards/CategoryC';
import CardCategoryD from '@/components/molecules/specifics/avrast/Cards/CategoryD';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import SliderInformation from '@/components/molecules/specifics/avrast/SliderInformation';
import { handleGetContentPage } from '@/services/content-page.api';
import { ParamsProps } from '@/utils/globalTypes';
import { handleDownload, htmlParser } from '@/utils/helpers';
import {
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const Berita: React.FC<ParamsProps> = () => {
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
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');
  const [contentData, setContentData] = useState<any>();
  const [search, setSearch] = useState('');
  const [lifeGuideCategory, setLifeGuideCategory] = useState({
    list: [],
    selectedCategory: ''
  });
  const [params, setParams] = useState({
    category: searchParams.get('category') ?? '',
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
  const latestFiveData = contentData?.slice(0, 5);
  const nextData =
    contentData?.length > 5
      ? contentData?.slice(pagination.currentPage + 5, 6)
      : contentData;
  const paginatedData = contentData
    ? nextData?.slice(startIndex, endIndex)
    : [];
  const totalPages = contentData
    ? Math.ceil(contentData?.length / pagination.itemsPerPage)
    : 0;
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });

  useEffect(() => {
    if (searchParams) {
      const value = searchParams.get('tab');
      const categories = searchParams.get('category');

      if (value !== null) {
        setTab(value);
      }

      if (categories !== null) {
        setParams({ ...params, category: categories });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();

    if (tab === 'Avrist Terkini') {
      params.category === 'Avrist Life Guide'
        ? fetchLifeGuide()
        : params.category === 'AvriStory'
          ? fetchAvriStory()
          : fetchContent();
    }
  }, [params, lifeGuideCategory.selectedCategory, tab]);

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

  const fetchAvriStory = async () => {
    try {
      const fetchData = await fetch(
        `https://api-front-sit.avristcms.barito.tech/api/content/category/Bulletin-AvriStory?includeAttributes=true${params.searchFilter && `&searchFilter=${params.searchFilter}`}${params.yearFilter && `&yearFilter=${params.yearFilter}`}${params.monthFilter && `&monthFilter=${params.monthFilter}`}`
      );

      const response = await fetchData.json();

      const categoryList = response.data.categoryList;

      const transformedData = categoryList[params.category]?.map(
        (item: any) => {
          const { content } = handleTransformedContent(
            item.contentData,
            item.title
          );

          const namaFile = content['nama-file-bulletin'].value;
          const file = singleImageTransformer(
            content['file-bulletin']
          ).imageUrl;

          return { namaFile, file };
        }
      );

      setContentData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContent = async () => {
    try {
      const fetchContentCategory = await fetch(
        `https://api-front-sit.avristcms.barito.tech/api/content/category/Berita-dan-Kegiatan-Detail?includeAttributes=true&category=${params.category}${params.searchFilter && `&searchFilter=${params.searchFilter}`}${params.yearFilter && `&yearFilter=${params.yearFilter}`}${params.monthFilter && `&monthFilter=${params.monthFilter}`}`
      );
      const response = await fetchContentCategory.json();

      const categoryList = response.data.categoryList;

      const transformedData = categoryList[params.category]?.map(
        (item: any) => {
          const { content } = handleTransformedContent(
            item.contentData,
            item.title
          );

          const judul = content['judul-artikel'].value;
          const waktu = `${
            monthDropdown().find(
              (item) => item.label === content['bulan'].value
            )?.label
          } ${content['tahun'].value}`;
          const deskripsi = content['artikel-looping'].contentData[0].details;
          const image = singleImageTransformer(
            content['artikel-thumbnail']
          ).imageUrl;
          const id = item.id;
          const tags = content['tags'].value;

          return { judul, waktu, deskripsi, image, id, tags };
        }
      );

      setContentData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLifeGuide = async () => {
    try {
      const fetchData = await fetch(
        `https://api-front-sit.avristcms.barito.tech/api/content/category/list-avrist-life-guide?includeAttributes=true${lifeGuideCategory.selectedCategory && `&category=${lifeGuideCategory.selectedCategory}`}${params.searchFilter && `&searchFilter=${params.searchFilter}`}${params.yearFilter && `&yearFilter=${params.yearFilter}`}${params.monthFilter && `&monthFilter=${params.monthFilter}`}`
      );

      const response = await fetchData.json();

      const data = response.data.categoryList;

      const categoryList: any = Object.keys(data);

      setLifeGuideCategory({
        ...lifeGuideCategory,
        list: categoryList,
        selectedCategory: categoryList[0]
      });

      const transformedData = data[lifeGuideCategory.selectedCategory]?.map(
        (item: any) => {
          const { content } = handleTransformedContent(
            item.contentData,
            item.title
          );

          const judul = content['judul-artikel'].value;
          const waktu = `${
            monthDropdown().find(
              (item) => item.label === content['bulan'].value
            )?.label
          } ${content['tahun'].value}`;
          const deskripsi =
            content['artikel-looping'].contentData[0].details[0].value;
          const image = singleImageTransformer(
            content['artikel-thumbnail']
          ).imageUrl;
          const id = item.id;
          const tags = content['tags'].value;
          const waktuBaca = content['waktu-baca-artikel'].value;

          return { judul, waktu, deskripsi, image, id, tags, waktuBaca };
        }
      );

      setContentData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
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

  const handleTabClick = (tabs: string) => {
    setTab(tabs);
    router.push(pathname + '?' + createQueryString('tab', tabs), {
      scroll: false
    });
  };

  const onCategoryChange = (value: string) => {
    setParams({ ...params, category: value });
    router.push(pathname + '?' + createQueryStringCategory('category', value), {
      scroll: false
    });
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (value !== 'Avrist Terkini') {
        params.delete('category');
      } else {
        params.set('category', 'Berita dan Kegiatan');
      }

      return params.toString();
    },
    [searchParams]
  );

  const createQueryStringCategory = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const tabs = ['Avrist Terkini', 'Testimonial', 'Kumpulan Berita Pers'];

  return (
    <div className="flex flex-col items-center justify-center bg-white relative">
      <Hero
        title={tab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: tab === 'Avrist Terkini' ? params.category : tab, href: '#' }
        ]}
        imageUrl={data?.titleImage}
      />
      <div className="w-full grid grid-cols-3 gap-2 px-[136px] py-20 absolute z-20 top-32 rounded-t-[76px] bg-white">
        {tabs.map((val, idx) => (
          <div
            key={idx}
            role="button"
            onClick={() => handleTabClick(val)}
            className={`p-2 border border-purple_dark rounded-lg text-center ${tab === val ? 'bg-purple_dark text-white' : 'text-purple_dark'} font-semibold`}
          >
            {val}
          </div>
        ))}
      </div>

      {tab === 'Avrist Terkini' && (
        <div className="w-full flex flex-col items-center justify-center py-2 text-center mt-44">
          <h2 className="text-[32px] font-medium mb-6 text-purple_dark">
            {params.category === 'Berita dan Kegiatan' &&
              'Berita dan Kegiatan Avrist Life Insurance'}
            {params.category === 'AvriStory' && (
              <p>
                <span className="font-black">AvriStory:</span> E-Bulletin hadir
                setiap 3 bulan sekali
              </p>
            )}
            {params.category === 'Avrist Life Guide' && 'Avrist Life Guide'}
          </h2>
          <h2 className="text-[20px] mb-6">
            {params.category === 'Berita dan Kegiatan' &&
              'Informasi terkini dari siaran pers hingga aktivitas sosial.'}
            {params.category === 'AvriStory' && (
              <p>
                Informasi terbaru mengenai{' '}
                <span className="font-black">Avrist Life Insurance</span>
              </p>
            )}
            {params.category === 'Avrist Life Guide' && (
              <p>
                Kumpulan artikel mengenai{' '}
                <span className="font-bold text-purple_dark">asuransi</span> dan{' '}
                <span className="font-bold text-purple_dark">gaya hidup.</span>
              </p>
            )}
          </h2>

          {params.category === 'Berita dan Kegiatan' && (
            <div className="w-full p-10">
              <Slider
                ref={(slider) => {
                  sliderRef.current = slider;
                }}
                {...sliderSettings}
              >
                {latestFiveData?.map((item: any, index: number) => (
                  <SliderInformation
                    key={index}
                    bgColor="purple_superlight"
                    title={
                      <div className="flex flex-col gap-4 text-left">
                        <p className="text-[14px]">
                          <span className="font-bold text-purple_dark">
                            {item.tags}
                          </span>{' '}
                          | {item.waktu}
                        </p>
                        <p
                          className="text-[36px] font-bold"
                          dangerouslySetInnerHTML={{
                            __html: item.judul
                          }}
                        />
                        <p
                          className="text-[16px] line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: item.deskripsi
                              ? item.deskripsi[0]?.value?.substring(0, 250) +
                                '...'
                              : '-'
                          }}
                        />

                        <div className="flex flex-row flex-wrap gap-[12px]">
                          <MediumTag title={item.tags} />
                        </div>
                        <Link
                          href={{
                            pathname: `/promo-berita/berita/berita-dan-kegiatan/`,
                            query: { id: item.id }
                          }}
                          className="flex flex-row items-center flex-wrap gap-[12px] font-bold text-purple_dark"
                        >
                          Selengkapnya
                          <Icon name="chevronRight" color="purple_dark" />
                        </Link>
                      </div>
                    }
                    image={item.image}
                    imageClassName="rounded-r-2xl"
                  />
                ))}
              </Slider>
              <div className="flex flex-row justify-between w-full px-20">
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
          )}

          <CategoryWithThreeCards
            defaultSelectedCategory={params.category}
            onCategoryChange={(tab) => onCategoryChange(tab)}
            filterRowLayout={true}
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
            hidePagination
            searchPlaceholder="Cari Kegiatan"
            onSearchChange={(e) => {
              setSearch(e.target.value);
            }}
            onSearch={() => {
              setParams({ ...params, searchFilter: search });
            }}
            customContent={
              <>
                {params.category === 'Berita dan Kegiatan' ? (
                  <div className="grid grid-cols-3 gap-[24px]">
                    {paginatedData?.map((item: any, index: number) => (
                      <Link
                        key={index}
                        href={{
                          pathname: `/promo-berita/berita/berita-dan-kegiatan/`,
                          query: { id: item.id }
                        }}
                      >
                        <CardCategoryB
                          summary={item.judul}
                          description={item.waktu}
                          imageUrl={item.image}
                        />
                      </Link>
                    ))}
                  </div>
                ) : params.category === 'AvriStory' ? (
                  <div className="grid grid-cols-1 gap-[24px] w-full">
                    {paginatedData?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="w-full flex flex-row justify-between items-center p-4 border rounded-xl"
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <p className="font-bold">{item.namaFile}</p>
                          <MediumTag title="PDF" />
                        </div>
                        <Button
                          title="Unduh"
                          customButtonClass="rounded-xl bg-purple_dark"
                          customTextClass="text-white"
                          onClick={async () => await handleDownload(item.file)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-[24px]">
                    {paginatedData?.map((item: any, index: number) => (
                      <Link
                        key={index}
                        href={{
                          pathname: `/promo-berita/berita/life-guide/avrist-life-guide`,
                          query: { id: item.id }
                        }}
                      >
                        <CardCategoryD
                          type="row"
                          title={htmlParser(item.judul)}
                          summary={htmlParser(item.deskripsi)}
                          category={item.tags}
                          time={` | ${item.waktu}`}
                          tags={[item.tags]}
                          image={item.image}
                          readTime={item.waktuBaca}
                        />
                      </Link>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                  <div>
                    <p className="text-[20px]">
                      Menampilkan{' '}
                      <span className="font-bold text-purple_dark">
                        {contentData?.length === 0 ? 0 : startIndex + 1}-
                        {Math.min(
                          endIndex,
                          contentData ? contentData.length : 0
                        )}
                      </span>{' '}
                      dari{' '}
                      <span className="font-bold">
                        {contentData && contentData.length}
                      </span>{' '}
                      hasil
                    </p>
                  </div>
                  <div className="flex flex-row gap-[8px] items-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <div
                          key={page}
                          role="button"
                          onClick={() => handlePageChange(page)}
                          className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                            pagination.currentPage === page
                              ? 'text-purple_dark font-bold'
                              : ''
                          }`}
                        >
                          {page}
                        </div>
                      )
                    )}
                    <span
                      className="mt-[3px]"
                      role="button"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      <Icon name="chevronRight" color="purple_dark" />
                    </span>
                  </div>
                </div>
              </>
            }
            customLeftContent={
              params.category === 'Avrist Life Guide' ? (
                <div className="flex flex-col gap-4 mt-5 h-auto">
                  <div className="border rounded-xl p-4 flex flex-col gap-4 text-left grow">
                    <p className="font-semibold pb-2 border-b">
                      Kategori Artikel
                    </p>
                    <div className="flex flex-col mt-5 gap-4">
                      {lifeGuideCategory?.list?.map(
                        (item: any, index: number) => (
                          <div
                            key={index}
                            className="flex flex-row items-start gap-1 text-left"
                            onClick={() => {
                              setLifeGuideCategory({
                                ...lifeGuideCategory,
                                selectedCategory: item
                              });
                            }}
                          >
                            <p className="text-purple_dark font-bold text-sm cursor-pointer text-left">
                              {item}
                            </p>
                            <Icon
                              width={16}
                              height={16}
                              name="chevronRight"
                              color="purple_dark"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="border rounded-xl p-4 flex flex-col gap-4 text-left bg-purple_verylight">
                    <p className="font-bold text-[24px] text-purple_dark">
                      Subscribe!
                    </p>
                    <p className="text-[14px]">
                      Informasi terkini mengenai Avrist Life Insurance
                    </p>
                    <Input placeholder="Masukkan email Anda" />
                    <Button
                      title="Subscribe"
                      customButtonClass="bg-purple_dark rounded-xl"
                      customTextClass="text-white font-bold"
                    />
                  </div>
                  <div className="border rounded-xl p-4 flex flex-col gap-4 text-left">
                    <p className="font-bold text-[16px]">Ikuti Kami</p>
                    <div className="flex flex-row gap-2">
                      <Link
                        href="https://www.youtube.com/@avristian"
                        target="blank"
                        className="p-2 rounded-xl bg-purple_dark/[0.06]"
                      >
                        <Icon name="youtubeIcon" color="purple_dark" />
                      </Link>
                      <Link
                        href="https://id.linkedin.com/company/avristassurance"
                        target="blank"
                        className="p-2 rounded-xl bg-purple_dark/[0.06]"
                      >
                        <Icon name="linkedInIcon" color="purple_dark" />
                      </Link>
                      <Link
                        href="https://www.instagram.com/avristsolution/"
                        target="blank"
                        className="p-2 rounded-xl bg-purple_dark/[0.06]"
                      >
                        <Icon name="instaIcon" color="purple_dark" />
                      </Link>
                      <Link
                        href="https://www.facebook.com/avrist/"
                        target="blank"
                        className="p-2 rounded-xl bg-purple_dark/[0.06]"
                      >
                        <Icon name="facebookIcon" color="purple_dark" />
                      </Link>
                      <Link
                        href="https://www.tiktok.com/@avrist.assurance"
                        target="blank"
                        className="p-2 rounded-xl bg-purple_dark/[0.06]"
                      >
                        <Icon name="tiktokIcon" color="purple_dark" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null
            }
            customRightContent={
              params.category === 'Avrist Life Guide' ? (
                <div className="flex flex-col gap-4 mt-5 h-full">
                  <p className="font-semibold pb-2 text-left text-[24px]">
                    Terbaru
                  </p>
                  <div className="grid grid-cols-2 gap-[24px]">
                    {contentData
                      ?.slice(0, 4)
                      .map((item: any, index: number) => (
                        <Link
                          key={index}
                          href={{
                            pathname: `/promo-berita/berita/life-guide/avrist-life-guide`,
                            query: { id: item.id }
                          }}
                        >
                          <CardCategoryD
                            key={index}
                            title={htmlParser(item.judul)}
                            summary={htmlParser(item.deskripsi)}
                            category={item.tags}
                            time={` | ${item.waktu}`}
                            tags={[item.tags]}
                            image={item.image}
                            readTime={item.waktuBaca}
                          />
                        </Link>
                      ))}
                  </div>
                  <p className="font-semibold pb-2 text-left text-[24px] mt-10">
                    Artikel Lainnya
                  </p>
                </div>
              ) : null
            }
          />
        </div>
      )}

      {tab === 'Testimonial' && (
        <div className="w-full flex flex-col items-center justify-center py-2 text-center mt-44">
          <h2 className="text-[32px] font-bold mb-6 text-purple_dark">
            Dari Anda untuk Kami
          </h2>
          <h2 className="text-[20px] mb-6">
            Inilah Cerita Pengalaman Nasabah Avrist Assurance bersama Kami
          </h2>

          <div className="w-full p-10">
            <Slider
              ref={(slider) => {
                sliderRef.current = slider;
              }}
              {...sliderSettings}
            >
              {[...Array(5)].map((_, index) => (
                <SliderInformation
                  key={index}
                  isVideo
                  bgColor="purple_superlight"
                  title={
                    <div className="flex flex-col gap-4 text-left">
                      <p className="text-[36px] font-bold">
                        Simak lebih lanjut tentang kisah Vicky
                      </p>
                      <p className="text-[16px] line-clamp-4">
                        Lorem ipsum dolor sit amet consectetur. Et non nulla
                        elit eget. Integer non a varius viverra. Amet proin
                        libero augue amet nunc et. Ultrices habitasse diam quam
                        consequat commodo. Amet tempor nam cras id egestas
                        pulvinar egestas egestas vitae. Etiam tincidunt sit amet
                        ultricies pharetra ultrices nisl nec tincidunt.
                        Tincidunt gravida orci feugiat amet. At ridiculus dolor
                        augue gravida. Risus ut neque leo fringilla tincidunt
                        suspendisse fusce eu arcu. Blandit fermentum faucibus
                        tempus varius quis at. Vulputate elit lorem purus
                        faucibus blandit non ut. Ornare tortor pulvinar eget
                        facilisis mi tortor vulputate.
                      </p>
                      <p className="text-[14px]">
                        <span className="font-bold text-purple_dark">
                          Francis Glover
                        </span>{' '}
                        | Human Accounts Agent
                      </p>
                    </div>
                  }
                  image={BlankImage}
                />
              ))}
            </Slider>
            <div className="flex flex-row justify-between w-full px-20">
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

          <CategoryWithThreeCards
            defaultSelectedCategory={params.category}
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
                options: [
                  { label: 'Pilih Tahun', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' }
                ]
              },
              {
                type: 'dropdown',
                label: 'Bulan',
                options: [
                  { label: 'Pilih Bulan', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' }
                ]
              }
            ]}
            customContent={
              <div className="grid grid-cols-3 gap-[24px]">
                {[...Array(3)].map((_, index) => (
                  <CardCategoryC
                    key={index}
                    summary="Lorem ipsum dolor sit amet consectetur."
                    name="Bruce Emmerich"
                    position=" | Senior Quality Facilitator"
                  />
                ))}
              </div>
            }
          />
        </div>
      )}

      {tab === 'Kumpulan Berita Pers' && (
        <div className="w-full flex flex-col items-center justify-center py-2 text-center mt-44">
          <h2 className="text-[32px] font-bold mb-6 text-purple_dark">
            Kumpulan Berita Pers
          </h2>
          <h2 className="text-[20px] mb-6">
            Berbagai <span className="font-bold">Informasi</span> mengenai{' '}
            <span className="font-bold">kegiatan, produk</span> dan{' '}
            <span className="font-bold">layanan</span> dari Avrist Life
            Insurance. Melangkah bersama Kami!
          </h2>

          <CategoryWithThreeCards
            defaultSelectedCategory={params.category}
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
                options: [
                  { label: 'Pilih Tahun', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' }
                ]
              },
              {
                type: 'dropdown',
                label: 'Bulan',
                options: [
                  { label: 'Pilih Bulan', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' }
                ]
              }
            ]}
            customContent={
              <div className="grid grid-cols-1 gap-[24px] w-full">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-full p-4 border rounded-xl">
                    <p className="font-bold text-left">
                      Gelar Inspirative Talk, Avrist Hadirkan Penulis Novel
                      Layangan Putus dan Co-Founder Kopi Soe Artikel ini telah
                      tayang di Kompas.com dengan judul
                    </p>
                    <div className="flex flex-row gap-4 mt-5">
                      <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                        Kompas
                        <Icon
                          name="externalLink"
                          color="purple_dark"
                          width={10}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                        Media Indonesia
                        <Icon
                          name="externalLink"
                          color="purple_dark"
                          width={10}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                        Tribun
                        <Icon
                          name="externalLink"
                          color="purple_dark"
                          width={10}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center text-xs font-medium text-purple_dark">
                        Detik
                        <Icon
                          name="externalLink"
                          color="purple_dark"
                          width={10}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      )}

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
      <div className="w-full h-full bg-purple_superlight pb-20">
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
    </div>
  );
};

export default Berita;
