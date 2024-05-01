'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link as LinkScroll } from 'react-scroll';
import DewanPengawasDPLK from '../tabs/DewanPengawasDPLK';
import ManfaatUtama from '../tabs/ManfaatUtama';
import TentangAvristDPLK from '../tabs/TentangAvristDPLK';

type Props = {
  dewanpengawasdplkJudul: string;
  dewanpengawasdplkSubjudul: string;
  dewanpengawasdplkDeskripsi: string;
  dewanpengawasdplkImage: string;
  dewanpengawasdplkNama: string;
  dewanpengawasdplkTitledewan: string;
};
const tabs = [
  'Tentang Avrist DPLK',
  'Dewan Pengawas DPLK',
  'Manfaat Utama',
  'Produk',
  'Klaim dan Layanan'
];

const DPLKContent = (props: Props) => {
  const {
    dewanpengawasdplkDeskripsi,
    dewanpengawasdplkImage,
    dewanpengawasdplkJudul,
    dewanpengawasdplkNama,
    dewanpengawasdplkSubjudul,
    dewanpengawasdplkTitledewan
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('Tentang Avrist DPLK');

  const handleTabClick = (tabs: string) => {
    setTab(tabs);
    if (tabs === 'Produk') {
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
  return (
    <div className="flex flex-col justify-center mx-[32px] my-[50px] sm:mx-[136px] sm:my-[72px] gap-[64px]">
      <div className="flex flex-nowrap w-full justify-between gap-2 items-stretch">
        {tabs.map((val, idx) => (
          <LinkScroll
            key={idx}
            to={'#' + val.replace(/\s+/g, '')}
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
            onClick={() => handleTabClick(val)}
            className={`flex justify-center items-center w-full min-h-full border-1 rounded-lg px-[15px] py-[8px] cursor-pointer text-center align-middle border-dplk_yellow hover:bg-dplk_yellow hover:text-white ${tab === val ? 'bg-dplk_yellow text-white' : 'text-black'} font-semibold`}
          >
            <span className="font-semibold text-[16px]">{val}</span>
          </LinkScroll>
        ))}
      </div>
      {tab === 'Tentang Avrist DPLK' && (
        <TentangAvristDPLK
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkImage={dewanpengawasdplkImage}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkNama={dewanpengawasdplkNama}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          dewanpengawasdplkTitledewan={dewanpengawasdplkTitledewan}
        />
      )}
      {tab === 'Dewan Pengawas DPLK' && (
        <DewanPengawasDPLK
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkImage={dewanpengawasdplkImage}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkNama={dewanpengawasdplkNama}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          dewanpengawasdplkTitledewan={dewanpengawasdplkTitledewan}
        />
      )}
      {tab === 'Manfaat Utama' && (
        <ManfaatUtama
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkImage={dewanpengawasdplkImage}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkNama={dewanpengawasdplkNama}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          dewanpengawasdplkTitledewan={dewanpengawasdplkTitledewan}
        />
      )}
    </div>
  );
};

export default DPLKContent;
