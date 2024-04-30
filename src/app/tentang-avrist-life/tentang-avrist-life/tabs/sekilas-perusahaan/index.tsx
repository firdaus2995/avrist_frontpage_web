import { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon1 from '@/assets/images/common/heart-check.svg';
import Icon2 from '@/assets/images/common/home-add.svg';
import MisiIcon from '@/assets/images/common/misi.svg';
import Icon6 from '@/assets/images/common/money-hand.svg';
import Icon5 from '@/assets/images/common/money-leaf.svg';
import SampleVideo from '@/assets/images/common/sample-video.svg';
import Icon3 from '@/assets/images/common/store.svg';
import VisiIcon from '@/assets/images/common/visi.svg';
import Icon4 from '@/assets/images/common/wallet.svg';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import PurposeCard from '@/components/molecules/specifics/avrast/Cards/PurposeCard';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import Timeline from '@/components/molecules/specifics/avrast/TimeLine';
import VisiMisi from '@/components/molecules/specifics/avrast/VisiMisi';
import {
  handleGetContent,
  handleGetContentPage
} from '@/services/content-page.api';
import {
  handleTransformedContent,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

// button variants: primary, secondary

const visiMisi = [
  {
    title: 'Visi',
    icon: VisiIcon,
    desc: 'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.'
  },
  {
    title: 'Misi',
    icon: MisiIcon,
    desc: [
      'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.',
      'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.',
      'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.',
      'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.',
      'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.',
      'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.',
      'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti. Tincidunt nibh ac purus viverra urna bibendum fusce nec.'
    ]
  }
];

const purposeData = [
  {
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti tincidunt nibh ac purus.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon1
  },
  {
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti tincidunt nibh ac purus.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon2
  },
  {
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti tincidunt nibh ac purus.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon3
  },
  {
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti tincidunt nibh ac purus.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon4
  },
  {
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti tincidunt nibh ac purus.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon5
  },
  {
    title: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consectetur. Purus tortor praesent feugiat ultricies aliquam lacinia pretium potenti tincidunt nibh ac purus.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon6
  }
];

const SekilasPerusahaan = () => {
  const [contentData, setContentData] = useState<any>();
  const [contentPage, setContentPage] = useState<any>();

  useEffect(() => {
    handleGetContentPage('halaman-sekilas-perusahaan').then((res: any) => {
      setContentPage(pageTransformer(res));
    });

    handleGetContent('sejarah-sekilas-perusahaan', {
      includeAttributes: 'true'
    }).then((res) => {
      const newDataContent = res.data.contentDataList.map((item: any) => {
        return {
          ...handleTransformedContent(item.contentData, item.title),
          categoryName: item.categoryName,
          id: item.id
        };
      });

      const keyValuePairs = Object.entries(newDataContent[0].content);

      const arrayOfObjects: any = keyValuePairs.map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return {
            section: key,
            ...value
          };
        } else {
          console.error(`Cannot spread non-object value for key: ${key}`);
        }
      });

      const transformData = (data: any) => {
        const transformed = data.map((entry: any) => {
          // Extract relevant information from the details
          const tag = entry.details.find(
            (detail: any) => detail.name === 'Tags'
          );
          const title = entry.details.find(
            (detail: any) => detail.name === 'Judul Timestamp'
          );
          const desc = entry.details.find(
            (detail: any) => detail.name === 'Deskripsi Timestamp'
          );

          return {
            year: tag.value,
            title: title.value,
            desc: desc.value
          };
        });

        return {
          title: 'History', // Constant title for the structure
          data: transformed // The transformed array
        };
      };

      setContentData(transformData(arrayOfObjects[0]?.contentData));
    });
  }, []);

  return (
    <div className="w-full flex flex-col bg-white justify-center">
      <div className="flex flex-col gap-4 px-[32px] py-[50px] sm:px-[136px] sm:py-[72px]">
        <p className="text-[48px]">
          <span className="font-bold text-purple_dark">Sekilas Avrist</span>
        </p>
        <p>
          Avrist Life Insurance merupakan perusahaan keuangan yang bergerak di
          bidang pengelolaan investasi di pasar modal. Avram memiliki izin
          sebagai perusahaan Pengelola Aset berdasarkan KEP-07/BL/MI/2012 oleh
          BAPEPAM-LK pada tahun 2012 & Izin Penasihat Investasi oleh OJK pada
          tahun 2017.
        </p>
        <div className="flex justify-center w-full h-[650px] mb-16">
          <VideoPlayer
            color="purple_dark"
            type={contentPage?.content['sekilasavrist-captionvideo'].value}
            url={contentPage?.content['sekilasavrist-video'].value}
            thumbnail={SampleVideo}
          />
        </div>
        <p>
          Saat ini Avrist Life Insurance memiliki dana kelolaan lebih dari 3,9
          triliun per Desember 2022 dan terus berkembang hingga saat ini. Avrist
          Life Insurance berusaha memenuhi kebutuhan investasi yang dibutuhkan
          masyarakat Indonesia, baik institusi maupun individu dengan
          menyediakan berbagai produk unggulan Reksa Dana seperti Reksa Dana
          Konvesnsional, Reksa Dana Syariah, maupun Reksa Dana Terproteksi.
        </p>
        <div className="mt-20">
          {contentData && (
            <Timeline data={contentData?.data} title={contentData?.title} />
          )}
        </div>
        <VisiMisi data={visiMisi} />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center bg-purple_superlight w-full p-20">
        <div className="flex justify-center items-center p-10">
          <p className="text-[56px] font-bold text-purple_dark">
            Mengapa Avrist Life Insurance?
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {purposeData.map((val, idx) => (
            <PurposeCard
              key={idx}
              title={val.title}
              desc={val.desc}
              link={val.link}
              icon={val.icon}
            />
          ))}
        </div>
        <div className="flex w-full flex-col p-5 gap-4 bg-white border rounded-xl mt-10">
          <p className="text-[36px] font-bold text-purple_dark">
            Izin usaha Avrist dari OJK
          </p>
          <p className="text-[20px]">
            PT Avrist Assurance nomor: KEP-037/KM.11/1986 tertanggal 10 Maret
            1986.
          </p>
        </div>
      </div>
      <RoundedFrameBottom frameColor="bg-purple_superlight" />
    </div>
  );
};

export default SekilasPerusahaan;
