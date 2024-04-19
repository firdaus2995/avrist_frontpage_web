'use client';
import React, { Suspense, useEffect, useState } from 'react';

import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';
import GiveHeartSymbol from '@/assets/symbols/giveheart-symbol.svg';
import HeartSymbol from '@/assets/symbols/heart-symbol.svg';
import HeartChatSymbol from '@/assets/symbols/heartchat-symbol.svg';
import InfoRedSymbol from '@/assets/symbols/info-red-symbol.svg';
import ShieldSymbol from '@/assets/symbols/shield-symbol.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import CardCategoryA from '@/components/molecules/specifics/avrast/Cards/CategoryA';
import CategorySideBySideSixCards from '@/components/molecules/specifics/avrast/CategorySideBySideSixCards';
import GridContainer from '@/components/molecules/specifics/avrast/Containers/Grid';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import CustomForm from '@/components/molecules/specifics/avrast/CustomForm/Index';
import DescriptionCategoryA from '@/components/molecules/specifics/avrast/Descriptions/CategoryA';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import InfoError from '@/components/molecules/specifics/avrast/Info/Error';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VideoInformation from '@/components/molecules/specifics/avrast/Produk/ContentComponent/VideoInformation';
import { ContentDetailResponse } from '@/types/content.type';
import {
  contentDetailTransformer,
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukIndividuDetail = ({ params }: { params: { detail: string } }) => {
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [dataDetail, setDataDetail] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/produk-detail');
        const data = await response.json();
        setData(data);

        const { content } = pageTransformer(data);
        const titleImage = singleImageTransformer(content['title-image']);
        const bannerImage = singleImageTransformer(content['banner-image']);
        const footerImage = singleImageTransformer(content['cta1-image']);
        setData({ titleImage, bannerImage, footerImage });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    async function fetchDetailData() {
      const response = await fetch(`/api/produk/individu/${params.detail}`);
      const jsonData: ContentDetailResponse = await response.json();
      console.log({jsonData});
      
      const { content } = contentDetailTransformer(jsonData)      
      const namaProduk = contentStringTransformer(content['nama-produk']);
      const tags = contentStringTransformer(content['tags']);
      const deskripsiSingkatProduk = contentStringTransformer(content['deskripsi-singkat-produk']);
      const taglineProduk = contentStringTransformer(content['tagline-produk']);
      const deskripsiLengkapProduk = contentStringTransformer(content['deskripsi-lengkap-produk']);
      const videoProduk = contentStringTransformer(content['video-produk']);
      const captionVideoProduk = contentStringTransformer(content['caption-video-produk']);
      const deskripsiKeunggulanProduk = contentStringTransformer(content['deskripsi-keunggulan-produk']);
      const deskripsiManfaatProduk = contentStringTransformer(content['deskripsi-manfaat-produk']);
      const deskripsiFiturProduk = contentStringTransformer(content['deskripsi-fitur-produk']);
      const deskripsiInformasiPenting = contentStringTransformer(content['deskripsi-informasi-penting']);
      const deskripsiRiplay = contentStringTransformer(content['deskripsi-riplay']);
      const deskripsiBrosur = contentStringTransformer(content['deskripsi-brosur']);
      const deskripsiJalurPemasaran = contentStringTransformer(content['deskripsi-jalur-pemasaran']);
      const jenisProduk = contentStringTransformer(content['jenis-produk']);
      const channel = contentStringTransformer(content['channel']);
      const produkImage = singleImageTransformer(content['produk-image']);
      const kategoriProdukIcon = singleImageTransformer(content['kategori-produk-icon']);
      const fileRiplay = singleImageTransformer(content['file-riplay']);
      const fileBrosur = singleImageTransformer(content['file-brosur']);

      const detailData = {
        namaProduk,
        tags: tags.split(','),
        deskripsiSingkatProduk,
        taglineProduk,
        deskripsiLengkapProduk,
        videoProduk,
        captionVideoProduk,
        deskripsiKeunggulanProduk,
        deskripsiManfaatProduk,
        deskripsiFiturProduk,
        deskripsiInformasiPenting,
        deskripsiRiplay,
        deskripsiBrosur,
        deskripsiJalurPemasaran,
        jenisProduk,
        channel,
        produkImage,
        kategoriProdukIcon,
        fileRiplay,
        fileBrosur,
        categoryTitle: jsonData.data.categoryName
      };     
      
      setDataDetail(detailData);
    }
    fetchDetailData();

    fetchData();
  }, []);

  let titleImage, bannerImage, footerImage;

  if (data && data.bannerImage && data.footerImage) {
    titleImage = data.titleImage.imageUrl;
    bannerImage = data.bannerImage.imageUrl;
    footerImage = data.footerImage.imageUrl;
  }

  return (
    <div className="flex flex-col">
      <Hero
        title="Produk"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Produk', href: '/produk/individu' },
          {
            title: 'Avrist Pasti',
            href: '/produk/individu/avrist-pasti'
          }
        ]}
        bottomImage={bannerImage}
        imageUrl={titleImage}
      />
      <Suspense>
        <SimpleContainer>
          <DescriptionCategoryA
            categorySymbol={dataDetail?.kategoriProdukIcon.imageUrl || ''}
            categoryTitle={dataDetail?.categoryTitle || ''}
            productTitle={dataDetail?.namaProduk || ''}
            tags={dataDetail?.tags || []}
            tagLineProduk={dataDetail?.taglineProduk}
            deskripsiLengkapProduk={dataDetail?.deskripsiLengkapProduk}
          />
          {dataDetail && <VideoInformation url={dataDetail.videoProduk} type={dataDetail.captionVideoProduk}/>}
          <CategorySideBySideSixCards
            leftSide={[
              {
                symbol: ShieldSymbol,
                title: 'Keunggulan Produk',
                description: dataDetail?.deskripsiKeunggulanProduk     
              },
              {
                symbol: HeartChatSymbol,
                title: 'Manfaat Produ',
                description: dataDetail?.deskripsiManfaatProduk

              },
              {
                symbol: GiveHeartSymbol,
                title: 'Fitur Produk',
                description: dataDetail?.deskripsiFiturProduk
              }
            ]}
            rightSide={[
              {
                title: 'Ringkasan Produk',
                description: `1. Kondisi Yang Sudah Ada Sebelumnya (Pre-Existing Conditions)
                  2. Pemeriksaan kesehatan rutin atau pemeriksaan yang tidak ada hubungannya dengan Penyakit atau Cidera
                  3. Penyakit bawaan, cacat atau kelainan sejak lahir
                  
                  Untuk selengkapnya, silahkan mengacu kepada ketentuan Polis untuk mengetahui jenis-jenis kondisi yang dikecualikan.`
              },
              {
                title: 'Ringkasan Produk',
                description:
                  'Lorem ipsum dolor sit amet consectetur. Enim tellus dignissim mauris lectus hendrerit nisi pulvinar. Ut adipiscing dolor ac mattis. Sit dignissim quam eros non maecenas porta justo. Quis metus et tristique at odio in.',
                hasDownloadButton: true
              },
              {
                title: 'Download Brosur',
                description:
                  'Informasi lebih lanjut mengenai produk Avrist Pasti dengan mengunduh brosur.',
                hasDownloadButton: true
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
      </Suspense>
      <SimpleContainer bgColor="purple_superlight">
        <CustomForm />
      </SimpleContainer>
      <GridContainer
        gridCols={1}
        gridColsSm={3}
        px="32px"
        pxSm="136px"
        py="36px"
        pySm="72px"
        textTitle="Rekomendasi Produk Lainnya"
      >
        {[...Array(3)].map((_, index) => (
          <CardCategoryA
            key={index}
            symbol={HeartSymbol}
            title="Asuransi Jiwa"
            summary="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet"
            tags={['Asuransi Jiwa', 'Premi Tetap', 'Premi Berkala']}
          />
        ))}
      </GridContainer>
      <RoundedFrameBottom frameColor="bg-white" />
      <FooterInformation
        title={
          <p className="text-[56px]">
            <span className="font-bold text-purple_dark">Hello,</span> Ada yang
            bisa <span className="font-bold text-purple_dark">Avrista</span>{' '}
            bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={footerImage}
      />
      <RoundedFrameTop bgColor="bg-white" />
      <FooterCards
        cards={[
          {
            title: 'Rumah Sakit Rekanan',
            icon: ProdukRumahSakit,
            subtitle: 'Lebih Lanjut',
            href: '/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan'
          },
          {
            title: 'Klaim & Layanan',
            icon: ProdukClaim,
            subtitle: 'Lebih Lanjut',
            href: '/klaim-layanan/klaim?tab=Informasi+Klaim'
          },
          {
            title: 'Kelola Polis',
            icon: ProdukPolis,
            subtitle: 'Login Akun',
            href: 'https://my.avrist.com/welcome'
          },
          {
            title: 'Testimonial',
            icon: ProdukTestimoni,
            subtitle: 'Lebih Lanjut',
            href: '/promo-berita/berita?tab=Testimonial'
          }
        ]}
      />
    </div>
  );
};

export default ProdukIndividuDetail;
