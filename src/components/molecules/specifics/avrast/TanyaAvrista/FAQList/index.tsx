'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
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
  itemsPerPage?: number;
}

const FAQList = ({ selected, data, itemsPerPage = 5 }: ICardsProps) => {
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!data?.length) {
      setPaginatedData([]);
      setPageCount(0);
      return;
    }; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="w-full bg-white flex flex-col gap-[5rem] items-center sm:px-[8.5rem] sm:pt-[5rem] xs:pb-[1.5rem] xs:py-[3rem] xs:px-[2rem]">
      <h1 className="font-karla sm:text-[3.5rem] xs:text-[2.25rem] text-purple_dark font-extrabold text-center sm:leading-[67.2px] -tracking-[0.04em] xs:leading-[43.2px]">
        {selected}
      </h1>
      {paginatedData?.length > 0 ? (
        <div className="w-full">
          <div className="w-full flex flex-col gap-[12px]">
            {paginatedData.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="w-full border border-gray_light rounded-xl p-[1.5rem] flex flex-row justify-between items-center shadow-[0_13px_20px_0px_purple_dark/[0/03]]"
              >
                <p className="text-2xl font-semibold leading-[30.17px] font-opensanspro">{item.title}</p>
                <Image alt="chevron" src={CHEVRON_RIGHT_PURPLE} />
              </Link>
            ))}
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-between py-8 gap-4">
            <div>
              <p className="text-[20px]">
                Menampilkan{' '}
                <span className="font-bold text-purple_dark">
                  {data?.length === 0 || data === undefined
                    ? 0
                    : itemOffset + 1}
                  -
                  {Math.min(
                    (itemOffset + 1) * itemsPerPage,
                    data ? data.length : 0
                  )}
                </span>{' '}
                dari <span className="font-bold">{data && data.length}</span>{' '}
                hasil
              </p>
            </div>
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              nextLabel={<Icon name="chevronRight" color="purple_dark" />}
              previousLabel={<Icon name="chevronLeft" color="purple_dark" />}
              containerClassName="flex flex-row gap-[8px] items-center"
              activeClassName="text-purple_dark font-bold"
              pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-[1rem] items-center justify-center">
          <Image src={Search} alt="search" />
          <div className="flex flex-col gap-[2.25rem]">
            <div className="w-[20.25rem] text-center">
              <p className="font-karla font-bold text-[1.5rem]">
                Jawaban tidak ditemukan
              </p>
              <p className="font-opensans text-[1rem] mt-[0.75rem]">
                Coba sesuaikan pencarian Anda untuk menemukan apa yang Anda
                cari.
              </p>
            </div>
            <Link
              href="/hubungi-kami"
              className="bg-purple_dark text-white font-opensans font-semibold text-[1.25rem] rounded-lg py-[0.75rem] px-[2.5rem] mt-[1.5rem] text-center"
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
