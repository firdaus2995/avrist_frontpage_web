import type { Metadata } from 'next';
import { Source_Sans_3, Karla } from 'next/font/google';
import './globals.css';
import Footer from '@/components/molecules/specifics/avrast/Footer';
import Header from '@/components/molecules/specifics/avrast/Header';

const openSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans'
});
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' });

export const metadata: Metadata = {
  title: 'Avrist Life Insurance',
  description: 'Avrist Life Insurance'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${karla.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
