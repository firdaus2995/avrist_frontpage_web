'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CardRainbow } from '../HubungiKami/MainContentComponent/Card';
import Icon from '@/components/atoms/Icon';
import { ContentResponse } from '@/types/content.type';
import { contentTransformer, singleImageTransformer } from '@/utils/responseTransformer';

function getCookie(name: string) {
  const nameEQ = name + '=';
  const cookiesArray = document.cookie.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return null;
}

function setCookie(name: string, value: string) {
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1, // Set expiration to the beginning of next day
    0,
    0,
    0 // Set time to midnight (00:00:00)
  );
  const expires = '; expires=' + expirationDate.toUTCString();
  document.cookie =
    name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

const MODAL = 'homeModalBanner';

const getDataPopUp = (response: ContentResponse | null) => {
  try {     
    if (!response || response.code !== 200) {
      throw new Error('Network response was not ok');
    }

    const { content } = contentTransformer(response as ContentResponse);
    return singleImageTransformer(content['gambar-promo'])
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const HomeBannerModal = ({ response }: { response: ContentResponse | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerModalPath, setBannerModalPath] = useState('');  

  function closeModal() {
    setIsOpen(false);
    setCookie(MODAL, 'hide');
  }

  async function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const statusModal: string | null = getCookie(MODAL);    

    if (statusModal === null && response !== null) {
      const dataPopUp = getDataPopUp(response);
        setBannerModalPath(dataPopUp!.imageUrl)
        openModal();
    }
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={closeModal}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-[80%] w-[60%] transform overflow-hidden transition-all">
                <CardRainbow>
                  <div className="h-[90%]">
                    <div className="absolute right-0 p-[24px]">
                      <button onClick={closeModal}>
                        <Icon
                          name="close"
                          width={24}
                          height={24}
                          color="white"
                        />
                      </button>
                    </div>
                    <img
                      src={bannerModalPath}
                      alt="modal-home-banner"
                      className="object-cover h-[90%] w-full"
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
