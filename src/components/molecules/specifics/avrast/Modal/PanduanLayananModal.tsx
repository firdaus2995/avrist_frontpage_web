'use client';
import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Image from 'next/image';
import BLANK_IMAGE from '@/assets/images/blank-image.svg';
import Icon from '@/components/atoms/Icon';
import { CardRainbow } from '@/components/molecules/specifics/avrast/HubungiKami/MainContentComponent/Card';

export const PanduanLayananModal = ({
  handleCloseModal,
  isShowPanduanLayananModal,
  popUpImage
}: {
  handleCloseModal: () => void;
  isShowPanduanLayananModal: boolean;
  popUpImage: string;
}) => {
  return (
    <Transition appear show={isShowPanduanLayananModal} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={handleCloseModal}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-left">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform transition-all overflow-y-auto">
                <CardRainbow className="bg-white">
                  <div className="xs:w-full md:w-[48.75rem] flex flex-col">
                    <div className="absolute right-0 p-[1.5rem]">
                      <button onClick={handleCloseModal}>
                        <Icon
                          name="close"
                          width={24}
                          height={24}
                          color="white"
                        />
                      </button>
                    </div>
                    <Image
                      alt="success"
                      src={popUpImage ?? BLANK_IMAGE}
                      className="w-full h-full object-cover"
                      width={0}
                      height={0}
                    />
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
