'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import InfoKlaimTab from './components/InformasiKlaim';
import PanduanPengajuanTab from './components/PanduanPengajuan';

const data = ['Informasi Klaim', 'Panduan & Pengajuan', 'Login Polis'];

interface InformasiKlaimComponentProps {
  onTabChange: (tab: string) => void;
  isSelectedDetail: boolean;
  onChangeBannerImg: (val: number) => void;
  tab: string;
}

const InformasiKlaimComponent: React.FC<InformasiKlaimComponentProps> = ({
  onTabChange,
  isSelectedDetail,
  onChangeBannerImg,
  tab
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState('');

  const sliderTabSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    if (tab !== '') {
      setSelected(tab);
    }
  }, [tab]);

  const handleTabClick = (tab: string) => {
    setSelected(tab);
    onTabChange(tab);
    router.push(pathname + '?' + createQueryString('tab', tab), {
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

  return (
    <div className="w-full flex flex-col self-stretch items-center justify-center xs:px-[2rem] md:px-[8.5rem] bg-white xs:pt-[3.125rem] xs:pb-[2.25rem] md:pt-[6.25rem] md:pb-[4rem] sm:gap-[4rem] xs:gap-[2.25rem]">
      {/* Tab Desktop */}
      <div className="w-full xs:hidden md:block">
        <div className="flex sm:w-full xs:w-[90%] md:flex-row xs:flex-col gap-4 rounded-lg gap-[0.75rem] flex-wrap mb-10">
          {data.map((val, idx) =>
            val === 'Login Polis' ? (
              <a
                key={idx}
                href='https://my.avrist.com/welcome'
                target='_blank'
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
        <div>
          <Slider {...sliderTabSettings}>
            {data.map((val, idx) => (
              <div key={idx}>
                <div
                  role="button"
                  onClick={() => handleTabClick(val)}
                  className={`mx-[0.625rem] whitespace-nowrap p-2 border border-purple_dark rounded-lg text-center ${tab === val ? 'bg-purple_dark text-white' : 'text-purple_dark'} font-semibold`}
                >
                  {val}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {selected === 'Informasi Klaim' && <InfoKlaimTab />}
      {selected === 'Panduan & Pengajuan' && !isSelectedDetail && (
        <PanduanPengajuanTab />
      )}
    </div>
  );
};

export default InformasiKlaimComponent;
