import React from 'react';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import PencarianKontak from '@/components/molecules/specifics/avrast/Pencarian/PencarianKontak';
import PencarianProduk from '@/components/molecules/specifics/avrast/Pencarian/PencarianProduk';
import SearchForm from '@/components/molecules/specifics/avrast/Pencarian/SearchForm';

const breadcrumbsData = [
  { title: 'Beranda', href: '/avrast' },
  { title: 'Pencarian', href: '/avrast/pencarian' }
];

const Pencarian = () => {
  return (
    <div className="flex flex-col">
      <Hero title="Pencarian" breadcrumbsData={breadcrumbsData} />
      <SearchForm />
      <PencarianProduk />
      <PencarianKontak />
    </div>
  );
};

export default Pencarian;
