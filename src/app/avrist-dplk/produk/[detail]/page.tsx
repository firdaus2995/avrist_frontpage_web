// import Image from 'next/image';

// import HeroDplk3 from '@/assets/images/avrast/dplk/hero-dplk-3.svg';
import YellowHeart from '@/assets/images/avrast/dplk/klaim-layanan.svg';
// import VideoDplk from '@/assets/images/avrast/dplk/videotron-dplk.svg';
import YellowChat from '@/assets/images/avrast/dplk/yellow-chat-heart.svg';
import YellowHomeSun from '@/assets/images/avrast/dplk/yellow-dplk-home-sun.svg';
import YellowShield from '@/assets/images/avrast/dplk/yellow-shield.svg';

// import BlankImage from '@/assets/images/blank-image.svg';

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
import {
  handleGetContentDetail,
  handleGetContentPage
} from '@/services/content-page.api';
import {
  contentDetailTransformer,
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer
} from '@/utils/responseTransformer';

const ProdukSyariahDetail = async ({
  params
}: {
  params: { detail: string };
}) => {
  const pageData = await handleGetContentPage('halaman-detail-produk-dplk');
  const detailData = await handleGetContentDetail(params.detail);
  // page
  const { content } = pageTransformer(pageData);
  const titleImage = singleImageTransformer(content['title-image']);
  const cta1Image = singleImageTransformer(content['cta1-image']);
  // const bannerImage = singleImageTransformer(content['banner-image']);

  // detail
  const { content: contentDetail } = contentDetailTransformer(detailData);
  const produkImage = singleImageTransformer(contentDetail['produk-image']);
  // const channel = contentStringTransformer(contentDetail['channel']);
  const namaProduk = contentStringTransformer(contentDetail['nama-produk']);
  const taglineProduk = contentStringTransformer(
    contentDetail['tagline-produk']
  );
  const deskripsiLengkapProduk = contentStringTransformer(
    contentDetail['deskripsi-lurator-produk']
  );
  const tags = contentStringTransformer(contentDetail['tags']) as string;
  // const videoProduk = contentStringTransformer(contentDetail['video-produk']);
  // const captionVideoProduk = contentStringTransformer(
  //   contentDetail['caption-video-produk']
  // );
  const deskripsiKeunggulanProduk = contentStringTransformer(
    contentDetail['deskripsi-keunggulan-produk']
  );
  const deskripsiManfaatProduk = contentStringTransformer(
    contentDetail['deskripsi-manfaat-produk']
  );
  const deskripsiFiturProduk = contentStringTransformer(
    contentDetail['deskripsi-fitur-produk']
  );
  const deskripsiInformasiPenting = contentStringTransformer(
    contentDetail['deskripsi-informasi-penting']
  );
  const deskripsiRiplay = contentStringTransformer(
    contentDetail['deskripsi-riplay']
  );
  const fileRiplay = singleImageTransformer(contentDetail['file-riplay']);
  const deskripsiBrosur = contentStringTransformer(
    contentDetail['deskripsi-brosur']
  );
  const fileBrosur = singleImageTransformer(contentDetail['file-brosur']);
  // const deskripsiJalurPemasaran = contentStringTransformer(
  //   contentDetail['deskripsi-jalur-pemasaran']
  // );
  return (
    <div className="flex flex-col">
      <Hero
        title={namaProduk}
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          { title: 'Produk', href: '/avrist-dplk/produk' },
          {
            title: namaProduk,
            href: `/avrist-dplk/produk/${params.detail}`
          }
        ]}
        bottomImage={produkImage.imageUrl}
        imageUrl={titleImage.imageUrl}
      />
      <SimpleContainer>
        <AboutHeading
          categoriesIcon={YellowHomeSun}
          categoriesName="Avrist Syariah"
          categoriesClassname="text-dplk_yellow"
          headingText={namaProduk}
          subHeadingText={taglineProduk}
          description={deskripsiLengkapProduk}
          tags={tags.split(',')}
          tagsClassname="bg-gray_bglightgray"
          tagsTextClassname="text-dplk_yellow"
        />
        <div className="flex justify-center w-full">
          {/* <Image src={VideoDplk} alt="video" /> */}
        </div>
        <div>
          <CategorySideBySideSixCards
            leftSide={[
              {
                symbol: YellowShield,
                title: 'Manfaat Produk',
                description: deskripsiKeunggulanProduk
              },
              {
                symbol: YellowChat,
                title: 'Keunggulan Produk',
                description: deskripsiManfaatProduk
              },
              {
                symbol: YellowHeart,
                title: 'Periode Perlindungan',
                description: deskripsiFiturProduk
              }
            ]}
            rightSide={[
              {
                title: 'Informasi Penting',
                description: deskripsiInformasiPenting
              },
              {
                title: 'Ringkasan Produk',
                description: deskripsiRiplay,
                urlDownload: fileRiplay.imageUrl,
                hasDownloadButton: true
              },
              {
                title: 'Download Brosur',
                description: deskripsiBrosur,
                urlDownload: fileBrosur.imageUrl,
                hasDownloadButton: true
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
      <SimpleContainer bgColor="purple_superlight">
        <CustomForm
          customFormClassname="border-b-dplk_yellow"
          customFormButtonClassname="bg-dplk_yellow text-white"
        />
      </SimpleContainer>
      <SimpleContainer>
        <div className="mx-32px text-center">
          <p className="font-karla font-bold text-[56px]">
            Rekomendasi Produk Lainnya
          </p>
        </div>
        <div className="grid grid-cols-3 gap-[24px]">
          {[...Array(3)].map((_, index) => (
            <CardProduct
              key={index}
              symbol={YellowHomeSun}
              title="Avrist DPLK"
              summary="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti."
              tags={['Avrist DPLK', 'Premi Tetap', 'Premi Berkala']}
              cardClassname="bg-white border-b-dplk_yellow"
              cardTitleClassname="text-dplk_yellow"
              cardTagsClassname="bg-dplk_yellow/[.2] text-dplk_yellow"
              cardButtonClassname="bg-dplk_yellow text-white"
            />
          ))}
        </div>
      </SimpleContainer>
      <RoundedFrameBottom bgColor="bg-white" frameColor="bg-white" />
      <SimpleContainer>
        <HelpCard
          title={
            <p className="text-[56px] text-black">
              <span className="font-bold">Hello,</span> Ada yang bisa{' '}
              <span className="font-bold">Avrista</span> bantu?
            </p>
          }
          cardClassname="bg-dplk_yellow"
          buttonClassname="bg-white border border-white"
          buttonTextClassname="text-dplk_yellow"
          buttonTitle="Tanya Avrista"
          href="/tanya-avrista"
          image={cta1Image.imageUrl}
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
            href: '/avrist-syariah/klaim-layanan'
          },
          {
            title: 'Kelola Polis',
            icon: ProdukPolis,
            subtitle: 'Login Akun',
            href: '/klaim-layanan/layanan/kelola-polis'
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

export default ProdukSyariahDetail;
