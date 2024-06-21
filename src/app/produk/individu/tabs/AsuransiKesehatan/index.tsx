import React from 'react';
import CardCategoryA from '@/components/molecules/specifics/avrast/Cards/CategoryA';

function AsuransiKesehatan({
  data,
  setState
}: {
  data: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    data && (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
        {data.map((item: any, index: number) => (
          <CardCategoryA
            key={index}
            imageProduk={item.produkImage.imageUrl}
            symbol={item.kategoriProdukIcon.imageUrl}
            title="Asuransi Kesehatan"
            summary={item.namaProduk}
            description={item.deskripsiSingkatProduk}
            tags={item.tags.split(',')}
            href={`/produk/individu/${item.id}`}
            setStateTags={setState}
          />
        ))}
      </div>
    )
  );
}

export default AsuransiKesehatan;
