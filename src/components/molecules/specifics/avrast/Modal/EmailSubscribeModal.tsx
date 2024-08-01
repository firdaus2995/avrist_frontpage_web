'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CardRainbow } from '../HubungiKami/MainContentComponent/Card';
import Icon from '@/components/atoms/Icon';
import { handleSubscribe } from '@/services/subscribe-service.api';

type Props = {
  show: boolean;
  onClose: () => void;
  data: {
    imageUrl?: string;
    altText?: string;
  };
};

export const EmailSubscribeModal = (props: Props) => {
  const { onClose, show, data } = props;
  const [isSuccessSubs, setIsSuccessSubs] = useState(false);
  const [selected, setSelected] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (show) {
      setIsSuccessSubs(false);
    }
  }, [show, setIsSuccessSubs]);

  useEffect(() => {
    setEmail('');
    setSelected('');
    setEmailError('');
  }, [onClose]);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError('Masukkan alamat email yang valid');
      return;
    }

    if (selected === '') {
      setEmailError('Pilih Salah Satu Entitas');
      return;
    }

    setEmailError('');

    const queryParams = {
      email: email,
      entity: selected
    };
    const data = await handleSubscribe(queryParams);
    if (data.status === 'OK') {
      setIsSuccessSubs(true);
    }

    if (data.status !== 'OK') {
      console.error('Error:', data.errors.message);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
                  {isSuccessSubs ? (
                    <div className="sm:h-[50vh] sm:w-[50vw] xs:w-full xs:h-full transition">
                      <div className="absolute right-0 p-[1.5rem]">
                        <button onClick={onClose}>
                          <Icon
                            name="close"
                            width={24}
                            height={24}
                            color="white"
                          />
                        </button>
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-center h-full text-center sm:px-[4.5rem] sm:py-[6.25rem] xs:px-[2rem] xs:py-[3.125rem]">
                        <p className="font-karla font-extrabold text-[3rem] text-white leading-[57.6px] -tracking-[1.92px] mb-2">
                          Terima kasih sudah mendaftar
                        </p>
                        <p className="font-opensans font-normal text-[1.125rem] text-white leading-[25.2px]">
                          Cek email untuk konfirmasi email Anda
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="sm:h-[40.938rem] sm:w-[48.75rem] xs:w-full xs:h-full transition">
                      <div className="absolute right-0 p-[1.5rem] z-50">
                        <button onClick={onClose}>
                          <Icon
                            name="close"
                            width={24}
                            height={24}
                            color="white"
                          />
                        </button>
                      </div>
                      <div className="flex flex-col sm:h-[40.938rem] sm:w-[48.75rem] xs:w-full xs:h-full">
                        <div className="bg-white xs:h-[9.375rem] sm:h-[20rem]">
                          <img
                            src={data?.imageUrl}
                            alt={data?.altText}
                            className="object-cover xs:h-[9.375rem] sm:h-[20rem] w-full"
                          />
                        </div>
                        <div className="bg-[#7e3f96] flex items-center flex-col sm:p-0 xs:p-4">
                          <div className="mt-[40px] pb-[6.25rem]">
                            <p className="font-karla font-extrabold sm:text-[3rem] xs:text-[2.813rem] text-white text-center leading-[57.6px] -tracking-[1.92px]">
                              Dapatkan informasi terkini
                            </p>
                            <div className="w-full grid sm:grid-cols-3 xs:grid-cols-1 gap-[0.75rem] mt-[2.5rem]">
                              <button
                                onClick={() => setSelected('Avras')}
                                className={`${selected === 'Avras' ? 'bg-purple_dark text-white' : 'bg-white text-purple_dark'} rounded-xl py-[0.5rem] font-opensanspro leading-[25.2px] font-bold sm:text-[1.125rem] xs:text-[0.875rem] hover:bg-purple_dark hover:text-white`}
                              >
                                Life Insurance
                              </button>
                              <button
                                onClick={() => setSelected('AGI')}
                                className={`${selected === 'AGI' ? 'bg-grey_video_footer text-white' : 'bg-white text-grey_video_footer'} rounded-xl py-[0.5rem] font-opensanspro leading-[25.2px] font-bold sm:text-[1.125rem] xs:text-[0.875rem] hover:bg-grey_video_footer hover:text-white`}
                              >
                                General Insurance
                              </button>
                              <button
                                onClick={() => setSelected('Avram')}
                                className={`${selected === 'Avram' ? 'bg-avram_green text-white' : 'bg-white text-avram_green'} rounded-xl py-[0.5rem] font-opensanspro leading-[25.2px] font-bold sm:text-[1.125rem] xs:text-[0.875rem] hover:bg-avram_green hover:text-white`}
                              >
                                Asset Management
                              </button>
                            </div>
                            <form
                              className="flex flex-1 sm:flex-row xs:flex-col mt-[0.75rem] gap-[0.75rem]"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                              }}
                            >
                              <input
                                type="email"
                                placeholder="Masukkan email Anda"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="flex-1 rounded-md p-[0.75rem] border border-purple_verylight text-white bg-purple_verylight/20"
                              />
                              <button className="bg-white hover:bg-purple_dark rounded-md px-[1.25rem] py-[10px] font-opensans font-semibold text-[1rem] text-purple_dark hover:text-white leading-[23.68px]">
                                Subscribe Sekarang
                              </button>
                            </form>
                            {emailError && (
                              <p className="text-red-500 ml-2">{emailError}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardRainbow>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
