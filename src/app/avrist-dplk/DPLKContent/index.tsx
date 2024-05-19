'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Link as LinkScroll } from 'react-scroll';
import DewanPengawasDPLK from '../tabs/DewanPengawasDPLK';
import ManfaatUtama from '../tabs/ManfaatUtama';
import TentangAvristDPLK from '../tabs/TentangAvristDPLK';
import { ContentData } from '@/types/content.type';

type Props = {
  dewanpengawasdplkJudul: string;
  dewanpengawasdplkSubjudul: string;
  dewanpengawasdplkDeskripsi: string;
  pengawas: ContentData[];
  pengurus: ContentData[];
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
    dewanpengawasdplkJudul,
    dewanpengawasdplkSubjudul,
    pengawas,
    pengurus
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

    if (value === 'Klaim dan Layanan') {
      router.push(`${pathname}/klaim-layanan`);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center xs:px-[2rem] md:px-[8.5rem] gap-[4rem] my-[3.125rem]">
      <div className="flex flex-nowrap w-full justify-between gap-2 overflow-x-auto">
        {tabs.map((val, idx) => (
          <div className="w-full" key={idx}>
            <div className="xs:w-[250px] md:w-full">
              <LinkScroll
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
            </div>
          </div>
        ))}
      </div>
      {tab === 'Tentang Avrist DPLK' && (
        <TentangAvristDPLK
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          pengawas={pengawas}
          pengurus={pengurus}
        />
      )}
      {tab === 'Dewan Pengawas DPLK' && (
        <DewanPengawasDPLK
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          pengawas={pengawas}
          pengurus={pengurus}
        />
      )}
      {tab === 'Manfaat Utama' && (
        <ManfaatUtama
          dewanpengawasdplkDeskripsi={dewanpengawasdplkDeskripsi}
          dewanpengawasdplkJudul={dewanpengawasdplkJudul}
          dewanpengawasdplkSubjudul={dewanpengawasdplkSubjudul}
          pengawas={pengawas}
          pengurus={pengurus}
        />
      )}
    </div>
  );
};

export default DPLKContent;
