import React, { useEffect, useState } from 'react';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';
import ButtonMenuVertical from '@/components/molecules/specifics/avrast/ButtonMenuVertical';
import Maps from '@/components/molecules/specifics/avrast/RSRekanan/Maps';
import { handleGetProvider } from '@/services/provider-service.api';
import { Content as ProviderContent } from '@/types/provider.type';

const Content = () => {
  const [data, setData] = useState<IDAta[] | []>([]);
  const [searchParam, setSearchParam] = useState('');
  const [currentPage, setCurrentPage] = useState<number | any>(1);

  const btnVerticalData = [
    {
      title: 'Asuransi Jiwa Individu',
      onClick: () => {}
    },
    {
      title: 'Asuransi Jiwa Koperasi',
      onClick: () => {}
    },
    {
      title: 'Avrist Syariah',
      onClick: () => {},
      color: 'text-olive_green'
    }
  ];

  useEffect(() => {
    const fetchProviderData = async () => {
      const queryParams = {
        page: currentPage,
        name_contain: searchParam
      };
      const data = await handleGetProvider(queryParams);
      if (data.responseMessage !== 'SUCCESS') {
        return [];
      }
      const { content } = data;
      const fetchedData = content.map((item: ProviderContent) => {
        const phoneSplit = item.phone.split('-');
        const formattedPhoneNumber = `(${phoneSplit[0]}) ${phoneSplit[1]}`;
        return {
          id: item.id,
          name: item.name,
          address: item.address,
          phone: formattedPhoneNumber,
          lat: item.latitude,
          lng: item.longitude
        };
      });

      setData((prevData) => {
        const existingIds = new Set(prevData.map((item) => item.id));
        const newData = fetchedData.filter((item) => !existingIds.has(item.id));
        return [...prevData, ...newData];
      });
    };

    fetchProviderData()
      .then()
      .catch(() => []);
  }, [searchParam, currentPage]);

  const handleChangeSearchParams = (value: string) => {
    setSearchParam(value);
    setCurrentPage(1); // Reset page to 1 when search parameter changes
    setData([]); // Clear previous data to avoid duplications
  };

  return (
    <div className="w-full bg-purple_dark">
      <div className="bg-white flex flex-col sm:pt-[5rem] xs:pt-[3.125rem] px-[2rem] md:px-[8.5rem] pb-[3rem] sm:gap-[4rem] xs:gap-[2.25rem]">
        <ButtonMenu
          buttonList={[
            'Informasi Nasabah',
            'Rumah Sakit Rekanan',
            'Formulir & Buku Panduan',
            'Performa Investasi'
          ]}
        />

        <section className="w-full flex flex-col items-center text-center">
          <h1 className="font-karla xs:text-[2.25rem] sm:text-[3.5rem] text-purple_dark font-medium">
            Jaringan Rekanan Rumah Sakit Avrist Assurance
          </h1>
          <h2 className="font-karla xs:text-[1.5rem] sm:text-[2.25rem]">
            Komitmen kami untuk memberikan rasa aman dan nyaman bersama lebih
            dari 1000 rumah sakit rekanan di seluruh Indonesia
          </h2>
        </section>

        <section className="flex xs:flex-col md:flex-row gap-10">
          <div className="xs:w-[100%] md:w-[20%]">
            <ButtonMenuVertical item={btnVerticalData} />
          </div>

          <Maps
            hospitalData={data}
            onClickSearch={handleChangeSearchParams}
            onSetPage={(data) => setCurrentPage(data)}
            currentPage={currentPage}
          />
        </section>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default Content;

export interface IDAta {
  id: number;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}
