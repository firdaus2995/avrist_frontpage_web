'use client';
import React, { Suspense, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
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
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import GridContainer from '@/components/molecules/specifics/avrast/Containers/Grid';
import CustomForm from '@/components/molecules/specifics/avrast/CustomForm/Index';
import DescriptionCategoryA from '@/components/molecules/specifics/avrast/Descriptions/CategoryA';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import InfoError from '@/components/molecules/specifics/avrast/Info/Error';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SuccessModal } from '@/components/molecules/specifics/avrast/Modal';
import VideoInformation from '@/components/molecules/specifics/avrast/Produk/ContentComponent/VideoInformation';
import { handleGetContent } from '@/services/content-page.api';
import { handleSendEmail } from '@/services/form.api';
import { ContentDetailResponse } from '@/types/content.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  contentTransformer,
  contentDetailTransformer,
  contentStringTransformer,
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const ProdukIndividuDetail = ({ params }: { params: { detail: string } }) => {
  const router = useRouter();
  const [dataRekomendasi, setDataRekomendasi] = useState<IDataContent[]>();
  const [data, setData] = useState<any>({
    titleImage: '',
    footerImage: ''
  });
  const [dataDetail, setDataDetail] = useState<any>();
  const [bannerImg, setBannerImg] = useState<any>();

  const [dataForm, setDataForm] = useState<any>();
  const [formId, setFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [attachment, setAttachment] = useState(false);
  const [attachmentPath, setAttachmentPath] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSubjectSubmitter, setEmailSubjectSubmitter] = useState('');
  const [emailBodySubmitter, setEmailBodySubmitter] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [popUpImage, setPopUpImage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/produk-detail');
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
      const response = await fetch(`/api/produk/individu/${params.detail}`);
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
          setEmailSubject(dataFormJson.data.emailSubject);
          setEmailBody(dataFormJson.data.emailBody);
          setEmailSubjectSubmitter(dataFormJson.data.emailSubjectSubmitter);
          setEmailBodySubmitter(dataFormJson.data.emailBodySubmitter);
        } catch (error: any) {
          throw new Error('Error fetching form data: ', error.message);
        }
      };

      fetchDataForm().then();
    }
  }, [dataDetail]);

  useEffect(() => {
    setAttachment(JSON.stringify(formValue).includes('/var/upload/files'));
    setAttachmentPath(
      formValue
        .filter((item) => item.value.includes('/var/upload/files'))
        .map((item) => item.value)
        .join('|')
    );
  }, [formValue]);

  let titleImage, footerImage;

  if (data && data.footerImage) {
    titleImage = data.titleImage.imageUrl;
    footerImage = data.footerImage.imageUrl;
  }

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
    console.log(isValid);
    console.log(data);
    setFormIsValid(isValid);
    setFormValue(data);
  };

  const onSubmitData = async () => {
    const updatedData = formValue.map((item) => {
      if (item.name.includes('produk')) {
        return { ...item, value: dataDetail?.namaProduk };
      }
      return item;
    });

    const queryParams = {
      id: formId,
      pic: formPic,
      placeholderValue: updatedData,
      attachment: attachment.toString(),
      attachmentPath,
      emailSubject,
      emailBody,
      emailSubjectSubmitter,
      emailBodySubmitter
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
    <div className="flex flex-col">
      <Hero
        title={dataDetail?.namaProduk}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Produk', href: '/produk/individu' },
          {
            title: dataDetail?.namaProduk ?? '',
            href: '/produk/individu/avrist-pasti'
          }
        ]}
        bottomImage={bannerImg?.imageUrl}
        imageUrl={titleImage}
      />
      <Suspense>
        <CustomContainer className="xs:py-[3.125rem] sm:py-[5rem]">
          {!dataDetail || dataDetail?.length === 0 ? (
            <></>
          ) : (
            <div className="flex flex-col xs:gap-[2.25rem] sm:gap-[4rem]">
              <DescriptionCategoryA
                categorySymbol={dataDetail?.kategoriProdukIcon.imageUrl || ''}
                categoryTitle={dataDetail?.categoryTitle || ''}
                productTitle={dataDetail?.namaProduk || ''}
                tags={dataDetail?.tags || []}
                tagLineProduk={dataDetail?.taglineProduk}
                deskripsiLengkapProduk={dataDetail?.deskripsiLengkapProduk}
              />
              {dataDetail.videoProduk !== '' && (
                <VideoInformation
                  url={dataDetail.videoProduk}
                  type={dataDetail.captionVideoProduk}
                  mute={true}
                />
              )}
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
                    title: 'Ringkasan Informasi Produk',
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
                title="Informasi Jalur Pemasaran"
                description={dataDetail?.deskripsiJalurPemasaran}
              />
            </div>
          )}
        </CustomContainer>
      </Suspense>
      <CustomContainer className="bg-purple_superlight py-[5rem]">
        {dataForm && (
          <CustomForm
            customFormClassname="xs:!p-[1.5rem] sm:!p-[2.25rem]"
            onChange={handleChange}
            dataForm={dataForm}
            resultData={receiveData}
            selectedProduct={dataDetail?.namaProduk}
            dataRekomendasi={dataRekomendasi}
            title="Saya tertarik dengan produk ini"
          />
        )}
        <div className="flex flex-row bg-white px-[36px] pb-[36px] rounded-b-[8px] border-b-purple_dark border-b-8 -mt-12 border-x border-x-gray_light">
          <div className="accent-purple_dark flex flex-col items-center gap-[36px] h-full mt-[36px] border-x-gray_light">
            <div className="flex flex-row gap-[12px] font-opensans">
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
                  className="text-purple_dark font-bold"
                  onClick={() => window.open('/keamanan-online', '_blank')}
                >
                  Kebijakan Keamanan Online
                </span>{' '}
                Avrist Life Insurance. Selanjutnya, Saya bersedia untuk
                dihubungi oleh Avrist Life Insurance melalui media komunikasi
                pribadi Saya sesuai hari dan jam operasional yang berlaku di
                Avrist Life Insurance.
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
                  className={`${formIsValid && isChecked ? 'bg-purple_dark' : 'bg-dark-grey'} text-white rounded-lg mt-[12px] md:mt-0 text-xl py-[0.75rem] px-[2.5rem] font-opensans font-semibold`}
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
      <GridContainer
        gridCols={1}
        gridColsSm={3}
        px="32px"
        pxSm="136px"
        py="36px"
        pySm="80px"
        textTitle="Rekomendasi Produk Lainnya"
      >
        {dataRekomendasi &&
          dataRekomendasi.length !== 0 &&
          dataRekomendasi
            .slice(0, 3)
            .map((item, index) => (
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
        bgColor="xs:bg-white md:bg-purple_superlight"
        title={
          <p className="font-light xs:text-[2.25rem] sm:text-[3.5rem] text-black font-karla xs:leading-[2.5rem] md:leading-[67.2px] xs:-tracking-[2.5px] sm:-tracking-[2.24px]">
            <span className="font-bold text-purple_dark">Hello,</span> Ada yang
            bisa <span className="font-bold text-purple_dark">Avrista</span>{' '}
            bantu?
          </p>
        }
        buttonTitle="Tanya Avrista"
        image={footerImage}
        href="/tanya-avrista"
      />
      <RoundedFrameTop bgColor="xs:bg-white md:bg-purple_superlight" />
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
    </div>
  );
};

export default ProdukIndividuDetail;
