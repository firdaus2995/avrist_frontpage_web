'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import NotFound from '@/app/not-found';
import YellowHeart from '@/assets/images/avrast/dplk/klaim-layanan.svg';
import YellowChat from '@/assets/images/avrast/dplk/yellow-chat-heart.svg';
import YellowShield from '@/assets/images/avrast/dplk/yellow-shield.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';

import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import AboutHeading from '@/components/molecules/specifics/avrast/AboutHeading';
import CardProduct from '@/components/molecules/specifics/avrast/Cards/ProductCard';
import CategorySideBySideSixCards from '@/components/molecules/specifics/avrast/CategorySideBySideSixCards';
import SimpleContainer from '@/components/molecules/specifics/avrast/Containers/Simple';
import CustomForm from '@/components/molecules/specifics/avrast/CustomForm/Index';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { SuccessModal } from '@/components/molecules/specifics/avrast/Modal/SuccessModal';
import { handleGetContent } from '@/services/content-page.api';
import { handleSendEmail } from '@/services/form.api';
import { ContentDetailResponse } from '@/types/content.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import { BASE_URL } from '@/utils/baseUrl';
import {
  contentTransformer,
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer,
  handleTransformedContent,
  contentDetailTransformer
} from '@/utils/responseTransformer';

export interface IDataContent {
  categoryName?: string;
  createdAt?: string;
  namaProduk: string;
  tags: string;
  deskripsiSingkatProduk: string;
  jenisProduk: string;
  channel: string;
  produkImage: { imageUrl: string; altText: string };
  kategoriProdukIcon: { imageUrl: string; altText: string };
  id: number;
}

