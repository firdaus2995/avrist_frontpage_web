import React, { useState, useEffect } from 'react';
import { ISetData } from '@/app/tentang-avrist-life/tentang-avrist-life/page';
import Icon1 from '@/assets/images/common/heart-check.svg';
import Icon2 from '@/assets/images/common/home-add.svg';
import MisiIcon from '@/assets/images/common/misi.svg';
import Icon6 from '@/assets/images/common/money-hand.svg';
import Icon5 from '@/assets/images/common/money-leaf.svg';
import Icon3 from '@/assets/images/common/store.svg';
import VisiIcon from '@/assets/images/common/visi.svg';
import Icon4 from '@/assets/images/common/wallet.svg';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import PurposeCard from '@/components/molecules/specifics/avrast/Cards/PurposeCard';
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import TitleContainer from '@/components/molecules/specifics/avrast/Containers/Title';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import Timeline from '@/components/molecules/specifics/avrast/TimeLine';
import VisiMisi from '@/components/molecules/specifics/avrast/VisiMisi';
import {
  handleGetContent,
  handleGetContentPage
} from '@/services/content-page.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import { getYouTubeId } from '@/utils/helpers';
import {
  handleTransformedContent,
  pageTransformer
} from '@/utils/responseTransformer';

// button variants: primary, secondary

const visiMisi = [
  {
    title: 'Visi',
    icon: VisiIcon,
    desc: 'Satu Polis untuk setiap rumah tangga di Indonesia.'
  },
  {
    title: 'Misi',
    icon: MisiIcon,
    desc: [
      'Merangkul dan meneladani semangat kepeloporan yang menjadi bagian dari sejarah kami yang besar.',
      'Menciptakan tempat bekerja yang terbaik guna memajukan karir serta masa depan.',
      'Menempatkan pemangku kepentingan (karyawan, mitra, dan nasabah) sebagai inti dari setiap hal yang Avrist lakukan.',
      'Menawarkan produk dan layanan Avrist ke setiap rumah tangga.',
      'Memastikan produk Avrist selalu mudah diakses dan terjangkau.',
      'Mengembangkan bisnis Avrist dengan penuh kesigapan, kedispilinan, dan integritas yang tinggi.',
      'Sepenuhnya mempercayai pemangku kepentingan agar mereka juga percaya kepada kami.'
    ]
  }
];

const purposeData = [
  {
    title: 'Lebih dari 45 Tahun',
    desc: 'Berpengalaman lebih dari 45 tahun dalam melindungi keluarga Indonesia.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon1
  },
  {
    title: 'Klaim Mudah',
    desc: 'Klaim mudah, dapat melalui aplikasi Avrist Solution.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon2
  },
  {
    title: 'Seluruh Indonesia',
    desc: 'Kantor cabang, tersebar diseluruh Indonesia.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon3
  },
  {
    title: 'Premi Terjangkau',
    desc: 'Banyak pilihan perlindungan yang sesuai kebutuhan, premi terjangkau mulai dari Rp 7.000/hari.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon4
  },
  {
    title: 'Rekanan Rumah Sakit',
    desc: 'Memiliki 1000+ rekanan rumah sakit di seluruh Indonesia.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon5
  },
  {
    title: 'Tenaga Pemasar Bepengalaman',
    desc: 'Memiliki tenaga pemasar berpengalaman yang akan membantu Anda.',
    link: 'Pelajari Lebih Lanjut',
    icon: Icon6
  }
];

