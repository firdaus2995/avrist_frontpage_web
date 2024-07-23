import React, { useEffect, useState, useMemo } from 'react';
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
  const [thirdParty, setThirdParty] = useState('Avrist');
  const [loading, setLoading] = useState(false);

  const btnVerticalData = useMemo(
    () => [
      {
        title: 'Avrist',
        onClick: () => {
          setThirdParty('Avrist');
        }
      },
      {
        title: 'Admedika',
        onClick: () => {
          setThirdParty('Admedika');
        }
      }
      // {
      //   title: 'AAI',
      //   onClick: () => {
      //     setThirdParty('Aai');
      //   }
      // }
    ],
    [thirdParty]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProviderData = async () => {
      setData([]);
      setLoading(true);
      let locatinUser: any = null;
      if (typeof window !== 'undefined') {
        const location: any = localStorage.getItem('location');
        if (location) {
          locatinUser = JSON.parse(location);
        }
      }
      const queryParams = {
        page: currentPage,
        name_contain: searchParam,
        third_party_administration_name_contain: thirdParty
      };
      const data = await handleGetProvider(
        locatinUser
          ? {
              ...queryParams,
              latitude: locatinUser?.latitude,
              longitude: locatinUser?.longitude
            }
          : queryParams
      );
      if (data.responseMessage !== 'SUCCESS') {
        setLoading(false);
        return [];
      }
      const { content } = data;
      if (content.length > 0) {
        const fetchedData = content.map((item: ProviderContent) => {
          const phoneSplit = item.phone.split('-');
          const formattedPhoneNumber = `(${phoneSplit[0]}) ${phoneSplit[1]}`;
          return {
            id: item.id,
            name: item.name,
            address: item.address,
            phone: formattedPhoneNumber,
            lat: item.latitude,
            lng: item.longitude,
            tooltip: false
          };
        });

        setData((prevData) => {
          const existingIds = new Set(prevData.map((item) => item.id));
          const newData = fetchedData.filter(
            (item) => !existingIds.has(item.id)
          );
          return [...prevData, ...newData];
        });
        setLoading(false);
      } else {
        setData([]);
        setLoading(false);
      }
    };

    fetchProviderData()
      .then()
      .catch(() => []);
  }, [searchParam, currentPage, thirdParty]);

  const handleChangeSearchParams = (value: string) => {
    setSearchParam(value);
    setCurrentPage(1); // Reset page to 1 when search parameter changes
    setData([]); // Clear previous data to avoid duplications
  };

  return (
    <div className="w-full bg-purple_dark">
      <div className="bg-white flex flex-col sm:pt-[100px] xs:pt-[3.125rem] px-[2rem] md:px-[8.5rem] pb-[28px] sm:gap-[5rem] xs:gap-[5rem]">
        <ButtonMenu
          buttonList={[
            'Informasi Nasabah',
            'Rumah Sakit Rekanan',
            'Formulir & Buku Panduan',
            'Performa Investasi'
          ]}
        />

        <section className="w-full flex flex-col items-center text-center">
          <h1 className="text-purple_dark font-karla text-center font-extrabold sm:text-[3.5rem] xs:text-[2.25rem] xs:-tracking-[1.44px] sm:-tracking-[2.56px] sm:leading-[67.2px] xs:leading-[43.2px]">
            Jaringan Rekanan Rumah Sakit Avrist Assurance
          </h1>
          <h2 className="font-karla font-normal sm:text-[2.25rem] xs:text-[1.5rem] text-gray_bold">
            Komitmen kami untuk memberikan rasa aman dan nyaman bersama lebih
            dari 1000 rumah sakit rekanan di seluruh Indonesia
          </h2>
        </section>

        <section className="flex xs:flex-col md:flex-row gap-[36px]">
          <div className="xs:w-full md:w-[250px]">
            <ButtonMenuVertical item={btnVerticalData} loading={loading} />
          </div>

          <Maps
            hospitalData={data}
            onClickSearch={handleChangeSearchParams}
            onSetPage={(data) => setCurrentPage(data)}
            currentPage={currentPage}
            loading={loading}
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
  tooltip: boolean;
}
