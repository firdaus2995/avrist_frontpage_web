'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import CustomerFund from '@/components/molecules/specifics/avram/_investasi/CustomerFund';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import { constructData } from './construct-data';
import { formatTimeDifference } from './format-time';
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
import { SubmittedFormModal } from '@/components/molecules/specifics/avrast/Modal';
import SliderInformation from '@/components/molecules/specifics/avrast/SliderInformation';
import {
  getAvristLifeGuide,
  getAvriStory,
  getAvristTerkini,
  getBeritaPers,
  getTestimoni,
  subscribeApi
} from '@/services/berita';
import { handleGetContentPage } from '@/services/content-page.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import { ParamsProps } from '@/utils/globalTypes';
import { handleDownload, htmlParser, mergeAllData } from '@/utils/helpers';
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
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          centerMode: false
        }
      }
    ]
  };

  const sliderTabSettings = {
    dots: false,
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
  const [visibleSubscribeModal, setVisibleSubscribeModal] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [emailContent, setEmailContent] = useState('');
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
  const paginatedData = contentData
    ? contentData?.slice(startIndex, endIndex)
    : [];
  const totalPages = contentData
    ? Math.ceil(contentData?.length / pagination.itemsPerPage)
    : 0;
  const [data, setData] = useState<any>({
    slug: '',
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
    pageSlug();
    if (tab === 'Avrist Terkini') {
      params.category === 'Avrist Life Guide'
        ? fetchLifeGuide()
        : params.category === 'AvriStory'
          ? fetchAvriStory()
          : fetchContent();
    }

    if (tab === 'Kumpulan Berita Pers') {
      fetchBeritaPers();
    }

    if (tab === 'Testimonial') {
      fetchTestimoni();
    }
  }, [params, lifeGuideCategory.selectedCategory, tab]);

  useEffect(() => {
    if (data.slug) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    setParams({
      category: searchParams.get('category') ?? '',
      yearFilter: '',
      monthFilter: '',
      searchFilter: ''
    });
  }, [tab]);

  const pageSlug = () => {
    if (tab === 'Avrist Terkini') {
      params.category === 'Avrist Life Guide'
        ? setData({
            ...data,
            slug: BASE_SLUG.PROMO_BERITA.PAGE.AVRIST_LIFE_GUIDE
          })
        : params.category === 'AvriStory'
          ? setData({ ...data, slug: BASE_SLUG.PROMO_BERITA.PAGE.AVRISTORY })
          : setData({
              ...data,
              slug: BASE_SLUG.PROMO_BERITA.PAGE.AVRIST_TERKINI_DETAIL
            });
    }

    if (tab === 'Kumpulan Berita Pers') {
      setData({
        ...data,
        slug: BASE_SLUG.PROMO_BERITA.PAGE.KUMPULAN_BERITA_PERS
      });
    }

    if (tab === 'Testimonial') {
      setData({
        ...data,
        slug: BASE_SLUG.PROMO_BERITA.PAGE.TESTIMONI
      });
    }
  };

  const fetchData = () => {    
    try {
      handleGetContentPage(data.slug.toLowerCase()).then((res: any) => {
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
      const fetchData = await getAvriStory({
        includeAttributes: 'true',
        category: params.category,
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter
      });

      const categoryList = fetchData.data.categoryList;

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
      const fetchContentCategory = await getAvristTerkini({
        includeAttributes: 'true',
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter
      });

      const categoryList = fetchContentCategory.data.categoryList;

      // merge  all category data
      const mergedData = mergeAllData(categoryList);

      const transformedData = mergedData?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['judul-artikel'].value;
        const waktu = `${
          monthDropdown().find(
            (item) =>
              item.value === content['bulan'].value ||
              item.label === content['bulan'].value
          )?.label
        } ${content['tahun'].value}`;
        const deskripsi = content['artikel-looping'].contentData[0].details;
        const image = singleImageTransformer(
          content['artikel-thumbnail']
        ).imageUrl;
        const id = item.id;
        const tags = content['tags'].value;
        const date = new Date(item.createdAt).getDate();
        const artikelTopic = content['topik-artikel'].value;

        return {
          judul,
          waktu,
          deskripsi,
          image,
          id,
          tags,
          date,
          artikelTopic
        };
      });

      setContentData(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLifeGuide = async () => {
    try {
      const fetchData = await getAvristLifeGuide({
        includeAttributes: 'true',
        category: lifeGuideCategory.selectedCategory,
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter
      });
      
      const data = fetchData.data.categoryList;
      
      const categoryList: any = Object.keys(data);

      if (lifeGuideCategory?.selectedCategory === '') {
        setLifeGuideCategory({
          ...lifeGuideCategory,
          list: categoryList,
          selectedCategory: categoryList[0] ?? lifeGuideCategory.selectedCategory
        });
        const temp:any = []
        categoryList.map((el:any) => {
          data[el]?.map(
            (item: any) => {
              const { content } = handleTransformedContent(
                item.contentData,
                item.title
              );
    
              const date = new Date(item.createdAt).getDate();
              const judul = content['judul-artikel'].value;
              const waktu = `${
                monthDropdown().find(
                  (item) =>
                    item.value === content['bulan'].value ||
                    item.label === content['bulan'].value
                )?.label
              } ${content['tahun'].value}`;
              const deskripsi =
                content['artikel-looping'].contentData[0].details[0].value;
              const image = singleImageTransformer(
                content['artikel-thumbnail']
              ).imageUrl;
              const id = item.id;
              const tags = !!content['tags']?.value || content['tags']?.value !== '-'
              ? content['tags']?.value.split(',')
              : content['tags']?.value;
              const waktuBaca = content['waktu-baca-artikel'].value;
    
              const differenceTime = formatTimeDifference(
                new Date(item.createdAt),
                new Date()
              );

              temp.push({
                judul,
                waktu,
                deskripsi,
                image,
                id,
                tags,
                waktuBaca,
                date,
                differenceTime,
                category: el
              })  
    
              return {
                judul,
                waktu,
                deskripsi,
                image,
                id,
                tags,
                waktuBaca,
                date,
                differenceTime
              };
            }
          );          
        })
        return setContentData(temp);
      } else {
          const transformedData = data[lifeGuideCategory.selectedCategory]?.map(
            (item: any) => {
              const { content } = handleTransformedContent(
                item.contentData,
                item.title
              );
    
              const date = new Date(item.createdAt).getDate();
              const judul = content['judul-artikel'].value;
              const waktu = `${
                monthDropdown().find(
                  (item) =>
                    item.value === content['bulan'].value ||
                    item.label === content['bulan'].value
                )?.label
              } ${content['tahun'].value}`;
              const deskripsi =
                content['artikel-looping'].contentData[0].details[0].value;
              const image = singleImageTransformer(
                content['artikel-thumbnail']
              ).imageUrl;
              const id = item.id;
              const tags = !!content['tags']?.value || content['tags']?.value !== '-'
              ? content['tags']?.value.split(',')
              : content['tags']?.value;;
              const waktuBaca = content['waktu-baca-artikel'].value;
    
              const differenceTime = formatTimeDifference(
                new Date(item.createdAt),
                new Date()
              );
    
              return {
                judul,
                waktu,
                deskripsi,
                image,
                id,
                tags,
                waktuBaca,
                date,
                differenceTime,
                category: lifeGuideCategory.selectedCategory
              };
            }
          );
          setContentData(transformedData);
      }


    } catch (err) {
      console.error(err);
    }
  };

  const fetchBeritaPers = async () => {
    try {
      const fetchData = await getBeritaPers({
        includeAttributes: 'true',
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter,
        category: params?.category
      });

      const data = fetchData.data.categoryList;

      const transformedData = data['Berita Pers']?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['judul-artikel']?.value;
        // const deskripsi = content['external-link-berita-pers'].value;
        let newLink;
        const externalLink = content['list-external-link']?.contentData;
        const arr: any = [];

        externalLink.map((el: any) => {
          newLink = constructData(
            el['details'][0]?.value,
            el['details'][1]?.value
          );
          arr.push(newLink);
        });

        return { judul, newLink, arr };
      });

      setContentData(transformedData);
    } catch (err) {
      console.log(err);

      console.error(err);
    }
  };

  const fetchTestimoni = async () => {
    try {
      const fetchData = await getTestimoni({
        includeAttributes: 'true',
        searchFilter: params.searchFilter,
        yearFilter: params.yearFilter,
        monthFilter: params.monthFilter
      });

      const data = fetchData.data.categoryList;

      const transformedData = data['']?.map((item: any) => {
        const { content } = handleTransformedContent(
          item.contentData,
          item.title
        );

        const judul = content['judul-testimoni'].value;
        const deskripsi = content['deskripsi-singkat-testimoni'].value;
        const penulis = content['penulis-testimoni'].value;
        const titlePenulis = content['title-penulis-testimoni'].value;
        const videoUrl = content['video-testimoni'].value;

        return { judul, deskripsi, penulis, titlePenulis, videoUrl };
      });

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

  const handleSubscribeButton = async() => {
      try {
        const response:any = await subscribeApi({
          email: email,
          entity: 'avrist'
        });
        if (response?.code === 200) {
          setVisibleSubscribeModal(true)
          setEmail('');
        } 
      } catch(e) {
        console.log(e);
      }
  };

  const handleSubscribeContentButton = async() => {
      try {
        const response:any = await subscribeApi({
          email: emailContent,
          entity: 'avrist'
        });
        if (response?.code === 200) {
          setVisibleSubscribeModal(true)
          setEmailContent('');
        } 
      } catch(e) {
        console.log(e);
      }
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
      if (value === 'Avrist Terkini') {
        params.set('category', 'Berita dan Kegiatan');
      } else if (value === 'Kumpulan Berita Pers') {
        params.set('category', 'Berita Pers');
      } else {
        params.delete('category');
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

  const renderPage = () => {
    return (
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div>
          <p className="text-[20px]">
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
        <div className="flex flex-row gap-[8px] items-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <div
              key={page}
              role="button"
              onClick={() => handlePageChange(page)}
              className={`w-6 h-6 flex items-center justify-center cursor-pointer text-xl ${
                pagination.currentPage === page
                  ? 'text-purple_dark font-bold'
                  : ''
              }`}
            >
              {page}
            </div>
          ))}
          <span
            className="mt-[3px]"
            role="button"
            onClick={() => handlePageChange(totalPages)}
          >
            <Icon name="chevronRight" color="purple_dark" />
          </span>
        </div>
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
        title={tab}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: tab === 'Avrist Terkini' ? params.category : tab, href: '#' }
        ]}
        bottomImage={params.category === 'AvriStory' ? data?.bannerImage : null}
        imageUrl={data?.titleImage}
        // customClassName="xs:h-[150px] md:h-[200px]"
      />
      {/* Tab Desktop */}
      <div className="w-full z-20 top-32 xs:hidden md:block">
        <div className="grid grid-cols-3 gap-[12px] px-[136px] py-[100px] bg-white">
          {tabs.map((val, idx) => (
            <div
              key={idx}
              role="button"
              onClick={() => handleTabClick(val)}
              className={`py-2 px-[20px] border border-purple_dark rounded-lg text-center ${tab === val ? 'bg-purple_dark text-white' : 'text-purple_dark'} font-semibold content-center md:w-auto`}
            >
              {val}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Mobile */}
      <div className="w-[95%] z-20 top-32 md:hidden">
        <div className="pt-[3rem]">
          <Slider {...sliderTabSettings}>
            {tabs.map((val, idx) => (
              <div key={idx}>
                <div
                  role="button"
                  onClick={() => handleTabClick(val)}
                  className={`mx-[10px] p-2 border border-purple_dark rounded-lg text-center ${tab === val ? 'bg-purple_dark text-white' : 'text-purple_dark'} font-semibold`}
                >
                  {val}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {tab === 'Avrist Terkini' && (
        <div className="w-full flex flex-col items-center justify-center py-2 text-center mt-34 sm:max-md:w-[90%]">
          <h2 className="text-[56px] xs:max-sm:px-[50px] md:px-[110px] lg:px-[136px] font-bold mb-6 text-purple_dark xs:max-md:text-4xl md:text-4xl">
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
          <h2 className="text-[36px] mb-6 xs:max-md:text-2xl xs:max-sm:px-[50px] md:px-[110px] lg:px-[136px] md:text-2xl">
            {params.category === 'Berita dan Kegiatan' &&
              'Informasi terkini dari siaran pers hingga aktivitas sosial.'}
            {params.category === 'AvriStory' && (
              <p>
                Informasi terbaru mengenai{' '}
                <span className="font-black">Avrist Life Insurance</span>
              </p>
            )}
            {params.category === 'Avrist Life Guide' && (
              <p className="text-[36px] font-normal">
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
                {contentData?.slice(0, 5)?.map((item: any, index: number) => (
                  <SliderInformation
                    key={index}
                    bgColor="purple_superlight"
                    title={
                      <div className="flex flex-col gap-4 text-left">
                        <p className="text-[14px]">
                          <span className="font-bold text-purple_dark text-sm">
                            {htmlParser(item.artikelTopic)}
                          </span>{' '}
                          | {`${item.date} ${item.waktu}`}
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
          <div className="w-full flex flex-col items-center justify-center py-2 text-center mt-34">
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
              searchPlaceholder="Cari Buletin"
              onSearchChange={(e) => {
                setSearch(e.target.value);
              }}
              onSearch={() => {
                setParams({ ...params, searchFilter: search });
              }}
              customContent={
                <>
                  {params.category === 'Berita dan Kegiatan' ? (
                    <div className="grid grid-cols-3 gap-[24px] xs:max-sm:grid-cols-1">
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
                            description={`${item.date} ${item.waktu}`}
                            imageUrl={item.image}
                            imageStyle="min-h-[170px]"
                            lineClamp={3}
                          />
                        </Link>
                      ))}
                    </div>
                  ) : params.category === 'AvriStory' ? (
                    <div className="grid lg:grid-cols-1 gap-[24px] w-full">
                      {paginatedData?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="w-full flex flex-wrap justify-between items-center p-[24px] border rounded-xl xm:text-left"
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <p className="font-bold text-2xl">
                              {item.namaFile}
                            </p>
                            <MediumTag title="PDF" />
                          </div>
                          <Button
                            title="Unduh"
                            customButtonClass="rounded-xl bg-purple_dark xs:max-lg:min-w-full xs:max-lg:mt-3"
                            customTextClass="text-white text-xl"
                            onClick={async () =>
                              await handleDownload(item.file)
                            }
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
                            category={item.category}
                            time={` | ${item.date} ${item.waktu}`}
                            tags={item.tags}
                            image={item.image}
                            readTime={item.waktuBaca}
                          />
                        </Link>
                      ))}
                    </div>
                  )}

                  {renderPage()}
                </>
              }
              customLeftContent={
                params.category === 'Avrist Life Guide' ? (
                  <div className="flex flex-col gap-4 mt-5 h-auto">
                    <div className="border rounded-xl py-[36px] px-[24px] flex flex-col gap-4 text-left grow">
                      <p className="font-bold pb-2 border-b text-[24px]">
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
                              <p className="text-purple_dark font-bold text-sm cursor-pointer text-left text-[20px]">
                                {item}
                              </p>
                              <div className="mt-1">
                                <Icon
                                  width={16}
                                  height={16}
                                  name="chevronRight"
                                  color="purple_dark"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="border rounded-xl px-[24px] py-[36px] flex flex-col gap-[24px] text-left bg-purple_verylight">
                      <p className="font-bold text-4xl text-purple_dark">
                        Subscribe!
                      </p>
                      <p className="text-2xl font-light font-['Source Sans Pro']">
                        Informasi terkini mengenai Avrist Life Insurance
                      </p>
                      <Input placeholder="Masukkan email Anda" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <Button
                        title="Subscribe"
                        customButtonClass="bg-purple_dark rounded-xl"
                        customTextClass="text-white font-semibold text-base"
                        onClick={handleSubscribeButton}
                      />
                    </div>
                    <div className="border rounded-xl p-4 flex flex-col gap-[24px] text-left">
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
                  <div className="flex flex-col gap-4 mt-1 h-full">
                    <p className="font-semibold pb-2 text-left text-[24px]">
                      Terbaru
                    </p>
                    <div className="grid lg:grid-cols-2 gap-[24px] md:grid-cols-1">
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
                              category={item.category}
                              time={` | ${item?.differenceTime} yang lalu`}
                              tags={item.tags}
                              image={item.image}
                              readTime={item.waktuBaca}
                            />
                          </Link>
                        ))}
                    </div>
                    <p className="font-bold pb-2 text-left text-[36px] mt-10">
                      Artikel Lainnya
                    </p>
                  </div>
                ) : null
              }
            />
          </div>
        </div>
      )}

      {tab === 'Testimonial' && (
        <div className="w-full flex flex-col items-center justify-center py-[100px] px-[136px] text-center mt-10">
          <h2 className="md:text-[56px] xs:text-4xl font-bold mb-6 text-purple_dark">
            Dari Anda untuk Kami
          </h2>
          <h2 className="md:text-4xl xs:text-2xl mb-6 xs:w-[84%] lg:w-full">
            Inilah Cerita Pengalaman Nasabah Avrist Assurance bersama Kami
          </h2>

          <div className="w-full p-10">
            <Slider
              ref={(slider) => {
                sliderRef.current = slider;
              }}
              {...sliderSettings}
            >
              {contentData?.slice(0, 5).map((item: any, index: number) => {
                return (
                  <SliderInformation
                    key={index}
                    isVideo
                    bgColor="purple_superlight"
                    title={
                      <div className="flex flex-col gap-4 text-left">
                        <p
                          className="text-[36px] font-bold"
                          dangerouslySetInnerHTML={{
                            __html: item.judul
                          }}
                        />
                        <p
                          className="text-[16px] line-clamp-4"
                          dangerouslySetInnerHTML={{
                            __html: item.deskripsi
                          }}
                        />
                        <p className="text-[14px]">
                          <span className="font-bold text-purple_dark">
                            {item.penulis}
                          </span>{' '}
                          | {item.titlePenulis}
                        </p>
                      </div>
                    }
                    image={item.videoUrl}
                  />
                );
              })}
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

          <div className="w-full">
            <CategoryWithThreeCards
              hidePagination
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
                  <div className="grid lg:grid-cols-3 gap-[24px] xs:grid-cols-1 md:grid-cols-2">
                    {paginatedData?.map((item: any, index: number) => (
                      <CardCategoryC
                        key={index}
                        summary={htmlParser(item.judul)}
                        name={item.penulis}
                        position={` | ${item.titlePenulis}`}
                        isVideo
                        image={item.videoUrl}
                      />
                    ))}
                  </div>

                  {renderPage()}
                </>
              }
            />
          </div>
        </div>
      )}

      {tab === 'Kumpulan Berita Pers' && (
        <div className="w-full flex flex-col items-center justify-center xs:py-10 md:py-2">
          <div className="w-full xs:px-[2rem] md:px-[8.5rem]  xs:text-center md:text-start">
            <h2 className="lg:text-[56px] xs:text-4xl font-bold mb-6 text-purple_dark text-center">
              Kumpulan Berita Pers
            </h2>
            <h2 className="lg: text-[36px] xs:text-2xl mb-6 font-normal text-center">
              Berbagai <span className="font-bold">Informasi</span> mengenai{' '}
              <span className="font-bold">kegiatan, produk</span> dan{' '}
              <span className="font-bold">layanan</span> dari Avrist Life
              Insurance. Melangkah bersama Kami!
            </h2>
          </div>

          <div className="w-full flex flex-col items-center justify-center py-2 text-center mt-34">
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
              hidePagination
              onSearchChange={(e) => {
                setSearch(e.target.value);
              }}
              onSearch={() => {
                setParams({ ...params, searchFilter: search });
              }}
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
              customContent={
                <>
                  <div className="grid grid-cols-1 gap-[24px] w-full">
                    {paginatedData?.map((item: any, index: number) => (
                      <div key={index} className="w-full p-4 border rounded-xl">
                        {
                          <p
                            className="text-2xl font-bold font-['Source Sans Pro'] text-left mb-1"
                            dangerouslySetInnerHTML={{
                              __html: item.judul
                            }}
                          />
                        }
                        <div className="flex gap-[12px] flex-wrap">
                          {item.arr}
                        </div>
                      </div>
                    ))}
                  </div>

                  {renderPage()}
                </>
              }
            />
          </div>
        </div>
      )}

      <div className="w-full flex flex-col">
        <RoundedFrameBottom />
        <FooterInformation
          title={
            <div className="flex flex-col gap-4 px-2">
              <p className="text-[56px] md:text-4xl">
                Subscribe Informasi Terkini!
              </p>
              <Button
                title="Avrist Life Insurance"
                customButtonClass="bg-purple_dark rounded-xl"
                customTextClass="text-white font-bold md:w-full"
              />
              <div className="flex flex-row gap-2 xs:max-md:flex-wrap md:flex-wrap">
                <Input
                  type="text"
                  placeholder="Masukkan email Anda"
                  customInputClass="w-[90%] xs:max-md:w-full md:w-full md:text-xs"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
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
    </div>
  );
};

export default Berita;
