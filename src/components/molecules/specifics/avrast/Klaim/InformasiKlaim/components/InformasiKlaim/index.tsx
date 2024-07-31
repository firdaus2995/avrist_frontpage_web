'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import { PanduanLayananModal } from '../../../../Modal';
import { StandarPelayananModal } from '../../../../Modal';
import BantuanIcon from '@/assets/images/avrast/component/informasi-klaim/bantuan.svg';
import KelolaPolisIcon from '@/assets/images/avrast/component/informasi-klaim/kelola-polis.svg';
import KetepatanWaktuIcon from '@/assets/images/avrast/component/informasi-klaim/ketepatan-waktu.svg';
import PelayananKlaimIcon from '@/assets/images/avrast/component/informasi-klaim/pelayanan-klaim.svg';
import PengajuanKlaimIcon from '@/assets/images/avrast/component/informasi-klaim/pengajuan-klaim.svg';
import RsRekananIcon from '@/assets/images/avrast/component/informasi-klaim/rs-rekanan.svg';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';
// import { handleDownload } from '@/utils/helpers';

const data = [
  {
    title: 'Mekanisme Pelayanan Klaim',
    desc: 'Mekanisme singkat untuk klaim nasabah',
    icon: PelayananKlaimIcon,
    btnText: 'Cek Di Sini'
  },
  {
    title: 'Komitmen Pelayanan Klaim',
    desc: 'Komitmen kami untuk menjadikan semua proses klaim efisien',
    icon: KetepatanWaktuIcon,
    btnText: 'Standar Pelayanan'
  },
  {
    title: 'Lihat Polis',
    desc: 'Lihat detail polis yang Anda miliki di sini',
    icon: KelolaPolisIcon,
    btnText: 'Lihat Di Sini'
  },
  {
    title: 'Panduan Pengajuan Klaim',
    desc: 'Klaim mudah dan cepat merupakan komitmen kami',
    icon: PengajuanKlaimIcon,
    btnText: 'Lebih Lengkap'
  },
  {
    title: 'Rumah Sakit Rekanan',
    desc: 'Temukan Rumah Sakit rekanan terdekat',
    icon: RsRekananIcon,
    btnText: 'Cari Rumah Sakit'
  },
  {
    title: 'Butuh Bantuan',
    desc: 'Kami di sini siap membantu Anda',
    icon: BantuanIcon,
    btnText: 'Hubungi Kami'
  }
];

interface IInfoKlaimTab {
  file: string;
  popUpImage1: string;
  popUpImage2: string;
}

