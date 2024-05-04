import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon2 from '@/assets/images/avrast/about/menagemen.svg';
import Icon3 from '@/assets/images/avrast/about/penghargaan.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import Icon1 from '@/assets/images/common/office.svg';
import Phone from '@/assets/images/common/phone.svg';
import SampleVideo from '@/assets/images/common/sample-video.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import PurposeCard from '@/components/molecules/specifics/avrast/Cards/PurposeCard';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { handleGetContentPage } from '@/services/content-page.api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const purposeData = [
  {
    title: 'Benefit Menarik',
    desc: 'Dapatkan beragam benefit menarik untuk perlindungan kamu dan keluarga dan juga untuk persiapan dana pensiun di masa depan.',
    link: 'Tentang Avrist',
    icon: Icon1,
    href: '/tentang-avrist-life?tab=Sekilas+Perusahaan'
  },
  {
    title: 'Work Life Balance',
    desc: 'Beragam kegiatan sport club dan employee activities seru yang dapat dinikmati setelah pulan kerja.',
    link: 'Manajemen',
    icon: Icon2,
    href: '/tentang-avrist-life/tentang-avrist-life?tab=Manajemen'
  },
  {
    title: 'Pengembangan Diri',
    desc: 'Beragam kegiatan sport club dan employee activities seru yang dapat dinikmati setelah pulan kerja.',
    link: 'Penghargaan',
    icon: Icon3,
    href: '/tentang-avrist-life/tentang-avrist-life?tab=Penghargaan'
  }
];

