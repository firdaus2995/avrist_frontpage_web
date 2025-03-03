'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IDataContent } from '../page';
import GreenHeartChat from '@/assets/images/avrast/avrist-syariah/green-chat-heart.svg';
import GreenShield from '@/assets/images/avrast/avrist-syariah/green-shield.svg';
import GreenGiveHeart from '@/assets/images/avrast/avrist-syariah/klaim-layanan.svg';
import ProdukClaim from '@/assets/images/produk-claim.svg';
import ProdukPolis from '@/assets/images/produk-polis.svg';
import ProdukRumahSakit from '@/assets/images/produk-rumah-sakit.svg';
import ProdukTestimoni from '@/assets/images/produk-testimoni.svg';
import InfoRedSymbol from '@/assets/symbols/info-red-symbol.svg';
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
import InfoError from '@/components/molecules/specifics/avrast/Info/Error';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { SuccessModal } from '@/components/molecules/specifics/avrast/Modal';
import { handleGetContent } from '@/services/content-page.api';
import { handleSendEmail } from '@/services/form.api';
import { ContentDetailResponse } from '@/types/content.type';
import { BASE_SLUG } from '@/utils/baseSlug';
import { getYouTubeId } from '@/utils/helpers';
import {
  contentTransformer,
  customImageTransformer,
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer,
  handleTransformedContent,
  contentDetailTransformer
} from '@/utils/responseTransformer';

