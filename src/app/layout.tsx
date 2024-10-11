import { Suspense } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
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
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Avrist-logo.png/230px-Avrist-logo.png',
  title: 'Avrist Assurance',
  description: 'Avrist Assurance'
};

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    images: data.image
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
        <meta key="description" name="description" content={data.description} />
        <meta key="og-title" property="og:title" content={data.title} />
        <meta
          key="og-description"
          property="og:description"
          content={data.description}
        />
        <meta key="og-image" property="og:image" content={data.image} />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
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
