'use client';
import { useEffect, useState } from 'react';
import CustomForm from '../CustomForm/Index';
import { SuccessModal } from '../Modal';
import Button from '@/components/atoms/Button/Button';
import { handleSendEmail } from '@/services/form.api';
// button variants: primary, secondary

type Props = {
  formId?: string;
  popUpImage?: string;
  productName?: string;
  promoName?: string;
  title?: string;
};

const InterestSection = (props: Props) => {
  const { formId: id, popUpImage, productName, promoName, title } = props;
  const [dataForm, setDataForm] = useState<any>();
  const [formId, setFormId] = useState<any>();
  const [formPic, setFormPic] = useState<any>();
  const [attachment, setAttachment] = useState(false);
  const [attachmentPath, setAttachmentPath] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSubjectSubmitter, setEmailSubjectSubmitter] = useState('');
  const [emailBodySubmitter, setEmailBodySubmitter] = useState('');
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
  }, [id]);

  const [formValue, setFormValue] = useState([{ name: '', value: '' }]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

    const filteredFormValue = formValue.filter(
      (item) => item.name !== 'nama-produk' && item.name !== 'nama-promo'
    );
    const newFormValue = [
      ...filteredFormValue,
      { name: 'nama-produk', value: productName },
      { name: 'nama-promo', value: promoName }
    ];
    const queryParams = {
      id: formId,
      pic: formPic,
      emailSubmitter: emailSubmitterComponent
        ? formValue.find((item: any) => item.name === emailSubmitterComponent)
            ?.value
        : '',
      placeholderValue: newFormValue,
      attachment: attachment.toString(),
      attachmentPath,
      emailSubject,
      emailBody,
      emailSubjectSubmitter: emailSubjectSubmitter ?? '',
      emailBodySubmitter: emailBodySubmitter ?? ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="w-full flex xs:px-[2rem] md:px-[8.5rem] xs:py-[3.125rem] md:py-[5.125rem] bg-purple_superlight justify-center">
      <div className="flex flex-col self-stretch bg-white p-[36px] gap-[36px] border border-gray_light border-b-8 border-b-purple_dark rounded-[12px]">
        <p className="font-karla font-bold xs:text-[2.25rem] md:text-[3.5rem]">
          {title ?? 'Saya tertarik dengan produk Avrist Life!'}
        </p>
        {dataForm && (
          <CustomForm
            customFormClassname="!rounded-sm !border-transparent !mx-[-1rem]"
            onChange={handleChange}
            dataForm={dataForm}
            resultData={receiveData}
            selectedProduct={'-'}
            title=" "
          />
        )}

        <div className="accent-purple_dark flex flex-row items-start gap-[12px] -mt-14 bg-white xs:pt-8 sm:pt-0">
          <input
            id="setuju"
            type="checkbox"
            checked={isChecked}
            className="mt-[6px] text-purple_dark border-gray_verylight rounded focus:purple_dark focus:ring-2 cursor-pointer"
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
          />
          <label>
            Saya setuju memberikan data pribadi Saya kepada Avrist Life
            Insurance dan telah membaca{' '}
            <span
              className="text-purple_dark font-bold cursor-pointer"
              onClick={() => window.open('/keamanan-online', '_blank')}
            >
              Kebijakan Keamanan Online
            </span>{' '}
            Avrist Life Insurance. Selanjutnya, Saya bersedia untuk dihubungi
            oleh Avrist Life Insurance melalui media komunikasi pribadi Saya
            sesuai hari dan jam operasional yang berlaku di Avrist Life
            Insurance.
          </label>
        </div>
        <div className="flex xs:flex-col md:flex-row justify-end items-center xs:gap-[2rem] md:gap-0">
          <Button
            isLoading={loading}
            disabled={formIsValid ? (isChecked ? false : true) : true}
            title="Kirim"
            onClick={() => onSubmitData()}
            customButtonClass="rounded-lg bg-purple_dark hover:bg-purple_light px-[2.5rem] py-[1.125rem]"
            customTextClass="text-white font-opensans font-semibold text-xl"
          />
        </div>
      </div>

      <SuccessModal
        popUpImage={popUpImage}
        show={showModal}
        onClose={() => {
          setShowModal(false);
          window.location.reload();
        }}
      />
    </div>
  );
};

export default InterestSection;
