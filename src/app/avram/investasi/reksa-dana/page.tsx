import React from 'react';
import Link from 'next/link';

const ReksaDana = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className='h-screen flex flex-col justify-center items-center'>
        <h1>INI ADALAH PAGE INVESTASI - REKSA DANA</h1>
        <Link href="reksa-dana/blue-safir">Click here to view detail</Link>
      </div>
    </div>
  )
};

export default ReksaDana;
