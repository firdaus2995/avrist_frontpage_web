import React from "react";
import Image from "next/image";

import CaptchaPicture from "@/assets/images/form-captcha.svg";
import GambarProdukIndividu from "@/assets/images/gambar-produk-individu.svg";
import PlayVideo from "@/assets/images/play-video.svg";
import ProdukClaim from "@/assets/images/produk-claim.svg";
import ProdukIndividuImage from "@/assets/images/produk-individu-image.svg";
import ProdukPolis from "@/assets/images/produk-polis.svg";
import ProdukRumahSakit from "@/assets/images/produk-rumah-sakit.svg";
import ProdukTestimoni from "@/assets/images/produk-testimoni.svg";
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';
import ROUNDED_FRAME_TOP from '@/assets/images/rounded-frame-top.svg';
import GiveHeartSymbol from "@/assets/symbols/giveheart-symbol.svg";
import HeartSymbol from "@/assets/symbols/heart-symbol.svg";
import HeartChatSymbol from "@/assets/symbols/heartchat-symbol.svg";
import InfoRedSymbol from "@/assets/symbols/info-red-symbol.svg";
import ShieldSymbol from "@/assets/symbols/shield-symbol.svg";
import Button from "@/components/atoms/Button/Button";
import Radio from "@/components/atoms/Radio";
import CardCategoryA from "@/components/molecules/specifics/avrast/Cards/CategoryA";
import CategorySideBySideSixCards from "@/components/molecules/specifics/avrast/CategorySideBySideSixCards";
import GridContainer from "@/components/molecules/specifics/avrast/Containers/Grid";
import SimpleContainer from "@/components/molecules/specifics/avrast/Containers/Simple";
import DescriptionCategoryA from "@/components/molecules/specifics/avrast/Descriptions/CategoryA";
import FooterCards from "@/components/molecules/specifics/avrast/FooterCards";
import FooterInformation from "@/components/molecules/specifics/avrast/FooterInformation";
import Hero from "@/components/molecules/specifics/avrast/Hero";
import InfoError from "@/components/molecules/specifics/avrast/Info/Error";

export const generateStaticParams = () => {
  return [{ detail: 'avrist-pasti' }];
};