const Karir = () => {
  const [category, setCategory] = useState('Karyawan');
  const [contentPage, setContentPage] = useState<any>();
  const [contentData, setContentData] = useState<any>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3
  });

  const fetchContentCategory = async () => {
    try {
      const fetchContentCategory = await fetch(
        `/api/karir/content-category?includeAttributes=true&category=${category}&channelFilter=`
      );
      const data = await fetchContentCategory.json();
      const transformData = data.data.categoryList[category];

      const transformedData = transformData?.map((item: any) => {
        const content = item.contentData;
        const namaLoker = content[0].value;
        const iconLokasiLoker = singleImageTransformer(content[1]).imageUrl;
        const lokasiLoker = content[2].value;
        const iconStatusLoker = singleImageTransformer(content[3]).imageUrl;
        const statusLoker = content[4].value;
        const iconWaktuLoker = singleImageTransformer(content[5]).imageUrl;
        const waktuLoker = content[6].value;
        const deskripsiPekerjaan = content[7].value;
        const deskripsiResponsibilities = content[8].value;
        const deskripsiKualifikasi = content[9].value;
        const id = item.id;

        return {
          namaLoker,
          iconLokasiLoker,
          lokasiLoker,
          iconStatusLoker,
          statusLoker,
          iconWaktuLoker,
          waktuLoker,
          deskripsiPekerjaan,
          deskripsiResponsibilities,
          deskripsiKualifikasi,
          id
        };
      });
      setContentData(transformedData);

      return transformedData;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetContentPage('halaman-karir').then((res: any) => {
      setContentPage(pageTransformer(res));
    });

    void fetchContentCategory();
  }, []);

  useEffect(() => {
    fetchContentCategory();
  }, [category]);

  const renderPages = () => {
    if (contentData) {
      for (
        let i = 0;
        i < Math.ceil(contentData.length / pagination.itemsPerPage);
        i++
      ) {
        return (
          <p
            className={`text-[20px] ${i + 1 === pagination.currentPage ? 'text-purple_dark font-bold' : ''} cursor-pointer`}
            onClick={() => setPagination({ ...pagination, currentPage: i + 1 })}
          >
            {i + 1}
          </p>
        );
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          <h2 className="text-[56px] font-bold mb-6 text-purple_dark">
            Tingkatkan karier bersama Avrist Assurance
          </h2>
          <h2 className="text-[36px] mb-6">
            Kesempatan kamu untuk melangkah bersama menjadi perusahaan asuransi
            nomor 1 di Indonesia.
          </h2>
        </div>
        <div className="flex justify-center h-[600px] mb-16 mx-24">
          <VideoPlayer
            color="purple_dark"
            type={contentPage?.content['mengapabergabung-captionvideo'].value}
            url={contentPage?.content['mengapabergabung-video'].value}
            thumbnail={SampleVideo}
          />
        </div>
        <div className="w-full p-20 bg-purple_superlight flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col">
            <h2 className="text-[56px] text-center font-semibold text-purple_dark">
              Mengapa berkarier bersama Avrist Assurance
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {purposeData.map((val, idx) => (
              <PurposeCard
                key={idx}
                title={val.title}
                desc={val.desc}
                link={val.link}
                icon={val.icon}
                href={val.href}
              />
            ))}
          </div>
        </div>
        <h2 className="text-[56px] text-center font-semibold mb-6 text-purple_dark mt-20">
          Lihat Lowongan di Avrist Life Insurance
        </h2>
        <CategoryWithThreeCards
          hideSearchBar
          defaultSelectedCategory={category}
          onCategoryChange={(tab) => setCategory(tab)}
          filterRowLayout={true}
          hidePagination
          categories={['Karyawan', 'Tenaga Pemasar']}
          tabs={[
            {
              type: 'dropdown',
              label: 'tahun',
              options: [
                { label: 'Pilih Tahun', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' }
              ]
            }
          ]}
          customContent={
            <>
              <div className="grid grid-cols-3 gap-[24px]">
                {contentData &&
                  contentData?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="w-full flex flex-col gap-2 items-start p-4 border rounded-xl"
                    >
                      <p className="font-bold text-[24px]">{item.namaLoker}</p>
                      <div className="flex w-full flex-row items-center gap-2">
                        <Image
                          src={item.iconLokasiLoker}
                          alt="lokasi"
                          width={24}
                          height={24}
                        />
                        <p>{item.lokasiLoker}</p>
                      </div>
                      <div className="flex w-full flex-row items-center gap-2">
                        <Image
                          src={item.iconStatusLoker}
                          alt="status"
                          width={24}
                          height={24}
                        />
                        <p>{item.statusLoker}</p>
                      </div>
                      <div className="flex w-full flex-row items-center gap-2">
                        <Image
                          src={item.iconWaktuLoker}
                          alt="waktu"
                          width={24}
                          height={24}
                        />
                        <p>{item.waktuLoker}</p>
                      </div>
                      <Link
                        key={index}
                        className="w-full"
                        href={`/tentang-avrist-life/tentang-avrist-life/tabs/karir/${item.id}`}
                      >
                        <Button
                          title="Lihat Detail"
                          customButtonClass="rounded-xl bg-purple_dark w-full mt-5"
                          customTextClass="text-white"
                        />
                      </Link>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <div>
                  <p className="text-[20px]">
                    Menampilkan{' '}
                    <span className="font-bold text-purple_dark">
                      {pagination.currentPage}-
                      {contentData && contentData.length}
                    </span>{' '}
                    dari{' '}
                    <span className="font-bold">
                      {contentData && contentData.length}
                    </span>{' '}
                    hasil
                  </p>
                </div>
                <div className="flex flex-row gap-[8px] items-center">
                  {renderPages()}
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      setPagination({
                        ...pagination,
                        currentPage: pagination.currentPage + 1
                      })
                    }
                  >
                    <Icon name="chevronRight" color="purple_dark" />
                  </span>
                </div>
              </div>
            </>
          }
        />
      </div>
      <div className="flex flex-col w-full">
        <RoundedFrameBottom />
        <FooterInformation
          bgColor="bg-gray_bglightgray"
          title={
            <div className="flex flex-col items-center justify-center gap-4 bg-gray_bglightgray">
              <p className="text-[56px] font-bold">Hubungi Kami</p>
              <Link
                href="tel:02157898188"
                role="button"
                className="p-4 border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark text-2xl font-bold bg-white"
              >
                <Image src={Phone} alt="phone" className="w-10" />
                <p>021 5789 8188</p>
              </Link>
              <p>
                <span className="font-bold">Waktu Operasional:</span> Senin -
                Jumat, 08.00 - 17.00 WIB
              </p>
            </div>
          }
          image={
            contentPage
              ? singleImageTransformer(contentPage?.content['cta1-image'])
                  .imageUrl
              : BlankImage
          }
        />
        <RoundedFrameTop />
      </div>
    </div>
  );
};

export default Karir;
