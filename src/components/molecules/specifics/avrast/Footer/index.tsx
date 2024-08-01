'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CustomLink from '../CustomLink';
import IconWrapper from './components/IconWrapper';
import APPSTORE from '@/assets/images/avrast/appstore.svg';
import GOOGLEPLAY from '@/assets/images/avrast/googleplay.svg';
import AVRIST_LOGO from '@/assets/images/avrast/logo.svg';
import FOOTER_IMAGE from '@/assets/images/footer-image.svg';
// import REKSADANA_IMAGE from '@/assets/images/reksadana-logo.svg';
import Icon from '@/components/atoms/Icon';
import { EXTERNAL_URL } from '@/utils/baseUrl';

const additionalInfo = [
  {
    title: 'Syarat Penggunaan',
    href: '/syarat-penggunaan'
  },
  {
    title: 'Kebijakan Keamanan Online',
    href: '/keamanan-online'
  }
];

const Footer = () => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isDplk = pathname.includes('avrist-dplk');

  if (pathname.includes('/under-construction')) return null;
  return (
    <footer className="bg-gradient-to-b from-purple_soft to-purple_dark text-white relative">
      <div className="px-[2rem] md:px-[8.5rem] py-[4rem]">
        <Image
          alt="Avrist"
          width={0}
          height={0}
          className="h-[100px] w-auto"
          src={AVRIST_LOGO}
        />
        {/* Main Content */}
        <div className="grid xs:grid-cols-1 md:grid-cols-[calc(25%+48px)_minmax(8rem,_1fr)_1fr_1fr] md:gap-[1.5rem] xs:gap-[2.25rem] mt-9">
          {/* Opening content */}
          <div className="flex flex-col gap-4 lg:gap-9">
            <p className="font-bold text-[1.25rem] 2xl:w-[60%] font-opensanspro leading-[1.5rem]">
              {isDplk
                ? 'DPLK Avrist berizin dan diawasi oleh Otoritas Jasa Keuangan'
                : 'PT Avrist Assurance berizin dan diawasi oleh Otoritas Jasa Keuangan.'}
            </p>
            <p className="text-sm font-opensans leading-[19.6px]">
              Hak Cipta © 2023.
              <br />
              PT Avrist Life Insurance.
            </p>
            <Image
              width={320}
              height={63.6}
              alt="Avrist"
              className="h-auto min-w-[5rem] max-w-[25rem] w-full"
              src={FOOTER_IMAGE}
            />
          </div>

          {/* Communication content */}
          <div className="flex flex-col gap-6 whitespace-nowrap">
            <p className="font-bold text-white text-xl font-opensanspro leading-[1.5rem]">
              Hubungi Kami
            </p>
            <div className="text-sm flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-opensanspro leading-[25.2px]">
                  Layanan Nasabah
                </p>
                <a
                  href="tel:+622157898188"
                  className="font-bold text-xl font-karla leading-[28.8px] -tracking-[0.72px] hover:underline"
                >
                  021 5789 8188
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-opensanspro leading-[25.2px]">
                  Waktu Operasional
                </p>
                <p className="text-lg font-opensans whitespace-normal font-normal leading-[19.6px]">
                  Senin - Jumat, 08.00 - 17.00 WIB
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-opensanspro leading-[25.2px]">
                  Email
                </p>
                <a
                  href="mailto:customer-service@avrist.com"
                  className="text-lg font-opensans font-normal leading-[19.6px] hover:underline"
                >
                  customer-service@avrist.com
                </a>
              </div>
            </div>
          </div>

          {/* Investation content */}
          {!isHomepage ? (
            <div className="flex flex-col gap-4">
              <Link href="/produk/individu?tab=Asuransi+Jiwa">
                <p className="font-normal text-white text-xl font-opensanspro leading-[1.5rem]  hover:underline">
                  Produk
                </p>
              </Link>
              <div className="flex flex-col gap-4 h-full">
                <Link
                  href="/klaim-layanan/klaim?tab=Informasi+Klaim"
                  className="text-xl flex flex-col gap-2 font-light whitespace-nowrap"
                >
                  <p className="text-xl font-normal text-white font-opensanspro leading-[1.5rem] hover:underline">
                    Klaim
                  </p>
                </Link>
                <Link href="/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan">
                  <p className="text-xl font-normal text-white font-opensanspro leading-[1.5rem] hover:underline">
                    Rumah Sakit Rekanan
                  </p>
                </Link>
                <span className="h-[18px] xs:hidden sm:block" />
                <div className="flex flex-col gap-2 sm:mt-5 xs:mt-2">
                  <p className="text-lg font-bold font-opensanspro leading-[25.2px]">
                    Unduh Avrist Total Solution
                  </p>
                  <div className="flex flex-row gap-2">
                    <Link
                      href={
                        'https://play.google.com/store/apps/details?id=com.avrist.clientapps&pli=1'
                      }
                      target="blank"
                    >
                      <Image
                        alt="Google Play"
                        width={0}
                        height={0}
                        className="h-auto w-[7.143rem]"
                        src={GOOGLEPLAY}
                      />
                    </Link>
                    <Link
                      href={
                        'https://apps.apple.com/id/app/avrist-solution/id6467423188'
                      }
                      target="blank"
                    >
                      <Image
                        alt="App Store"
                        width={0}
                        height={0}
                        className="h-auto w-[7.143rem]"
                        src={APPSTORE}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-bold text-white text-xl font-opensanspro leading-[1.5rem]">
                Tautan Lainnya
              </p>
              <div className="flex flex-col gap-4 h-full">
                <Link
                  href="/produk/individu?tab=Asuransi+Jiwa"
                  className="text-lg flex flex-col gap-2 font-light whitespace-nowrap"
                >
                  <p className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline">
                    Asuransi Jiwa
                  </p>
                </Link>
                <CustomLink href={EXTERNAL_URL.avramUrl}>
                  <p className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline">
                    Investasi
                  </p>
                </CustomLink>
                <CustomLink href={EXTERNAL_URL.agiUrl}>
                  <p className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline">
                    Bengkel Rekanan
                  </p>
                </CustomLink>
                <div className="flex flex-col gap-2 sm:mt-5 xs:mt-2">
                  <p className="text-xl font-bold font-opensanspro leading-[25.2px] cursor-default">
                    Unduh Avrist Total Solution
                  </p>
                  <div className="flex flex-row gap-2">
                    <Link
                      href={
                        'https://play.google.com/store/apps/details?id=com.avrist.clientapps&pli=1'
                      }
                      target="blank"
                    >
                      <Image
                        alt="Google Play"
                        width={0}
                        height={0}
                        className="h-auto w-[7.143rem]"
                        src={GOOGLEPLAY}
                      />
                    </Link>
                    <Link
                      href={
                        'https://apps.apple.com/id/app/avrist-solution/id6467423188'
                      }
                      target="blank"
                    >
                      <Image
                        alt="App Store"
                        width={0}
                        height={0}
                        className="h-auto w-[7.143rem]"
                        src={APPSTORE}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick links content */}
          {!isHomepage ? (
            <div className="flex flex-col gap-6">
              <p className="font-bold text-white text-xl font-opensanspro leading-[1.5rem]">
                Tautan Lainnya
              </p>
              <div className="flex flex-col gap-4 h-full">
                <Link
                  href="/klaim-layanan/layanan?tab=Formulir+%26+Buku+Panduan"
                  className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline"
                >
                  Formulir dan Buku Panduan
                </Link>
                <Link
                  href="/klaim-layanan/layanan?tab=Performa+Investasi"
                  className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline"
                >
                  Performa Investasi
                </Link>
                <Link
                  href="/hubungi-kami"
                  className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline"
                >
                  Agen Aktif
                </Link>
                {/* <div className="w-full mt-3">
                  <Image
                    alt="Reksadana"
                    width={0}
                    height={0}
                    className="h-auto w-[9.912rem]"
                    src={REKSADANA_IMAGE}
                  />
                </div> */}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-bold text-white text-xl font-opensanspro leading-[1.5rem]">
                Avrist Group
              </p>
              <div className="flex flex-col gap-4 h-full">
                <Link
                  href="/produk/individu"
                  className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline"
                >
                  Avrist Life Insurance
                </Link>
                <CustomLink
                  href={EXTERNAL_URL.avramUrl}
                  className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline"
                >
                  Avrist Asset Management
                </CustomLink>
                <CustomLink
                  href={EXTERNAL_URL.agiUrl}
                  className="text-lg font-normal font-opensanspro leading-[25.2px] hover:underline"
                >
                  Avrist General Insurance
                </CustomLink>
                {/* <div className="w-full mt-6 flex items-center justify-start">
                  <Image
                    alt="Reksadana"
                    width={0}
                    height={0}
                    className="h-auto w-[9.912rem]"
                    src={REKSADANA_IMAGE}
                  />
                </div> */}
              </div>
            </div>
          )}
        </div>
        {/* Separator */}
        <div className="border-solid border-purple_separator border-b my-9"></div>
        {/* Bottom content */}
        <div className="flex md:flex-row flex-col justify-between md:gap-4 gap-9 flex-wrap">
          {/* Additional information */}
          <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-4 md:items-center items-start">
            {additionalInfo.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={item.href}>
                  <span className="font-bold text-lg font-opensanspro leading-[25.2px]">
                    {item.title}
                  </span>
                </Link>
                {index === 0 && (
                  <div className="bg-white w-[2px] h-[70%] opacity-[50%]" />
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Social media */}
          <div className="flex items-center gap-4">
            <IconWrapper>
              <Link href={'https://www.youtube.com/@avristian'} target="blank">
                <Icon name="youtubeIcon" color="white" />
              </Link>
            </IconWrapper>
            <IconWrapper>
              <Link
                href={'https://id.linkedin.com/company/avristassurance'}
                target="blank"
              >
                <Icon name="linkedInIcon" color="white" />
              </Link>
            </IconWrapper>
            <IconWrapper>
              <Link
                href={'https://www.instagram.com/avristsolution/'}
                target="blank"
              >
                <Icon name="instaIcon" color="white" />
              </Link>
            </IconWrapper>
            <IconWrapper>
              <Link href={'https://www.facebook.com/avrist/'} target="blank">
                <Icon name="facebookIcon" color="white" />
              </Link>
            </IconWrapper>
            <IconWrapper>
              <Link
                href={
                  'https://www.tiktok.com/@avrist.assurance?_t=8kx4PIJJlFS&_r=1'
                }
                target="blank"
              >
                <Icon name="tiktokIcon" color="white" />
              </Link>
            </IconWrapper>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
