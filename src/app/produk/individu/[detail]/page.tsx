'use client';
import React, { Suspense, useEffect, useState } from 'react';

import { IDataContent } from '../page';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';
import GiveHeartSymbol from '@/assets/symbols/giveheart-symbol.svg';
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
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukIndividuDetail = ({ params }: { params: { detail: string } }) => {
  const [dataRekomendasi, setDataRekomendasi] = useState<IDataContent[]>();
  const [data, setData] = useState<any>({
    titleImage: '',
    bannerImage: '',
    footerImage: ''
  });
  const [dataDetail, setDataDetail] = useState<any>();
  const [dataForm, setDataForm] = useState<any>();
  const [formValue, setFormValue] = useState({});

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
      const formProduk = contentStringTransformer(content['form-produk']);

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
        categoryTitle: jsonData.data.categoryName,
        formId: jsonData.data?.formId || formProduk || '6979'
      };     
      
      setDataDetail(detailData);
    }

    const fetchDataList = async () => {
      try {
        const contentResponse = await fetch(`/api/produk/content?productFilter=individu`);
        const data = await contentResponse.json();                
        const newDataContent = data.data.contentDataList.map((item: any) => {
          return { 
            ...handleTransformedContent(item.contentData, item.title), 
            categoryName: item.categoryName,
            createdAt: item.createdAt,
            id: item.id
          }
        });                
        const dataContentValues = newDataContent.map(({ content, categoryName, id, createdAt }: { content: any, categoryName: string, id: number, createdAt: string }) => {          
          const namaProduk = contentStringTransformer(content['nama-produk']);
          const tags = contentStringTransformer(content['tags']);
          const deskripsiSingkatProduk = contentStringTransformer(content['deskripsi-singkat-produk']);
          const deskripsiLengkapProduk = contentStringTransformer(content['deskripsi-lengkap-produk']);
          const jenisProduk = contentStringTransformer(content['jenis-produk']);
          const channel = contentStringTransformer(content['channel']);
          const produkImage = singleImageTransformer(content['produk-image']);
          const kategoriProdukIcon = singleImageTransformer(content['kategori-produk-icon']);

          return {
            categoryName,
            namaProduk,
            tags,
            deskripsiSingkatProduk,
            deskripsiLengkapProduk,
            jenisProduk,
            channel,
            produkImage,
            kategoriProdukIcon,
            id,
            createdAt
          };
        });

      const sortedData = dataContentValues.sort((a: { createdAt: string }, b: { createdAt: string }) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
    });    
                
        setDataRekomendasi(sortedData);
        return dataContentValues;              
      }
      catch(error: any) {        
        throw new Error(error.message);
      }
    };

    fetchData().then();
    fetchDetailData().then().catch(() => []);
    fetchDataList().then().catch(() => []);
  }, []);

  useEffect(() => {
    setFormValue({})
    if (dataDetail?.formId) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(`/api/form?id=${dataDetail.formId}`);
          const dataFormJson = await contentResponse.json();
          setDataForm(dataFormJson.data.attributeList);
        } catch (error: any) {
         throw new Error('Error fetching form data: ', error.message);
        }
      };

      fetchDataForm().then();
    }
  }, [dataDetail]);

  let titleImage, bannerImage, footerImage;

  if (data && data.bannerImage && data.footerImage) {
    titleImage = data.titleImage.imageUrl;
    bannerImage = data.bannerImage.imageUrl;
    footerImage = data.footerImage.imageUrl;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;    
    setFormValue(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // handle later when know how to submit form
    setFormValue({})
    console.info(formValue);
  };

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
          {
          !dataDetail || dataDetail?.length === 0 ?
          <></> :
          <>
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
                  title: 'Manfaat Produk',
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
                  title: 'Informasi Penting',
                  description: dataDetail?.deskripsiInformasiPenting
                },
                {
                  title: 'Ringkasan Produk',
                  description: dataDetail?.deskripsiRiplay,
                  hasDownloadButton: true,
                  urlDownload: dataDetail?.fileRiplay.imageUrl
                },
                {
                  title: 'Download Brosur',
                  description: dataDetail?.deskripsiBrosur,
                  hasDownloadButton: true,
                  urlDownload: dataDetail?.fileBrosur.imageUrl
                }
              ]}
            />
            <InfoError
              symbol={InfoRedSymbol}
              title="Jalur Pemasaran"
              description={dataDetail?.deskripsiJalurPemasaran}
            />
          </>
          }
        </SimpleContainer>
      </Suspense>
      <SimpleContainer bgColor="purple_superlight">
      {dataForm && <CustomForm onChange={handleChange} onSubmit={handleSubmit} dataForm={dataForm}/>}
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
        {dataRekomendasi && dataRekomendasi.length !== 0 && dataRekomendasi.map((item, index) => (
          <CardCategoryA
            key={index}
            symbol={item.kategoriProdukIcon.imageUrl}
            title={item.categoryName || ''}
            summary={item.namaProduk}
            description={item.deskripsiSingkatProduk}
            tags={item.tags.split(',')}
            href={`/produk/individu/${item.id}`}        
            imageProduk={item.produkImage.imageUrl}
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
        href='/tanya-avrista'
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
