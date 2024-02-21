'use client';

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import PaginationButton from './components/PaginationButton';

type PaginationProps = {
  perPage: number;
  totalItem: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type GoToPageParams = 'next' | 'prev' | number;

// const PAGINATION_MAX_DISPLAY = 5;

const Pagination: React.FC<PaginationProps> = ({
  perPage,
  totalItem,
  hasNext,
  hasPrev
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = (() => {
    const result = searchParams.get('page') ?? '1';
    try {
      return parseInt(result);
    } catch (err) {
      console.error(err);
      return 1;
    }
  })();
  const lastPage = (() => {
    try {
      return Math.ceil(totalItem / perPage);
    } catch (err) {
      console.error(err);
      return 2;
    }
  })();

  let numberOfPages = 0;
  try {
    numberOfPages = Math.ceil(totalItem / perPage);
  } catch (err) {
    console.error(err);
  }

  const goToPage = (target: GoToPageParams) => {
    const params = new URLSearchParams(searchParams);
    if (typeof target === 'number') {
      params.set('page', target.toString());
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    if (target === 'next') {
      params.set('page', (currentPage + 1).toString());
    } else {
      params.set('page', (currentPage - 1).toString());
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalItem === 0) return <></>;

  const generateArray = ({
    quantity,
    start,
    end
  }: {
    quantity: number;
    start: number;
    end: number;
  }) => {
    return Array.from(new Array(quantity))
      .map((_, index) => index)
      .slice(start, end);
  };

  const paginationArray = (() => {
    return generateArray({
      quantity: numberOfPages,
      start: 0,
      end: numberOfPages
    }).map((item) => item + 1);
  })();

  return (
    <div className="flex items-stretch flex-wrap gap-1">
      {hasPrev && <PaginationButton onClick={goToPage} page={'prev'} />}

      {/* <PaginationButton
        onClick={goToPage}
        page={1}
        isActive={currentPage === 1}
      /> */}
      {paginationArray.map((benchmark, index) => {
        return (
          <PaginationButton
            onClick={() => goToPage(benchmark)}
            page={benchmark}
            key={index}
            isActive={currentPage === benchmark}
          />
        );
      })}
      {/* {numberOfPages > 1 && (
        <PaginationButton
          onClick={goToPage}
          page={lastPage}
          isActive={currentPage === lastPage}
        />
      )} */}

      {hasNext && <PaginationButton onClick={goToPage} page={'next'} />}
    </div>
  );
};

export default Pagination;