const ProdukIndividuDetail = ({ params }: { params: { detail: string } }) => {
  console.log(params);
  
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

  const CustomForm = () => {
    return (
      <div className="flex flex-col self-stretch bg-white p-[36px] gap-[36px] border border-gray_light border-b-4 border-b-purple_dark rounded-[12px] rounded-b-[4px]">
        <p className="font-karla font-bold text-[56px]">Saya tertarik dengan produk ini</p>
        <div className="grid grid-cols-2 gap-[32px]">
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">Saya adalah <span className="text-reddist">*</span></p>
            <Radio id="calon_nasabah" name="tipe_nasabah" label="Calon Nasabah" />
            <Radio id="nasabah" name="tipe_nasabah" label="Nasabah" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">Bapak/Ibu <span className="text-reddist">*</span></p>
            <Radio id="bapak" name="jenis_kelamin" label="Bapak" />
            <Radio id="ibu" name="jenis_kelamin" label="Ibu" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">Alamat Email <span className="text-reddist">*</span></p>
            <input className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]" placeholder="Masukan alamat e-mail Anda" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">Nama <span className="text-reddist">*</span></p>
            <input className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]" placeholder="Masukan nama Anda" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">Kota <span className="text-reddist">*</span></p>
            <input className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]" placeholder="Kota terdekat dari domisili Anda" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold">No Telepon <span className="text-reddist">*</span></p>
            <input className="w-full px-[16px] py-[10px] border border-gray_light rounded-[14px] text-[14px]" placeholder="Masukan nomor telepon" />
          </div>
        </div>
        <div className="accent-purple_dark flex flex-row items-start gap-[12px]">
          <input id='setuju' type="checkbox" value="" className="mt-[6px] text-purple_dark border-gray_verylight rounded focus:purple_dark focus:ring-2 cursor-pointer" />
          <label className="cursor-pointer" htmlFor="setuju">Saya setuju memberikan data pribadi Saya kepada Avrist Life Insurance dan telah membaca <span className="text-purple_dark font-bold">Keamanan Online</span> Avrist Life Insurance. Selanjutnya, Saya bersedia untuk dihubungi oleh Avrist Life Insurance melalui media komunikasi pribadi Saya sesuai hari dan jam operasional yang berlaku di Avrist Life Insurance.</label>
        </div>
        <div className="flex flex-row justify-between items-center">
          <Image alt="captcha" src={CaptchaPicture} />
          <Button title="Kirim" customButtonClass="h-[64px]" customTextClass="text-[20px] font-semibold" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Hero
        title="Produk"
        breadcrumbsData={[
          { title: 'Beranda', href: '/avrast' },
          { title: 'Produk', href: '/avrast/produk/individu' },
          { title: 'Avrist Pasti', href: '/avrast/produk/individu/avrist-pasti' },
        ]}
        bottomImage={GambarProdukIndividu}
      />
      <SimpleContainer>
        <DescriptionCategoryA
          tags={[
            'Asuransi Jiwa', 'Premi Tetap', 'Premi Berkala'
          ]}
        />
        <Image className="self-center" alt="play_video" src={PlayVideo} />
        <CategorySideBySideSixCards
          leftSide={[
            {
              symbol: ShieldSymbol,
              title: 'Manfaat Produk',
              description: 'Lorem ipsum dolor sit amet consectetur. Enim tellus dignissim mauris lectus hendrerit nisi pulvinar. Ut adipiscing dolor ac mattis. Sit dignissim quam eros non maecenas porta justo. Quis metus et tristique at odio in.',
            },
            {
              symbol: HeartChatSymbol,
              title: 'Keunggulan Produk',
              description: 'Lorem ipsum dolor sit amet consectetur. Enim tellus dignissim mauris lectus hendrerit nisi pulvinar. Ut adipiscing dolor ac mattis. Sit dignissim quam eros non maecenas porta justo. Quis metus et tristique at odio in.',
            },
            {
              symbol: GiveHeartSymbol,
              title: 'Periode Perlindungan',
              description: 'Lorem ipsum dolor sit amet consectetur. Enim tellus dignissim mauris lectus hendrerit nisi pulvinar. Ut adipiscing dolor ac mattis. Sit dignissim quam eros non maecenas porta justo. Quis metus et tristique at odio in.',
            },
          ]}
          rightSide={[
            {
              title: 'Ringkasan Produk',
              description: 'Informasi lebih lanjut mengenai produk Avrist Pasti dengan mengunduh brosur.',
            },
            {
              title: 'Ringkasan Produk',
              description: 'Informasi lebih lanjut mengenai produk Avrist Pasti dengan mengunduh brosur.',
              hasDownloadButton: true,
            },
            {
              title: 'Ringkasan Produk',
              description: 'Informasi lebih lanjut mengenai produk Avrist Pasti dengan mengunduh brosur.',
              hasDownloadButton: true,
            }
          ]}
        />
        <InfoError
          symbol={InfoRedSymbol}
          title="Jalur Pemasaran"
          description={`
            <p>1. Tersedia dan dijual di: Tenaga Pemasar dan Bank Partner.</p>
            <p>2. PT Avrist Life Insurance berizin dan diawasi oleh Otoritas Jasa Keuangan, dan tenaga pemasarnya telah memegang lisensi dari Asosiasi Asuransi Jiwa Indonesia.</p>
            <p>3. Produk asuransi yang merupakan hasil kerja sama PT Avrist Life Insurance dengan bank mitra, untuk nasabah setia bank mitra kami.</p>
            <p>4. Bank Partner: BCA, Mandiri, Permata</p>
          `}
        />
      </SimpleContainer>
      <SimpleContainer
        bgColor="purple_superlight"
      >
        <CustomForm />
      </SimpleContainer>
      <GridContainer
        gridCols={3}
      >
        {[...Array(3)].map((_, index) => (
          <CardCategoryA
            key={index}
            symbol={HeartSymbol}
            title="Asuransi Jiwa"
            summary="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet"
            tags={[
              'Asuransi Jiwa', 'Premi Tetap', 'Premi Berkala'
            ]}
          />
        ))}
      </GridContainer>
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
};

export default ProdukIndividuDetail;
