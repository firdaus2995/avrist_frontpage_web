'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CardRainbow } from '../HubungiKami/MainContentComponent/Card';
import Icon from '@/components/atoms/Icon';

type Props = {
  show: boolean;
  onClose: () => void;
};
export const SubmittedFormModal = (props: Props) => {
  const { onClose, show } = props;

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
                  <div className="sm:h-[40vh] sm:w-[50vw] xs:w-full xs:h-full transition xs:p-4">
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
                    <div className="flex flex-1 flex-col items-center justify-center h-full text-center sm:px-[4.5rem] sm:py-[6.25rem] xs:px-[2rem] xs:py-[3.125rem] gap-[36px]">
                      <p className="font-karla font-extrabold xs:text-[2.25rem] md:text-[3.5rem] text-white xs:leading-[43.2px] sm:leading-[57.6px] -tracking-[1.92px] mb-2">
                        Terima kasih atas langganan Anda!
                      </p>
                      <p className="font-opensans font-normal text-[1.125rem] text-white leading-[25.2px]">
                        Cek email untuk konfirmasi email Anda
                      </p>
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
