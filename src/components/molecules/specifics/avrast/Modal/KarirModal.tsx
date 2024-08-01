'use client';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import CustomForm from '../CustomForm/Index';
import { CardRainbow } from '../HubungiKami/MainContentComponent/Card';
import { handleSendEmail } from '@/services/form.api';

type Props = {
  show: boolean;
  onClose: () => void;
  id: string;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};
export const KarirModal = (props: Props) => {
  const { onClose, show, id, setSuccess } = props;
  const router = useRouter();

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

  const fetchForm = async () => {
    try {
      const response = await fetch(`/api/form?id=${id}`);
      const jsonData = await response.json();

      setDataForm(jsonData.data.attributeList);
      setFormId(jsonData.data.id);
      setFormPic(jsonData.data.pic);
      setEmailSubject(jsonData.data.emailSubject);
      setEmailBody(jsonData.data.emailBody);
      setEmailSubjectSubmitter(jsonData.data.emailSubjectSubmitter);
      setEmailBodySubmitter(jsonData.data.emailBodySubmitter);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchForm();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
    const queryParams = {
      id: formId,
      pic: formPic,
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
      setSuccess(true);
    }
    if (data.status !== 'OK') {
      console.error('Error:', data.errors.message);
      router.refresh();
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 z-999" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform transition-all overflow-hidden">
                <CardRainbow className="bg-[#7e3f96] overflow-hidden">
                  <div className="bg-white px-[2rem]">
                    <CustomForm
                      customFormClassname="bg-white"
                      onChange={handleChange}
                      dataForm={dataForm}
                      resultData={receiveData}
                      type="Karir"
                      title="Form Aplikasi Lamaran Tenaga Pemasar"
                    />
                    <div className="bg-white py-[2rem] px-[1rem] -mt-[12px]">
                      <button
                        type="submit"
                        disabled={!formIsValid}
                        onClick={() => onSubmitData()}
                        className={`${formIsValid ? 'bg-purple_dark hover:bg-purple_light' : 'bg-dark-grey'} text-white py-[1.125rem] w-full md:w-[132px] rounded-lg mt-[12px] md:mt-0`}
                      >
                        Kirim
                      </button>
                    </div>
                  </div>
                </CardRainbow>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
