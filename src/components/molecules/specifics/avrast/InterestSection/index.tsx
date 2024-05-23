'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CustomForm from '../CustomForm/Index';
import { SuccessModal } from '../Modal';
import CaptchaPicture from '@/assets/images/form-captcha.svg';
import Button from '@/components/atoms/Button/Button';
import { handleSendEmail } from '@/services/form.api';
// button variants: primary, secondary

type Props = {
  formId?: string;
  popUpImage?: string;
};

const InterestSection = (props: Props) => {
  const { formId: id, popUpImage } = props;
  const [dataForm, setDataForm] = useState<any>();
  const [formId, setFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchDataForm = async () => {
        try {
          const contentResponse = await fetch(`/api/form?id=${id}`);
          const dataFormJson = await contentResponse.json();
          setFormId(dataFormJson.data.id);
          setDataForm(dataFormJson.data.attributeList);
          setFormPic(dataFormJson.data.pic);
        } catch (error: any) {
          throw new Error('Error fetching form data: ', error.message);
        }
      };

      fetchDataForm().then();
    }
  }, [id]);

  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const receiveData = (
    data: any,
    isValid: boolean | ((prevState: boolean) => boolean)
  ) => {
    setFormIsValid(isValid);
    setFormValue(data);
  };

  const onSubmitData = async () => {
    const queryParams = {
      id: formId,
      pic: formPic,
      placeholderValue: formValue
    };
    setLoading(true);

    const data = await handleSendEmail(queryParams);
    if (data.status === 'OK') {
      setShowModal(true);
      setLoading(false);
    }

    if (data.status !== 'OK') {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex xs:px-[2rem] md:px-[8.5rem] xs:py-[3.125rem] md:py-[5.125rem] bg-purple_superlight justify-center">
      <div className="flex flex-col self-stretch bg-white p-[36px] gap-[36px] border border-gray_light border-b-8 border-b-purple_dark rounded-[12px]">
        <p className="font-karla font-bold xs:text-[2.25rem] md:text-[3.5rem]">
          Saya tertarik dengan produk Avrist Life!
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

        <div className="accent-purple_dark flex flex-row items-start gap-[12px]">
          <input
            id="setuju"
            type="checkbox"
            checked={isChecked}
            className="mt-[6px] text-purple_dark border-gray_verylight rounded focus:purple_dark focus:ring-2 cursor-pointer"
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
          />
          <label className="cursor-pointer" htmlFor="setuju">
            Saya setuju memberikan data pribadi Saya kepada Avrist Life
            Insurance dan telah membaca{' '}
            <span className="text-purple_dark font-bold">Keamanan Online</span>{' '}
            Avrist Life Insurance. Selanjutnya, Saya bersedia untuk dihubungi
            oleh Avrist Life Insurance melalui media komunikasi pribadi Saya
            sesuai hari dan jam operasional yang berlaku di Avrist Life
            Insurance.
          </label>
        </div>
        <div className="flex xs:flex-col md:flex-row justify-between items-center xs:gap-[2rem] md:gap-0">
          <Image alt="captcha" src={CaptchaPicture} />
          <Button
            isLoading={loading}
            disabled={formIsValid ? (isChecked ? false : true) : true}
            title="Kirim"
            onClick={() => onSubmitData()}
            customButtonClass="rounded-lg bg-purple_dark px-[2.5rem] py-[1.125rem]"
            customTextClass="text-white font-opensans font-semibold text-xl"
          />
        </div>
      </div>

      <SuccessModal
        popUpImage={popUpImage}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default InterestSection;
