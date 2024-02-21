import React from 'react';

import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import DetailHeader from '@/components/molecules/specifics/avram/DetailHeader/DetailHeader';

export const generateStaticParams = () => {
  return [{ detail: 'blue-safir' }];
};

const ReksaDana = ({ params }: { params: { detail: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-purple_dark/[.03]">
      <DetailHeader title="Avrist Blue Savir" />
      <div className="flex flex-col items-center">
        <h1>INI ADALAH PAGE INVESTASI - DETAIL REKSA DANA</h1>
        <h3>{params.detail}</h3>
      </div>

      {/* TABLE */}
      <div className="w-full flex flex-col self-stretch items-center justify-center px-20">
        {/* WEB */}
        <div className="xs:max-lg:hidden flex flex-col self-stretch bg-white p-9 gap-6 rounded-xl">
          <h2 className="font-bold text-2xl text-gray_body">Fitur</h2>
          <div className="flex flex-col">
            <div className="flex px-1 py-2 gap-2 border-b-1 border-purple_verylight">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
            </div>
            <div className="flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
            </div>
            <div className="flex px-1 py-2 gap-2 border-b-1 border-purple_verylight">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
            </div>
            <div className="flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
            </div>
            <div className="flex px-1 py-2 gap-2 border-purple_verylight">
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm	font-bold text-purple_dark">
                  Tanggal Efektif
                </p>
                <p className="text-xl text-gray_body">10 Juni 2010 </p>
              </div>
            </div>
          </div>
        </div>
        {/* MOBILE */}
        <div className="lg:hidden flex flex-col self-stretch bg-white p-9 rounded-xl">
          <div className="flex px-1 py-2 gap-2 border-b-1 border-purple_verylight">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm	font-bold text-purple_dark">
                Tanggal Efektif
              </p>
              <p className="text-xl text-gray_body">10 Juni 2010 </p>
            </div>
          </div>
          <div className="flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm	font-bold text-purple_dark">
                Tanggal Efektif
              </p>
              <p className="text-xl text-gray_body">10 Juni 2010 </p>
            </div>
          </div>
          <div className="flex px-1 py-2 gap-2 border-b-1 border-purple_verylight">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm	font-bold text-purple_dark">
                Tanggal Efektif
              </p>
              <p className="text-xl text-gray_body">10 Juni 2010 </p>
            </div>
          </div>
          <div className="flex px-1 py-2 gap-2 border-b-1 bg-purple_dark/[.03] border-purple_verylight">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm	font-bold text-purple_dark">
                Tanggal Efektif
              </p>
              <p className="text-xl text-gray_body">10 Juni 2010 </p>
            </div>
          </div>
          <div className="flex px-1 py-2 gap-2 border-b-1 border-purple_verylight">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm	font-bold text-purple_dark">
                Tanggal Efektif
              </p>
              <p className="text-xl text-gray_body">10 Juni 2010 </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col self-stretch items-center justify-center md:px-20 xs:p-2 mb-10">
        <div className="grid md:grid-cols-4 xs:grid-cols-1 bg-white p-5 rounded-lg gap-2">
          <div className="max-w-sm p-6 bg-purple_verylight border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 gap-4">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Dokumen Info Produk
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-xs">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <div className="w-full flex items-center justify-center mt-10">
              <Button title="Unduh Dokumen" customButtonClass="bg-white" />
            </div>
          </div>

          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
            <Icon
              width={32}
              height={32}
              name="downloadIcon"
              color="purple_verylight"
            />
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Fun Fact Sheet
            </h5>
            <p className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
              477.92 KB
            </p>
            <p className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-purple_dark text-xs font-bold gap-2"
            >
              Download
              <Icon
                width={16}
                height={16}
                name="chevronRight"
                color="purple_dark"
              />
            </a>
          </div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
            <Icon
              width={32}
              height={32}
              name="downloadIcon"
              color="purple_verylight"
            />
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Prospectus
            </h5>
            <p className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
              299.23 KB
            </p>
            <p className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-purple_dark text-xs font-bold gap-2"
            >
              Download
              <Icon
                width={16}
                height={16}
                name="chevronRight"
                color="purple_dark"
              />
            </a>
          </div>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2">
            <Icon
              width={32}
              height={32}
              name="downloadIcon"
              color="purple_verylight"
            />
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Info Produk
            </h5>
            <p className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
              432.12 KB
            </p>
            <p className="mb-3 font-normal text-xs text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-purple_dark text-xs font-bold gap-2"
            >
              Download
              <Icon
                width={16}
                height={16}
                name="chevronRight"
                color="purple_dark"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReksaDana;
