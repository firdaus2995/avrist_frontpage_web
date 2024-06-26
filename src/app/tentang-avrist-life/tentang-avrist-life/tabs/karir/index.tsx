'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ISetData } from '@/app/tentang-avrist-life/tentang-avrist-life/page';
import Icon2 from '@/assets/images/avrast/about/menagemen.svg';
import Icon3 from '@/assets/images/avrast/about/penghargaan.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import Icon1 from '@/assets/images/common/office.svg';
import Phone from '@/assets/images/common/phone.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import PurposeCard from '@/components/molecules/specifics/avrast/Cards/PurposeCard';
import CategoryWithThreeCards from '@/components/molecules/specifics/avrast/CategoryWithThreeCards';
import CustomContainer from '@/components/molecules/specifics/avrast/Containers/Custom';
import TitleContainer from '@/components/molecules/specifics/avrast/Containers/Title';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import VideoPlayer from '@/components/molecules/specifics/avrast/Klaim/VideoPlayer';
import { handleGetContentPage } from '@/services/content-page.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import { getYouTubeId } from '@/utils/helpers';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const purposeData = [
  {
    title: '<span class="italic">Benefit</span> Menarik',
    desc: 'Dapatkan beragam <span class="italic">benefit</span> menarik untuk perlindungan kamu dan keluarga dan juga untuk persiapan dana pensiun di masa depan.',
    link: 'Tentang Avrist',
    icon: Icon1,
    href: '/tentang-avrist-life?tab=Sekilas+Perusahaan'
  },
  {
    title: '<span class="italic">Work Life Balance</span>',
    desc: 'Beragam kegiatan <span class="italic">sport club</span> dan <span class="italic">employee activities</span> seru yang dapat dinikmati setelah pulang kerja.',
    link: 'Manajemen',
    icon: Icon2,
    href: '/tentang-avrist-life/tentang-avrist-life?tab=Manajemen'
  },
  {
    title: 'Pengembangan Diri',
    desc: 'Program <span class="italic">learning & development</span> yang dapat memfasilitasi karyawan untuk mengembangkan diri dan tumbuh bersama Avrist.',
    link: 'Penghargaan',
    icon: Icon3,
    href: '/tentang-avrist-life/tentang-avrist-life?tab=Penghargaan'
  }
];

