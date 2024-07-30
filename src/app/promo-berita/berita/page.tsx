'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
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
import NotFound from '@/components/atoms/NotFound';
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
import { htmlParser, isContentNotEmpty, mergeAllData } from '@/utils/helpers';
import {
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';
import useMobileDetector from '@/utils/useMobileDetector';
import { validateEmail } from '@/utils/validation';

const Berita: React.FC<ParamsProps> = () => {
  const sliderRef = useRef<Slider | null>(null);
  const sliderTabRef = useRef<Slider | null>(null);
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
          bottom: -40,
          zIndex: -10
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    )
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
  const [sliderData, setSliderData] = useState<any>([]);
  const [contentData, setContentData] = useState<any>([]);
  const [dataSliderTestimonial, setDataSliderTestimonial] = useState<any>([]);
  const [visibleSubscribeModal, setVisibleSubscribeModal] =
    useState<boolean>(false);
  const [isValidEmailContent, setIsValidEmailContent] =
    useState<boolean>(false);
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
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const isMobileWidth = useMobileDetector();

  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!contentData?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(contentData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(contentData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, contentData]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % contentData.length;
    setItemOffset(newOffset);
    if (params.category === 'Avrist Life Guide') {
      window.scrollTo({ top: !isMobileWidth ? 1800 : 4000 });
    }
  };

  const [data, setData] = useState<any>({
    slug: '',
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });

  const tabs = ['Avrist Terkini', 'Testimonial', 'Kumpulan Berita Pers'];

  useEffect(() => {
    if (searchParams) {
      const value = searchParams.get('tab');
      const categories = searchParams.get('category');

      if (value !== null) {
        setTab(value);
        const index = tabs.findIndex((a, b) => {
          if (a === tab) {
            return b;
          }
        });
        if (sliderTabRef.current) {
          sliderTabRef.current.slickGoTo(index ?? 0);
        }
      }

      if (categories !== null) {
        setParams({ ...params, category: categories });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    pageSlug();
    if (tab === 'Avrist Terkini') {
      switch (params.category) {
        case 'Avrist Life Guide':
          fetchLifeGuide();
          break;
        case 'AvriStory':
          fetchAvriStory();
          setItemsPerPage(5);
          break;
        default:
          fetchContent();
          setItemsPerPage(6);
      }
      // params.category === 'Avrist Life Guide'
      //   ? fetchLifeGuide()
      //   : params.category === 'AvriStory'
      //     ? fetchAvriStory()
      //     : fetchContent();
    }

    if (tab === 'Kumpulan Berita Pers') {
      fetchBeritaPers();
      setItemsPerPage(5);
    }

    if (tab === 'Testimonial') {
      fetchTestimoni();
      setItemsPerPage(3);
    }
  }, [params, lifeGuideCategory.selectedCategory, tab]);

  useEffect(() => {
    if (data.slug) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    setSearch('');
    setParams({ ...params, searchFilter: '' });
  }, [params.category]);

  useEffect(() => {
    setParams({
      category: searchParams.get('category') ?? '',
      yearFilter: '',
      monthFilter: '',
      searchFilter: ''
    });
  }, [tab, searchParams]);

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
      const sorted = mergedData.sort(
        //@ts-ignore
        (a: any, b: any) => new Date(b?.createdAt) - new Date(a?.createdAt)
      );
      const transformedData = sorted?.map((item: any) => {
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
        const tags =
          !!content['tags']?.value || content['tags']?.value !== '-'
            ? content['tags']?.value.split(',')
            : content['tags']?.value;
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
      if (transformedData.length <= 0) {
        window.scrollTo({ top: !isMobileWidth ? 700 : 850 });
      }

      if (!transformedData) {
        setContentData([]);
      } else {
        if (sliderData?.length > 0) {
          setContentData(getDifference(transformedData, sliderData));
        } else {
          setSliderData(transformedData.slice(0, 5));
          setContentData(transformedData.slice(5));
        }
      }
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
          selectedCategory:
            categoryList[0] ?? lifeGuideCategory.selectedCategory
        });
        const temp: any = [];
        categoryList.map((el: any) => {
          data[el]?.map((item: any) => {
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
            const deskripsi = item?.shortDesc;
            const image = singleImageTransformer(
              content['artikel-thumbnail']
            ).imageUrl;
            const id = item.id;
            const tags =
              !!content['tags']?.value || content['tags']?.value !== '-'
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
            });

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
          });
        });
        if (!temp) {
          setContentData([]);
        } else {
          if (sliderData?.length > 0) {
            setContentData(getDifference(temp, sliderData));
          } else {
            setSliderData(temp.slice(0, 4));
            setContentData(temp.slice(4));
          }
        }
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
            const deskripsi = item?.shortDesc;
            const image = singleImageTransformer(
              content['artikel-thumbnail']
            ).imageUrl;
            const id = item.id;
            const tags =
              !!content['tags']?.value || content['tags']?.value !== '-'
                ? content['tags']?.value.split(',')
                : content['tags']?.value;
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
        if (!transformedData) {
          setContentData([]);
        } else {
          if (sliderData?.length > 0) {
            setContentData(getDifference(transformedData, sliderData));
          } else {
            setSliderData(transformedData.slice(0, 4));
            setContentData(transformedData.slice(4));
          }
        }
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

        const isExpanded = false; // toggle expand/collapse external link on Siaran Berita Pers

        return { judul, newLink, arr, isExpanded };
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
        let deskripsi = content['deskripsi-singkat-testimoni'].value;
        const penulis = content['penulis-testimoni'].value;
        const titlePenulis = content['title-penulis-testimoni'].value;
        const videoUrl = content['video-testimoni'].value;
        const id = item.id;

        const checkNull = />-</;
        if (checkNull.test(deskripsi)) {
          deskripsi = '-';
        }

        return { id, judul, deskripsi, penulis, titlePenulis, videoUrl };
      });
      if (!transformedData) {
        setContentData([]);
        setPaginatedData([]);
      } else {
        if (dataSliderTestimonial?.length > 0) {
          setContentData(getDifference(transformedData, dataSliderTestimonial));
          setPaginatedData(
            getDifference(transformedData, dataSliderTestimonial)
          );
        } else {
          setDataSliderTestimonial(transformedData.slice(0, 5));
          setContentData(transformedData.slice(5));
          setPaginatedData(transformedData.slice(5));
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

  const handleTabClick = (tabs: string) => {
    setContentData([]);
    setPaginatedData([]);
    setSliderData([]);
    setTab(tabs);
    router.push(pathname + '?' + createQueryString('tab', tabs), {
      scroll: false
    });
  };

  const handleSubscribeButton = async () => {
    const isEmail = validateEmail(email);
    if (!isEmail) return setIsValidEmailContent(true);
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

  const onCategoryChange = (value: string) => {
    setPaginatedData([]);
    setContentData([]);
    setSliderData([]);
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

  const toggleExpandedLink = useCallback(
    (index: number) => {
      const newData = paginatedData.map((el, idx) => {
        if (idx == index) return { ...el, isExpanded: !el.isExpanded };
        return el;
      });
      const foundedItem = paginatedData.find((_, idx) => idx === index);
      if (foundedItem) foundedItem.isExpanded = !foundedItem.isExpanded;

      setPaginatedData(newData);
    },
    [paginatedData]
  );

  const renderPage = () => {
    return (
      <div className="flex flex-col gap-4 md:flex-row items-start justify-between font-opensans">
        <div>
          <p className="text-[20px]/[28px] font-normal">
            Menampilkan{' '}
            <span className="font-bold text-purple_dark">
              {contentData?.length === 0 || contentData === undefined
                ? 0
                : itemOffset + 1}
              -
              {Math.min(
                (itemOffset + 1) * itemsPerPage,
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
        {contentData?.length > 0 && (
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
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
    <div className="flex flex-col items-center justify-center relative">
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
        // customClassName={`${tab === 'Avrist Terkini' && params.category === 'AvriStory' && 'sm:!max-h-[26.25rem]'}`}
      />
      {/* Tab Desktop */}
      <div
        className={`${tab === 'Avrist Terkini' && params.category === 'AvriStory' ? 'md:-mt-[6rem] xs:hidden md:block' : '-mt-[7rem] xs:hidden md:block rounded-t-[60px]'} bg-white w-full min-h-[100px] z-10`}
      ></div>
      <div className="w-full z-20 xs:hidden md:block rounded-t-lg">
        <div className="grid grid-cols-3 gap-[12px] px-[136px] bg-white">
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
      <div
        className={`${tab === 'Avrist Terkini' && params.category === 'AvriStory' ? 'xs:-mt-10 sm:-mt-[23rem]' : 'xs:-mt-[3rem] sm:-mt-[2rem]'} rounded-t-[60px] bg-white w-full min-h-[100px] bg-white z-10 w-[90%] z-20 md:hidden`}
      >
        <div className="pt-[100px]">
          <Slider
            ref={(slider) => {
              sliderTabRef.current = slider;
              sliderTabRef.current?.slickGoTo(
                tabs.findIndex((a, b) => {
                  if (a === tab) {
                    return b;
                  } else {
                    return 0;
                  }
                })
              );
            }}
            {...sliderTabSettings}
          >
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
        <div className="w-full flex flex-col items-center justify-center px-[136px] text-center xs:px-0 mt-2">
          <div className="px-[2rem] md:px-[8.5rem] py-[5rem]">
            <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
              {params.category === 'Berita dan Kegiatan' &&
                'Berita dan Kegiatan Avrist Life Insurance'}
              {params.category === 'AvriStory' && (
                <>
                  <span className="font-black">AvriStory:</span> E-Bulletin
                  hadir setiap 3 bulan sekali
                </>
              )}
              {params.category === 'Avrist Life Guide' && 'Avrist Life Guide'}
            </p>
            <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
              {params.category === 'Berita dan Kegiatan' &&
                'Informasi terkini dari siaran pers hingga aktivitas sosial.'}
              {params.category === 'AvriStory' && (
                <>
                  Informasi terbaru mengenai{' '}
                  <span className="font-black">Avrist Life Insurance</span>
                </>
              )}
              {params.category === 'Avrist Life Guide' && (
                <>
                  Kumpulan artikel mengenai{' '}
                  <span className="font-bold text-purple_dark">asuransi</span>{' '}
                  dan{' '}
                  <span className="font-bold text-purple_dark">
                    gaya hidup.
                  </span>
                </>
              )}
            </p>
          </div>

          {params.category === 'Berita dan Kegiatan' && (
            <div className="w-full pb-[80px] px-[2rem] md:px-[8.5rem]">
              <div className="w-full">
                <Slider
                  ref={(slider) => {
                    sliderRef.current = slider;
                  }}
                  {...sliderSettings}
                  infinite={true}
                >
                  {sliderData?.slice(0, 5)?.map((item: any, index: number) => (
                    <SliderInformation
                      key={index}
                      bgColor="purple_superlight"
                      title={
                        <div className="flex flex-col gap-6 text-left w-full">
                          <p className="text-[14px]/[19.6px]">
                            <span className="font-bold text-purple_dark text-sm">
                              {htmlParser(item.artikelTopic)}
                            </span>{' '}
                            | {`${item.date} ${item.waktu}`}
                          </p>
                          <div className="flex flex-col gap-3">
                            {isContentNotEmpty(item.judul) && (
                              <p
                                className="font-karla text-[28px] md:text-[36px]/[43.2px] xs:max-sm:text-[24px] font-bold line-clamp-3 break-word -tracking-[1.08px]"
                                dangerouslySetInnerHTML={{
                                  __html: item.judul
                                }}
                              />
                            )}
                            {item &&
                              item?.deskripsi?.length > 0 &&
                              isContentNotEmpty(
                                item.deskripsi[0]?.value ?? '-'
                              ) && (
                                <p
                                  className="text-[16px] line-clamp-2"
                                  dangerouslySetInnerHTML={{
                                    __html: item.deskripsi
                                      ? item.deskripsi[0]?.value?.substring(
                                          0,
                                          250
                                        ) + '...'
                                      : '-'
                                  }}
                                />
                              )}
                          </div>

                          <div className="flex flex-row flex-wrap gap-[8px]">
                            {item?.tags?.length > 0 &&
                              item.tags.map((tag: any, idx: number) => (
                                <MediumTag key={idx} title={tag} />
                              ))}
                          </div>
                          <div className="grow flex items-end">
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
                        </div>
                      }
                      image={item.image}
                      imageClassName="rounded-r-2xl"
                      rounded={12}
                    />
                  ))}
                </Slider>
              </div>
              <div className="flex flex-row justify-between w-full pt-[16px]">
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
          <div className="w-full flex flex-col items-center justify-center pb-2 text-center mt-34">
            <CategoryWithThreeCards
              defaultSelectedCategory={params.category}
              onCategoryChange={(tab) => {
                setItemOffset(0);
                onCategoryChange(tab);
              }}
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
                  options: yearDropdown(new Date().getFullYear() - 10)
                },
                {
                  type: 'dropdown',
                  label: 'Bulan',
                  options: monthDropdown()
                }
              ]}
              hidePagination
              searchPlaceholder={`${params.category !== 'AvriStory' ? 'Cari berita/kegiatan' : 'Cari E-Bulletin'}`}
              searchValue={search}
              onSearchChange={(e) => {
                setSearch(e.target.value);
              }}
              onSearch={() => {
                setParams({ ...params, searchFilter: search });
              }}
              customContent={
                <>
                  {params.category === 'Berita dan Kegiatan' ? (
                    contentData?.length > 0 ? (
                      <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-[24px] xs:max-sm:grid-cols-1 sm:max-md:grid-cols-2 ">
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
                              imageStyle="min-h-[190px] object-fill"
                              lineClamp={3}
                            />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <NotFound />
                    )
                  ) : params.category === 'AvriStory' ? (
                    <div className="grid lg:grid-cols-1 gap-[24px] w-full">
                      {contentData?.length > 0 ? (
                        paginatedData?.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="w-full flex flex-col gap-6 md:gap-0 md:flex-row flex-wrap justify-between items-start md:items-center p-[24px] border rounded-xl xm:text-left"
                          >
                            {isContentNotEmpty(item.namaFile) && (
                              <>
                                <div className="flex flex-row gap-2 items-center">
                                  <p className="font-bold text-xl sm:text-2xl break-words">
                                    {item.namaFile}
                                  </p>
                                  <MediumTag title="PDF" />
                                </div>
                                <Button
                                  title="Unduh"
                                  customButtonClass="font-opensans rounded-xl bg-purple_dark xs:max-lg:min-w-full xs:max-lg:mt-3 lg:mt-0"
                                  customTextClass="text-white text-[16px]"
                                  onClick={() =>
                                    window.open(item.file, '_blank')
                                  }
                                />
                              </>
                            )}
                          </div>
                        ))
                      ) : (
                        <NotFound />
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-[24px]">
                      {contentData?.length > 0 ? (
                        paginatedData?.map((item: any, index: number) => (
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
                              tags={
                                typeof item.tags === 'string'
                                  ? item.tags.split(',')
                                  : item.tags
                              }
                              image={item.image}
                            />
                          </Link>
                        ))
                      ) : (
                        <NotFound />
                      )}
                    </div>
                  )}

                  {renderPage()}
                </>
              }
              customLeftContent={
                params.category === 'Avrist Life Guide' ? (
                  <div className="flex flex-col gap-4 mt-5 h-auto">
                    <div className="border rounded-xl px-[24px] flex flex-col text-left grow">
                      <div className="b-2 border-b pt-[36px] pb-[24px]">
                        <p className="font-karla font-bold text-[24px]/[28.8px] -tracking-[0.72px]">
                          Kategori Artikel
                        </p>
                      </div>
                      <div className="flex flex-col pt-[24px] pb-[36px] gap-4">
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
                              <p className="font-opensans text-purple_dark font-bold cursor-pointer text-left text-[20px]/[24px]">
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
                    <div className="border rounded-xl px-[24px] py-[36px] flex flex-col gap-[24px] text-left bg-gray_spacerlight border-gray_bglightgray shadow-small">
                      <div className="font-karla">
                        <p className="font-bold text-[36px]/[43.2px] text-purple_dark -tracking-[1.08px]">
                          Subscribe!
                        </p>
                        <p className="text-[24px]/[24px] font-light -tracking-[0.72px]">
                          Informasi terkini mengenai Avrist Life Insurance
                        </p>
                      </div>
                      <Input
                        customInputClass="custom-input"
                        placeholder="Masukkan email Anda"
                        value={email}
                        onChange={(e) => {
                          setIsValidEmailContent(false);
                          setEmail(e.target.value);
                        }}
                        onKeyDown={(e: any) => {
                          if (e.key === 'Enter' || e.keyCode === 13) {
                            handleSubscribeButton();
                          }
                        }}
                      />
                      {isValidEmailContent && (
                        <p className="text-[10px] text-[red] -my-2">
                          Masukkan alamat email yang benar!
                        </p>
                      )}
                      <Button
                        title="Subscribe"
                        customButtonClass="bg-purple_dark rounded-xl"
                        customTextClass="text-white font-semibold text-base"
                        onClick={handleSubscribeButton}
                      />
                    </div>
                    <div className="border rounded-xl py-9 px-6 flex flex-col gap-[24px] text-left">
                      <p className="font-karla font-bold text-[24px]/[28.8px] -tracking-[-0.72px]">
                        Ikuti Kami
                      </p>
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
                    <p className="font-karla font-bold pb-2 text-left text-[36px]/[43.2px] -tracking-[1.08]">
                      Terbaru
                    </p>
                    <div className="grid lg:grid-cols-2 gap-[24px] md:grid-cols-1 rounded-xl">
                      {sliderData.map((item: any, index: number) => (
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
                            tags={
                              typeof item.tags === 'string'
                                ? item.tags.split(',')
                                : item.tags
                            }
                            image={item.image}
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
              outerClass="sm:!py-[0px] px-[2rem] md:px-[8.5rem]"
            />
          </div>
        </div>
      )}

      {tab === 'Testimonial' && (
        <div className="w-full flex flex-col items-center justify-center px-[136px] text-center xs:px-0 mt-2">
          <div className="px-[2rem] md:px-[8.5rem] py-[5rem]">
            <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
              Dari Anda untuk Kami
            </p>
            <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
              Inilah Cerita Pengalaman Nasabah Avrist Assurance bersama Kami
            </p>
          </div>

          <div className="w-full pb-[80px] px-[2rem] md:px-[8.5rem]">
            <div className="w-full">
              <Slider
                ref={(slider) => {
                  sliderRef.current = slider;
                  sliderRef.current?.slickGoTo(0);
                }}
                {...sliderSettings}
                infinite={true}
              >
                {dataSliderTestimonial
                  ?.slice(0, 5)
                  .map((item: any, index: number) => {
                    return (
                      <SliderInformation
                        key={index}
                        isVideo
                        imageClassName="max-h-[360px] object-fill"
                        bgColor="purple_superlight"
                        title={
                          <div className="flex flex-col gap-6 text-left">
                            <div className="flex flex-col gap-3">
                              <p className="font-karla text-[28px] md:text-[36px]/[43.2px] xs:max-sm:text-[24px] font-bold line-clamp-3 break-word -tracking-[1.08px]">
                                {htmlParser(item.judul)}
                              </p>
                              {item.deskripsi !== '-' && (
                                <p className="line-clamp-4 font-opensans text-[16px]">
                                  {htmlParser(item.deskripsi)}
                                </p>
                              )}
                            </div>
                            <p className="text-[14px]">
                              <span className="font-bold text-purple_dark">
                                {item.penulis}
                              </span>{' '}
                              | {item.titlePenulis}
                            </p>
                          </div>
                        }
                        image={item.videoUrl}
                        customClass="py-[0px]"
                        customMobileClass="grow-0"
                        rounded={12}
                      />
                    );
                  })}
              </Slider>
              <div className="flex flex-row justify-between w-full pt-[16px]">
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
                  options: yearDropdown(new Date().getFullYear() - 10)
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
                  {paginatedData?.length <= 0 ? (
                    <NotFound />
                  ) : (
                    <div className="grid lg:grid-cols-3 gap-[24px] xs:grid-cols-1 md:grid-cols-2">
                      {paginatedData?.map((item: any, index: number) => (
                        <CardCategoryC
                          key={index}
                          summary={htmlParser(item.judul)}
                          name={item.penulis}
                          position={item.titlePenulis}
                          isVideo
                          image={item.videoUrl}
                          className=""
                        />
                      ))}
                    </div>
                  )}

                  {renderPage()}
                </>
              }
              outerClass="px-[2rem] md:px-[8.5rem]"
            />
          </div>
        </div>
      )}

      {tab === 'Kumpulan Berita Pers' && (
        <div className="w-full flex flex-col items-center justify-center px-[136px] text-center xs:px-0 mt-2">
          <div className="px-[2rem] md:px-[8.5rem] py-[5rem]">
            <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
              Kumpulan Berita Pers
            </p>
            <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
              Temukan siaran pers Avrist di sini!
            </p>
          </div>

          <div className="w-full flex flex-col items-center justify-center pb-2 text-center">
            <CategoryWithThreeCards
              defaultSelectedCategory={params.category}
              filterRowLayout={true}
              searchPlaceholder="Cari Berita/Kegiatan"
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
                  options: yearDropdown(new Date().getFullYear() - 10)
                },
                {
                  type: 'dropdown',
                  label: 'Bulan',
                  options: monthDropdown()
                }
              ]}
              customContent={
                <>
                  {contentData?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 w-full">
                      {paginatedData?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="w-full p-6 border rounded-xl flex flex-col gap-3"
                        >
                          {isContentNotEmpty(item.judul) && (
                            <p
                              className="text-2xl font-bold font-['Source Sans Pro'] text-left mb-1"
                              dangerouslySetInnerHTML={{
                                __html: item.judul
                              }}
                            />
                          )}
                          {Array.isArray(item.arr) && item.arr.length > 0 && (
                            <div className="font-opensans text-sm font-semibold flex gap-4 flex-wrap">
                              <>
                                {item.arr.length > 5 ? (
                                  <>
                                    {item.isExpanded
                                      ? item.arr
                                      : item.arr.slice(0, 5)}
                                    <button
                                      className="text-purple_dark cursor-pointer"
                                      onClick={() => toggleExpandedLink(index)}
                                    >
                                      {item.isExpanded ? 'Tutup ' : 'Lihat '}{' '}
                                      link lainnya
                                    </button>
                                  </>
                                ) : (
                                  item.arr
                                )}
                              </>
                            </div>
                          )}
                        </div>
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
      )}

      <div className="w-full flex flex-col mt-2">
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

export default dynamic(() => Promise.resolve(Berita), {
  ssr: false
});
