'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { IDataContent } from '../page';
import NotFound from '@/app/not-found';
import GreenHeartChat from '@/assets/images/avrast/avrist-syariah/green-chat-heart.svg';
import GreenShield from '@/assets/images/avrast/avrist-syariah/green-shield.svg';
import GreenGiveHeart from '@/assets/images/avrast/avrist-syariah/klaim-layanan.svg';
import PlaceholderVideo from '@/assets/images/avrast/avrist-syariah/videotron-syariah.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import AboutHeading from '@/components/molecules/specifics/avrast/AboutHeading';
import HelpCard from '@/components/molecules/specifics/avrast/Cards/HelpCard';
import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategorySideBySideSixCards from '@/components/molecules/specifics/avrast/CategorySideBySideSixCards';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import CustomForm from '@/components/molecules/specifics/avrast/CustomForm/Index';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { ContentDetailResponse } from '@/types/content.type';
import {
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer,
  handleTransformedContent,
  contentDetailTransformer
} from '@/utils/responseTransformer';

const ProdukSyariahDetail = ({ params }: { params: { detail: string } }) => {
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
        const response = await fetch('/api/produk-syariah-detail');
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
      const response = await fetch(
        `/api/produk-syariah/produk/${params.detail}`
      );
      const jsonData: ContentDetailResponse = await response.json();

      const { content } = contentDetailTransformer(jsonData);
      const namaProduk = contentStringTransformer(content['nama-produk']);
      const tags = contentStringTransformer(content['tags']);
      const deskripsiSingkatProduk = contentStringTransformer(
        content['deskripsi-singkat-produk']
      );
      const taglineProduk = contentStringTransformer(content['tagline-produk']);
      const deskripsiLengkapProduk = contentStringTransformer(
        content['deskripsi-lengkap-produk']
      );
      const videoProduk = contentStringTransformer(content['video-produk']);
      const captionVideoProduk = contentStringTransformer(
        content['caption-video-produk']
      );
      const deskripsiKeunggulanProduk = contentStringTransformer(
        content['deskripsi-keunggulan-produk']
      );
      const deskripsiManfaatProduk = contentStringTransformer(
        content['deskripsi-manfaat-produk']
      );
      const deskripsiFiturProduk = contentStringTransformer(
        content['deskripsi-fitur-produk']
      );
      const deskripsiInformasiPenting = contentStringTransformer(
        content['deskripsi-informasi-penting']
      );
      const deskripsiRiplay = contentStringTransformer(
        content['deskripsi-riplay']
      );
      const deskripsiBrosur = contentStringTransformer(
        content['deskripsi-brosur']
      );
      const deskripsiJalurPemasaran = contentStringTransformer(
        content['deskripsi-jalur-pemasaran']
      );
      const jenisProduk = contentStringTransformer(content['jenis-produk']);
      const channel = contentStringTransformer(content['channel']);
      const produkImage = singleImageTransformer(content['produk-image']);
      const kategoriProdukIcon = singleImageTransformer(
        content['kategori-produk-icon']
      );
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
        const contentResponse = await fetch(
          `/api/produk/content?productFilter=individu`
        );
        const data = await contentResponse.json();
        const newDataContent = data.data.contentDataList.map((item: any) => {
          return {
            ...handleTransformedContent(item.contentData, item.title),
            categoryName: item.categoryName,
            createdAt: item.createdAt,
            id: item.id
          };
        });
        const dataContentValues = newDataContent.map(
          ({
            content,
            categoryName,
            id,
            createdAt
          }: {
            content: any;
            categoryName: string;
            id: number;
            createdAt: string;
          }) => {
            const namaProduk = contentStringTransformer(content['nama-produk']);
            const tags = contentStringTransformer(content['tags']);
            const deskripsiSingkatProduk = contentStringTransformer(
              content['deskripsi-singkat-produk']
            );
            const deskripsiLengkapProduk = contentStringTransformer(
              content['deskripsi-lengkap-produk']
            );
            const jenisProduk = contentStringTransformer(
              content['jenis-produk']
            );
            const channel = contentStringTransformer(content['channel']);
            const produkImage = singleImageTransformer(content['produk-image']);
            const kategoriProdukIcon = singleImageTransformer(
              content['kategori-produk-icon']
            );

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
          }
        );

        const sortedData = dataContentValues.sort(
          (a: { createdAt: string }, b: { createdAt: string }) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          }
        );

        setDataRekomendasi(sortedData);
        return dataContentValues;
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchData().then();
    fetchDetailData()
      .then()
      .catch(() => []);
    fetchDataList()
      .then()
      .catch(() => []);
  }, []);

  useEffect(() => {
    setFormValue({});
    if (dataDetail?.formId) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(
            `/api/form?id=${dataDetail.formId}`
          );
          const dataFormJson = await contentResponse.json();
          setDataForm(dataFormJson.data.attributeList);
        } catch (error: any) {
          throw new Error('Error fetching form data: ', error.message);
        }
      };

      fetchDataForm().then();
    }
  }, [dataDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    // handle later when know how to submit form
    setFormValue({});
    console.info(formValue);
  };

  return (
    <Suspense>
      {!dataDetail || dataDetail?.length === 0 ? (
        <NotFound />
      ) : (
        <div className="flex flex-col">
          <Hero
            title={dataDetail?.namaProduk}
            breadcrumbsData={[
              { title: 'Beranda', href: '/t' },
              { title: 'Avrist Syariah', href: '/produk/syariah' },
              {
                title: dataDetail?.namaProduk,
                href: `#`
              }
            ]}
            imageUrl={data.titleImage.imageUrl}
            bottomImage={data.bannerImage.imageUrl}
          />
          <SimpleContainer>
            <AboutHeading
              categoriesIcon={dataDetail?.kategoriProdukIcon.imageUrl}
              categoriesName="Avrist Syariah"
              categoriesClassname="text-syariah_green"
              headingText={dataDetail?.namaProduk}
              subHeadingText={dataDetail?.taglineProduk}
              description={dataDetail?.deskripsiLengkapProduk}
              tags={dataDetail?.tags.split(',')}
              tagsClassname="bg-gray_bglightgray"
              tagsTextClassname="text-syariah_green"
            />
            <div className="flex justify-center w-full h-[650px]">
              {/* <Image src={PlaceholderVideo} alt="video" /> */}
              <VideoPlayer
                color="syariah-green"
                type={dataDetail?.captionVideoProduk}
                thumbnail={PlaceholderVideo}
                url={dataDetail?.videoProduk}
              />
            </div>
            <div>
              <CategorySideBySideSixCards
                leftSide={[
                  {
                    symbol: GreenShield,
                    title: 'Keunggulan Produk',
                    description: dataDetail?.deskripsiKeunggulanProduk
                  },
                  {
                    symbol: GreenHeartChat,
                    title: 'Manfaat Produk',
                    description: dataDetail?.deskripsiManfaatProduk
                  },
                  {
                    symbol: GreenGiveHeart,
                    title: 'Periode Perlindungan',
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
                leftTitleClassname="text-syariah_green"
                rightTitleClassname="text-black"
                customLeftSideClassname="border-b-syariah_green"
                customRightSideClassname="border-b-syariah_green"
                buttonClassname="border-syariah_green text-syariah_green"
              />
            </div>
          </SimpleContainer>
          <SimpleContainer bgColor="purple_superlight">
            {dataForm && (
              <CustomForm
                onChange={handleChange}
                onSubmit={handleSubmit}
                dataForm={dataForm}
              />
            )}
          </SimpleContainer>
          <SimpleContainer>
            <div className="mx-32px text-center">
              <p className="font-karla font-bold text-[56px]">
                Rekomendasi Produk Lainnya
              </p>
            </div>
            <div className="grid grid-cols-3 gap-[24px]">
              {dataRekomendasi &&
                dataRekomendasi.length !== 0 &&
                dataRekomendasi.map((item, index) => (
                  <CardProduct
                    key={index}
                    imageProduk={item.produkImage.imageUrl}
                    symbol={item.kategoriProdukIcon.imageUrl}
                    title={item.jenisProduk}
                    summary={item.namaProduk}
                    description={item.deskripsiSingkatProduk}
                    tags={item.tags.split(',')}
                    href={`/avrist-syariah/produk/${item.id}`}
                    cardClassname="bg-white border-b-syariah_green"
                    cardTitleClassname="text-syariah_green"
                    cardTagsClassname="bg-syariah_green/[.2] text-syariah_green_informing"
                    cardButtonClassname="bg-syariah_green_informing text-white"
                  />
                ))}
            </div>
          </SimpleContainer>
          <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
          <SimpleContainer>
            <HelpCard
              title={
                <p className="text-[56px] text-white">
                  <span className="font-bold">Hello,</span> Ada yang bisa{' '}
                  <span className="font-bold">Avrista</span> bantu?
                </p>
              }
              cardClassname="bg-syariah_green_informing"
              buttonClassname="bg-white border border-white"
              buttonTextClassname="text-syariah_green_informing"
              buttonTitle="Tanya Avrista"
              href="/tanya-avrista"
              image={data.footerImage.imageUrl}
            />
          </SimpleContainer>
          <RoundedFrameTop bgColor="bg-white" frameColor="bg-white" />
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
      )}
    </Suspense>
  );
};

export default ProdukSyariahDetail;
