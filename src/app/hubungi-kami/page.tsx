"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import {
  MainContent,
  InformationProductFooter
} from '@/components/molecules/specifics/avrast/HubungiKami';
import { getHubungiKami } from '@/services/hubungi-kami.api';
import { contentStringTransformer, pageTransformer, singleImageTransformer } from '@/utils/responseTransformer';

const handleGetContent = async (slug: string) => {
  try {    
    const data = await getHubungiKami(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};

const CallMe =  () => {
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });
  const [formId, setFormId] = useState('');
  const [formSaranId, setFormSaranId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('halaman-hubungi-kami');
        const { content } = pageTransformer(data);

        setTitleImage(singleImageTransformer(content['title-image']));
        setBannerImage(singleImageTransformer(content['banner-image']));
        setFooterImage(singleImageTransformer(content['cta1-image']));
        setFormId(contentStringTransformer(content['form-hubungikami']));
        setFormSaranId(contentStringTransformer(content['form-saran']));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col bg-avrast_product_bg ">
      <Hero
        title="Hubungi Kami"
        breadcrumbsData={[
          { title: 'Beranda', href: '/' },
          {
            title: 'Hubungi Kami',
            href: '/hubungi-kami'
          }
        ]}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
      />
      <MainContent formId={formId} formSaranId={formSaranId} />
      <FooterInformation
        title={
          <div
            className={`md:w-full xs:w-full p-5 flex h-full flex-col md:items-start xs:items-center justify-center gap-10`}
          >
            <p className="md:text-4xl xs:text-2xl md:text-left xs:text-center">
              <span className="font-bold text-purple_dark">
                Bijak Berasuransi.
              </span>{' '}
              Pahami Kewajiban Sebagai{' '}
              <span className="font-bold text-purple_dark">Nasabah</span>
            </p>
            <Link
              role="button"
              className="p-4 bg-purple_dark rounded-xl text-sm font-semibold text-white flex flex-row gap-2"
              href={'/klaim-layanan/klaim?tab=Informasi+Klaim'}
            >
              Standar Pelayanan
            </Link>
          </div>
        }
        image={footerImage.imageUrl}
      />
      <InformationProductFooter />
    </div>
  );
};

export default CallMe;
