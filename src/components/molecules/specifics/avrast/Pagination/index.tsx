import React from 'react';
import ReactPaginate from 'react-paginate';
import Icon from '@/components/atoms/Icon';

interface IPagination {
  data: any;
  itemOffset: number;
  itemsPerPage: number;
  pageCount: number;
  onPageChange: (e: any) => void;
  customColor?: string;
}

const Pagination: React.FC<IPagination> = ({
  data,
  itemOffset,
  itemsPerPage,
  pageCount,
  onPageChange,
  customColor
}) => {
  const textColor = `text-${customColor}`;
  return (
    <div className="flex flex-col gap-4 md:flex-row items-start justify-between font-opensans ">
      <div>
        <p className="text-[20px]/[28px] font-normal">
          Menampilkan{' '}
          <span
            className={`font-bold ${customColor ? textColor : 'text-purple_dark'}`}
          >
            {data?.length === 0 || data === undefined ? 0 : itemOffset + 1}-
            {data?.length === 0 || data === undefined
              ? 0
              : itemOffset + 1 + itemsPerPage > data?.length
                ? data?.length
                : itemOffset + itemsPerPage}
          </span>{' '}
          dari <span className="font-bold">{data && data.length}</span> hasil
        </p>
      </div>
      {data?.length > 0 && (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          nextLabel={
            <Icon name="chevronRight" color={customColor ?? 'purple_dark'} />
          }
          previousLabel={
            <span className="rotate-[180deg]">
              <Icon name="chevronLeft" color={customColor ?? 'purple_dark'} />
            </span>
          }
          containerClassName="flex flex-row gap-[12px] items-center"
          activeClassName={`${customColor ? textColor : 'text-purple_dark'} font-bold`}
          pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
          forcePage={itemOffset / itemsPerPage}
        />
      )}
    </div>
  );
};

export default Pagination;
