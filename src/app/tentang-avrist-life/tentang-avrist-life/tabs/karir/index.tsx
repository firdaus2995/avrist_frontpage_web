'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
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
      <CustomContainer className="flex flex-col">
        {/* <div className="w-full flex flex-col items-center justify-center text-center font-karla xs:my-[2.25rem] sm:my-[5rem]">
          <TitleContainer className="text-purple_dark xs:mb-0 leading-[2.25rem] sm:leading-normal !-tracking-[2.24px] font-extrabold">
            Tingkatkan karir bersama Avrist Assurance
          </TitleContainer>
          <h2 className="md:text-4xl xs:text-2xl mb-6 leading-[2.25rem] -tracking-[1.08px]">
            Kesempatan kamu untuk melangkah bersama menjadi perusahaan asuransi
            nomor 1 di Indonesia.
          </h2>
        </div> */}
        <div className="px-[2rem] xs:my-[2.25rem] sm:my-[5rem]">
          <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Tingkatkan karir bersama Avrist Assurance
          </p>
          <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
            Kesempatan kamu untuk melangkah bersama menjadi perusahaan asuransi
            nomor 1 di Indonesia.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="xs:h-[200px] md:h-[651px] xs:mb-[8rem] sm:mb-[5rem] w-[1120px]">
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
        </div>
      </CustomContainer>
      <div className="flex flex-col w-full">
        <CustomContainer className="w-full bg-purple_superlight flex flex-col items-center justify-center pb-[5rem]">
          <div className="flex flex-col">
            <TitleContainer className="text-center font-extrabold text-purple_dark xs:my-[2.25rem] sm:my-[5rem] leading-[2.25rem]">
              Mengapa berkarir bersama Avrist Assurance
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

        <div className="px-[2rem] md:px-[8.5rem] py-[5rem]">
          <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Lihat Lowongan di Avrist Life Insurance
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center pb-2 text-center mt-34">
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
                        <p className="font-bold text-[1.5rem] font-karla">
                          {item.namaLoker}
                        </p>
                        <div className="flex flex-col gap-[12px]">
                          <div className="flex w-full flex-row items-center gap-2">
                            <Image
                              src={item.iconLokasiLoker}
                              alt="lokasi"
                              width={18}
                              height={18}
                            />
                            <p className="font-opensans font-lg leading-[25.2px]">
                              {item.lokasiLoker}
                            </p>
                          </div>
                          <div className="flex w-full flex-row items-center gap-2">
                            <Image
                              src={item.iconStatusLoker}
                              alt="status"
                              width={18}
                              height={18}
                            />
                            <p className="font-opensans font-lg leading-[25.2px]">
                              {item.statusLoker}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full flex-row items-center gap-2 hidden">
                          <Image
                            src={item.iconWaktuLoker}
                            alt="waktu"
                            width={18}
                            height={18}
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

                <div className="flex flex-col gap-4 md:flex-row items-start justify-between font-opensans ">
                  <div>
                    <p className="text-[20px]/[28px] font-normal">
                      Menampilkan{' '}
                      <span className="font-bold text-purple_dark">
                        {contentData?.length === 0 || contentData === undefined
                          ? 0
                          : startIndex + 1}
                        -
                        {Math.min(
                          endIndex,
                          contentData ? contentData.length : 0
                        )}
                      </span>{' '}
                      dari{' '}
                      <span className="font-bold">
                        {contentData && contentData.length}
                      </span>{' '}
                      hasil
                    </p>
                  </div>
                  {contentData?.length > 0 && (
                    <ReactPaginate
                      pageCount={totalPages}
                      pageRangeDisplayed={2}
                      onPageChange={() => handlePageChange(totalPages)}
                      nextLabel={
                        <Icon name="chevronRight" color="purple_dark" />
                      }
                      previousLabel={
                        <Icon name="chevronLeft" color="purple_dark" />
                      }
                      containerClassName="flex flex-row gap-[12px] items-center"
                      activeClassName="text-purple_dark font-bold"
                      pageClassName="w-6 h-6 flex items-center justify-center cursor-pointer text-xl"
                    />
                  )}
                </div>
              </>
            }
            outerClass="sm:!py-[0px] px-[2rem] md:px-[8.5rem]"
          />
        </div>
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
                  className="py-4 xs:px-[1.25rem] sm:px-[3.25rem] border border-purple_dark rounded-xl w-full flex flex-row items-center justify-center gap-2 text-purple_dark xs:text-[1.25rem] md:text-[2.25rem] font-bold bg-white font-karla"
                >
                  <Image src={Phone} alt="phone" className="w-10" />
                  <p>021 5789 8188</p>
                </Link>
              </div>

              <p className="text-xl">
                <span className="font-bold">Waktu Operasional:</span>
                <br className="sm:hidden" /> Senin - Jumat, 08.00 - 17.00 WIB
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
        <div className="">
          <RoundedFrameTop bgColor="xs:bg-white sm:bg-purple_superlight" />
        </div>
      </div>
    </div>
  );
};

export default Karir;