const Karir: React.FC<ISetData> = ({ setData }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [category, setCategory] = useState('Karyawan');
  const [contentPage, setContentPage] = useState<any>();
  const [contentData, setContentData] = useState<any>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3
  });
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedData = contentData
    ? contentData?.slice(startIndex, endIndex)
    : [];
  const totalPages = contentData
    ? Math.ceil(contentData?.length / pagination.itemsPerPage)
    : 0;

  const fetchContentCategory = async () => {
    try {
      const fetchContentCategory = await fetch(
        `/api/karir/content-category?includeAttributes=true`
      );
      const data = await fetchContentCategory.json();
      const transformData = data.data.categoryList[''];

      const transformedData = transformData?.map((item: any) => {
        const content = item.contentData;
        const namaLoker = content[0].value;
        const iconLokasiLoker = singleImageTransformer(content[1]).imageUrl;
        const lokasiLoker = content[2].value;
        const iconStatusLoker = singleImageTransformer(content[3]).imageUrl;
        const statusLoker = content[4].value;
        const urlLoker = content[5].value;
        const id = item.id;

        return {
          namaLoker,
          iconLokasiLoker,
          lokasiLoker,
          iconStatusLoker,
          statusLoker,
          urlLoker,
          id
        };
      });
      setContentData(transformedData);

      return transformedData;
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  useEffect(() => {
    handleGetContentPage(BASE_SLUG.TENTANG_AVRIST_LIFE.PAGE.KARIR).then(
      (res: any) => {
        setData(res);
        setContentPage(pageTransformer(res));
      }
    );

    void fetchContentCategory();
  }, []);

  useEffect(() => {
    if (category !== 'Karyawan') {
      router.push(`${pathname}/tabs/karir/detail`);
    }
  }, [category]);

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      <CustomContainer className="flex flex-col gap-[5rem]">
        <div className="w-full flex flex-col items-center justify-center text-center font-karla gap-[0.75rem]">
          <TitleContainer className="font-medium text-purple_dark !mb-0">
            Tingkatkan karier bersama Avrist Assurance
          </TitleContainer>
          <h2 className="xs:text-[1.5rem] md:text-[2.25rem] mb-6">
            Kesempatan kamu untuk melangkah bersama menjadi perusahaan asuransi
            nomor 1 di Indonesia.
          </h2>
        </div>
        <div className="flex justify-center xs:h-[200px] md:h-[651px] mb-[5rem]">
          <VideoPlayer
            color="purple_dark"
            type={contentPage?.content['mengapabergabung-captionvideo'].value}
            url={
              getYouTubeId(
                contentPage?.content['mengapabergabung-video'].value
              ) ?? ''
            }
            thumbnail={''}
            mute={true}
          />
        </div>
      </CustomContainer>
      <div className="flex flex-col w-full">
        <CustomContainer className="w-full bg-purple_superlight flex flex-col items-center justify-center pb-[5rem]">
          <div className="flex flex-col">
            <TitleContainer className="text-center font-semibold text-purple_dark">
              Mengapa berkarier bersama Avrist Assurance
            </TitleContainer>
          </div>
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
        </CustomContainer>
        <TitleContainer className="px-[2rem] text-center font-medium text-purple_dark sm:!mb-0 xs:my-[1.25rem]">
          Lihat Lowongan di Avrist Life Insurance
        </TitleContainer>
        <CategoryWithThreeCards
          hideSearchBar
          defaultSelectedCategory={category}
          onCategoryChange={(tab) => {
            setCategory(tab);
            if (category === 'Karyawan') {
              fetchContentCategory();
            }
          }}
          filterRowLayout={true}
          hidePagination
          categories={['Karyawan', 'Tenaga Pemasar']}
          tabs={[]}
          customContent={
            <>
              <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
                {contentData &&
                  paginatedData?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="w-full flex flex-col gap-2 items-start p-4 border rounded-xl"
                    >
                      <p className="font-bold text-[1.5rem]">
                        {item.namaLoker}
                      </p>
                      <div className="flex w-full flex-row items-center gap-2">
                        <Image
                          src={item.iconLokasiLoker}
                          alt="lokasi"
                          width={24}
                          height={24}
                        />
                        <p className="font-opensans font-lg">
                          {item.lokasiLoker}
                        </p>
                      </div>
                      <div className="flex w-full flex-row items-center gap-2">
                        <Image
                          src={item.iconStatusLoker}
                          alt="status"
                          width={24}
                          height={24}
                        />
                        <p className="font-opensans font-lg">
                          {item.statusLoker}
                        </p>
                      </div>
                      <div className="flex w-full flex-row items-center gap-2 hidden">
                        <Image
                          src={item.iconWaktuLoker}
                          alt="waktu"
                          width={24}
                          height={24}
                        />
                        <p className="font-opensans font-lg">
                          {item.waktuLoker}
                        </p>
                      </div>
                      <Link
                        className="w-full"
                        href={item.urlLoker}
                        target="blank"
                      >
                        <Button
                          title="Lihat Detail"
                          customButtonClass="rounded-xl bg-purple_dark w-full mt-2"
                          customTextClass="text-white font-opensans text-xl font-normal"
                        />
                      </Link>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <div>
                  <p className="text-[1.25rem]">
                    Menampilkan{' '}
                    <span className="font-bold text-purple_dark">
                      {contentData ? startIndex + 1 : 0}-
                      {Math.min(endIndex, contentData ? contentData.length : 0)}
                    </span>{' '}
                    dari{' '}
                    <span className="font-bold">
                      {contentData ? contentData.length : 0}
                    </span>{' '}
                    hasil
                  </p>
                </div>
                <div className="flex flex-row gap-[8px] items-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <div
                        key={page}
                        role="button"
                        onClick={() => handlePageChange(page)}
                        className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                          pagination.currentPage === page
                            ? 'text-purple_dark font-bold'
                            : ''
                        }`}
                      >
                        {page}
                      </div>
                    )
                  )}
                  <span
                    className="mt-[3px]"
                    role="button"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    <Icon name="chevronRight" color="purple_dark" />
                  </span>
                </div>
              </div>
            </>
          }
        />
        <RoundedFrameBottom />
        <FooterInformation
          bgColor="bg-gray_bglightgray"
          title={
            <div className="flex flex-col items-center justify-center gap-4 bg-gray_bglightgray">
              <p className="xs:text-[2.25rem] md:text-[3.5rem] font-extrabold font-karla">
                Hubungi Kami
              </p>
              <div>
                <Link
                  href="tel:02157898188"
                  role="button"
                  className="py-4 px-[3.25rem] border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark xs:text-[1.25rem] md:text-[2.25rem] font-bold bg-white font-karla"
                >
                  <Image src={Phone} alt="phone" className="w-10" />
                  <p>021 5789 8188</p>
                </Link>
              </div>

              <p className="text-xl">
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
        <div className="sm:-mb-12">
          <RoundedFrameTop bgColor="xs:bg-white sm:bg-purple_superlight" />
        </div>
      </div>
    </div>
  );
};

export default Karir;
