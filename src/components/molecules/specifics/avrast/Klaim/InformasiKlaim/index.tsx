'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SliderComponent from '../../Slider';
import InfoKlaimTab from './components/InformasiKlaim';
import PanduanPengajuanTab from './components/PanduanPengajuan';

const data = ['Informasi Klaim', 'Panduan & Pengajuan', 'Login Polis'];

interface InformasiKlaimComponentProps {
  onTabChange: (tab: string) => void;
  isSelectedDetail: boolean;
  onChangeBannerImg: (val: number) => void;
  tab: string;
  file: string;
  popUpImage1: string;
  popUpImage2: string;
}

const InformasiKlaimComponent: React.FC<InformasiKlaimComponentProps> = ({
  onTabChange,
  isSelectedDetail,
  onChangeBannerImg,
  tab,
  file,
  popUpImage1,
  popUpImage2
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (tab !== '') {
      setSelected(tab);
    }
  }, [tab]);

  const handleTabClick = (tab: string) => {
    if (tab === 'Login Polis') {
      window.open('https://my.avrist.com/welcome', '_blank');
    } else {
      setSelected(tab);
      onTabChange(tab);
      router.push(pathname + '?' + createQueryString('tab', tab), {
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

  return (
    <div className="w-full flex flex-col self-stretch items-center justify-center xs:px-[2rem] md:px-[8.5rem] bg-white xs:pt-[3.125rem] xs:pb-[2.25rem] md:pt-[5rem] md:pb-[3rem] sm:gap-[4rem] xs:gap-[2.25rem]">
      {/* Tab Desktop */}
      <div className="w-full xs:hidden md:block">
        <div className="flex sm:w-full xs:w-[90%] md:flex-row xs:flex-col gap-4 rounded-lg gap-[0.75rem] flex-wrap mb-10">
          {data.map((val, idx) =>
            val === 'Login Polis' ? (
              <a
                key={idx}
                href="https://my.avrist.com/welcome"
                target="_blank"
                role="button"
                className={`grow flex p-2 items-center justify-center rounded-lg border border-purple_dark text-[1rem] font-semibold ${selected === val ? 'text-white bg-purple_dark' : 'text-purple_dark bg-white'}`}
              >
                {val}
              </a>
            ) : (
              <div
                key={idx}
                role="button"
                onClick={() => {
                  handleTabClick(val);
                  onChangeBannerImg(idx);
                }}
                className={`grow flex p-2 items-center justify-center rounded-lg border border-purple_dark text-[1rem] font-semibold ${selected === val ? 'text-white bg-purple_dark' : 'text-purple_dark bg-white'}`}
              >
                {val}
              </div>
            )
          )}
        </div>
      </div>

      {/* Tab Mobile */}
      <div className="w-[100%] z-20 top-32 md:hidden">
        <SliderComponent
          selected={tab}
          slideItems={data}
          customLabel="name"
          onClickItem={(val) => handleTabClick(val)}
        />
      </div>
      {selected === 'Informasi Klaim' && (
        <InfoKlaimTab
          file={file}
          popUpImage1={popUpImage1}
          popUpImage2={popUpImage2}
        />
      )}
      {selected === 'Panduan & Pengajuan' && !isSelectedDetail && (
        <PanduanPengajuanTab />
      )}
    </div>
  );
};

export default InformasiKlaimComponent;
