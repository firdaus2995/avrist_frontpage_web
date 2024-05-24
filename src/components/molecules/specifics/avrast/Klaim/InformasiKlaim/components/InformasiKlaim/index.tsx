'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
    btnText: 'Panduan Layanan Nasabah'
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

const InfoKlaimTab = () => {
  const router = useRouter();
  const [isShowModalPelayanan, setShowModalPelayanan] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const [isShowPanduanLayananModal, setIsShowPanduanLayananModal] =
    useState(false);
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
      'Panduan Layanan Nasabah': () => {
        setShowModalPelayanan(true);
      },
      'Cek Di Sini': () => {
        setIsShowPanduanLayananModal(true);
      },
      'Lihat Di Sini': () => {
        router.push('https://my.avrist.com/welcome');
      },
      'Lebih Lengkap': () => {
        downloadFile('/pdf/prosedur-singkat-pelayanan-nasabah-avrist_updated.pdf');
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

  const downloadFile = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="flex flex-col self-stretch items-center justify-center gap-[4rem]">
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          <h2 className="md:text-[3.5rem] xs:text-[2.25rem] font-medium text-purple_dark">
            Komitmen Kami menangani klaim Anda
          </h2>
          <h2 className="md:text-[2.25rem] xs:text-[1.5rem]">
            Kami memberikan pelayanan dengan{' '}
            <span className="font-bold">efisien.</span>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-[1.25rem] xs:hidden md:grid">
          {data.map((val, idx) => (
            <div
              key={idx}
              className="max-w-sm flex flex-col items-center justify-between pt-[1.5rem] px-[1.5rem] pb-[2.25rem] bg-white border border-gray-200 rounded-[0.75rem] shadow dark:bg-gray-800 dark:border-gray-700 border-b-8 border-b-purple_dark"
            >
              <Image src={val.icon} alt={val.title} width={100} height={100} />
              <div className="flex flex-col items-center justify-between gap-2">
                <h5 className="mb-2 md:text-[2rem] xs:text-[1.25rem] font-bold tracking-tight text-gray-900 dark:text-white mt-5 text-center">
                  {val.title}
                </h5>
              </div>
              <p className="mb-3 font-normal md:text-[1rem] xs:text-[0.75rem] text-gray-500 dark:text-gray-400 line-clamp-3 text-center">
                {val.desc}
              </p>
              <div
                role="button"
                onClick={() => handleClickPelayananButton(val.btnText)}
                className="w-[80%] p-2 bg-purple_dark mx-10 flex items-center justify-center text-white font-medium rounded-xl"
              >
                {val.btnText}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 md:hidden gap-4">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...sliderSettings}
          >
            {data.map((val, idx) => (
              <div
                key={idx}
                className="w-full h-[25rem] flex flex-col items-center justify-between"
              >
                <div
                  key={idx}
                  className="w-[95%] h-[21.375rem] flex flex-col items-center px-[1.5rem] pt-[1.5rem] pb-[2.25rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-b-8 border-b-purple_dark"
                >
                  <div className="flex w-full items-center justify-center">
                    <Image
                      src={val.icon}
                      alt={val.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between gap-2 grow">
                    <div className="flex flex-col">
                      <h5 className="mb-2 text-[1.25rem] font-bold tracking-tight text-gray-900 dark:text-white mt-5 text-center">
                        {val.title}
                      </h5>
                      <p className="mb-3 font-normal text-[0.75rem] text-gray-500 dark:text-gray-400 line-clamp-3 text-center">
                        {val.desc}
                      </p>
                    </div>
                    <div
                      role="button"
                      className="px-[1.25rem] py-[0.5rem] bg-purple_dark flex items-center justify-center text-white font-medium rounded-xl text-center"
                      onClick={() => handleClickPelayananButton(val.btnText)}
                    >
                      {val.btnText}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex flex-row justify-between mx-5">
            <Image
              alt="prev"
              src={ARROW_LEFT}
              role="button"
              onClick={previous}
            />
            <Image alt="next" src={ARROW_RIGHT} role="button" onClick={next} />
          </div>
        </div>
        <StandarPelayananModal
          show={isShowModalPelayanan}
          onClose={() => setShowModalPelayanan(false)}
        />
      </div>
      <PanduanLayananModal
        isShowPanduanLayananModal={isShowPanduanLayananModal}
        handleCloseModal={() => setIsShowPanduanLayananModal(false)}
      />
    </div>
  );
};

export default InfoKlaimTab;
