'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { CardRainbow } from '../HubungiKami/MainContentComponent/Card';
import Icon from '@/components/atoms/Icon';
import {
  contentTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

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

type Props = {
  popupUrl: string;
};

const getDataPopUp = async () => {
  try {
    const responseFetch = await fetch(`/api/home-banner`);
    const response = await responseFetch.json();
    if (!response || response.code !== 200) {
      throw new Error('Network response was not ok');
    }

    const { content } = contentTransformer(response);
    return singleImageTransformer(content['gambar-promo']);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const HomeBannerModal = (props: Props) => {
  const { popupUrl } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [bannerModalPath, setBannerModalPath] = useState('');

  function closeModal() {
    setIsOpen(false);
    setCookie(MODAL, 'hide');
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const statusModal: string | null = getCookie(MODAL);

    if (statusModal === null) {
      getDataPopUp().then((dataPopUp) => {
        console.log(dataPopUp);

        setBannerModalPath(dataPopUp!.imageUrl);
        openModal();
      });
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
          <div className="flex min-h-full items-center justify-center p-4 text-center py-[100px] px-[72px]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-[80%] w-[60%] transform overflow-hidden transition-all cursor-pointer">
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
                <Link href={popupUrl ?? '#'}>
                  <CardRainbow>
                    <div className="h-full min-h-[200px]">
                      <img
                        src={bannerModalPath}
                        alt="modal-home-banner"
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </CardRainbow>
                </Link>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
