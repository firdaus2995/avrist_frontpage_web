'use client';
import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Image from 'next/image';
import CASE from '@/assets/images/common/medicine-box.svg';
import Icon from '@/components/atoms/Icon';
import { CardRainbow } from '@/components/molecules/specifics/avrast/HubungiKami/MainContentComponent/Card';

export const PanduanLayananModal = ({ handleCloseModal, isShowPanduanLayananModal }: { handleCloseModal: () => void, isShowPanduanLayananModal: boolean })  => {
    const assuranceTips = [
        'Persiapan Dokumen: Nasabah harus mengumpulkan dokumen-dokumen yang diperlukan untuk keperluan klaim, sesuai dengan ketentuan polis asuransi. Dokumen umumnya mencakup formulir klaim, surat keterangan medis dari dokter atau rumah sakit, identitas diri, dan dokumen pendukung lainnya.',
        'Pengajuan Klaim: Nasabah kemudian mengajukan klaim ke perusahaan asuransi, baik secara langsung di kantor perusahaan, melalui agen asuransi, atau melalui platform online seperti avrist solution yang disediakan perusahaan.',
        'Verifikasi Dokumen: Tim klaim perusahaan asuransi akan memverifikasi kelengkapan dokumen yang diajukan. Untuk metode cashless, proses ini dapat dilakukan secara lebih cepat karena pihak Rumah Sakit dapat langsung mengkonfirmasi data pasien ke perusahaan asuransi.',
        'Pembayaran Klaim Cashless: Jika klaim diajukan dengan metode cashless, perusahaan asuransi akan langsung menjamin tagihan rumah sakit atau penyedia layanan kesehatan yang bermitra dengan asuransi. Nasabah tidak perlu membayar secara langsung selama tagihan sesuai dengan ketentuan polis.',
        'Pembayaran Klaim Reimbursement: Dalam metode reimbursement, setelah dokumen klaim diverifikasi, perusahaan asuransi akan meninjau klaim dan kemudian membayar nasabah atas pengeluaran yang telah diajukan, sesuai dengan ketentuan polis. Pembayaran dilakukan ke rekening bank sesuai yang diatur di polis.',
        'Estimasi Waktu Penyelesaian:  Untuk metode reimbursement, Avrist Assurance berkomitmen untuk menyelesaikan proses klaim dalam waktu 14 hari kerja setelah semua dokumen lengkap. Sedangkan untuk metode pembayara cashless, Avrist Assurance, akan langsung menjamin pembayaran klaim',
        'Pemantauan Status Klaim: Nasabah dapat memantau status klaim mereka melalui portal avrist solution atau menghubungi pusat layanan pelanggan perusahaan asuransi untuk mendapatkan informasi terkini tentang perkembangan klaim.'
    ]

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
                            <div className=" transition p-10 overflow-y-auto">
                                <div className="absolute right-0 p-[24px]">
                                    <button onClick={handleCloseModal}>
                                        <Icon name="close" width={24} height={24} />
                                    </button>
                                </div>
                                <div className="flex flex-col h-[80vh] w-[60vw]">
                                    <div className="flex items-left flex-col">
                                        <div className="my-[20px] flex flex-col gap-5">
                                            <p className="font-karla font-semibold text-purple_dark text-[48px]">
                                            Mekanisme Klaim Asuransi
                                            </p>                                
                                            {
                                                assuranceTips.map((item, index) => (
                                                    <div key={index} className="flex items-start gap-2 pt-2">
                                                        <Image src={CASE} alt="case" className="w-4 mt-1" />
                                                        <p className="text-[18px] text-left">{item}</p>
                                                    </div>
                                                ))
                                            }
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
}
