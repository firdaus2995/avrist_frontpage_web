import React from 'react';
import CardCategoryA from '@/components/molecules/specifics/avrast/Cards/CategoryA';

function EmployeeBenefit({
  data,
  setState
}: {
  data: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    data && (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
        {data.map((item: IDataCard, index: number) => (
          <CardCategoryA
            key={index}
            imageProduk={item.produkImage.imageUrl}
            symbol={item.kategoriProdukIcon.imageUrl}
            title="Employee Benefit"
            summary={item.namaProduk}
            description={item.deskripsiSingkatProduk}
            tags={item.tags.split(',')}
            href={`/produk/korporasi/${item.id}`}
            setStateTags={setState}
          />
        ))}
      </div>
    )
  );
}

export default EmployeeBenefit;

interface IDataCard {
  id: string;
  produkImage: {
    imageUrl: string;
  };
  kategoriProdukIcon: {
    imageUrl: string;
  };
  namaProduk: string;
  deskripsiSingkatProduk: string;
  tags: string;
}
