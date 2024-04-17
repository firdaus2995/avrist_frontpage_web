import React from 'react';
import CardCategoryA from '@/components/molecules/specifics/avrast/Cards/CategoryA';

function AsuransiJiwa({ data } : { data: any }) {    
  return (
    data &&
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
      {data.map((item: IDataCard, index: number) => (
        <CardCategoryA
          key={index}
          imageProduk={item.produkImage.imageUrl}
          symbol={item.kategoriProdukIcon.imageUrl}
          title="Asuransi Jiwa"
          summary={item.namaProduk}
          description={item.deskripsiSingkatProduk}
          tags={item.tags.split(',')}
          href={`/produk/individu/produk-asuransi-jiwa-` + index}
        />
      ))}
    </div>
  );
}

export default AsuransiJiwa;

interface IDataCard {
  produkImage: {
    imageUrl: string,    
  },
  kategoriProdukIcon: {
    imageUrl: string,    
  },
  namaProduk: string,
  deskripsiSingkatProduk: string,
  tags: string

}