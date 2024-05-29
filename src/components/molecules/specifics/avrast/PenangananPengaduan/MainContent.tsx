import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomForm from '../CustomForm/Index';
import { ButtonMenu } from '../InformasiNasabah/MainContentComponent';
import { CardMenuDownload } from '../KelolaPolis/MainContentComponent/CardMenu';
import { SuccessModal } from '../Modal';
import {
  VideoInformation,
  ReportList,
  ContentCard,
  Content,
  ContentReportList,
  ReportForm
} from './MainContentComponent';
import {
  IVideoData,
  Item
} from '@/app/klaim-layanan/layanan/kelola-polis/page';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';
import {
  handleGetContent as handleGetMainContent,
  handleGetContentCategory
} from '@/services/content-page.api';
import { handleSendEmail } from '@/services/form.api';
import { PageInfo } from '@/types/provider.type';
import { BASE_URL } from '@/utils/baseUrl';
import { handleDownload } from '@/utils/helpers';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  handleTransformedContent
} from '@/utils/responseTransformer';

export const MainContent = ({
  videoData,
  formId
}: {
  videoData: IVideoData | undefined;
  formId: any;
}) => {
  const initialPageInfo: PageInfo = {
    pageSize: 5,
    totalPage: 0,
    pagePos: 1,
    totalData: 0
  };
  const [dataMainContent, setDataMainContent] = useState<{
    [key: string]: any;
  }>();
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState('');
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
  const tahunSet = new Set();

  //form state
  const [dataForm, setDataForm] = useState<any>();
  const [dataFormId, setDataFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    const params = {
      selectedCategory,
      selectedYear,
      searchKeywords
    };
    fetchContentData(params).then((data) => {
      setDataMainContent(data);
      const categories = data && Object.keys(data).map((category) => category);
      setCategories(categories);
      if (categories && categories.length !== 0) {
        setSelectedCategory(categories[0]);
      }
    });
  }, []);

  useEffect(() => {
    const params = {
      selectedCategory,
      selectedYear,
      searchKeywords
    };
    fetchContentData(params).then((data) => {
      if (selectedCategory) {
        setDataMainContent(data);
        if (categories && categories.length !== 0) {
          setSelectedCategory(selectedCategory);
        }
      }
    });
  }, [selectedCategory, selectedYear, searchKeywords]);

  useEffect(() => {
    setFormValue([{ name: '', value: '' }]);
    if (formId) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(`/api/form?id=${formId}`);
          const dataFormJson = await contentResponse.json();
          setDataForm(dataFormJson.data.attributeList);
          setDataFormId(dataFormJson.data.id);
          setFormPic(dataFormJson.data.pic);
        } catch (error: any) {
          throw new Error('Error fetching form data: ', error.message);
        }
      };

      fetchDataForm().then();
    }
  }, [formId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const receiveData = (
    data: any,
    isValid: boolean | ((prevState: boolean) => boolean)
  ) => {
    setFormIsValid(isValid);
    setFormValue(data);
  };

  const getListTahun = useCallback(() => {
    if (dataMainContent && categories && categories.length !== 0) {
      categories?.forEach((category) => {
        dataMainContent[category]?.forEach((item: any) => {
          const tahunValue = item.content.tahun?.value;
          tahunSet.add(tahunValue);
        });
      });

      return Array.from(tahunSet);
    }
    return [];
  }, [categories]);
  const tahunList = categories && getListTahun();

  const handleSelectedCategory = (value: string) => {
    setSelectedCategory(value);
    setSelectedYear('');
    setSearchKeywords('');
  };

  const handleClickDownload = async (fileUrl: string) => {
    await handleDownload(fileUrl);
  };

  const onSubmitData = async () => {
    const queryParams = {
      id: dataFormId,
      pic: formPic,
      placeholderValue: formValue
    };

    const data = await handleSendEmail(queryParams);
    if (data.status === 'OK') {
      setShowSuccess(true);
    }

    if (data.status !== 'OK') {
      console.error('Error:', data.errors.message);
      router.refresh();
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white flex flex-col">
        <div className="bg-white w-full flex flex-col sm:pt-[100px] sm:pb-[26px] sm:px-[136px] sm:gap-[64px] xs:p-4 xs:gap-[36px]">
          <ButtonMenu />
          <Content />
          {videoData && <VideoInformation pageVideoData={videoData} />}
          <ContentCard />
          <ContentReportList />
          {dataMainContent && categories && (
            <ReportList
              categories={categories}
              reportData={dataMainContent}
              tahunList={tahunList as string[]}
              selectedCategory={selectedCategory}
              onSelectedCategory={handleSelectedCategory}
              selectedYear={selectedYear}
              onSelectedYear={(value: string) => setSelectedYear(value)}
              onChangeSearch={(value: string) => setSearchKeywords(value)}
              pageInfo={pageInfo}
              setPageInfo={setPageInfo}
            />
          )}
        </div>
        <div className="mt-[5rem] bg-purple_superlight sm:px-[8.5rem] xs:px-[1.5rem]">
          <div className="bg-white mt-[5rem] border rounded-xl border-gray_light overflow-hidden border-b-8 border-b-purple_dark">
            <div className="p-[2.25rem]">
              <p className="font-karla font-bold text-[3.5rem]">
                Form Pengaduan
              </p>
              {dataForm && (
                <CustomForm
                  title=" "
                  customFormClassname="border-none p-[0px] rounded-[12px]"
                  onChange={handleChange}
                  dataForm={dataForm}
                  resultData={receiveData}
                  type="Hubungi Kami"
                  longTextArea
                />
              )}
              <ReportForm />
              <div className="flex flex-row mt-[2.25rem]">
                <div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                    }}
                  />
                </div>
                <span className="ml-[0.75rem]">
                  Saya /kami telah membaca, memahami dan memberikan persetujuan
                  saya/kami kepada Avrist Life Insurance untuk mengumpulkan,
                  menggunakan dan mengungkapkan data pribadi saya/kami sesuai
                  dengan{' '}
                  <span className="font-bold text-purple_dark">
                    Deklarasi Privasi *
                  </span>
                </span>
              </div>
              {/* submit */}
              <div className="mt-[2.25rem] flex sm:flex-row xs:flex-col justify-end items-center">
                <button
                  type="submit"
                  disabled={formIsValid ? (isChecked ? false : true) : true}
                  onClick={() => onSubmitData()}
                  className={`${formIsValid ? (isChecked ? 'bg-purple_dark' : 'bg-dark-grey') : 'bg-dark-grey'} text-white h-[44px] md:h-[64px] w-full md:w-[132px] rounded-lg mt-[12px] md:mt-0`}
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <CardMenuDownload
              desc="Formulir Pengaduan"
              href={`${BASE_URL.image}/4bc466fc-9bad-4fd8-b44b-d603810a200a-formulir-pengaduan.pdf`}
              onDownload={handleClickDownload}
            />
          </div>
        </div>
      </div>
      <RoundedFrameBottom frameColor="bg-purple_superlight" />
      <div className="absolute">
        <SuccessModal
          show={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

const fetchContentData = async (params: {
  selectedCategory: string;
  selectedYear: string;
  searchKeywords: string;
}) => {
  try {
    const queryParams: QueryParams = {
      includeAttributes: 'true',
      category: params.selectedCategory || '',
      ...(params.selectedYear && { yearFilter: params.selectedYear }),
      searchFilter: params.searchKeywords
    };

    if (!params.selectedCategory || params.selectedCategory === 'undefined') {
      const apiContentData = await handleGetMainContent('Laporan-Publikasi', {
        includeAttributes: 'true'
      });
      const newDataContent = apiContentData.data.contentDataList.map(
        (item: any) => {
          return {
            ...handleTransformedContent(item.contentData, item.title),
            categoryName: item.categoryName,
            id: item.id
          };
        }
      );
      return newDataContent.reduce(
        (acc: { [key: string]: Item[] }, item: Item) => {
          const category = item.categoryName;
          acc[category] = [...(acc[category] || []), item];
          return acc;
        },
        {}
      );
    }

    const apiContentCategoryData = await handleGetContentCategory(
      'Laporan-Publikasi',
      queryParams
    );
    const newDataContentWithCategory = contentCategoryTransformer(
      apiContentCategoryData,
      params.selectedCategory
    );
    return newDataContentWithCategory.reduce(
      (acc: { [key: string]: Item[] }, item: any) => {
        const category = params.selectedCategory;
        acc[category] = [...(acc[category] || []), item];
        return acc;
      },
      {}
    );
  } catch (errors: any) {
    throw new Error(errors.message);
  }
};
