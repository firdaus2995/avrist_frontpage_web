import { useEffect, useState } from 'react';
import { IDAta } from '../../RSRekanan/Content';
import { Card } from './Card';
import { CardAddress } from './CardAddress';
import { SearchInput } from './form/Input';
import { Paginate } from './Paginate';
import { handleGetProvider } from '@/services/provider-service.api';
import { PageInfo, Content as ProviderContent } from '@/types/provider.type';

export const BranchOffice = () => {
  const initialPageInfo: PageInfo = {
    pageSize: 6,
    totalPage: 0,
    pagePos: 1,
    totalData: 0
  }
  const [data, setData] = useState<IDAta[] | []>([]);
  const [searchParam, setSearchParam] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);

  useEffect(() => {
    const fetchProviderData = async () => {
      setIsLoading(true);
      const queryParams = {
        page: `${pageInfo.pagePos}`,
        size: `${pageInfo.pageSize}`,
        city_contain: 'jakarta',
        name_contain: searchParam
      }
      const data = await handleGetProvider(queryParams);
      if (data.responseMessage !== 'SUCCESS'){
        setIsLoading(false);
        return [];
      }
      const { content } = data;
      console.log({fetchedData: data});
      setPageInfo(data.pageInfo);
      
      const fetchedData = content.map((item: ProviderContent) => {
        const phoneSplit = item.phone.split('-');
        const formattedPhoneNumber = `(${phoneSplit[0]}) ${phoneSplit[1]}`;          
        return {
          id: item.id,
          name: item.name,
          address: item.address,
          phone: formattedPhoneNumber
        }});
        setData(fetchedData);
    };

    fetchProviderData().then(() => setIsLoading(false));
  }, [searchParam, pageInfo.pagePos]);

  const handleClickSearchParams = (value: string) => {
    setSearchParam(value);
  }

  const handleChangePage = (pageNumber: number) => {
    setPageInfo(prevPageInfo => ({ ...prevPageInfo, pagePos: pageNumber }));
  };

  return (
   data.length !== 0 && <Card className="mt-[24px] bg-white mx-[136px] p-[24px]">
      <div className="grid grid-cols-2 gap-6">
        <span className="font-opensans font-bold text-[24px]">
          Kantor Cabang
        </span>
        <SearchInput placeholder="Cari Lokasi Kantor Cabang" onClickSearch={handleClickSearchParams}/>
      </div>
      {
        !isLoading ?
        <div className="grid grid-cols-3 grid-rows-2 gap-x-[12px] gap-y-[24px] mt-[24px]">
          {data?.map((item) => (
            <CardAddress
              key={item.id}
              title={item.name}
              address={item.address}
              contact={item.phone}
            />
          ))}
        </div> :
            <div className="grid grid-cols-3 grid-rows-2 gap-x-[12px] gap-y-[24px] mt-[24px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardAddress
                key={i.toString()}
                title="......"
                address="......"
                contact="......"
              />
            ))}
          </div>
    
      }
      {pageInfo && <Paginate className="mt-[24px]" dataPage={pageInfo} onChangePage={handleChangePage}/>}
    </Card>
  );
};
