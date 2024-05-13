'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CHEVRON_RIGHT_PURPLE from '@/assets/images/common/chevron-right-purple.svg';
import Search from '@/assets/images/common/search.svg';
import Icon from '@/components/atoms/Icon';

export interface IListFaq {
  title: any;
  href: string;
  tags: string | undefined;
}
interface ICardsProps {
  selected: string;
  data: IListFaq[];
}

const FAQList = ({ selected, data }: ICardsProps) => {
  const itemsPerPage = 5; // Jumlah item yang ditampilkan per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data ? data.slice(startIndex, endIndex) : [];

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center">
      <h1 className="mt-20 font-karla text-[56px] text-purple_dark font-extrabold">
        {selected}
      </h1>
      {paginatedData?.length > 0 ? (
        <div className="w-full">
          <div className="w-full flex flex-col md:px-52 2xl:px-[345px] mt-8 mb-10 gap-4">
            {paginatedData.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="w-full border border-gray_light rounded-xl px-4 py-6 flex flex-row justify-between items-center"
              >
                <p className="text-xl font-bold">{item.title}</p>
                <Image alt="chevron" src={CHEVRON_RIGHT_PURPLE} />
              </Link>
            ))}
          </div>
          <div className="w-full flex flex-row justify-between md:px-52 2xl:px-[345px] mt-8 mb-10">
            <div className="flex items-center text-sm">
              Menampilkan{'\u00A0'}
              <span className="font-bold text-purple_dark">
                {startIndex + 1}-{Math.min(endIndex, data ? data?.length : 0)}
              </span>
              {'\u00A0'}dari{'\u00A0'}
              <span className="font-bold"> {data.length}</span>
              {'\u00A0'}hasil
            </div>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <div
                    key={page}
                    role="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                      currentPage === page ? 'text-purple_dark font-bold' : ''
                    }`}
                  >
                    {page}
                  </div>
                )
              )}
              <span
                className="mt-[3px]"
                role="button"
                onClick={() => handlePageChange(totalPages)}
              >
                <Icon name="chevronRight" color="purple_dark" />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col md:px-52 2xl:px-[345px] mt-8 mb-10 gap-4 items-center justify-center">
            <Image src={Search} alt="search" />
          <div className='flex flex-col gap-[36px]'>
            <div className="w-[324px] text-center">
              <p className="font-karla font-bold text-[24px]">
                Jawaban tidak ditemukan
              </p>
              <p className="font-opensans text-[16px] mt-[12px]">
                Coba sesuaikan pencarian Anda untuk menemukan apa yang Anda cari.
              </p>
            </div>
            <Link
              href="/hubungi-kami"
              className="bg-purple_dark text-white font-opensans font-semibold text-[20px] rounded-lg py-[12px] px-[40px] mt-[24px] text-center"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQList;
