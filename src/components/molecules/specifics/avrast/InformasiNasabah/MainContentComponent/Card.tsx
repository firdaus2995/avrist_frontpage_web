'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';

const mockData = [
  {
    id: '1',
    title: 'Kelola Polis',
    desc: 'Perkembangan informasi dan keputusan secara jelas, efektif dan transparansi.',
    icon: 'https://s3-alpha-sig.figma.com/img/5260/ea4a/914dbb2af0d279a74a31a3804a4cf91a?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lqtdbFUnX4ckY9ZX8zeWE6sy6iyeXAYpM8DH3B2PPwYHyHSsHAMpzY3EWvRlsBPHKpISeqmNbj2YYQ0xSBLYyHxPUQmMo5cKPpJO05YU9d50sh3tInedgfll3lXw6SshJAVameHQd4H4ptiZaCCg9QVM02bsl-GbpHiIDoaILylMIdRvdWqZYeygDm79aW6OuKmJKFxAt05iqliDYExw7Y~1elgRs6se0T5Nsr6EPjrJ~0VMZibnTEo5LMVRUdSw7zePSDVYaZxyBI622Zbfh9vEIR2QjOcRCoqN3aZe2AYYg8ttBiqOOmjVQlRhvGwuShtfY6pqmaMbIXOQeajS~A__',
    btn: 'Lihat Panduan',
    link: 'layanan/kelola-polis'
  },
  {
    id: '2',
    title: 'Penanganan Pengaduan',
    desc: 'Kami menghargai dan mendengarkan saran dan keluhan dari nasabah Kami.',
    icon: 'https://s3-alpha-sig.figma.com/img/d3a2/23f9/e3d93fda903b61ac51e663c5a8f4db71?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HjMZbWMx0tqoNGQ-jEnnhJq-0YYpQ6wLODxqJ7w6dssdoo5gmauXs~Eqvkqc90QpRxsH594am6Bua0jkctEA13Ew9vKRH9vLprA4baxh8~-1uPb-q0S8T4duo~Qs~d3DgnklN1Wa6WYsvs0rVVqJeAPW4VPXM1sbAZCw-7Wt15tV8UKxHx2MaPUFM-OV1Lr3eIPxVmeoRInj~QAF7giyrKKCh9GagJfK7QIxx3~mQ-ULxnzABW0V-t5QRRqe2TuNsc30jHknTfa7zAaaHDz8pTSaOoLlBFpnrK6KEujVGGk-1DOCMymA8uyGJONhDkdCg1LOhhalJeyNpIGr0PRxFA__',
    btn: 'Lihat Prosedur',
    link: ''
  },
  {
    id: '3',
    title: 'Agen Aktif',
    desc: 'Temukan agen asuransi dan dapatkan layanan asuransi sesuai kebutuhan Anda',
    icon: 'https://s3-alpha-sig.figma.com/img/2d19/93f8/cad8af77a2490ca0844f0cfc3936ae82?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d-Ao3hxpG-YwbtK5slxlWAF0OmvlobRA3E0TAcfdFr8VkDUZ~ZIA-CQOueM2GWxIGKbRFXEQ4a~RIMbvRjEKjMHLmMMKnMtnSjHXRoJ0psjoPw0zd4pJZVa79pkg~63f~YpFuXDQd27S66V9LNQEahHKTLPeo38TfmJn4~VC5nLS8Lfw0gvvzBHyo0yCBVINqGV3xc~Vd09YGoDPMu934KIE3kojuOE7YGlkSSSlhlRW9O8w5uKqwNnW~3owCx8ZnBYymxHoWIZh4kFtS1GXwlcEK7JDBKj-EqXeKmaLgo179gRhpUjwrN0y4RQlZ~f3JRUVXnBQAlyn4z~Ph0Ki8w__',
    btn: 'Lihat Agen',
    link: ''
  }
];

export const ContentCard = () => {
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
    dots: false,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="flex flex-col self-stretch items-center justify-center mt-[64px]">
      <div className="grid grid-cols-3 gap-5 xs:hidden md:grid">
        {mockData.map((i) => (
          <div
            key={i.id}
            className="max-w-sm flex flex-col items-center justify-center p-6 cursor-pointer border-[1px] border-gray_light rounded-xl"
          >
            <img src={i.icon} alt={i.title} className="w-20" />
            <div className="flex flex-col items-center justify-center gap-2">
              <h5 className="mb-2 md:text-[24px] xs:text-[20px] tracking-tight font-bold font-karla text-[32px] text-gray_body mt-5 text-center">
                {i.title}
              </h5>
              <p className="mb-3 md:text-[16px] xs:text-[12px] line-clamp-3 text-center font-opensans font-normal text-[16px] text-gray_body">
                {i.desc}
              </p>
              <Link href={i.link}>
                <div
                  role="button"
                  className="w-[80%] p-2 bg-purple_dark mx-10 flex items-center justify-center text-white font-medium rounded-xl"
                >
                  {i.btn}
                </div>
              </Link>
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
          {mockData.map((i) => (
            <div
              key={i.id}
              className="max-w-sm flex flex-col items-center justify-center p-6 cursor-pointer border-[1px] border-gray_light rounded-xl"
            >
              <div className="flex w-full items-center justify-center">
                <img src={i.icon} alt={i.title} className="w-20" />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h5 className="mb-2 text-[20px] font-bold tracking-tight text-gray-900 dark:text-white mt-5 text-center">
                  {i.title}
                </h5>
                <p className="mb-3 font-normal text-[12px] text-gray-500 dark:text-gray-400 line-clamp-3 text-center">
                  {i.desc}
                </p>
                <div
                  role="button"
                  className="w-[80%] p-3 bg-purple_dark mx-10 flex items-center justify-center text-white font-medium rounded-xl text-xs text-center"
                >
                  {i.btn}
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex flex-row justify-between mx-5">
          <Image alt="prev" src={ARROW_LEFT} role="button" onClick={previous} />
          <Image alt="next" src={ARROW_RIGHT} role="button" onClick={next} />
        </div>
      </div>
    </div>
  );
};
