import React from 'react';
import Image from 'next/image';
import { CardMenuDownload } from '../../KelolaPolis/MainContentComponent/CardMenu';
import CLOCK from '@/assets/images/avrast/hubungi-kami/clock.svg';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import EMAIL from '@/assets/images/common/email.svg';
import Icon from '@/components/atoms/Icon';
import { BASE_URL } from '@/utils/baseUrl';
import { handleDownload } from '@/utils/helpers';

type TextInputProps = {
  title: string;
  placeholder: string;
};
const TextInput = (props: TextInputProps) => {
  const { title, placeholder } = props;
  return (
    <div>
      <p className="font-opensans font-bold text-[16px]">
        {title}
        <span className="text-red_error"> *</span>
      </p>
      <input
        className="mt-[8px] rounded-[14px] border border-light-grey w-full font-opensans font-normal text-[14px] px-[10px] py-[16px]"
        placeholder={placeholder}
      />
    </div>
  );
};

const TextInputPhone = (props: TextInputProps) => {
  const { title, placeholder } = props;
  return (
    <div>
      <p className="font-opensans font-bold text-[16px]">
        {title}
        <span className="text-red_error"> *</span>
      </p>
      <div className="flex flex-row mt-[8px]">
        <div className="rounded-[14px] border border-light-grey font-opensans font-normal text-[14px] px-[10px] py-[16px] mr-[8px]">
          <select>
            <option value="62">+62</option>
            <option value="63">+63</option>
            <option value="64">+64</option>
            <option value="65">+65</option>
          </select>
        </div>
        <input
          className="rounded-[14px] border border-light-grey w-full font-opensans font-normal text-[14px] px-[10px] py-[16px]"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
const TextInputArea = (props: TextInputProps) => {
  const { title, placeholder } = props;
  const [text, setText] = React.useState('');
  return (
    <div>
      <p className="font-opensans font-bold text-[16px]">
        {title}
        <span className="text-red_error"> *</span>
      </p>
      <textarea
        className="mt-[8px] rounded-[14px] border border-light-grey w-full font-opensans font-normal text-[14px] px-[10px] py-[16px] h-[120px] resize-none"
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
      />
      <p className="text-end">{text.length}/500</p>
    </div>
  );
};

type UploadBoxProps = {
  title: string;
  textWidth?: number;
};
const UploadBox = (props: UploadBoxProps) => {
  const { title, textWidth } = props;
  return (
    <div className="border border-light-grey rounded-[14px] flex flex-col items-center justify-center min-w-[172px] h-[120px] cursor-pointer">
      <Icon name="UploadIcon" height={24} width={24} color="purple_dark" />
      <p
        className="font-opensans font-normal text-[14px] text-center"
        style={{ width: textWidth }}
      >
        {title}
      </p>
    </div>
  );
};

const handleClickDownload = async (fileUrl: string) => {
  await handleDownload(fileUrl);
}

export const ReportForm = () => {
  return (
    <div className="mt-[5rem] bg-purple_superlight sm:px-[8.5rem] xs:px-[1.5rem]">
      <div className="bg-white mt-[5rem] border rounded-xl border-gray_light overflow-hidden">
        <div className="p-[2.25rem]">
          <p className="font-karla font-bold text-[3.5rem]">Form Pengaduan</p>
          <form className="mt-[2.25rem]">
            {/* radio */}
            <div>
              <p className="font-opensans font-bold text-[1rem]">
                Pemegang Polis <span className="text-red_error">*</span>
              </p>
              <div className="mt-[0.5rem]">
                <label>
                  <input type="radio" value="option1" />
                  <span className="ml-[0.75rem]">Ya</span>
                </label>
                <label className="ml-[2rem]">
                  <input type="radio" value="option1" />
                  <span className="ml-[0.75rem]">Tidak</span>
                </label>
              </div>
            </div>
            {/* name & email */}
            <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-8">
              <TextInput title="Nama" placeholder="Masukkan Nama Anda" />
              <TextInput
                title="Alamat Email"
                placeholder="Masukkan alamat e-mail anda"
              />
            </div>
            {/* no phone & domisili */}
            <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-8 mt-[2.25rem]">
              <TextInputPhone
                title="No. Telepon"
                placeholder="Masukkan Nomor Telepon"
              />
              <TextInput
                title="Domisili"
                placeholder="Masukkan Domisili Anda"
              />
            </div>
            {/* Text area */}
            <div className="mt-[2.25rem]">
              <TextInputArea
                title="Detail Pengaduan"
                placeholder="Tulis detail pengaduan anda"
              />
            </div>
            {/* Upload Doc & contact */}
            <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-8 mt-[2.25rem]">
              {/* upload */}
              <div>
                <p className="font-opensans font-bold text-[1rem]">
                  Upload Dokumen
                </p>
                <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-2 mt-[0.5rem]">
                  <UploadBox title="Upload KTP" textWidth={4} />
                  <UploadBox title="Upload Formulir" textWidth={4} />
                  <UploadBox title="Dokumen Pendukung" textWidth={8.75} />
                </div>
              </div>
              {/* contact support */}
              <div className="border border-gray_light rounded-xl flex flex-col justify-between overflow-hidden">
                <div className="p-[1.5rem]">
                  <div className="flex flex-row items-center">
                    <Image
                      width={1.5}
                      height={1.5}
                      alt="symbol"
                      src={CUSTOMER_SERVICE}
                    />
                    <span className=" ml-[1.5rem] font-opensans font-bold text-[1rem] w-[11.5625rem]">
                      Layanan Nasabah
                    </span>
                    <span className="text-purple_dark font-normal text-[1rem]">
                      021 5789 8188
                    </span>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center mt-[0.75rem]">
                    <Image width={1.5} height={1.5} alt="symbol" src={EMAIL} />
                    <span className=" ml-[1.5rem] font-opensans font-bold text-[1rem] w-[11.5625rem]">
                      Email
                    </span>
                    <span className="text-purple_dark font-normal text-[1rem]">
                      customer@avrist.com
                    </span>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center mt-[0.75rem]">
                    <Image width={1.5} height={1.5} alt="symbol" src={CLOCK} />
                    <span className=" ml-[1.5rem] font-opensans font-bold text-[1rem] w-[11.5625rem]">
                      Waktu Operasional
                    </span>
                    <span className="text-purple_dark font-normal text-[1rem]">
                      Senin - Jumat, 08.00 - 17.00 WIB
                    </span>
                  </div>
                </div>
                <div className="h-[0.5rem] bg-purple_dark" />
              </div>
            </div>
            {/* snk */}
            <div className="flex flex-row mt-[2.25rem]">
              <div>
                <input type="checkbox" />
              </div>
              <span className="ml-[0.75rem]">
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
            <div className="mt-[2.25rem] flex sm:flex-row xs:flex-col justify-end items-center">
              <button className="bg-purple_dark text-white h-[4rem] w-[8.25rem] rounded-lg">
                Kirim
              </button>
            </div>
          </form>
        </div>
        <div className="h-[0.5rem] bg-purple_dark" />
      </div>
      <div className="">
        <CardMenuDownload desc="Formulir Pengaduan" href={`${BASE_URL.image}/4bc466fc-9bad-4fd8-b44b-d603810a200a-formulir-pengaduan.pdf`} onDownload={handleClickDownload}  />
      </div>
    </div>
  );
};
