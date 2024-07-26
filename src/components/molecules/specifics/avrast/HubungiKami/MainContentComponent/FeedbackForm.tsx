'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomForm from '../../CustomForm/Index';
import { SuccessModal } from '../../Modal';
import { DividerRainbow } from './Divider';
import { RatingEmoji } from './form/Rating';
import { handleSendEmail } from '@/services/form.api';

type Props = {
  Id?: string;
};
export const FeedbackForm = (props: Props) => {
  const router = useRouter();
  const { Id } = props;
  const [dataForm, setDataForm] = useState<any>();
  const [formId, setFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [attachment, setAttachment] = useState(false);
  const [attachmentPath, setAttachmentPath] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSubjectSubmitter, setEmailSubjectSubmitter] = useState('');
  const [emailBodySubmitter, setEmailBodySubmitter] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  //temporary disabled rating
  const [, setRating] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

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
    const dataForm = [...formValue];
    const queryParams = {
      id: formId,
      pic: formPic,
      placeholderValue: dataForm,
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

  const onEmojiChange = (e: any) => {
    setRating(e);
    setIsChecked(true);
  };

  return (
    <div className="bg-white sm:px-[8.5rem] py-[5rem] xs:px-[1.3125rem]">
      <div className="border rounded-xl flex flex-col justify-between overflow-hidden">
        <div className="p-[2.25rem]">
          <p className="font-bold font-karla text-[2.25rem] text-purple_dark mb-[36px] leading-[43.2px] -tracking-[1.08px]">
            Bagikan Saran Anda
          </p>
          {dataForm && (
            <CustomForm
              dataForm={dataForm}
              customFormClassname="border-none p-[0rem]"
              title=" "
              type="Form Saran"
              resultData={receiveData}
            />
          )}
          <div className="mt-[2.25rem]">
            <RatingEmoji
              title="Penilaian Anda terhadap produk dan layanan Avrist Life Insurance"
              onChange={onEmojiChange}
            />
          </div>
          <div className="mt-[2.25rem]">
            <button
              disabled={formIsValid ? (isChecked ? false : true) : true}
              onClick={() => onSubmitData()}
              className={`${
                formIsValid
                  ? isChecked
                    ? 'bg-purple_dark'
                    : 'bg-dark-grey'
                  : 'bg-dark-grey'
              }  text-white px-[2.5rem] py-[0.75rem] w-full md:w-[8.25rem] rounded-lg mt-[0.75rem] md:mt-0 font-semibold text-xl`}
            >
              Kirim
            </button>
          </div>
        </div>
        <DividerRainbow />
      </div>
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
