import { Suspense } from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Source_Sans_3, Karla } from 'next/font/google';
import './globals.css';
import packageJson from '../../package.json';
import ClientSideScrollRestorer from '@/ClientSideScrollRestorer';
import Footer from '@/components/molecules/specifics/avrast/Footer';
import Header from '@/components/molecules/specifics/avrast/Header';

const openSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans'
});
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' });
const GTM_ID: string = process.env.NEXT_PUBLIC_GTM ?? '';

const data = {
  image: new URL("./og-avrast.png", import.meta.url),
  title: 'Avrist Assurance',
  description: 'Avrist Assurance'
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${data.title}`,
    default: data.title
  },
  description: data.description,
  type: 'website',
  openGraph: {
    title: {
      template: `%s | ${data.title}`,
      default: data.title
    },
    description: data.description,
    images: {
      url: data.image,
      type: "image/png",
      alt: "og-avrast",
      width: 392,
      height: 200,
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta content={packageJson.version} name="version" />
        <meta
          key="keywords"
          name="keywords"
          content="AVRIST, avrist, avrist.com, avras, avrist assurance"
        />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <GoogleAnalytics gaId={GTM_ID} />
      <body
        className={`${openSans.variable} ${karla.variable} w-full max-w-screen-2xl 3xl:max-w-screen-3xl mx-auto`}
      >
        <Header />
        {children}
        <Footer />
      </body>
      <Suspense>
        <ClientSideScrollRestorer />
      </Suspense>
    </html>
  );
}
