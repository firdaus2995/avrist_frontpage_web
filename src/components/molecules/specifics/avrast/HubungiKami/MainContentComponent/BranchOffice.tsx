import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from './Card';
import { CardAddress } from './CardAddress';
import { SearchInput } from './form/Input';
import Search from '@/assets/images/common/search.svg';
import Icon from '@/components/atoms/Icon';

type Props = {
  onChangeCenter: (lng: number, lat: number) => void;
  branchData?: any;
};

export const BranchOffice = (props: Props) => {
  const { onChangeCenter, branchData } = props;
  const [data, setData] = useState<any>([]);
  const [searchParam, setSearchParam] = useState('');

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setCurrentPage(1);
    if (searchParam === '') {
      setData(branchData);
    } else {
      const temp = branchData?.filter((value: any) =>
        value.name?.toLowerCase().includes(searchParam.toLowerCase())
      );
      setData(temp);
    }
  }, [branchData, searchParam]);

  const handleClickSearchParams = (value: string) => {
    setSearchParam(value);
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const paginatedData = data ? data.slice(startIndex, endIndex) : [];
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  return (
    <Card className="bg-white p-[1.5rem]">
      <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-[1.5rem] items-center">
        <span className="font-opensanspro font-bold text-[1.5rem] leading-[30.17px]">
          Kantor Cabang
        </span>
        <SearchInput
          placeholder="Cari lokasi kantor cabang"
          onClickSearch={handleClickSearchParams}
        />
      </div>
      {paginatedData?.length === 0 ? (
        <div className="w-full flex flex-col md:px-52 2xl:px-[345px] mt-8 mb-10 gap-4 items-center justify-center">
          <Image src={Search} alt="search" />
          <div className="flex flex-col gap-4">
            <div className="w-[324px] text-center">
              <p className="font-karla font-bold text-[24px]">
                Kantor Cabang tidak ditemukan
              </p>
              <p className="font-opensans text-[16px] mt-[12px]">
                Coba sesuaikan pencarian Anda untuk menemukan apa yang Anda
                cari.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 sm:grid-rows-2 xs:grid-cols-1 gap-x-[0.75rem] sm:gap-y-[1.5rem] xs:gap-y-[0.75rem] mt-[1.5rem]">
          {paginatedData?.map((item: any, index: number) => (
            <CardAddress
              key={index}
              title={item.name}
              address={item.address}
              contact={item.phone}
              lat={item.lat}
              lng={item.lng}
              onChangeCenter={onChangeCenter}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row justify-between mt-[1.5rem]">
        <div>
          <p className="text-[20px]">
            Menampilkan{' '}
            <span className="font-bold text-purple_dark">
              {data?.length === 0 ? 0 : startIndex + 1}-
              {data?.length === 0
                ? 0
                : startIndex + 1 + itemsPerPage > data?.length
                  ? data?.length
                  : startIndex + itemsPerPage}
            </span>{' '}
            dari <span className="font-bold">{data?.length}</span> hasil
          </p>
        </div>
        <div className="flex flex-row gap-[12px] items-center">
          {currentPage > 1 && (
            <div
              onClick={() =>
                handlePageChange(
                  currentPage > 1 ? currentPage - 1 : currentPage
                )
              }
              className="cursor-pointer rotate-180"
            >
              <Icon
                width={20}
                height={20}
                name="chevronRight"
                color="purple_dark"
              />
            </div>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))}
          <span
            className={`mt-[3px] ${currentPage === totalPages ? 'hidden' : ''}`}
            role="button"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <Icon name="chevronRight" color="purple_dark" />
          </span>
        </div>
      </div>
    </Card>
  );
};
