import React from 'react';

export const generateStaticParams = () => {
  return [{ detail: 'blue-safir' }];
};

const ReksaDana = ({ params }: { params: { detail: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 bg-purple_dark/[.03]">
      <div className='flex flex-col items-center'>
        <h1>INI ADALAH PAGE INVESTASI - DETAIL REKSA DANA</h1>
        <h3>{params.detail}</h3>
      </div>

      <div className="w-full flex flex-col self-stretch items-center justify-center px-20">
        {/* WEB */}
        <div className='xs:max-lg:hidden flex flex-col bg-white p-9 gap-6 rounded-xl'>
          <h2 className='font-bold text-2xl text-gray_body'>Fitur</h2>
          <div className='flex flex-col'>
            <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
            <div className='flex px-1 py-2 gap-2 border-purple_verylight'>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
              <div className='w-72 flex flex-col gap-1'>
                <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
                <p className='text-xl text-gray_body'>10 Juni 2010  </p>
              </div>
            </div>
          </div>
        </div>
        {/* MOBILE */}
        <div className='lg:hidden flex flex-col bg-white p-9 rounded-xl'>
          <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
            <div className='w-72 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
            <div className='w-72 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
            <div className='w-72 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight'>
            <div className='w-72 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
          <div className='flex px-1 py-2 gap-2 border-b-1 border-purple_verylight'>
            <div className='w-72 flex flex-col gap-1'>
              <p className='text-sm	font-bold text-purple_dark'>Tanggal Efektif</p>
              <p className='text-xl text-gray_body'>10 Juni 2010  </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default ReksaDana;
