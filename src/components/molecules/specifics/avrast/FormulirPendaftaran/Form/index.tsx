'use client';

import React from 'react';
import Image from 'next/image';
import Accordion from '../../Accordion';
import DownloadFileButton from '../../DownloadFileButton';
import FAMILY_4 from '@/assets/images/family-4.svg';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import ButtonMenu from '@/components/molecules/specifics/avrast/ButtonMenu';
import SearchBox from '@/components/molecules/specifics/avrast/SearchBox';

const PDFData = [
  {
    title: 'Formulir Pengembalian atau Pengalihan Premi atau Kontribusi',
    fileType: 'PDF'
  },
  {
    title: 'Formulir Pengembalian atau Pengalihan Premi atau Kontribusi',
    fileType: 'PDF'
  },
  {
    title: 'Formulir Pengembalian atau Pengalihan Premi atau Kontribusi',
    fileType: 'PDF'
  },
  {
    title: 'Formulir Pengembalian atau Pengalihan Premi atau Kontribusi',
    fileType: 'PDF'
  },
  {
    title: 'Formulir Pengembalian atau Pengalihan Premi atau Kontribusi',
    fileType: 'PDF'
  }
];

const Form = () => {
  return (
    <div className="z-[1] w-full bg-purple_dark -mt-1">
      <Image
        className="rounded-t-[65px] w-full object-cover h-[640px]"
        alt="gambar-produk-individu"
        src={FAMILY_4}
      />
      <div className="bg-white pt-[100px] px-[32px] md:px-[136px] pb-2">
        <ButtonMenu />

        <section className="w-full flex flex-col items-center text-center my-[60px]">
          <h1 className="font-karla text-[48px] 2xl:text-[56px] text-purple_dark font-medium">
            Kebutuhan formulir dan buku panduan Anda
          </h1>
          <h2 className="font-karla text-[28px] 2xl:text-[36px]">
            <span className="font-bold">Baca</span>,{' '}
            <span className="font-bold">pilih</span>,{' '}
            <span className="font-bold">unduh</span>,{' '}
            <span className="font-bold">isi</span>, dan{' '}
            <span className="font-bold">kirim</span> atau diskusikan dengan
            Kami!
          </h2>
        </section>

        <section className="mb-2">
          <div className="flex flex-row gap-10">
            <div className="w-[23%] h-full bg-purple_light_bg rounded-xl">
              <span className="flex flex-row gap-4 items-center">
                <div className="w-[6px] h-[49px] bg-purple_dark rounded-tl-xl" />
                <p className="text-md 2xl:text-lg font-bold text-purple_dark">
                  Asuransi Jiwa Individu
                </p>
              </span>
              <span className="flex flex-row gap-4 items-center">
                <div className="w-[6px] h-[49px] bg-purple_mediumlight" />
                <p className="text-md 2xl:text-lg font-bold text-purple_mediumlight">
                  Asuransi Jiwa Koperasi
                </p>
              </span>
              <span className="flex flex-row gap-4 items-center">
                <div className="w-[6px] h-[49px] bg-purple_mediumlight" />
                <p className="text-md 2xl:text-lg font-bold text-purple_mediumlight">
                  Avrist Syariah
                </p>
              </span>
              <span className="flex flex-row gap-4 items-center">
                <div className="w-[6px] h-[49px] bg-purple_mediumlight rounded-bl-xl" />
                <p className="text-md 2xl:text-lg font-bold text-purple_mediumlight">
                  Avrist DPLK
                </p>
              </span>
            </div>
            <div className="w-[77%] -mt-3">
              <SearchBox onSearch={() => {}} placeHolder="Cari Formulir" />
              <div className="flex flex-col gap-3">
                <Accordion
                  bgColor="bg-purple_light_bg"
                  title="Pembayaran Premi/Kontribusi"
                  description="Untuk kemudahan transaksi, silakan unduh formulir berdasarkan jenis transaksi yang diperlukan."
                >
                  <Accordion.Item>
                    <>
                      <Accordion title="Formulir">
                        <Accordion.Item>
                          {PDFData.map((item, index) => (
                            <DownloadFileButton
                              title={item.title}
                              fileType={item.fileType}
                              key={index}
                            />
                          ))}
                        </Accordion.Item>
                      </Accordion>
                      <Accordion title="Buku Panduan" />
                    </>
                  </Accordion.Item>
                </Accordion>

                <Accordion
                  bgColor="bg-purple_light_bg"
                  title="Pelayanan Polis"
                  description="Untuk kemudahan transaksi, silakan unduh formulir berdasarkan jenis transaksi yang diperlukan."
                >
                  <Accordion.Item>
                    <Accordion title="Formulir" />
                    <Accordion title="Buku Panduan" />
                  </Accordion.Item>
                </Accordion>

                <Accordion
                  bgColor="bg-purple_light_bg"
                  title="Klaim"
                  description="Untuk kemudahan transaksi, silakan unduh formulir berdasarkan jenis transaksi yang diperlukan."
                >
                  <Accordion.Item>
                    <Accordion title="Formulir" />
                    <Accordion title="Buku Panduan" />
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </div>
      <RoundedFrameBottom />
    </div>
  );
};

export default Form;