const SekilasPerusahaan: React.FC<ISetData> = ({ setData }) => {
  const [contentData, setContentData] = useState<any>();
  const [contentPage, setContentPage] = useState<any>();

  useEffect(() => {
    const groupedData: any = {};

    handleGetContentPage(
      BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.SEKILAS_PERUSAHAAN
    ).then((res: any) => {
      setData(res);
      setContentPage(pageTransformer(res));
    });

    handleGetContent(BASE_SLUG.TENTANG_AVRIST_LIFE.CONTENT.SEKILAS_PERUSAHAAN, {
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

      const transformedData = transformData(arrayOfObjects[0]?.contentData);

      transformedData?.data.forEach((item: any) => {
        const year = item.year;
        if (!groupedData[year]) {
          groupedData[year] = { year: year, data: [] };
        }
        groupedData[year]['data'].push({
          title: item.title,
          desc: item.desc
        });
      });

      const mergedData = Object.values(groupedData);

      setContentData(mergedData);
    });
  }, []);

  return (
    <div className="w-full flex flex-col bg-white justify-center">
      <CustomContainer className="flex flex-col gap-[1.25rem] font-karla text-black">
        <p className="sm:text-5xl xs:text-3xl font-extrabold xs:mt-[3.125rem] md:mt-[5rem]">
          <span className="text-purple_dark xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Sekilas Avrist
          </span>
        </p>
        <p className="xs:text-xl md:text-[1.5rem] font-light text-justify">
          PT Avrist Assurance (Avrist) adalah perusahaan asuransi jiwa patungan
          pertama di Indonesia yang telah berdiri sejak tahun 1975, Avrist
          Assurance terus berkembang menjadi salah satu perusahaan asuransi jiwa
          terkemuka yang mampu bersaing di industri asuransi jiwa di Indonesia.
          Dengan pengalaman selama lebih dari 45 tahun, Avrist telah
          mengembangkan beberapa kanal distribusi antara Iain Agency,
          Bancassurance, Alternate Partnership, Employee Benefit, dan Syariah
          yang menyediakan produk-produk asuransi jiwa, asuransi kecelakaan dan
          kesehatan, asuransi berbasis syariah, asuransi jiwa kredit dan pensiun
          baik untuk perorangan maupun korporasi. Perkembangan bisnis Avrist
          juga tidak luput dari dukungan lebih dari 1.000 agen yang telah
          memiliki sertifikasi dan lebih dari 300 karyawan yang tersebar di 21
          kantor pemasaran Avrist.
        </p>
        <div className="flex justify-center w-full md:h-[570px] my-[1.25rem]">
          <div className="w-[1120px]">
            <VideoPlayer
              color="purple_dark"
              url={
                getYouTubeId(
                  contentPage?.content['sekilasavrist-video'].value
                ) ?? ''
              }
              mute={true}
            />
          </div>
        </div>
        <p className="font-karla xs:text-xl md:text-[1.5rem] font-light text-justify">
          Sejalan dengan perkembangannya tersebut, Avrist telah memiliki Dana
          Pensiun Lembaga Keuangan (DPLK) Avrist dan 2 (dua) anak
          perusahaan/subsidiary yaitu, PT Avrist General Insurance, dan PT
          Avrist Asset Management. Dengan berlandaskan visi “Satu polis Avrist
          di setiap rumah tangga di Indonesia”, Avrist berkomitmen untuk
          memajukan kehidupan gemilang yang bermakna bagi karyawan, mitra bisnis
          dan pemegang polis. PT Avrist Assurance berizin dan diawasi oleh
          Otoritas Jasa Keuangan.
        </p>
      </CustomContainer>

      <div className="w-full mt-[3.125rem]">
        {contentData && <Timeline data={contentData} />}
      </div>
      <CustomContainer className="xs:my-[3.125rem] sm:my-[5rem]">
        <VisiMisi data={visiMisi} />
      </CustomContainer>

      <CustomContainer className="flex flex-col items-center justify-center bg-purple_superlight">
        <TitleContainer className="text-purple_dark xs:text-center sm:text-left leading-[2.25rem] xs:py-[2.25rem] xs:pb-0 sm:py-[5rem] sm:text-5xl xs:text-3xl font-extrabold">
          Mengapa Avrist Life Insurance?
        </TitleContainer>
        <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-5">
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
        <div className="flex w-full flex-col p-5 gap-4 bg-white border rounded-xl mt-10 mb-2">
          <p className="xs:text-[1.5rem] md:text-[2.25rem] font-bold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            PT Avrist Assurance berizin dan diawasi oleh Otoritas Jasa Keuangan
            (OJK)
          </p>
          <p className="xs:text-lg md:text-xl font-opensans">
            Izin Usaha PT Avrist Assurance nomor: KEP-037/KM.11/1986 tertanggal
            10 Maret 1986
          </p>
        </div>
      </CustomContainer>
      <RoundedFrameBottom frameColor="bg-purple_superlight" />
    </div>
  );
};

export default SekilasPerusahaan;
