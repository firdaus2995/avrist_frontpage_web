import { Suspense } from 'react';
import GambarProdukSyariah2 from '@/assets/images/avrast/avrist-syariah/about.svg';
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
import {
  handleGetContent,
  handleGetContentPage
} from '@/services/content-page.api';
import {
  pageTransformer,
  singleImageTransformer,
  contentStringTransformer,
  contentTransformer
} from '@/utils/responseTransformer';

const ProdukSyariahDetail = async ({
  params
}: {
  params: { detail: string };
}) => {
  // page api
  const data = await handleGetContentPage(params.detail);
  const { content, title } = pageTransformer(data);
  const titleImage = singleImageTransformer(content['title-image']);
  const banner = singleImageTransformer(content['banner-image']);
  const footer = singleImageTransformer(content['cta1-image']);
  // const youtubeLink = contentStringTransformer(content['detailproduk-video']);
  // content api
  const apiContent = await handleGetContent('Produk-Avrist-Syariah', {
    includeAttributes: 'true'
  });
  const { content: dataContent } = contentTransformer(apiContent);
  // string
  // const jenisProduk = contentStringTransformer(dataContent['jenis-produk']);
  // const channel = contentStringTransformer(dataContent['channel']);
  const namaProduk = contentStringTransformer(dataContent['nama-produk']);
  // const deskripsiSingkatProduk = contentStringTransformer(
  //   dataContent['deskripsi-singkat-produk']
  // );
  const tags = contentStringTransformer(dataContent['tags']);
  const taglineProduk = contentStringTransformer(dataContent['tagline-produk']);
  const deskripsiLengkapProduk = contentStringTransformer(
    dataContent['deskripsi-lengkap-produk']
  );
  const captionVideoProduk = contentStringTransformer(
    dataContent['caption-video-produk']
  );
  const deskripsiKeunggulanProduk = contentStringTransformer(
    dataContent['deskripsi-keunggulan-produk']
  );
  const deskripsiManfaatProduk = contentStringTransformer(
    dataContent['deskripsi-manfaat-produk']
  );
  const deskripsiFiturProduk = contentStringTransformer(
    dataContent['deskripsi-fitur-produk']
  );
  const deskripsiInformasiPenting = contentStringTransformer(
    dataContent['deskripsi-informasi-penting']
  );
  const deskripsiRiplay = contentStringTransformer(
    dataContent['deskripsi-riplay']
  );
  const deskripsiBrosur = contentStringTransformer(
    dataContent['deskripsi-brosur']
  );
  // const deskripsiJalurPemasaran = contentStringTransformer(
  //   dataContent['deskripsi-jalur-pemasaran']
  // );
  const videoProduk = contentStringTransformer(dataContent['video-produk']);
  // image
  // const produkImage = singleImageTransformer(dataContent['produk-image']);
  const kategoriProdukIcon = singleImageTransformer(
    dataContent['kategori-produk-icon']
  );
  //pdf
  const fileRiplay = singleImageTransformer(dataContent['file-riplay']);
  const fileBrosur = singleImageTransformer(dataContent['file-brosur']);

  return (
    <Suspense>
      <div className="flex flex-col">
        <Hero
          title={title}
          breadcrumbsData={[
            { title: 'Beranda', href: '/t' },
            { title: 'Produk', href: '/produk/syariah' },
            {
              title: title,
              href: `#`
            }
          ]}
          imageUrl={titleImage.imageUrl}
          bottomImage={banner.imageUrl}
        />
        <SimpleContainer>
          <AboutHeading
            categoriesIcon={kategoriProdukIcon.imageUrl}
            categoriesName="Avrist Syariah"
            categoriesClassname="text-syariah_green"
            headingText={namaProduk}
            subHeadingText={taglineProduk}
            description={deskripsiLengkapProduk}
            tags={tags.split(',')}
            tagsClassname="bg-gray_bglightgray"
            tagsTextClassname="text-syariah_green"
          />
          <div className="flex justify-center w-full h-[650px]">
            {/* <Image src={PlaceholderVideo} alt="video" /> */}
            <VideoPlayer
              color="syariah-green"
              type={captionVideoProduk}
              thumbnail={PlaceholderVideo}
              url={videoProduk}
            />
          </div>
          <div>
            <CategorySideBySideSixCards
              leftSide={[
                {
                  symbol: GreenShield,
                  title: 'Keunggulan Produk',
                  description: deskripsiKeunggulanProduk
                },
                {
                  symbol: GreenHeartChat,
                  title: 'Manfaat Produk',
                  description: deskripsiManfaatProduk
                },
                {
                  symbol: GreenGiveHeart,
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
                  hasDownloadButton: true,
                  urlDownload: fileRiplay.imageUrl
                },
                {
                  title: 'Download Brosur',
                  description: deskripsiBrosur,
                  hasDownloadButton: true,
                  urlDownload: fileBrosur.imageUrl
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
          <CustomForm
            customFormClassname="border-b-syariah_green"
            customFormButtonClassname="bg-syariah_green_informing text-white"
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
                symbol={GambarProdukSyariah2}
                title="Avrist Syariah"
                summary="Lorem Ipsum"
                description="Lorem ipsum dolor sit amet consectetur purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti."
                tags={['Avrist Syariah', 'Premi Tetap', 'Premi Berkala']}
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
            image={footer.imageUrl}
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
    </Suspense>
  );
};

export default ProdukSyariahDetail;
