import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SampleImg1 from '@/assets/images/sample-news-1.svg';
import SampleImg2 from '@/assets/images/sample-news-2.svg';
import SampleImg3 from '@/assets/images/sample-news-3.svg';
import SampleImg4 from '@/assets/images/sample-news-4.svg';

const sliderSettings1 = {
  dots: true,
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1
};

const sliderSettings2 = {
  dots: true,
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  rows: 2
};

const News = () => {
  return (
    <div className="w-full md:p-20 xs:p-5 flex flex-col justify-center gap-5">
      <p className="p-5 text-2xl font-bold">Berita Terkini</p>
      <div className="w-full flex md:flex-row xs:flex-col justify-center gap-5">
        <div className="md:grid md:grid-cols-2 gap-5 xs:hidden md:block">
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
            <Image className="h-auto w-full" src={SampleImg1} alt="sample-1" />
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
              <p className="text-gray-700 text-base line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Strategi Investasi
              </span>
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
            <Image className="h-auto w-full" src={SampleImg2} alt="sample-2" />
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
              <p className="text-gray-700 text-base line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Strategi Investasi
              </span>
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
            <Image className="h-auto w-full" src={SampleImg3} alt="sample-3" />
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
              <p className="text-gray-700 text-base line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Strategi Investasi
              </span>
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
            <Image className="h-auto w-full" src={SampleImg4} alt="sample-4" />
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
              <p className="text-gray-700 text-base line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Strategi Investasi
              </span>
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className="xs:block md:hidden mb-10">
          <Slider {...sliderSettings1}>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <Image
                className="h-auto w-full"
                src={SampleImg1}
                alt="sample-1"
              />
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
                <p className="text-gray-700 text-sm line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Strategi Investasi
                </span>
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <Image
                className="h-auto w-full"
                src={SampleImg2}
                alt="sample-2"
              />
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
                <p className="text-gray-700 text-sm line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Strategi Investasi
                </span>
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <Image
                className="h-auto w-full"
                src={SampleImg3}
                alt="sample-3"
              />
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
                <p className="text-gray-700 text-sm line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Strategi Investasi
                </span>
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
              <Image
                className="h-auto w-full"
                src={SampleImg4}
                alt="sample-4"
              />
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 divide-x-2 w-[90%] my-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
                <p className="text-gray-700 text-sm line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Strategi Investasi
                </span>
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
          </Slider>
        </div>

        <div className="flex flex-col max-w-sm rounded-xl overflow-hidden shadow-lg md:block xs:hidden">
          <div>
            <div className="px-6">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] mb-2 mt-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
            </div>
            <div className="px-6 pt-2 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div>
            <div className="px-6">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] mb-2 mt-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
            </div>
            <div className="px-6 pt-2 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div>
            <div className="px-6">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] mb-2 mt-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
            </div>
            <div className="px-6 pt-2 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div>
            <div className="px-6">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] mb-2 mt-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
            </div>
            <div className="px-6 pt-2 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div>
            <div className="px-6">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] mb-2 mt-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
            </div>
            <div className="px-6 pt-2 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div>
            <div className="px-6">
              <div className="grid grid-cols-2 divide-x-2 w-[90%] mb-2 mt-5">
                <p className="font-bold text-purple">Strategi Investasi</p>
                <p className="text-center">2 jam yang lalu</p>
              </div>
              <div className="font-bold text-xl mb-2">
                Panduan Praktis dari Aset Manajemen Terkemuka
              </div>
            </div>
            <div className="px-6 pt-2 pb-2">
              <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-sm font-semibold text-purple mr-2 mb-2">
                Avram Perspektif
              </span>
            </div>
          </div>
          <div className="my-10 px-6 text-purple font-bold">Lihat semua</div>
        </div>
        {/* mobile */}
        <div className="flex flex-col max-w-sm rounded-xl overflow-hidden shadow-lg md:hidden xs:block">
          <Slider {...sliderSettings2}>
            <div>
              <div className="px-6">
                <div className="grid grid-cols-2 divide-x-2 w-full mb-2 mt-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div>
              <div className="px-6">
                <div className="grid grid-cols-2 divide-x-2 w-full mb-2 mt-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div>
              <div className="px-6">
                <div className="grid grid-cols-2 divide-x-2 w-full mb-2 mt-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div>
              <div className="px-6">
                <div className="grid grid-cols-2 divide-x-2 w-full mb-2 mt-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div>
              <div className="px-6">
                <div className="grid grid-cols-2 divide-x-2 w-full mb-2 mt-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
            <div>
              <div className="px-6">
                <div className="grid grid-cols-2 divide-x-2 w-full mb-2 mt-5">
                  <p className="font-bold text-purple text-xs">
                    Strategi Investasi
                  </p>
                  <p className="text-center text-xs">2 jam yang lalu</p>
                </div>
                <div className="font-bold text-lg mb-2">
                  Panduan Praktis dari Aset Manajemen Terkemuka
                </div>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-light-purple-2 rounded-sm px-3 py-1 text-xs font-semibold text-purple mr-2 mb-2">
                  Avram Perspektif
                </span>
              </div>
            </div>
          </Slider>
          <div className="my-10 px-6 text-purple font-bold">Lihat semua</div>
        </div>
      </div>
    </div>
  );
};

export default News;
