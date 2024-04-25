import React from 'react';
import Image from 'next/image';

import {
  SelectRadio,
  TextInput,
  TextInputArea,
  TextInputPhone,
  SelectDropdown
} from './form/Input';
import CaptchaPicture from '@/assets/images/form-captcha.svg';

export const RequirementForm = () => {
  return (
    <div className="mt-[64px] bg-purple_superlight">
      <div className="bg-white mt-[80px] mx-auto md:mx-[136px] border rounded-xl border-gray_light overflow-hidden">
        <div className="p-[36px]">
          <p className="font-karla font-bold text-[36px] md:text-[56px]">
            Diskusikan kebutuhan Anda disini!
          </p>
          <p className="mt-[24px] md:mt-[36px] font-opensans text-[14px] md:text-[16px]">
            isi data berikut dan Kami akan menghubungi Anda.
          </p>
          <form className="mt-[24px] md:mt-[36px]">
            {/* radio */}
            <SelectRadio
              title="Pemegang Polis"
              data={[
                { id: 'ya', label: 'Ya' },
                { id: 'tidak', label: 'Tidak' }
              ]}
              require
            />
            {/* name & email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[24px] md:mt-[36px]">
              <TextInput
                title="Nama"
                placeholder="Masukkan Nama Anda"
                onChangeText={() => {}}
                require
              />
              <TextInput
                title="Alamat Email"
                placeholder="Masukkan alamat e-mail anda"
                onChangeText={() => {}}
                require
              />
            </div>
            {/* no phone & domisili */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[24px] md:mt-[36px]">
              <TextInputPhone
                title="No. Telepon"
                placeholder="Masukkan Nomor Telepon"
                onChangeText={() => {}}
                require
              />
              <TextInput
                title="Domisili"
                placeholder="Masukkan Domisili Anda"
                onChangeText={() => {}}
                require
              />
            </div>
            {/* Text area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[24px] md:mt-[36px]">
              <SelectDropdown
                title="Pilih Kebutuhan Anda"
                placeholder="Pilih"
                data={[
                  { id: '1', label: 'Placeholder' },
                  { id: '2', label: 'Lainnya' }
                ]}
                require
              />
              <TextInputArea
                title="Detail Kebutuhan"
                placeholder="Tulis detail kebutuhan anda"
                onChangeText={() => {}}
                require
                maxLength={500}
              />
            </div>
            {/* snk */}
            <div className="flex flex-row mt-[24px] md:mt-[36px]">
              <div>
                <input type="checkbox" />
              </div>
              <span className="ml-[12px]">
                Saya /kami telah membaca, memahami dan memberikan persetujuan
                saya/kami kepada Avrist Life Insurance untuk mengumpulkan,
                menggunakan dan mengungkapkan data pribadi saya/kami sesuai
                dengan{' '}
                <span className="font-bold text-purple_dark">
                  Deklarasi Privasi *
                </span>
              </span>
            </div>
            {/* submit */}
            <div className="mt-[24px] md:mt-[36px] flex flex-col md:flex-row md:justify-between md:items-center">
              {/* <img src={CaptchaPicture} alt="captha" className="md:w-auto" /> */}
              <Image alt="captcha" src={CaptchaPicture} className="md:w-auto" />
              <button className="bg-purple_dark text-white h-[44px] md:h-[64px] w-full md:w-[132px] rounded-lg mt-[12px] md:mt-0">
                Kirim
              </button>
            </div>
          </form>
        </div>
        <div className="h-[8px] bg-purple_dark" />
      </div>
    </div>
  );
};
