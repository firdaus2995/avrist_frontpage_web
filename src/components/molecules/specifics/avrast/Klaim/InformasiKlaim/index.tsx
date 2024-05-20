'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
    <div className="w-full flex flex-col self-stretch items-center justify-center md:px-[8.5rem] xs:px-1 bg-white pt-[6.25rem] pb-[5rem] gap-[4rem]">
      <div className="flex w-full md:flex-row xs:flex-col gap-4 rounded-lg gap-[0.75rem] flex-wrap mb-10">
        {data.map((val, idx) => (
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
        ))}
      </div>
      {selected === 'Informasi Klaim' && <InfoKlaimTab />}
      {selected === 'Panduan & Pengajuan' && !isSelectedDetail && (
        <PanduanPengajuanTab />
      )}
    </div>
  );
};

export default InformasiKlaimComponent;
