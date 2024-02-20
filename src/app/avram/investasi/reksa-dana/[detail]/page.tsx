import React from 'react';

export const generateStaticParams = () => {
  return [{ detail: 'blue-safir' }];
};

const ReksaDana = ({ params }: { params: { detail: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className='h-screen flex flex-col justify-center items-center'>
        <h1>INI ADALAH PAGE INVESTASI - DETAIL REKSA DANA</h1>
        <h3>{params.detail}</h3>
      </div>
    </div>
  )
};

export default ReksaDana;
