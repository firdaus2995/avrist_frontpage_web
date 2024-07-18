'use client';

import React, { useState } from 'react';
import Icon from '@/components/atoms/Icon';
import { PageInfo } from '@/types/provider.type';

type Props = {
  className?: string;
  dataPage: PageInfo;
  onChangePage: (pageNumber: number) => void;
};
export const Paginate = (props: Props) => {
  const { className, dataPage, onChangePage } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const renderPageNumbers = () => {
    const { totalPage } = dataPage;
    console.log(dataPage);

    const pageNumbers = [];
    const pageCountToShow = 5;

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPage, pageCountToShow);
    }

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(1, totalPage - pageCountToShow + 1);
    }

    for (let pageIndex = startPage; pageIndex <= endPage; pageIndex++) {
      if (pageIndex === dataPage.pagePos) {
        pageNumbers.push(
          <span
            key={pageIndex}
            className="cursor-pointer font-bold text-purple_dark"
            onClick={() => onChangePage(pageIndex)}
          >
            {pageIndex}
          </span>
        );
      } else {
        pageNumbers.push(
          <span
            key={pageIndex}
            className="cursor-pointer text-xl"
            onClick={() => handleChangePage(pageIndex)}
          >
            {pageIndex}
          </span>
        );
      }
      if (pageIndex !== totalPage) {
        pageNumbers.push(' ');
      }
    }

    return pageNumbers;
  };

  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onChangePage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < dataPage.totalPage) {
      setCurrentPage(currentPage + 1);
      onChangePage(currentPage + 1);
    }
  };

  return (
    <div
      className={`w-full flex sm:flex-row xs:flex-col justify-between ${className}`}
    >
      <span>
        Menampilkan{' '}
        <span className="font-bold text-purple_dark">
          {!dataPage.totalData ? 0 : 1}{' '}
          {dataPage.totalData && `- ${dataPage.pageSize}`}
        </span>{' '}
        dari <span className="font-bold">{dataPage?.totalData ? 1 : 0}</span>{' '}
        hasil
      </span>
      {dataPage?.totalData && (
        <div
          className={`grid items-center ${dataPage.totalPage < 5 ? 'xs:gap-1 sm:gap-0 sm:grid-cols-2 xs:flex' : 'gap-3 grid-cols-5'}`}
        >
          <span>
            {renderPageNumbers()} {dataPage.totalPage > 5 && '... '}
            <span
              className={`cursor-pointer font-bold ${dataPage.pagePos === dataPage.totalPage ? 'text-purple_dark' : ''}`}
              onClick={() => onChangePage(dataPage.totalPage)}
            >
              {dataPage.totalPage === 0 ? 1 : dataPage.totalPage}
            </span>
          </span>
          <div
            onClick={handleNextPage}
            className="cursor-pointer xs:mt-[2px] sm:mt-0"
          >
            <Icon
              width={15}
              height={15}
              name="chevronRight"
              color="purple_dark"
            />
          </div>
        </div>
      )}
    </div>
  );
};
