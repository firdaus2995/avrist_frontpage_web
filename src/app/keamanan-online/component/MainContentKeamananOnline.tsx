'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import KeamananOnline from '../tabs/keamanan-online';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';

const MainContentKeamananOnline = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('Keamanan Online');
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tabs: string) => {
    setTab(tabs);
    router.push(pathname + '?' + createQueryString('tab', tabs), {
      scroll: false
    });
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

  const tabs = ['Keamanan Online'];
  return (
    <div className="w-full flex flex-col relative">
      <div className="bg-white rounded-t-[3.75rem] w-full min-h-[3.75rem] relative">
        <div className="sm:px-[8.5rem] sm:pt-[6.25rem] sm:pb-[28px] xs:px-[32px] xs:pt-[50px] xs:pb-[28px] flex sm:flex-row xs:flex-col xs:gap-[2.25rem] sm:gap-0">
          {/* start tabs kiri */}
          <div className="sm:block hidden rounded-lg">
            <div className="flex flex-col shrink min-w-[13.125rem] bg-purple_light_bg rounded-r-[0.75rem] rounded-l-[0.25rem] overflow-hidden">
              {tabs.map((val, idx) =>
                tab === val ? (
                  <div
                    key={idx}
                    role="button"
                    className="border-l-4 border-purple_dark px-[0.9375rem] py-[0.625rem] cursor-pointer text-left"
                  >
                    <span className="font-bold text-purple_dark text-[1.125rem]">
                      {val}
                    </span>
                  </div>
                ) : (
                  <div
                    key={idx}
                    role="button"
                    onClick={() => handleTabClick(val)}
                    className="border-l-4 border-purple_mediumlight px-[0.9375rem] py-[0.625rem] cursor-pointer text-left"
                  >
                    <span className="font-bold text-purple_mediumlight text-[1.125rem]">
                      {val}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="relative sm:hidden block">
            <div
              className="flex justify-between items-center border-l-4 border-purple_dark px-[0.9375rem] py-[0.625rem] cursor-pointer rounded-lg font-bold text-purple_dark bg-purple_light_bg text-[1.125rem]"
              onClick={() => tabs.length > 1 && setIsOpen(!isOpen)}
            >
              <span>{tab}</span>
              <div
                className={`transform transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                {tabs.length > 1 && <Icon name="chevronDown" color="purple_dark" />}
              </div>
            </div>
            {isOpen && (
              <div className="absolute w-full mt-1 rounded-lg bg-purple_light_bg shadow-lg">
                {tabs.map((val, idx) => (
                  <div
                    key={idx}
                    role="button"
                    onClick={() => handleTabClick(val)}
                    className={`border-l-4 px-[0.9375rem] py-[0.625rem] cursor-pointer font-bold text-[1.125rem] ${
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
          </div>
          {/* end tabs kiri */}
          <div className="sm:ml-[3rem]">
            {tab === 'Keamanan Online' && <KeamananOnline />}
          </div>
        </div>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default MainContentKeamananOnline;
