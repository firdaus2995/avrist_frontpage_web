'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import BlankImage from '@/assets/images/blank-image.svg';
import Button from '@/components/atoms/Button/Button';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import PersonCard from '@/components/molecules/specifics/avrast/Cards/PersonCard';
import {
  contentStringTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';
interface ManagementComponentProps {
  onSelectDetail: (isSelected: boolean) => void;
}

const Manajemen: React.FC<ManagementComponentProps> = ({onSelectDetail}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState({
    image: BlankImage,
    name: '',
    role: '',
    desc: <p></p>
  });

  const [, setData] = useState(null);
  const [transformedData, setTransformedData] = useState({
    profile1: {
      name: '',
      role: '',
      image: ''
    },
    profile2: {
      name: '',
      role: '',
      image: ''
    },
    profile3: {
      name: '',
      role: '',
      image: ''
    },
    profile4: {
      name: '',
      role: '',
      image: ''
    },
    profile5: {
      name: '',
      role: '',
      image: ''
    },
    profile6: {
      name: '',
      role: '',
      image: ''
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-front-sit.avristcms.barito.tech/api/page/manajemen`,
          {
            method: 'GET'
          }
        );
        const data = await response.json();
        setData(data);

        const { content } = pageTransformer(data);

        const profile1Image = singleImageTransformer(content['profil1-image']);
        const profile1Name = contentStringTransformer(content['profil1-nama']);
        const profile1Role = contentStringTransformer(
          content['profil1-jabatan']
        );

        const profile2Image = singleImageTransformer(content['profil2-image']);
        const profile2Name = contentStringTransformer(content['profil2-nama']);
        const profile2Role = contentStringTransformer(
          content['profil2-jabatan']
        );

        const profile3Image = singleImageTransformer(content['profil3-image']);
        const profile3Name = contentStringTransformer(content['profil3-nama']);
        const profile3Role = contentStringTransformer(
          content['profil3-jabatan']
        );

        const profile4Image = singleImageTransformer(content['profil4-image']);
        const profile4Name = contentStringTransformer(content['profil4-nama']);
        const profile4Role = contentStringTransformer(
          content['profil4-jabatan']
        );

        const profile5Image = singleImageTransformer(content['profil5-image']);
        const profile5Name = contentStringTransformer(content['profil5-nama']);
        const profile5Role = contentStringTransformer(
          content['profil5-jabatan']
        );

        const profile6Image = singleImageTransformer(content['profil6-image']);
        const profile6Name = contentStringTransformer(content['profil6-nama']);
        const profile6Role = contentStringTransformer(
          content['profil6-jabatan']
        );
        setTransformedData({
          ...transformedData,
          profile1: {
            name: profile1Name,
            role: profile1Role,
            image: profile1Image.imageUrl
          },
          profile2: {
            name: profile2Name,
            role: profile2Role,
            image: profile2Image.imageUrl
          },
          profile3: {
            name: profile3Name,
            role: profile3Role,
            image: profile3Image.imageUrl
          },
          profile4: {
            name: profile4Name,
            role: profile4Role,
            image: profile4Image.imageUrl
          },
          profile5: {
            name: profile5Name,
            role: profile5Role,
            image: profile5Image.imageUrl
          },
          profile6: {
            name: profile6Name,
            role: profile6Role,
            image: profile6Image.imageUrl
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (cardData: {
    image: string;
    name: string;
    role: string;
  }) => {
    sessionStorage.setItem('pathState', 'hlm-mnj-detail');
    setShowDetail(true);
    onSelectDetail(true);
    const data = {
      image: cardData.image,
      name: cardData.name,
      role: cardData.role,
      desc: (
        <div className="flex flex-col gap-7">
          <p>
            Memperoleh gelar Sarjana Ekonomi dari Universitas Indonesia, Saat
            ini ia menjabat sebagai Direktur Utama di PT Avrist Life Insurance.
            Cholis memiliki pengalaman lebih dari 20 tahun di Lembaga Jasa
            Keuangan Indonesia. Sebelum bergabung dengan PT Avrist Life
            Insurance, Cholis Baidowi menjabat sebagai Chief Investment Officer
            di PT RHB Asset Management. Cholis juga pernah berkerja di PT
            Syailendra Capital sebagai Direktur/Chief Investment Officer,
            bekerja di PT CIMB Principal Asset Management dengan posisi terakhir
            sebagai Direktur/Chief Investment Officer dan di PT Trimegah Asset
            Management sebagai Chief Investment Officer. Cholis Baidowi
            memperoleh izin perorangan sebagai Wakil Manajer Investasi dari
            Otoritas Jasa Keuangan berdasarkan surat keputusan Dewan Komisioner
            Otoritas Jasa Keuangan No.Kep-280/PM.211/PJ-WMI/2022 tanggal 21
            Oktober 2022.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Eleifend eget morbi eget
            eget purus commodo at. In vestibulum tristique dictum ultrices
            tempus egestas mi ipsum elit. Sed id vitae enim vel viverra cursus
            fermentum sit.{' '}
          </p>
        </div>
      )
    };
    setDetailData(data);
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white justify-center">
      {showDetail ? (
        <div className="px-[32px] py-[50px] sm:px-[136px] sm:py-[72px]">
          <div className="flex flex-col gap-7 border rounded-xl p-4">
            <div className="flex flex-row gap-5 items-center border rounded-xl">
              <div className="w-[213px] h-[213px] bg-red-200 rounded-xl">
                <Image
                  alt="blank-image"
                  src={detailData.image}
                  className="rounded-xl w-[213px] h-[213px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[36px] font-bold">{detailData.name}</p>
                <p className="text-[24px] font-semibold text-purple_dark">
                  {detailData.role}
                </p>
              </div>
            </div>
            <p>{detailData.desc}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-[32px] py-[50px] sm:px-[136px] sm:py-[72px]">
          <PersonCard
            heading="Presiden Direktur"
            cards={[
              {
                name: transformedData.profile1.name,
                role: transformedData.profile1.role,
                image: transformedData.profile1.image,
                onClick: handleCardClick
              }
            ]}
            roleClassname="text-purple_dark"
          />
          <PersonCard
            heading="Dewan Direksi"
            cards={[
              {
                name: transformedData.profile2.name,
                role: transformedData.profile2.role,
                image: transformedData.profile2.image,
                onClick: handleCardClick
              },
              {
                name: transformedData.profile3.name,
                role: transformedData.profile3.role,
                image: transformedData.profile3.image,
                onClick: handleCardClick
              }
            ]}
            roleClassname="text-purple_dark"
          />
          <PersonCard
            heading="Dewan Komisaris"
            cards={[
              {
                name: transformedData.profile4.name,
                role: transformedData.profile4.role,
                image: transformedData.profile4.image,
                onClick: handleCardClick
              },
              {
                name: transformedData.profile5.name,
                role: transformedData.profile5.role,
                image: transformedData.profile5.image,
                onClick: handleCardClick
              },
              {
                name: transformedData.profile6.name,
                role: transformedData.profile6.role,
                image: transformedData.profile6.image,
                onClick: handleCardClick
              }
            ]}
            roleClassname="text-purple_dark"
          />
          <div className="flex flex-col gap-4 items-center justify-center w-full p-10">
            <div className="flex justify-center items-center p-10">
              <p className="text-[56px] font-bold text-purple_dark">
                Struktur Organisasi
              </p>
            </div>
            <div className="w-full flex flex-row justify-between items-center p-4 border rounded-xl">
              <p className="font-bold">
                Komitmen Kami untuk memberikan solusi investasi berkualitas.
              </p>
              <Button
                title="Lihat"
                customButtonClass="bg-purple_dark rounded-lg"
                customTextClass="text-white font-bold"
              />
            </div>
          </div>
        </div>
      )}
      <RoundedFrameBottom />
    </div>
  );
};

export default Manajemen;
