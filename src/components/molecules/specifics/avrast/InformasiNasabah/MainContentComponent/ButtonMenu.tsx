'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import Button from '@/components/atoms/Button/Button';

const buttonList = [
  'Informasi Nasabah',
  'Rumah Sakit Rekanan',
  'Formulir & Buku Panduan',
  'Performa Investasi'
];
export const ButtonMenu = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = React.useState(buttonList[0]);

  const handleOnClickButton = (buttonText: string) => {
    setActiveButton(buttonText);

    const actionMap: { [key: string]: () => void } = {
      'Informasi Nasabah': () => {
        router.push('/klaim-layanan/layanan?tab=Informasi+Nasabah');
      },
      'Rumah Sakit Rekanan': () => {
        router.push('/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan');
      },
      'Formulir & Buku Panduan': () => {
        router.push('/klaim-layanan/layanan?tab=Formulir+%26+Buku+Panduan');
      },
      'Performa Investasi': () => {
        router.push('/klaim-layanan/layanan?tab=Performa+Investasi');
      }
    };

    actionMap[buttonText]();
  };

  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1
  };

  return (
    <>
      <div className="xs:hidden md:flex flex-row justify-between gap-4">
        {buttonList.map((i) => (
          <Button
            key={i}
            title={i}
            onClick={() => handleOnClickButton(i)}
            customButtonClass={`flex-1 ${activeButton === i ? 'bg-purple_dark' : ''}`}
            customTextClass={`${activeButton === i ? 'text-white' : ''}`}
          />
        ))}
      </div>

      <div className="md:hidden">
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings}
        >
          {buttonList.map((i) => (
            <Button
              key={i}
              title={i}
              onClick={() => handleOnClickButton(i)}
              customButtonClass={`w-[95%] ${activeButton === i ? 'bg-purple_dark' : ''}`}
              customTextClass={`${activeButton === i ? 'text-white' : ''}`}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};
