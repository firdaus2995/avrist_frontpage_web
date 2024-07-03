'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link as LinkScroll } from 'react-scroll';
import Slider from 'react-slick';
import DewanPengawasDPLK from '../tabs/DewanPengawasDPLK';
import ManfaatDPLK from '../tabs/ManfaatDPLK';
import TentangAvristDPLK from '../tabs/TentangAvristDPLK';
import { ContentData } from '@/types/content.type';

type Props = {
  dewanpengawasdplkJudul: string;
  dewanpengawasdplkSubjudul: string;
  dewanpengawasdplkDeskripsi: string;
  pengawas: ContentData[];
  pengurus: ContentData[];
};
const tabs = [
  'Tentang DPLK Avrist',
  'Dewan Pengawas DPLK',
  'Manfaat DPLK',
  'Program DPLK',
  'Klaim dan Layanan'
];

const sliderTabSettings = {
  dots: false,
  infinite: false,
  arrows: false,
  centerMode: true,
  speed: 500,
  slidesToShow: 1.25,
  slidesToScroll: 1,
  centerPadding: '0px'
};

const DPLKContent = (props: Props) => {
  const {
    dewanpengawasdplkDeskripsi,
    dewanpengawasdplkJudul,
    dewanpengawasdplkSubjudul,
    pengawas,
    pengurus
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.get('tab');
  const [tab, setTab] = useState(
    searchParams.get('tab') ?? 'Tentang DPLK Avrist'
  );
  const sliderRef = useRef<Slider | null>(null);

  const handleTabClick = (tabs: string) => {
    setTab(tabs);
    if (tabs === 'Program DPLK') {
      router.push(`${pathname}/produk`);
    } else if (tabs === 'Klaim dan Layanan') {
      router.push(`${pathname}/klaim-layanan`);
    } else {
      router.push(pathname + '?' + createQueryString('tab', tabs), {
        scroll: false
      });
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const value = searchParams.get('tab');
    if (value !== null) {
      setTab(value);
    }
  }, [searchParams]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((button) => button === tab);
    if (sliderRef.current && activeIndex !== -1) {
      sliderRef.current.slickGoTo(activeIndex);
    }
  }, [tab, tabs]);

  useEffect(() => {
    if (params === 'Manfaat DPLK') {
      window.scrollTo({
        top: window.innerWidth > 480 ? 2900 : 2200,
        behavior: 'smooth'
      });
    } else if (params === 'Dewan Pengawas DPLK') {
      window.scrollTo({
        top: window.innerWidth > 480 ? 1400 : 1450,
        behavior: 'smooth'
      });
    } else if (params === 'Tentang DPLK Avrist') {
      window.scrollTo({
        top: window.innerWidth > 480 ? 900 : 450,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [params, window.scrollY]);

  return (
    <div className="flex flex-col justify-center xs:px-[2rem] md:px-[8.5rem] my-[3.125rem] sm:mt-[5rem] sm:mb-[4rem] gap-[3.125rem] sm:gap-[5rem]">
      <div className="flex-row w-full justify-between gap-[0.75rem] items-stretch xs:hidden md:flex">
        {tabs.map((val, idx) => (
          <LinkScroll
            key={idx}
            to={'#' + val.replace(/\s+/g, '')}
            spy={true}
            smooth={true}
            offset={-12.5}
            duration={500}
            onClick={() => handleTabClick(val)}
            className={`flex justify-center items-center w-full min-h-full border-1 rounded-lg px-[1.25rem] py-[0.5rem] cursor-pointer text-center align-middle border-dplk_yellow hover:bg-dplk_yellow hover:text-white ${tab === val ? 'bg-dplk_yellow text-white' : 'text-dplk_yellow'} font-semibold`}
          >
            <span className="font-semibold text-[1rem]">{val}</span>
          </LinkScroll>
        ))}
      </div>
      {/* Tab Mobile */}
      <div className="w-full z-20 top-8 md:hidden">
        <div>
          <Slider
            {...sliderTabSettings}
            ref={(slider) => {
              sliderRef.current = slider;
            }}
          >
            {tabs.map((val, idx) => (
              <div className="px-[3.5px]" key={idx}>
                <LinkScroll
                  to={'#' + val.replace(/\s+/g, '')}
                  spy={true}
                  smooth={true}
                  offset={-12.5}
                  duration={500}
                  onClick={() => handleTabClick(val)}
                  className={`flex justify-center items-center w-full min-h-full border-1 rounded-lg px-[1.25rem] py-[0.5rem] cursor-pointer text-center align-middle border-dplk_yellow hover:bg-dplk_yellow hover:text-white ${tab === val ? 'bg-dplk_yellow text-white' : 'text-dplk_yellow'} font-semibold`}
                >
                  <span className="font-semibold text-[1rem]">{val}</span>
                </LinkScroll>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {tab === 'Tentang DPLK Avrist' && (
        <TentangAvristDPLK
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          pengawas={pengawas}
          pengurus={pengurus}
        />
      )}
      {tab === 'Dewan Pengawas DPLK' && (
        <DewanPengawasDPLK
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          pengawas={pengawas}
          pengurus={pengurus}
        />
      )}
      {tab === 'Manfaat DPLK' && (
        <ManfaatDPLK
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          pengawas={pengawas}
          pengurus={pengurus}
        />
      )}
    </div>
  );
};

export default DPLKContent;
