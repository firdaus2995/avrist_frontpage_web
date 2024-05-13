'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomForm from '../../CustomForm/Index';
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
  const [formIsValid, setFormIsValid] = useState(false);
  //temporary disabled rating
  const [, setRating] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (Id) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(`/api/form?id=${Id}`);
          const dataFormJson = await contentResponse.json();

          setFormId(dataFormJson.data.id);
          setFormPic(dataFormJson.data.pic);
          setDataForm(dataFormJson.data.attributeList);
        } catch (error: any) {
          throw new Error('Error fetching form data: ', error.message);
        }
      };

      fetchDataForm().then();
    }
    console.log(Id);
  }, [Id]);

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
      placeholderValue: dataForm
    };

    const data = await handleSendEmail(queryParams);
    if (data.status === 'OK') {
      router.refresh();
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
    <div className="bg-white py-[80px] px-[136px]">
      <div className="border rounded-xl flex flex-col justify-between overflow-hidden">
        <div className="p-[36px]">
          <p className="font-bold font-karla text-[36px] text-purple_dark">
            Bagikan Saran Anda
          </p>
          {dataForm && (
            <CustomForm
              dataForm={dataForm}
              customFormClassname="border-none p-[0px]"
              title=" "
              type="Form Saran"
              resultData={receiveData}
            />
          )}
          <div className="mt-[36px]">
            <RatingEmoji
              title="Penilaian Anda terhadap produk dan layanan Avrist Life Insurance"
              onChange={onEmojiChange}
            />
          </div>
          <div className="mt-[36px]">
            <button
              disabled={formIsValid ? (isChecked ? false : true) : true}
              onClick={() => onSubmitData()}
              className={`${formIsValid ? (isChecked ? 'bg-purple_dark' : 'bg-dark-grey') : 'bg-dark-grey'} text-white h-[44px] md:h-[64px] w-full md:w-[132px] rounded-lg mt-[12px] md:mt-0`}
            >
              Kirim
            </button>
          </div>
        </div>
        <DividerRainbow />
      </div>
    </div>
  );
};
