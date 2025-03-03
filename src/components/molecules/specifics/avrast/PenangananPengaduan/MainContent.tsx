import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
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
  handleGetContent,
  handleGetContentFilter
} from '@/services/content-page.api';
import { handleSendEmail } from '@/services/form.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import { BASE_URL } from '@/utils/baseUrl';
// import { handleDownload } from '@/utils/helpers';
import { QueryParams } from '@/utils/httpService';
import {
  contentCategoryTransformer,
  contentTransformer,
  handleTransformedContent,
  singleImageTransformer
} from '@/utils/responseTransformer';

export const MainContent = ({
  videoData,
  formId
}: {
  videoData: IVideoData | undefined;
  formId: any;
}) => {
  const [dataMainContent, setDataMainContent] = useState<{
    [key: string]: any;
  }>([]);
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState('');
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const tahunSet = new Set();

  //form state
  const [dataForm, setDataForm] = useState<any>();
  const [dataFormId, setDataFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [, setAttachment] = useState(false);
  const [, setAttachmentPath] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSubjectSubmitter, setEmailSubjectSubmitter] = useState('');
  const [emailBodySubmitter, setEmailBodySubmitter] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [maxSizeValidation, setMaxSizeValidation] = useState<boolean>(false);
  const [attachmentFile, setAttachmentFile] = useState('');
  const [popUpImage, setPopUpImage] = useState<string>('');
  const [attachmentFileSize, setAttachmentFileSize] = useState(0);

  const itemsPerPage = 5;
  // PAGINATION STATE
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // PAGINATION LOGIC HOOK
  useEffect(() => {
    if (!dataMainContent[selectedCategory]?.length) return; // check if contentaData already present

    const endOffset = itemOffset + itemsPerPage;
    setPaginatedData(
      dataMainContent[selectedCategory].slice(itemOffset, endOffset)
    );
    setPageCount(
      Math.ceil(dataMainContent[selectedCategory].length / itemsPerPage)
    );
  }, [itemOffset, itemsPerPage, dataMainContent]);

  // PAGINATION LOGIC HANDLER
  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) %
      dataMainContent[selectedCategory]?.length;
    setItemOffset(newOffset);
    window.scroll(0, 680);
  };

  const handleChangeSearchParams = (value: string) => {
    setSearchKeywords(value);
    setPageCount(0);
    setItemOffset(0);
  };

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
        if (JSON.stringify(data) === '{}') {
          setDataMainContent([]);
          setPaginatedData([]);
        } else {
          setDataMainContent(data);
        }
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
          setEmailSubject(dataFormJson.data.emailSubject);
          setEmailBody(dataFormJson.data.emailBody);
          setEmailSubjectSubmitter(dataFormJson.data.emailSubjectSubmitter);
          setEmailBodySubmitter(dataFormJson.data.emailBodySubmitter);
        } catch (error: any) {
          throw new Error('Error fetching form data: ', error.message);
        }
      };
      const fetchModalImage = async () => {
        try {
          handleGetContent(BASE_SLUG.POP_UP_SUBMIT_FORM, {
            includeAttributes: 'true'
          }).then((res: any) => {
            const { content } = contentTransformer(res);
            const submitImage = singleImageTransformer(content['pop-up-image']);
            setPopUpImage(submitImage.imageUrl);
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchModalImage().then();
      fetchDataForm().then();
    }
  }, [formId]);

  useEffect(() => {
    setAttachment(JSON.stringify(formValue).includes('/var/upload/files'));
    setAttachmentPath(
      formValue
        .filter((item) => item.value.includes('/var/upload/files'))
        .map((item) => item.value)
        .join('|')
    );
  }, [formValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    window.open(fileUrl, '_blank');
    // await handleDownload(fileUrl);
  };

  const onSubmitData = async () => {
    const emailSubmitterItem = dataForm?.find(
      (item: any) => item.fieldId === 'EMAIL_SUBMITTER'
    );

    const emailSubmitterComponent = emailSubmitterItem
      ? emailSubmitterItem.componentId
      : '';

    let queryParams = {};
    if (attachmentFile === '') {
      queryParams = {
        id: dataFormId,
        pic: formPic,
        emailSubmitter: emailSubmitterComponent
          ? formValue.find((item: any) => item.name === emailSubmitterComponent)
              ?.value
          : '',
        placeholderValue: formValue,
        emailSubject,
        emailBody,
        emailSubjectSubmitter,
        emailBodySubmitter
      };
    } else {
      queryParams = {
        id: dataFormId,
        pic: formPic,
        placeholderValue: formValue,
        attachment: true,
        attachmentPath: attachmentFile,
        emailSubmitter: emailSubmitterComponent
          ? formValue.find((item: any) => item.name === emailSubmitterComponent)
              ?.value
          : '',
        emailSubject,
        emailBody,
        emailSubjectSubmitter,
        emailBodySubmitter
      };
    }
    const size10Mb = 10 * 1024;
    if (attachmentFileSize > size10Mb) {
      setMaxSizeValidation(true);
    } else {
      const data = await handleSendEmail(queryParams);
      if (data.status === 'OK') {
        setShowSuccess(true);
      }

      if (data.status !== 'OK') {
        console.error('Error:', data.errors.message);
        router.refresh();
      }
    }
  };

  const handleChangeAttachment = (value: string, files: any, type: string) => {
    setMaxSizeValidation(false);
    if (type === 'delete') {
      const newData = attachmentFile.replace(value, '');
      setAttachmentFile(newData);
      if (files) {
        const filesInKb = Math.round(files.size / 1024);
        setAttachmentFileSize(attachmentFileSize - filesInKb);
      }
    } else {
      if (value) {
        setAttachmentFile(value);
      }
      if (files) {
        const filesInKb = Math.round(files.size / 1024);
        setAttachmentFileSize(filesInKb + attachmentFileSize);
      }
    }
  };

  useEffect(() => {
    if (attachmentFileSize < attachmentFileSize * 10000) {
      setFormIsValid(false);
    }
  }, [attachmentFileSize]);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white flex flex-col">
        <div className="bg-white w-full flex flex-col sm:pt-[100px] sm:pb-[5rem] xs:pb-[100px] xs:pt-[50px] sm:px-[136px] xs:px-4 xs:px-8 sm:gap-[5rem] xs:gap-[36px]">
          <ButtonMenu />
          <div className="xs:py-[44px]">
            <Content />
          </div>
          {videoData && <VideoInformation pageVideoData={videoData} />}
          <div className="sm:-mt-[16px] xs:mt-[24px]">
            <ContentCard />
          </div>
          <ContentReportList />
          {dataMainContent && categories && (
            <ReportList
              categories={categories}
              reportData={paginatedData}
              tahunList={tahunList as string[]}
              selectedCategory={selectedCategory}
              onSelectedCategory={handleSelectedCategory}
              selectedYear={selectedYear}
              onSelectedYear={(value: string) => setSelectedYear(value)}
              onChangeSearch={handleChangeSearchParams}
              pageClick={handlePageClick}
              pageCount={pageCount}
              itemOffset={itemOffset}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
        <div className="bg-purple_superlight sm:px-[8.5rem] xs:px-[1.5rem] xs:pb-[28px]">
          <div className="bg-white mt-[5rem] border rounded-xl border-gray_light overflow-hidden border-b-8 border-b-purple_dark">
            <div className="p-[2.25rem]">
              <p className="font-karla font-bold sm:text-[3.5rem] xs:text-[2.25rem] leading-[43.2px] lg:leading-[67.2px] sm:-tracking-[2.24px] xs:-tracking-[1.44px] mb-[12px]">
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
              <ReportForm
                onChangeData={handleChangeAttachment}
                maxSizeValidation={maxSizeValidation}
                setMaxSizeValidation={(bool) => setMaxSizeValidation(bool)}
              />
              <div className="flex flex-row mt-[2rem]">
                <div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      setIsChecked(e.target.checked);
                    }}
                    className="w-[18px] h-[18px] mt-[5px]"
                  />
                </div>
                <span className="ml-[0.75rem] text-[16px] font-normal leading-[23.68px]">
                  Saya/kami telah membaca, memahami dan memberikan persetujuan
                  saya/kami kepada Avrist Assurance untuk mengumpulkan,
                  menggunakan dan mengungkapkan data pribadi saya/kami sesuai
                  dengan{' '}
                  <Link
                    href="/keamanan-online"
                    target="_blank"
                    className="font-bold text-purple_dark cursor-pointer"
                  >
                    Kebijakan Keamanan Online
                  </Link>
                </span>
              </div>
              {/* submit */}
              <div className="mt-[2.25rem] flex sm:flex-row xs:flex-col justify-end items-center">
                <button
                  type="submit"
                  disabled={formIsValid ? (isChecked ? false : true) : true}
                  onClick={() => onSubmitData()}
                  className={`${formIsValid ? (isChecked ? 'bg-purple_dark hover:bg-purple_light' : 'bg-dark-grey') : 'bg-dark-grey'} text-white h-[44px] md:h-[64px] w-full md:w-[132px] rounded-lg mt-[12px] md:mt-0 py-[12px] px-[40px] font-opensans text-[20px] font-semibold leading-[28px]`}
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
          popUpImage={popUpImage}
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
    // const queryParams: QueryParams = {
    //   includeAttributes: 'true',
    //   category: params.selectedCategory || '',
    //   ...(params.selectedYear && { yearFilter: params.selectedYear }),
    //   searchFilter: params.searchKeywords
    // };
    const queryParams: QueryParams = {
      includeAttributes: true,
      filters: [
        ...(params.selectedYear && params.selectedYear !== ''
          ? [
              {
                fieldId: 'tahun',
                keyword: params.selectedYear
              }
            ]
          : [])
      ],
      searchRequest: {
        keyword: params.searchKeywords,
        fieldIds: ['panduanpenanganan-namafile'],
        postData: true
      },
      category: ''
    };

    if (!params.selectedCategory || params.selectedCategory === 'undefined') {
      const apiContentData = await handleGetMainContent('Laporan-Publikasi', {
        includeAttributes: 'true'
      });
      const newDataContent = apiContentData.data.contentDataList.map(
        (item: any) => {
          return {
            ...handleTransformedContent(item.contentData, item.title),
            categoryName: item.categories
              .map((item: any) => item.categoryName)
              .join(', '),
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

    const apiContentCategoryData = await handleGetContentFilter(
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
