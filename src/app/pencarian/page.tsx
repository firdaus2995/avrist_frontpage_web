'use client';
import { Suspense, useState, useEffect } from 'react';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import EMAIL from '@/assets/images/common/email.svg';
import MESSAGE from '@/assets/images/common/message.svg';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import SearchForm from '@/components/molecules/specifics/avrast/Pencarian/SearchForm';
import { handleGetContentPage } from '@/services/content-page.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const breadcrumbsData = [
  { title: 'Beranda', href: '/' },
  { title: 'Pencarian', href: '/pencarian' }
];

const Pencarian = () => {
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContentPage('pencarian');
        const { content } = pageTransformer(data);
        
        setTitleImage(singleImageTransformer(content['title-image']));
        setFooterImage(singleImageTransformer(content['cta1-image']));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Suspense>
      <div className="flex flex-col bg-purple_superlight">
        <Hero
          title='Pencarian'
          breadcrumbsData={breadcrumbsData}
          imageUrl={titleImage.imageUrl}
        />
        <div className="xs:-mt-[3.4rem] md:-mt-[6.3rem] relative z-[10]">
          {' '}
          <SearchForm />
        </div>

        <RoundedFrameBottom frameColor="bg-white" />
        <FooterInformation
          title={
            <p className="sm:text-[56px] xs:text-[40px] font-karla sm:leading-[67.2px] xs:leading-[48px] -tracking-[2.24px] font-light">
              Solusi inovatif untuk{' '}
              <span className="text-purple_dark font-bold">nasabah</span>,
              <span className="text-purple_dark font-bold"> individu</span> dan{' '}
              <span className="text-purple_dark font-bold">korporasi</span>
            </p>
          }
          buttonTitle="Lihat Produk"
          image={footerImage.imageUrl}
          href="produk/individu"
        />
        <RoundedFrameTop />
        <FooterCards
          bgColor="bg-purple_superlight"
          cards={[
            {
              title: 'Layanan Nasabah',
              subtitle: '021 5789 8188',
              icon: CUSTOMER_SERVICE,
              href: 'tel:021-5789-8188'
            },
            {
              title: 'Tanya Avrista',
              subtitle: 'Lebih Lanjut',
              icon: MESSAGE,
              href: 'tanya-avrista'
            },
            {
              title: 'Tanya Lewat Email',
              subtitle: 'Kirim Email',
              icon: EMAIL,
              href: 'mailto:customer-service@avrist.com'
            },
            {
              title: 'Prosedur Pengaduan',
              subtitle: 'Lihat Prosedur',
              icon: DOCUMENT_SEARCH,
              href: 'avrast/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi'
            }
          ]}
        />
      </div>
    </Suspense>
  );
};

export default Pencarian;
