import React, { useEffect, useState } from 'react';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';
import ButtonMenuVertical from '@/components/molecules/specifics/avrast/ButtonMenuVertical';
import Maps from '@/components/molecules/specifics/avrast/RSRekanan/Maps';
import { Content as ProviderContent } from '@/types/provider.type';

const Content = () => {
  const [data, setData] = useState<IDAta[] | []>([]);
  const [searchParam, setSearchParam] = useState('');
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
        const response = await fetch(`/api/klaim-layanan/layanan?slug=isProviders&city_contain=jakarta&name_contain=${searchParam}`);
        console.info(response);
        const data = await response.json();    
        if (data.responseMessage !== 'SUCCESS'){
          return [];
        }

        const { content } = data;
        const fetchedData = content.map((item: ProviderContent) => {
          const phoneSplit = item.phone.split('-');
          const formattedPhoneNumber = `(${phoneSplit[0]}) ${phoneSplit[1]}`;          
          return {
            name: item.name,
            address: item.address,
            phone: formattedPhoneNumber
          }
        });        
        setData(fetchedData);
    };

    fetchProviderData().then();
  }, [searchParam]);

  const handleChangeSearchParams = (value: string) => {
    setSearchParam(value);
  }

  return (
    <div className="z-[1] w-full bg-purple_dark -mt-1">    
      <div className="bg-white pt-[100px] px-[32px] md:px-[136px] pb-2">
        <ButtonMenu
          buttonList={[
            'Informasi Nasabah',
            'Rumah Sakit Rekanan',
            'Formulir & Buku Panduan',
            'Performa Investasi'
          ]}
        />

        <section className="w-full flex flex-col items-center text-center my-[60px]">
          <h1 className="font-karla text-[48px] 2xl:text-[56px] text-purple_dark font-medium">
            Jaringan rumah sakit di Indonesia
          </h1>
          <h2 className="font-karla text-[28px] 2xl:text-[36px]">
            Temukan lebih dari 1000 rumah sakit rekanan di seluruh Indonesia
          </h2>
        </section>

        <section className="flex xs:flex-col md:flex-row gap-10">
          <div className="xs:w-[100%] md:w-[20%]">
            <ButtonMenuVertical item={btnVerticalData} />
          </div>

          <Maps hospitalData={data} onClickSearch={handleChangeSearchParams}/>
        </section>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default Content;

export interface IDAta {
  name: string, 
  address: string, 
  phone: string 
}