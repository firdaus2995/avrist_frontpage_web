'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Disclaimer from '../tabs/Disclaimer';
import KepemilikanInformasi from '../tabs/KepemilikanInformasi';
import KontenSitus from '../tabs/KontenSitus';
import SyaratPenggunaan from '../tabs/SyaratPenggunaan';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import WrapperContent from '@/components/molecules/specifics/avrast/WrapperContent';

const MainContentSyaratPenggunaan = () => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('Disclaimer');
  const [isOpen, setIsOpen] = useState(false);
  const disclaimerRef = useRef(null);
  const syaratRef = useRef(null);
  const kontenRef = useRef(null);
  const kepemilikanRef = useRef(null);

  const handleTabClick = (tabs: string, index: number) => {
    const headings = document.getElementsByTagName('h1');
    setTab(tabs);
    // handleScrollToRef(getRefByTab(tabs));
    setIsOpen(false);

    const targetHeading = headings[index];

    const offsetTop =
      targetHeading.offsetTop + (window.innerWidth > 1024 ? 200 : 100);

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  };

  // const getRefByTab = (tab: string) => {
  //   switch (tab) {
  //     case 'Disclaimer':
  //       return disclaimerRef;
  //     case 'Syarat Penggunaan':
  //       return syaratRef;
  //     case 'Konten Situs':
  //       return kontenRef;
  //     case 'Kepemilikan Informasi':
  //       return kepemilikanRef;
  //     default:
  //       return null;
  //   }
  // };

  // const handleScrollToRef = (ref: React.MutableRefObject<null> | null) => {
  //   if (ref?.current) {
  //     (ref.current! as HTMLElement).scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'end',
  //       inline: 'start'
  //     });
  //   }
  // };

  useEffect(() => {
    const value = searchParams.get('tab');
    if (value !== null) {
      setTab(value);
      // handleScrollToRef(getRefByTab(value));
    }
  }, [searchParams]);

  const tabs = [
    'Disclaimer',
    'Syarat Penggunaan',
    'Konten Situs',
    'Kepemilikan Informasi'
  ];

  return (
    <div className="w-full flex flex-col relative">
      <div className="bg-white rounded-t-[60px] w-full min-h-[60px]">
        <WrapperContent>
          {/* start tabs kiri */}
          <div className="sm:block hidden rounded-lg relative">
            <div className="flex flex-col shrink min-w-[210px] bg-purple_light_bg rounded-r-[12px] rounded-l-[4px] overflow-hidden">
              {tabs.map((val, idx) =>
                tab === val ? (
                  <div
                    key={idx}
                    role="button"
                    className="border-l-4 border-purple_dark pr-[12px] py-[12px] pl-[24px] cursor-pointer text-left"
                  >
                    <span className="font-bold text-purple_dark text-[18px] font-opensanspro leading-[25.2px]">
                      {val}
                    </span>
                  </div>
                ) : (
                  <div
                    key={idx}
                    role="button"
                    onClick={() => handleTabClick(val, idx)}
                    className="border-l-4 border-purple_mediumlight pr-[12px] py-[12px] pl-[24px] cursor-pointer text-left"
                  >
                    <span className="font-bold text-purple_mediumlight text-[18px] font-opensanspro leading-[25.2px]">
                      {val}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="relative sm:hidden block">
            <div
              className="flex justify-between items-center border-l-4 border-purple_dark px-[15px] py-[10px] cursor-pointer rounded-lg font-bold text-purple_dark bg-purple_light_bg text-[18px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{tab}</span>
              <div
                className={`transform transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <Icon name="chevronDown" color="purple_dark" />
              </div>
            </div>
            {isOpen && (
              <div className="absolute w-full mt-1 rounded-lg bg-purple_light_bg shadow-lg">
                {tabs.map((val, idx) => (
                  <div
                    key={idx}
                    role="button"
                    onClick={() => handleTabClick(val, idx)}
                    className={`border-l-4 px-[15px] py-[10px] cursor-pointer font-bold text-[18px] ${
                      tab === val
                        ? 'border-purple_dark text-purple_dark'
                        : 'border-purple_mediumlight text-purple_mediumlight'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}
          </div>{' '}
          {/* end tabs kiri */}
          <div className="sm:ml-[48px] flex flex-col xs:mt-4 sm:mt-0">
            <div ref={disclaimerRef}>
              <Disclaimer />
            </div>
            <div ref={syaratRef}>
              <SyaratPenggunaan />
            </div>
            <div ref={kontenRef}>
              <KontenSitus />
            </div>
            <div ref={kepemilikanRef}>
              <KepemilikanInformasi />
            </div>
          </div>
        </WrapperContent>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default MainContentSyaratPenggunaan;
