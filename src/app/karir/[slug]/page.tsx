import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import phone from '@/assets/images/common/phone.svg';
import { Header } from '@/components/molecules/specifics/avrast/InformasiNasabah';
import {
  MainContent,
  BannerFooter,
  CardMenuFooter
} from '@/components/molecules/specifics/avrast/KarirDetail';
import { getDetailKarir } from '@/services/detail-karir.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const handleGetDetail = async (slug: string) => {
  try {
    const data = await getDetailKarir(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};

const DetailKarir = async ({ params }: { params: { slug: string } }) => {
  const data = await handleGetDetail(params.slug);
  const { title, content } = pageTransformer(data);

  const bannerImage = singleImageTransformer(content['title-image']);
  const footerImage = singleImageTransformer(content['cta1-image']);

  return (
    <Suspense>
      <div className="flex flex-col bg-avrast_product_bg">
        <Header
          menu={[{ label: title, href: '/karir' }]}
          title={title}
          bannerImageSrc={bannerImage.imageUrl}
        />
        <MainContent />
        <BannerFooter imageUrl={footerImage.imageUrl}>
          <div className="flex items-center justify-center w-full">
            <div className="h-80 flex-col justify-center items-center gap-8 inline-flex">
              <div className="flex-col justify-start items-start gap-4 flex">
                <div className="text-zinc-900 text-[56px] font-extrabold font-karla leading-[61.60px]">
                  Hubungi Kami
                </div>
              </div>
              <div className="justify-start items-center gap-3 inline-flex">
                <div className="justify-end items-center gap-2 flex">
                  <div className="flex-col justify-end items-center gap-2 inline-flex">
                    <Link
                      href="tel:021-5789-8188"
                      className="px-[52px] py-3 bg-white rounded-lg border border-purple_dark justify-center items-center gap-2 inline-flex"
                    >
                      <Image src={phone} height={48} width={48} alt="phone" />
                      <span className="text-center text-purple_dark text-4xl font-bold font-karla leading-[43.20px]">
                        021 5789 8188
                      </span>
                    </Link>
                    <div className="text-center">
                      <span className="text-zinc-800 text-xl font-bold font-opensans leading-7">
                        Waktu Operasional:{' '}
                      </span>
                      <span className="text-zinc-800 text-xl font-normal font-opensans leading-7">
                        Senin - Jumat, 08.00 - 17.00 WIB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BannerFooter>
        <CardMenuFooter />
      </div>
    </Suspense>
  );
};

export default DetailKarir;
