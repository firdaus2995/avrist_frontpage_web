'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CardRainbow } from '../HubungiKami/MainContentComponent/Card';
import Icon from '@/components/atoms/Icon';

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

const getDataPopUp = async () => {
  try {
    const response = await fetch('https://api-front-sit.avristcms.barito.tech/api/content/Pop-Up-Awal?includeAttributes=true');
    // const response = await fetch('http://localhost:9093/api/content/Pop-Up-Awal?includeAttributes=true');
    // const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENT_URL}/Pop-Up-Awal?includeAttributes=true`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const { data: dataResponse } = await response.json();
    console.log({dataResponse});
    
    
    const shouldBeRealData = {
      "code": 200,
      "status": "OK",
      "data": {
          "id": 6404,
          "name": "Pop Up Awal",
          "slug": "Pop-Up-Awal",
          "type": "SINGLE",
          "contentDataList": [
              {
                  "id": 6053,
                  "title": "Banner Promo",
                  "shortDesc": "Banner Promo",
                  "categoryName": "",
                  "status": "APPROVED",
                  "lastComment": null,
                  "lastEdited": null,
                  "createdAt": "2024-03-19T13:17:44.648+00:00",
                  "contentData": [
                      {
                          "id": 8269,
                          "name": "Gambar Promo",
                          "fieldType": "IMAGE",
                          "fieldId": "gambar-promo",
                          "config": "{\"media_type\":\"single_media\"}",
                          "parentId": null,
                          "value": "[{\"imageUrl\":\"d0c82739-29ee-42c5-be6a-3326b62cfa69-sayuran.jpg\",\"altText\":\"Banner Promo\"}]",
                          "contentData": null
                      }
                  ]
              }
          ],
          "useCategory": false
      },
      "errors": null,
      "pagination": null
  }
  const { data } = shouldBeRealData;

    if (data && data.contentDataList && data.contentDataList.length > 0) {
      const bannerValue = data.contentDataList[0].contentData[0].value;
      
      const parsedBannerValue = JSON.parse(bannerValue);
      
      const imageUrl = parsedBannerValue[0].imageUrl;
      const dataPath = `${process.env.NEXT_PUBLIC_FILE_URL}/get/${imageUrl}`;

      return dataPath;
    } else {
      throw new Error('Data structure is incorrect or empty');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// interface IContentData {
//   id: number,
//   name: string,
//   fieldType: string,
//   fieldId?: number,
//   config: string,
//   parentId?: number,
//   value: string,
//   // contentData?: any,
// }

// interface IDataProps {
//   id: number,
//   name: string,
//   slug: string,
//   type: 'SINGLE' | 'COLLECTION',
//   useCategory: boolean,
//   contentData: [IContentData]
//   };

export const HomeBannerModal = () => {
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
    if (statusModal !== null) {
      getDataPopUp().then(
        (imageUrl) => {
        setBannerModalPath(imageUrl!)
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
                      // src="https://img.freepik.com/premium-vector/flash-sale-discount-banner-template-promotion_7087-866.jpg"
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
