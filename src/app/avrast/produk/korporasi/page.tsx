import React from "react";
import Image from "next/image";

import GambarProdukIndividu from "@/assets/images/gambar-produk-individu.svg";
import ProdukClaim from "@/assets/images/produk-claim.svg";
import ProdukIndividuImage from "@/assets/images/produk-individu-image.svg";
import ProdukPolis from "@/assets/images/produk-polis.svg";
import ProdukRumahSakit from "@/assets/images/produk-rumah-sakit.svg";
import ProdukTestimoni from "@/assets/images/produk-testimoni.svg";
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';
import ROUNDED_FRAME_TOP from '@/assets/images/rounded-frame-top.svg';
import CategoryWithThreeCards from "@/components/molecules/specifics/avrast/CategoryWithThreeCards";
import FooterCards from "@/components/molecules/specifics/avrast/FooterCards";
import FooterInformation from "@/components/molecules/specifics/avrast/FooterInformation";
import Hero from "@/components/molecules/specifics/avrast/Hero";

const breadcrumbsData = [
  { title: 'Beranda', href: '/avrast' },
  { title: 'Produk', href: '/avrast/produk/korporasi' }
]

const ProdukKorporasi = () => {
  const TopSeparator = () => {
    return (
      <div className="w-full bg-avrast_product_bg">
        <Image
          alt="border"
          className="w-full h-auto"
          src={ROUNDED_FRAME_TOP}
          style={{ userSelect: 'none' }}
        />
      </div>
    )
  }

  const BottomSeparator = () => {
    return (
      <div className="w-full bg-avrast_product_bg">
        <Image
          alt="border"
          className="w-full h-auto"
          src={ROUNDED_FRAME_BOTTOM}
          style={{ userSelect: 'none' }}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Hero title="Produk" breadcrumbsData={breadcrumbsData} bottomImage={GambarProdukIndividu} />
      <CategoryWithThreeCards
        defaultSelectedCategory='Employee Benefit'
        categories={[
          'Employee Benefit'
        ]}
        tabs={[
          { type: 'button', label: 'Individu' },
          { type: 'button', label: 'Korporasi' },
        ]}
      />
      <BottomSeparator />
      <FooterInformation 
        title={<p className="text-[56px]"><span className="font-bold text-purple_dark">Hello,</span> Ada yang bisa <span className="font-bold text-purple_dark">Avrista</span> bantu?</p>}
        buttonTitle='Tanya Avrista'
        image={ProdukIndividuImage}
      />
      <TopSeparator />
      <FooterCards 
        cards={[
          {
            title: 'Rumah Sakit Rekanan',
            icon: ProdukRumahSakit
          },
          {
            title: 'Klaim & Layanan',
            icon: ProdukClaim
          },
          {
            title: 'Kelola Polis',
            icon: ProdukPolis
          },
          {
            title: 'Testimonial',
            icon: ProdukTestimoni
          },
        ]}
      />
    </div>
  )
}

export default ProdukKorporasi;
