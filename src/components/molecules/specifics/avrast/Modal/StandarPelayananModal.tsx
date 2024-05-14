'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { CardRainbow } from '../HubungiKami/MainContentComponent/Card';
import CASE from '@/assets/images/common/medicine-box.svg';
import WARNING from '@/assets/images/common/warning-triangle.svg';
import Icon from '@/components/atoms/Icon';

type Props = {
  show: boolean;
  onClose: () => void;
};

const data = [
  {
    text: 'Untuk memastikan bahwa proses klaim dilakukan dengan cepat, adil, dan transparan. Kami berkomitment untuk:',
    child: [
      {
        text: 'Memberikan pelayanan yang responsif dan ramah kepada para nasabah yang mengajukan klaim.',
        child: []
      },
      {
        text: 'Memproses klaim dengan cepat dan efisien, dengan melakukan verifikasi yang akurat sesuai dengan persyaratan polis.',
        child: []
      },
      {
        text: 'Menyediakan bantuan dan panduan kepada nasabah dalam mengajukan klaim, termasuk membantu dalam pengumpulan dokumen yang diperlukan.',
        child: []
      },
      {
        text: 'Memastikan keadilan dalam penilaian klaim, dengan mengikuti standar dan prosedur yang telah ditetapkan secara adil.',
        child: []
      },
      {
        text: 'Memberikan transparansi penuh dalam proses klaim, termasuk memberikan informasi yang jelas mengenai status klaim dan waktu penyelesaian yang diharapkan kepada para nasabah.',
        child: []
      }
    ]
  }
];

export const StandarPelayananModal = (props: Props) => {
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
              <Dialog.Panel className="transform transition-all overflow-y-auto">
                <CardRainbow className="bg-white">
                  <div className=" transition md:py-[64px] md:px-[72px] xs:p-10 overflow-y-auto">
                    <div className="absolute right-0 p-[24px]">
                      <button onClick={onClose}>
                        <Icon
                          name="close"
                          width={24}
                          height={24}
                          color="black"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col h-[80vh] w-[60vw]">
                      <div className="flex flex-col">
                        <div className="my-[20px] flex flex-col gap-[24px]">
                          <p className="font-karla font-bold text-purple_dark text-[48px]">
                          Komitmen Klaim
                          </p>
                          {data.map((val, idx) => (
                            <div key={idx}>
                              <p className="text-[18px] font-bold w-full">
                                {val.text}
                              </p>
                              {val.child?.length > 0 && (
                                <div>
                                  <ul className="flex flex-col gap-[24px]">
                                    {val.child.map((value, index) => (
                                      <li key={index}>
                                        <div className="flex flex-row gap-2 justify-start items-start">
                                          <Image
                                            className="w-4 mt-1"
                                            src={CASE}
                                            alt="case"
                                          />
                                          {value.text}
                                        </div>
                                        {value.child?.length > 0 && (
                                          <ul className="ml-5 flex flex-col gap-3">
                                            {value.child.map((text) => (
                                              <li key={text}>
                                                <div className="flex flex-row gap-2 justify-start items-start">
                                                  <Image
                                                    className="w-4 mt-1"
                                                    src={WARNING}
                                                    alt="case"
                                                  />
                                                  {text}
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                          <p className='text-[18px] text-justify'>
                            Tentunya, kami berkomitmen untuk memberikan estimasi waktu penyelesaian klaim yang transparan dan realistis kepada para nasabah kami.
                            Baik untuk metode pembayaran klaim cashless maupun reimbursement, kami berusaha untuk menyelesaikan klaim dalam waktu 14 hari kerja setelah menerima semua dokumen yang diperlukan.
                            Komitmen kami adalah untuk memastikan bahwa klaim nasabah diproses dengan cepat dan efisien, sehingga para penerima manfaat dapat segera mendapatkan manfaat asuransi yang mereka perlukan dalam waktu yang sesingkat mungkin.
                          </p>
                        </div>
                      </div>
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