const ProdukDplkDetail = ({ params }: { params: { detail: string } }) => {
  const router = useRouter();
  const [dataRekomendasi, setDataRekomendasi] = useState<IDataContent[]>();
  const [data, setData] = useState<any>({
    titleImage: '',
    footerImage: ''
  });
  const [dataDetail, setDataDetail] = useState<any>();
  const [dataForm, setDataForm] = useState<any>();
  const [bannerImg, setBannerImg] = useState<any>();

  const [formId, setFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [popUpImage, setPopUpImage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/produk-dplk-detail');
        const data = await response.json();
        setData(data);

        const { content } = pageTransformer(data);
        const titleImage = singleImageTransformer(content['title-image']);
        const footerImage = singleImageTransformer(content['cta1-image']);
        setData({ titleImage, footerImage });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    async function fetchDetailData() {
      const response = await fetch(
        `${BASE_URL.contentDetail}/${params.detail}`
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

      setBannerImg(singleImageTransformer(content['produk-image']));
      setDataDetail(detailData);
    }

    const fetchDataList = async () => {
      try {
        const contentResponse = await fetch(`/api/produk-dplk/content`);
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

    const fetchModalImage = async () => {
      try {
        handleGetContent(BASE_SLUG.POP_UP_SUBMIT_FORM, {
          includeAttributes: 'true'
        }).then((res: any) => {
          const { content } = contentTransformer(res);
          const submitImage = singleImageTransformer(content['pop-up-image']);
          setPopUpImage(submitImage.imageUrl);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchModalImage().then();
    fetchData().then();
    fetchDetailData()
      .then()
      .catch(() => []);
    fetchDataList()
      .then()
      .catch(() => []);
  }, []);

  useEffect(() => {
    setFormValue([{ name: '', value: '' }]);
    if (dataDetail?.formId) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(
            `/api/form?id=${dataDetail.formId}`
          );
          const dataFormJson = await contentResponse.json();
          setDataForm(dataFormJson.data.attributeList);
          setFormId(dataFormJson.data.id);
          setFormPic(dataFormJson.data.pic);
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

  const receiveData = (
    data: any,
    isValid: boolean | ((prevState: boolean) => boolean)
  ) => {
    setFormIsValid(isValid);
    setFormValue(data);
  };

  const onSubmitData = async () => {
    const queryParams = {
      id: formId,
      pic: formPic,
      placeholderValue: formValue
    };

    const data = await handleSendEmail(queryParams);
    if (data.status === 'OK') {
      setShowSuccess(true);
    }

    if (data.status !== 'OK') {
      console.error('Error:', data.errors.message);
      router.refresh();
    }
  };

  return (
    <Suspense>
      {!dataDetail || dataDetail?.length === 0 ? null : (
        <div className="flex flex-col">
          <Hero
            title={dataDetail?.namaProduk}
            breadcrumbsData={[
              { title: 'Beranda', href: '/' },
              {
                title: dataDetail?.namaProduk,
                href: `/avrist-dplk/produk/${params.detail}`
              }
            ]}
            imageUrl={data.titleImage.imageUrl}
            bottomImage={bannerImg.imageUrl}
          />
          <SimpleContainer>
            <AboutHeading
              categoriesIcon={dataDetail?.kategoriProdukIcon.imageUrl}
              categoriesName="Avrist DPLK"
              categoriesClassname="text-dplk_yellow"
              headingText={dataDetail?.namaProduk}
              subHeadingText={dataDetail?.taglineProduk}
              description={dataDetail?.deskripsiLengkapProduk}
              tags={dataDetail?.tags}
              tagsClassname="bg-gray_bglightgray"
              tagsTextClassname="text-dplk_yellow"
            />
            <div className="flex justify-center w-full xs:h-[250px] md:h-[650px] xs:mb-[1.5rem] xs:-mt-12 md:mt-0">
              {/* <Image src={PlaceholderVideo} alt="video" /> */}
              <VideoPlayer
                color="dplk_yellow"
                type={dataDetail?.captionVideoProduk}
                url={dataDetail?.videoProduk}
                mute={true}
              />
            </div>
            <div>
              <CategorySideBySideSixCards
                leftSide={[
                  {
                    symbol: YellowShield,
                    title: 'Keunggulan Produk',
                    description: dataDetail?.deskripsiKeunggulanProduk
                  },
                  {
                    symbol: YellowChat,
                    title: 'Manfaat Produk',
                    description: dataDetail?.deskripsiManfaatProduk
                  },
                  {
                    symbol: YellowHeart,
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
                leftTitleClassname="text-dplk_yellow"
                rightTitleClassname="text-black"
                customLeftSideClassname="border-b-dplk_yellow"
                customRightSideClassname="border-b-dplk_yellow"
                buttonClassname="border-dplk_yellow text-dplk_yellow"
              />
            </div>
          </SimpleContainer>
          <SimpleContainer bgColor="yellow_light">
            {dataForm && (
              <CustomForm
                title="Saya tertarik program DPLK"
                customFormClassname="border p-[1.5rem] rounded-[12px]"
                onChange={handleChange}
                dataForm={dataForm}
                resultData={receiveData}
              />
            )}
            <div className="flex flex-row bg-white px-[36px] pb-[36px] rounded-b-[8px] border-b-dplk_yellow border-b-8 -mt-24 border-x border-x-gray_light">
              <div className="accent-dplk_yellow flex flex-col items-center gap-[12px] h-full">
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                    }}
                  />
                  <label className="cursor-pointer" htmlFor="setuju">
                    Saya setuju memberikan data pribadi Saya kepada Avrist Life
                    Insurance dan telah membaca{' '}
                    <span
                      className="text-dplk_yellow font-bold"
                      onClick={() => window.open('/keamanan-online', '_blank')}
                    >
                      Keamanan Online
                    </span>{' '}
                    Avrist Life Insurance. Selanjutnya, Saya bersedia untuk
                    dihubungi oleh Avrist Life Insurance melalui media
                    komunikasi pribadi Saya sesuai hari dan jam operasional yang
                    berlaku di Avrist Life Insurance.
                  </label>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center">
                  {/* <Image alt="captcha" src={CaptchaPicture} /> */}
                  <div />
                  <div>
                    <button
                      type="submit"
                      disabled={formIsValid ? (isChecked ? false : true) : true}
                      onClick={() => onSubmitData()}
                      className={`${formIsValid && isChecked ? 'bg-dplk_yellow' : 'bg-dark-grey'} text-white rounded-lg mt-[12px] md:mt-0 text-xl py-[1.125rem] px-[2.5rem]`}
                    >
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SimpleContainer>
          <SimpleContainer>
            <div className="mx-32px text-center">
              <p className="font-karla font-bold  xs:text-[2.25rem] md:text-[3.5rem]">
                Rekomendasi Produk Lainnya
              </p>
            </div>
            <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-[1rem]">
              {dataRekomendasi &&
                dataRekomendasi.length !== 0 &&
                dataRekomendasi
                  .slice(0, 3)
                  .map((item, index) => (
                    <CardProduct
                      key={index}
                      imageProduk={item.produkImage.imageUrl}
                      symbol={item.kategoriProdukIcon.imageUrl}
                      title={item.jenisProduk}
                      summary={item.namaProduk}
                      description={item.deskripsiSingkatProduk}
                      tags={item.tags.split(',')}
                      href={`/avrist-dplk/produk/${item.id}`}
                      cardClassname="bg-white border-b-dplk_yellow"
                      cardTitleClassname="text-dplk_yellow"
                      cardTagsClassname="bg-dplk_yellow/[.2] text-dplk_yellow"
                      cardButtonClassname="bg-dplk_yellow text-white"
                    />
                  ))}
            </div>
          </SimpleContainer>
          <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
          <FooterInformation
            bgColor="bg-dplk_yellow"
            outerClassName="bg-white"
            buttonVariant="dplk"
            title={
              <p className="xs:text-[2.25rem] sm:text-[3.5rem] text-white font-karla xs:leading-[2.5rem] md:leading-[3.125rem]">
                <span className="font-bold">Hello,</span> Ada yang bisa{' '}
                <span className="font-bold">Avrista</span> bantu?
              </p>
            }
            buttonTitle="Tanya Avrista"
            image={data.footerImage.imageUrl}
            href={'/tanya-avrista'}
          />
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
      <div className="absolute">
        <SuccessModal
          popUpImage={popUpImage}
          show={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            window.location.reload();
          }}
        />
      </div>
    </Suspense>
  );
};

export default ProdukDplkDetail;
