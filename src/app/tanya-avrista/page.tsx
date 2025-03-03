'use client';
import { useEffect, useState } from 'react';

import { notFound } from 'next/navigation';
import CONTACTS from '@/assets/images/common/contacts.svg';
import DOCUMENT_CHART from '@/assets/images/common/document-chart.svg';
import NOTES from '@/assets/images/common/notes.svg';
import RECEIPT from '@/assets/images/common/receipt.svg';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import RoundedFrameTop from '@/components/atoms/RoundedFrameTop';
import FooterCards from '@/components/molecules/specifics/avrast/FooterCards';
import FooterInformation from '@/components/molecules/specifics/avrast/FooterInformation';
import Hero from '@/components/molecules/specifics/avrast/Hero';
import FAQList from '@/components/molecules/specifics/avrast/TanyaAvrista/FAQList';
import SearchTerm from '@/components/molecules/specifics/avrast/TanyaAvrista/SearchTerm';
import TopicsCard from '@/components/molecules/specifics/avrast/TanyaAvrista/TopicsCard';
import { getListFaqNew, getTanyaAvrista } from '@/services/tanya-avrista.api';
import { QueryParams } from '@/utils/httpService';
import {
  contentStringTransformer,
  customImageTransformer,
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const breadcrumbsData = [
  { title: 'Beranda', href: '/' },
  { title: 'Tanya Avrista', href: '#' }
];

const topics = [
  { iconKey: 'topik1-icon', textKey: 'topik1-teks' },
  { iconKey: 'topik2-icon', textKey: 'topik2-teks' },
  {
    iconKey: 'topik3-icon',
    textKey: 'topik3-teks',
    color: 'border-b-syariah_green'
  },
  {
    iconKey: 'topik4-icon',
    textKey: 'topik4-teks',
    color: 'border-b-dplk_yellow'
  },
  { iconKey: 'topik5-icon', textKey: 'topik5-teks' },
  { iconKey: 'topik6-icon', textKey: 'topik6-teks' },
  { iconKey: 'topik7-icon', textKey: 'topik7-teks' },
  { iconKey: 'topik8-icon', textKey: 'topik8-teks', color: 'bg-[#8C8B89]' }
];

const handleGetContent = async (slug: string) => {
  try {
    const data = await getTanyaAvrista(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};

const handleGetListFaq = async (slug: string) => {
  try {
    const queryParams: QueryParams = {
      includeAttributes: true,
      searchRequest: {
        keyword: '',
        fieldIds: ['pertanyaan-tanya-avrista', 'tags'],
        postData: true
      },
      category: ''
    };
    const data = await getListFaqNew(slug, queryParams);
    return data;
  } catch (error) {
    return notFound();
  }
};

export interface IListCards {
  title: any;
  icon: string;
  color: string | undefined;
}

export interface IListFaq {
  title: any;
  href: string;
  tags: string | undefined;
}

const TanyaAvrista = () => {
  const [titleImage, setTitleImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImage, setBannerImage] = useState({ imageUrl: '', altText: '' });
  const [bannerImageFit, setBannerImageFit] = useState('');
  const [footerImage, setFooterImage] = useState({ imageUrl: '', altText: '' });
  const [cards, setCards] = useState<IListCards[]>([]);
  const [listFilteredData, setListFilteredData] = useState<IListFaq[]>([]);
  const [selectedCards, setSelectedCards] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [keyword, setKeyword] = useState('');
  // PAGINATION STATE
  const itemsPerPage = 5;
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!listFilteredData?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(listFilteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listFilteredData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listFilteredData]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % listFilteredData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('tanya-avrista');
        const listFaq = await handleGetListFaq(
          'List-Pertanyaan-dan-Jawaban-Tanya-Avrista'
        );
        const { content } = pageTransformer(data);

        setTitleImage(singleImageTransformer(content['title-image']));
        setBannerImage(customImageTransformer(content['banner-image']));
        setBannerImageFit(
          content['banner-image']?.config
            ? JSON.parse(content['banner-image']?.config)?.image_fit
            : ''
        );
        setFooterImage(singleImageTransformer(content['cta1-image']));

        const listCards = topics.map((topic) => ({
          title: contentStringTransformer(content[topic.textKey]),
          icon: singleImageTransformer(content[topic.iconKey]).imageUrl,
          color: topic.color
        }));

        setCards(listCards);
        setSelectedCards(listCards[0].title);

        const tempData = listFaq?.data?.categoryList[''];
        const transformedData = tempData.map((item) => {
          const title = item.shortDesc;
          const href = `/tanya-avrista/${item.id}/`;
          const tagsData = item.contentData.find(
            (content) => content.fieldId === 'tags'
          );
          const tags = tagsData ? tagsData.value : '';

          return {
            title,
            href,
            tags
          };
        });
        setListFilteredData(transformedData);
        const endOffset = itemOffset + itemsPerPage;
        setPaginatedData(transformedData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(transformedData.length / itemsPerPage));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    setItemOffset(0);
    setPageCount(0);
    fetchData();
  }, []);

  const handleCardsClick = (title: string) => {
    setSelectedCards(title);
    handleGetListFaqFilterByTag(
      'List-Pertanyaan-dan-Jawaban-Tanya-Avrista',
      title
    );
  };

  const handleGetListFaqFilter = async (slug: string) => {
    try {
      setLoadingSearch(true);
      const queryParams: QueryParams = {
        includeAttributes: true,
        searchRequest: {
          keyword: keyword ?? '',
          fieldIds: ['pertanyaan-tanya-avrista', 'tags'],
          postData: true
        },
        filters: [
          {
            fieldId: 'tags',
            keyword: selectedCards
          }
        ],
        category: ''
      };
      const listFaq: any = await getListFaqNew(slug, queryParams);
      const tempData = listFaq?.data?.categoryList[''];
      const transformedData =
        tempData === 'undefined'
          ? []
          : tempData?.map((item: any) => {
              const title = item.shortDesc;
              const href = `/tanya-avrista/${item.id}/`;
              const tagsData = item.contentData.find(
                (content: any) => content.fieldId === 'tags'
              );
              const tags = tagsData ? tagsData.value : '';
              return {
                title,
                href,
                tags
              };
            });
      setListFilteredData(transformedData);
      setItemOffset(0);
      setPageCount(0);
      setLoadingSearch(false);
      return tempData;
    } catch (error) {
      return notFound();
    }
  };

  const handleGetListFaqFilterByTag = async (slug: string, title: string) => {
    try {
      setLoadingSearch(true);
      const queryParams: QueryParams = {
        includeAttributes: true,
        searchRequest: {
          keyword: keyword ?? '',
          fieldIds: ['pertanyaan-tanya-avrista', 'tags'],
          postData: true
        },
        filters: [
          {
            fieldId: 'tags',
            keyword: title
          }
        ],
        category: ''
      };
      const listFaq: any = await getListFaqNew(slug, queryParams);
      const tempData = listFaq?.data?.categoryList[''];
      const transformedData =
        tempData === 'undefined'
          ? []
          : tempData?.map((item: any) => {
              const title = item.shortDesc;
              const href = `/tanya-avrista/${item.id}/`;
              const tagsData = item.contentData.find(
                (content: any) => content.fieldId === 'tags'
              );
              const tags = tagsData ? tagsData.value : '';
              return {
                title,
                href,
                tags
              };
            });
      setListFilteredData(transformedData);
      setItemOffset(0);
      setPageCount(0);
      setLoadingSearch(false);
      return tempData;
    } catch (error) {
      return notFound();
    }
  };

  return (
    <div className="bg-purple_superlight">
      <Hero
        title="Tanya Avrista"
        breadcrumbsData={breadcrumbsData}
        imageUrl={titleImage.imageUrl}
        bottomImage={bannerImage.imageUrl}
        bottomImageFit={bannerImageFit}
        customComponent={
          <SearchTerm
            onSearch={handleGetListFaqFilter}
            loading={loadingSearch}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        }
      />

      <TopicsCard cards={cards} onClickCards={handleCardsClick} />
      <FAQList
        selected={selectedCards}
        data={listFilteredData?.length > 0 ? paginatedData : []}
        totalData={listFilteredData?.length}
        pageCount={pageCount}
        itemOffset={itemOffset}
        handlePageClick={handlePageClick}
      />
      <RoundedFrameBottom />
      <FooterInformation
        title={
          <p className="font-karla sm:text-[3.5rem] xs:text-[2.5rem] xs:leading-[44px] xs:-tracking-[0.03em] sm:leading-[67.2px] xs:-tracking-[0.04em]">
            <span className="font-bold text-purple_dark">Perlindungan</span>{' '}
            dini dan optimal dari{' '}
            <span className="font-bold text-purple_dark">sekarang!</span>
          </p>
        }
        buttonTitle="Kelola Polis"
        image={footerImage.imageUrl}
        href="/klaim-layanan/layanan?tab=Informasi+Nasabah"
      />
      <RoundedFrameTop />
      <FooterCards
        bgColor="bg-purple_superlight"
        cards={[
          {
            title: 'Tabel Suku Bunga',
            subtitle: 'Lebih Lanjut',
            icon: DOCUMENT_CHART,
            openInNewTab: true,
            href: 'https://polis.avrist.com/pages/DailyUnitPrice/latest/pgeLatest.aspx'
          },
          {
            title: 'Pengkinian Data',
            subtitle: 'Lebih Lanjut',
            icon: CONTACTS,
            openInNewTab: true,
            href: 'https://my.avrist.com/welcome'
          },
          {
            title: 'Pengajuan Klaim',
            subtitle: 'Lebih Lanjut',
            icon: RECEIPT,
            href: '/klaim-layanan/klaim?tab=Panduan+%26+Pengajuan'
          },
          {
            title: 'Panduan Polis',
            subtitle: 'Lebih Lanjut',
            icon: NOTES,
            href: '/klaim-layanan/layanan/kelola-polis'
          }
        ]}
      />
    </div>
  );
};

export default TanyaAvrista;
