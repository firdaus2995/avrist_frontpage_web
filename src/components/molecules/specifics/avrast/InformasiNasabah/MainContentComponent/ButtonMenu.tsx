import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button/Button';

const buttonList = [
  'Informasi Nasabah',
  'Rumah Sakit Rekanan',
  'Formulir & Buku Panduan',
  'Performa Investasi'
];
export const ButtonMenu = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = React.useState(buttonList[0]);

  const handleOnClickButton = (buttonText: string) => {
    setActiveButton(buttonText);

    const actionMap: { [key: string]: () => void } = {
      'Informasi Nasabah': () => {
        router.push('/klaim-layanan/layanan?tab=Informasi+Nasabah');
      },
      'Rumah Sakit Rekanan': () => {
        router.push('/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan');
      },
      'Formulir & Buku Panduan': () => {
        router.push('/klaim-layanan/layanan?tab=Formulir+%26+Buku+Panduan');
      },
      'Performa Investasi': () => {
        router.push('/klaim-layanan/layanan?tab=Performa+Investasi')
      }
    };
    
    actionMap[buttonText]();
  };

  return (
    <div className="grid gap-[12px] grid-cols-1 sm:grid-cols-4">
      {buttonList.map((buttonText) => (
        <Button
          key={buttonText}
          title={buttonText}
          onClick={() => handleOnClickButton(buttonText)}
          customButtonClass={`flex-1 ${activeButton === buttonText ? 'bg-purple_dark' : ''}`}
          customTextClass={`${activeButton === buttonText ? 'text-white' : ''}`}
        />
      ))}
    </div>
  );
};
