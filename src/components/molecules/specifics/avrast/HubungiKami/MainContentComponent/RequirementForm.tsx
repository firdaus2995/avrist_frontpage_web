'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomForm from '../../CustomForm/Index';
import { SuccessModal } from '../../Modal';
import { handleGetContent } from '@/services/content-page.api';
import { handleSendEmail } from '@/services/form.api';
import { BASE_SLUG } from '@/utils/baseSlug';
import {
  contentTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

type Props = {
  Id?: string;
};

export const RequirementForm = (props: Props) => {
  const router = useRouter();
  const { Id } = props;
  const [dataForm, setDataForm] = useState<any>();
  const [formId, setFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [attachment, setAttachment] = useState(false);
  const [attachmentPath, setAttachmentPath] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSubjectSubmitter, setEmailSubjectSubmitter] = useState('');
  const [emailBodySubmitter, setEmailBodySubmitter] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [popUpImage, setPopUpImage] = useState<string>('');

  useEffect(() => {
    if (Id) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(`/api/form?id=${Id}`);
          const dataFormJson = await contentResponse.json();

          setFormId(dataFormJson.data.id);
          setFormPic(dataFormJson.data.pic);
          setDataForm(dataFormJson.data.attributeList);
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
  }, [Id]);

  useEffect(() => {
    setAttachment(JSON.stringify(formValue).includes('/var/upload/files'));
    setAttachmentPath(
      formValue
        .filter((item) => item.value.includes('/var/upload/files'))
        .map((item) => item.value)
        .join('|')
    );
  }, [formValue]);

  const receiveData = (
    data: any,
    isValid: boolean | ((prevState: boolean) => boolean)
  ) => {
    setFormIsValid(isValid);
    setFormValue(data);
  };

  const onSubmitData = async () => {
    const emailSubmitterItem = dataForm.find(
      (item: any) => item.fieldId === 'EMAIL_SUBMITTER'
    );

    const emailSubmitterComponent = emailSubmitterItem
      ? emailSubmitterItem.componentId
      : '';

    const queryParams = {
      id: formId,
      pic: formPic,
      emailSubmitter: emailSubmitterComponent
        ? formValue.find((item: any) => item.name === emailSubmitterComponent)
            ?.value
        : '',
      placeholderValue: formValue,
      attachment: attachment.toString(),
      attachmentPath,
      emailSubject,
      emailBody,
      emailSubjectSubmitter: emailSubjectSubmitter ?? '',
      emailBodySubmitter: emailBodySubmitter ?? ''
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
    <div className="bg-purple_superlight">
      <div className="bg-white mx-auto border rounded-xl border-gray_light overflow-hidden">
        <div className="p-[2.25rem]">
          <p className="font-karla font-bold text-[2.25rem] md:text-[3.5rem] xs:-tracking-[1.44px] sm:-tracking-[2.24px] sm:leading-[67.2px] xs:leading-[43.2px]">
            Diskusikan kebutuhan Anda disini!
          </p>
          <p className="my-[1.5rem] md:my-[2.25rem] font-opensans text-[0.875rem] md:text-[1rem] leading-[23.68px]">
            isi data berikut dan Kami akan menghubungi Anda.
          </p>
          {dataForm && (
            <CustomForm
              dataForm={dataForm}
              customFormClassname="border-none p-[0rem]"
              title=" "
              type="Hubungi Kami"
              resultData={receiveData}
            />
          )}
          <div className="flex flex-row mt-[1.5rem] md:mt-[2.25rem]">
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                }}
              />
            </div>
            <span className="ml-[0.75rem] leading-[23.68px]">
              Saya /kami telah membaca, memahami dan memberikan persetujuan
              saya/kami kepada Avrist Assurance untuk mengumpulkan, menggunakan
              dan mengungkapkan data pribadi saya/kami sesuai dengan{' '}
              <Link
                href={'/keamanan-online'}
                className="font-bold text-purple_dark"
                target="_blank"
              >
                Kebijakan Keamanan Online*
              </Link>
            </span>
          </div>
          {/* submit */}
          <div className="mt-[1.5rem] md:mt-[2.875rem] flex flex-col md:flex-row md:justify-end md:items-center">
            {/* <img src={CaptchaPicture} alt="captha" className="md:w-auto" /> */}
            {/* <Image alt="captcha" src={CaptchaPicture} className="md:w-auto" /> */}
            <button
              type="submit"
              disabled={formIsValid ? (isChecked ? false : true) : true}
              onClick={() => onSubmitData()}
              className={`${formIsValid ? (isChecked ? 'bg-purple_dark hover:bg-purple_light' : 'bg-dark-grey') : 'bg-dark-grey'} text-white px-[2.5rem] py-[0.75rem] w-full md:w-[8.25rem] rounded-lg mt-[0.75rem] md:mt-0 font-semibold text-xl`}
            >
              Kirim
            </button>
          </div>
        </div>
        <div className="h-[0.5rem] bg-purple_dark" />
      </div>
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
