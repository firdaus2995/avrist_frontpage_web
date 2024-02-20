import React from 'react';
import Image from 'next/image';

import Icon from '@/components/atoms/Icon';
import DetailHeader from '@/components/molecules/specifics/avram/DetailHeader/DetailHeader';

export const generateStaticParams = () => {
  return [{ detail: 'blue-safir' }];
};

const ReksaDana = ({ params }: { params: { detail: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-purple_dark/[.03]">
      <DetailHeader title="Avrist Blue Savir" />
      <div className="flex flex-col items-center">
        <h1>INI ADALAH PAGE INVESTASI - DETAIL REKSA DANA</h1>
        <h3>{params.detail}</h3>
      </div>

      {/* TABLE */}
      <div className="w-full flex flex-col self-stretch items-center justify-center px-20">
        {/* WEB */}
        <div className='xs:max-lg:hidden flex flex-col self-stretch bg-white p-9 gap-6 rounded-xl'>
          <h2 className='font-bold text-2xl text-gray_body'>Fitur</h2>
          <div className='flex flex-col'>
            <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-purple_verylight'>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
          </div>
        </div>
        {/* MOBILE */}
        <div className='lg:hidden flex flex-col self-stretch bg-white p-9 rounded-xl'>
          <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className='w-full flex flex-col self-stretch items-center justify-center px-20'>
        <div className='flex flex-col self-stretch bg-white rounded-xl p-9 gap-6'>
          <div className='flex gap-2'>
            <Icon width={32} height={32} name='sealWarning' color='reddist' />
            <p className='text-2xl text-gray_body font-bold'>Disclaimer</p>
          </div>
          <p className='text-sm'>
            Investasi melalui reksa dana mengandung risiko. Calon pemodal wajib memahami risiko berinvestasi di Pasar Modal, oleh sebab itu calon pemodal wajib membaca dan memahami isi prospektus sebelum memutuskan untuk berinvestasi melalui Reksa Dana. Kinerja masa lalu tidak mencerminkan kinerja masa datang.
          </p>
        </div>
      </div>

      {/* VENDORS */}
      <div className='w-full flex flex-col self-stretch items-center justify-center px-20'>
        <div className='flex flex-col self-stretch bg-white rounded-xl p-9 gap-6'>
          <div className='flex gap-2'>
            <p className='text-2xl text-gray_body font-bold'>Disclaimer</p>
          </div>
          <div className='flex flex-row gap-2.5'>
            <Image alt='image_vendor' width={0} height={0} className='h-auto w-auto' src="https://i.ibb.co/9wcjf4W/Frame-315725.png" />
            <Image alt='image_vendor' width={0} height={0} className='h-auto w-auto' src="https://i.ibb.co/1bnkJcZ/Frame-315726.png" />
            <Image alt='image_vendor' width={0} height={0} className='h-auto w-auto' src="https://i.ibb.co/PFdfyVr/Frame-315727.png" />
            <Image alt='image_vendor' width={0} height={0} className='h-auto w-auto' src="https://i.ibb.co/2qRx4fh/Frame-315729.png" />
            <Image alt='image_vendor' width={0} height={0} className='h-auto w-auto' src="https://i.ibb.co/YX4S62y/Logo-Phillip-Sekuritas-Indonesia-Color-Phillip-Sekuritas-Indonesia-1.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReksaDana;