const InfoKlaimTab: React.FC<IInfoKlaimTab> = ({
  file,
  popUpImage1,
  popUpImage2
}) => {
  const router = useRouter();
  const [isShowModalPelayanan, setShowModalPelayanan] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const [isShowPanduanLayananModal, setIsShowPanduanLayananModal] =
    useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleClickPelayananButton = (text: string) => {
    const actionMap: { [key: string]: () => void } = {
      'Standar Pelayanan': () => {
        setShowModalPelayanan(true);
      },
      'Cek Di Sini': () => {
        setIsShowPanduanLayananModal(true);
      },
      'Lihat Di Sini': () => {
        router.push('https://my.avrist.com/welcome');
      },
      'Lebih Lengkap': () => {
        // handleDownload(file);
        window.open(file, '_blank');
      },
      'Cari Rumah Sakit': () => {
        router.push('/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan');
      },
      'Hubungi Kami': () => {
        router.push('/hubungi-kami');
      }
    };

    actionMap[text]();
  };

  // const downloadFile = (url: string) => {
  //   window.open(url, '_blank');
  // };

  return (
    <div>
      <div className="flex flex-col self-stretch items-center justify-center gap-[5rem] mt-[5rem]">
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          <h2 className="font-karla md:text-[3.5rem] xs:text-[2.25rem] font-extrabold text-purple_dark xs:-tracking-[1.44px] sm:-tracking-[2.56px] sm:leading-[67.2px] xs:leading-[43.2px]">
            Komitmen Kami menangani klaim Anda
          </h2>
          <h2 className="font-karla md:text-[2.25rem] xs:text-[1.5rem] sm:leading-[43.2px] xs:leading-[28.8px] -tracking-[1.08px] mt-[0.75rem]">
            Kami memberikan pelayanan dengan{' '}
            <span className="font-bold">efisien.</span>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-[1.5rem] xs:hidden md:grid">
          {data.map((val, idx) => (
            <div
              key={idx}
              className="max-w-sm flex flex-col gap-[24px] items-center justify-between pt-[1.5rem] px-[1.5rem] pb-[2.25rem] bg-white border border-gray-200 rounded-[0.75rem] shadow dark:bg-gray-800 dark:border-gray-700 border-b-8 border-b-purple_dark"
            >
              <div className="flex flex-col items-center justify-center gap-[24px]">
                <Image
                  src={val.icon}
                  alt={val.title}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-center justify-between gap-3">
                  <h5 className="font-karla md:text-[2rem] xs:text-[1.25rem] font-bold tracking-tight text-gray-900 dark:text-white text-center leading-[38.4px] -tracking-[0.096px]">
                    {val.title}
                  </h5>
                  <p className="font-normal md:text-[1rem] xs:text-[0.75rem] text-gray-500 dark:text-gray-400 line-clamp-3 text-center leading-[22.4px]">
                    {val.desc}
                  </p>
                </div>
              </div>
              {val.btnText === 'Lihat Di Sini' ? (
                <Link
                  href={'https://my.avrist.com/welcome'}
                  target="_blank"
                  className="py-[8px] px-[20px] bg-purple_dark hover:bg-purple_light flex items-center justify-center text-white font-semibold rounded-[6px] leading-[23.68px]"
                >
                  {val.btnText}
                </Link>
              ) : (
                <div
                  role="button"
                  onClick={() => handleClickPelayananButton(val.btnText)}
                  className="py-[8px] px-[20px] bg-purple_dark hover:bg-purple_light flex items-center justify-center text-white font-semibold rounded-[6px] leading-[23.68px]"
                >
                  {val.btnText}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 md:hidden gap-4">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            beforeChange={(_, next) => setCurrentSlide(next)}
            {...sliderSettings}
          >
            {data.map((val, idx) => (
              <div
                key={idx}
                className="w-full h-[25rem] flex flex-col items-center justify-between px-2"
              >
                <div
                  key={idx}
                  className="w-full h-[23rem] gap-6 flex flex-col items-center px-[1.5rem] pt-[1.5rem] pb-[2.25rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-b-8 border-b-purple_dark"
                >
                  <div className="flex w-full items-center justify-center">
                    <Image
                      src={val.icon}
                      alt={val.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between grow">
                    <h5 className="font-karla text-[2rem] font-bold -tracking-[0.03rem] leading-[38.4px] text-gray-900 dark:text-white text-center">
                      {val.title}
                    </h5>
                    <div className="flex flex-col gap-[24px]">
                      <p className="font-normal text-[0.75rem] text-gray-500 leading-[22.4px] dark:text-gray-400 line-clamp-3 text-center">
                        {val.desc}
                      </p>
                      <div
                        role="button"
                        className="px-[1.25rem] py-[0.5rem] bg-purple_dark flex items-center justify-center text-white font-semibold rounded-[6px] text-center leading-[23.68px]"
                        onClick={() => handleClickPelayananButton(val.btnText)}
                      >
                        {val.btnText}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex flex-row justify-between mx-5">
            <Image
              className={currentSlide === 0 ? 'opacity-50' : 'opacity-100'}
              alt="prev"
              src={ARROW_LEFT}
              role="button"
              onClick={previous}
            />
            <Image
              className={
                currentSlide === data.length - 1 ? 'opacity-50' : 'opacity-100'
              }
              alt="next"
              src={ARROW_RIGHT}
              role="button"
              onClick={next}
            />
          </div>
        </div>
        <StandarPelayananModal
          show={isShowModalPelayanan}
          onClose={() => setShowModalPelayanan(false)}
          popUpImage={popUpImage2}
        />
      </div>
      <PanduanLayananModal
        isShowPanduanLayananModal={isShowPanduanLayananModal}
        handleCloseModal={() => setIsShowPanduanLayananModal(false)}
        popUpImage={popUpImage1}
      />
    </div>
  );
};

export default InfoKlaimTab;