const ProdukSyariahDetail = ({ params }: { params: { detail: string } }) => {
  const router = useRouter();
  const [dataRekomendasi, setDataRekomendasi] = useState<IDataContent[]>();
  const [data, setData] = useState<any>({
    titleImage: '',
    footerImage: ''
  });
  const [dataDetail, setDataDetail] = useState<any>();
  const [dataForm, setDataForm] = useState<any>();
  const [bannerImg, setBannerImg] = useState<any>();
  const [bannerImgFit, setBannerImgFit] = useState('');
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
        const response = await fetch('/api/produk-syariah-detail');
        const data = await response.json();
        setData(data);

        const { content } = pageTransformer(data);

        const titleImage = content['title-image']
          ? singleImageTransformer(content['title-image'])
          : { imageUrl: '' };
        const footerImage = content['cta1-image']
          ? singleImageTransformer(content['cta1-image'])
          : { imageUrl: '' };

        setData({ titleImage, footerImage });
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
        tags: tags ? tags.split(',') : [],
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
        categoryTitle:
          jsonData.data.categories
            ?.map((item: any) => item?.categoryName)
            .join(', ') || '',
        formId: jsonData.data?.formId || formProduk || '6979'
      };
      if (formProduk) {
        setFormId(content['form-produk'].value);
      }

      setBannerImg(customImageTransformer(content['produk-image']));
      setBannerImgFit(
        content['banner-image']?.config
          ? JSON.parse(content['banner-image']?.config)?.image_fit
          : ''
      );
      setDataDetail(detailData);
    }

    const fetchDataList = async () => {
      try {
        const contentResponse = await fetch(
          `/api/produk-syariah/content?productFilter=individu`
        );
        const data = await contentResponse.json();
        const newDataContent =
          data.data?.contentDataList?.map((item: any) => {
            return {
              ...handleTransformedContent(item?.contentData, item?.title),
              categoryName: item?.categoryName,
              createdAt: item?.createdAt,
              id: item?.id
            };
          }) || [];
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

        const otherData = sortedData?.filter(
          (item: any) => item?.id !== parseInt(params.detail)
        );
        setDataRekomendasi(otherData);
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFormValue([{ name: '', value: '' }]);
    if (dataDetail?.formId && formId) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(`/api/form?id=${formId}`);
          const dataFormJson = await contentResponse.json();
          setDataForm(dataFormJson.data.attributeList);
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
  }, [dataDetail, formId]);

  useEffect(() => {
    setAttachment(JSON.stringify(formValue).includes('/var/upload/files'));
    setAttachmentPath(
      formValue
        .filter((item) => item?.value.includes('/var/upload/files'))
        .map((item) => item?.value)
        .join('|')
    );
  }, [formValue]);

  const receiveData = (
    data: any,
    isValid: boolean | ((prevState: boolean) => boolean)
  ) => {
    setFormIsValid(isValid);
    setFormValue(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    const emailSubmitterItem = dataForm.find(
      (item: any) => item?.fieldId === 'EMAIL_SUBMITTER'
    );

    const emailSubmitterComponent = emailSubmitterItem
      ? emailSubmitterItem?.componentId
      : '';

    const updatedData = formValue.map((item) => {
      if (item?.name.includes('produk')) {
        return { ...item, value: dataDetail?.namaProduk };
      }
      return item;
    });

    const queryParams = {
      id: formId,
      pic: formPic,
      emailSubmitter: emailSubmitterComponent
        ? formValue.find((item: any) => item?.name === emailSubmitterComponent)
            ?.value
        : '',
      placeholderValue: updatedData,
      attachment: attachment.toString(),
      attachmentPath,
      emailSubject,
      emailBody,
      emailSubjectSubmitter: emailSubjectSubmitter ?? '',
      emailBodySubmitter: emailBodySubmitter ?? ''
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
                href: `#`
              }
            ]}
            imageUrl={data?.titleImage?.imageUrl}
            bottomImage={bannerImg?.imageUrl}
            bottomImageFit={bannerImgFit}
          />
          <div className="flex flex-col xs:py-[3.125rem] xs:px-[2rem] xs:gap-[1.5rem] md:py-[5rem] md:px-[8.5rem] md:gap-[4rem]">
            <AboutHeading
              categoriesIcon={dataDetail?.kategoriProdukIcon.imageUrl}
              categoriesName="Avrist Syariah"
              categoriesClassname="text-syariah_green"
              headingText={dataDetail?.namaProduk}
              subHeadingText={dataDetail?.taglineProduk}
              description={dataDetail?.deskripsiLengkapProduk}
              tags={dataDetail?.tags}
              tagsClassname="bg-gray_bglightgray"
              tagsTextClassname="text-syariah_green"
            />
            {dataDetail?.videoProduk && (
              <div className="flex justify-center w-full h-full">
                {/* <Image src={PlaceholderVideo} alt="video" /> */}
                <div className="w-[1120px]">
                  <VideoPlayer
                    thumbnail=""
                    color="syariah_green"
                    type={dataDetail?.captionVideoProduk}
                    url={getYouTubeId(dataDetail?.videoProduk) ?? ''}
                    mute={true}
                  />
                </div>
              </div>
            )}

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
                buttonClassname="border-syariah_green text-syariah_green hover:bg-syariah_green hover:text-white"
              />
            </div>
            <InfoError
              symbol={InfoRedSymbol}
              title="Informasi Jalur Pemasaran"
              description={dataDetail?.deskripsiJalurPemasaran}
            />
          </div>
          {dataForm && (
            <div className="xs:px-[2rem] xs:py-[3.125rem] md:px-[8.5rem] md:py-[5rem] bg-green_superlight">
              <CustomForm
                onChange={handleChange}
                onSubmit={handleSubmit}
                dataForm={dataForm}
                customFormClassname="border-gray_light p-[2.25rem]"
                resultData={receiveData}
                selectedProduct={dataDetail?.namaProduk}
                title="Saya tertarik dengan produk ini"
              />
              <div className="flex flex-row bg-white px-[36px] pb-[36px] rounded-b-[8px] border-b-syariah_green border-b-8 -mt-12 border-x border-x-gray_light">
                <div className="accent-syariah_green flex flex-col items-center gap-[36px] h-full mt-[36px] border-x-gray_light">
                  <div className="flex flex-row gap-[12px] font-opensans items-start sm:ml-4 sm:-mt-12">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      className="mt-1"
                      onChange={(e) => {
                        setIsChecked(e.target.checked);
                      }}
                    />
                    <label className="cursor-pointer" htmlFor="setuju">
                      Saya setuju memberikan data pribadi Saya kepada Avrist
                      Assurance dan telah membaca{' '}
                      <span
                        className="text-syariah_green font-bold"
                        onClick={() =>
                          window.open('/keamanan-online', '_blank')
                        }
                      >
                        Kebijakan Keamanan Online
                      </span>{' '}
                      Avrist Assurance. Selanjutnya, Saya bersedia untuk
                      dihubungi oleh Avrist Assurance melalui media komunikasi
                      pribadi Saya sesuai hari dan jam operasional yang berlaku
                      di Avrist Assurance.
                    </label>
                  </div>

                  <div className="w-full flex flex-col md:flex-row justify-between items-center">
                    {/* <Image alt="captcha" src={CaptchaPicture} /> */}
                    <div />
                    <div>
                      <button
                        type="submit"
                        disabled={
                          formIsValid ? (isChecked ? false : true) : true
                        }
                        onClick={() => handleSubmit()}
                        className={`${formIsValid && isChecked ? 'bg-syariah_green hover:bg-syariah_green_highlight' : 'bg-dark-grey'} text-white rounded-lg mt-[12px] md:mt-0 text-xl py-[1.125rem] px-[2.5rem] font-opensans font-semibold`}
                      >
                        Beli Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <SimpleContainer>
            <div className="text-center">
              <p className="font-karla font-bold xs:text-[2.25rem] md:text-[3.5rem] xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
                Rekomendasi Produk Lainnya
              </p>
            </div>
            <div className="xs:flex xs:flex-col md:grid md:grid-cols-3 gap-[24px]">
              {dataRekomendasi &&
                dataRekomendasi.length !== 0 &&
                dataRekomendasi
                  .filter((item) => item?.namaProduk !== dataDetail?.namaProduk)
                  .slice(0, 3)
                  .map((item, index) => (
                    <CardProduct
                      key={index}
                      imageProduk={item?.produkImage.imageUrl}
                      symbol={item?.kategoriProdukIcon.imageUrl}
                      title={item?.jenisProduk}
                      summary={item?.namaProduk}
                      description={item?.deskripsiSingkatProduk}
                      tags={item?.tags.split(',')}
                      href={`/avrist-syariah/produk/${item?.id}`}
                      cardClassname="bg-white border-b-syariah_green"
                      cardTitleClassname="text-syariah_green"
                      cardTagsClassname="bg-syariah_green/[.2] text-syariah_green_informing"
                      cardButtonClassname="bg-syariah_green_informing hover:bg-syariah_green_highlight text-white"
                    />
                  ))}
            </div>
          </SimpleContainer>

          <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
          <FooterInformation
            bgColor="bg-syariah_green_informing"
            outerClassName="bg-white"
            buttonVariant="syariah"
            title={
              <p className="font-light xs:text-[2.25rem] sm:text-[3.5rem] text-white font-karla xs:leading-[2.5rem] md:leading-[67.2px] xs:-tracking-[2.5px] sm:-tracking-[2.24px]">
                <span className="font-bold">Hello,</span> Ada yang bisa{' '}
                <span className="font-bold">Avrista</span> bantu?
              </p>
            }
            buttonTitle="Tanya Avrista"
            image={data.footerImage.imageUrl}
            href={'/tanya-avrista'}
          />
          <RoundedFrameTop
            bgColor="bg-purple_superlight"
            frameColor="bg-white"
          />
          <FooterCards
            bgColor="bg-purple_superlight"
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

export default ProdukSyariahDetail;
