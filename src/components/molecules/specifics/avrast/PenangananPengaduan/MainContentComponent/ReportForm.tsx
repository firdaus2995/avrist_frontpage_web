import React from 'react';
import Image from 'next/image';
import { CardMenuDownload } from '../../KelolaPolis/MainContentComponent/CardMenu';
import CLOCK from '@/assets/images/avrast/hubungi-kami/clock.svg';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import EMAIL from '@/assets/images/common/email.svg';
import CaptchaPicture from '@/assets/images/form-captcha.svg';
import Icon from '@/components/atoms/Icon';

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

export const ReportForm = () => {
  return (
    <div className="mt-[80px] bg-purple_superlight sm:px-[136px] xs:px-[24px]">
      <div className="bg-white mt-[80px] border rounded-xl border-gray_light overflow-hidden">
        <div className="p-[36px]">
          <p className="font-karla font-bold text-[56px]">Form Pengaduan</p>
          <form className="mt-[36px]">
            {/* radio */}
            <div>
              <p className="font-opensans font-bold text-[16px]">
                Pemegang Polis <span className="text-red_error">*</span>
              </p>
              <div className="mt-[8px]">
                <label>
                  <input type="radio" value="option1" />
                  <span className="ml-[12px]">Ya</span>
                </label>
                <label className="ml-[32px]">
                  <input type="radio" value="option1" />
                  <span className="ml-[12px]">Tidak</span>
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
            <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-8 mt-[36px]">
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
            <div className="mt-[36px]">
              <TextInputArea
                title="Detail Pengaduan"
                placeholder="Tulis detail pengaduan anda"
              />
            </div>
            {/* Upload Doc & contact */}
            <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-8 mt-[36px]">
              {/* upload */}
              <div>
                <p className="font-opensans font-bold text-[16px]">
                  Upload Dokumen
                </p>
                <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-2 mt-[8px]">
                  <UploadBox title="Upload KTP" textWidth={64} />
                  <UploadBox title="Upload Formulir" textWidth={64} />
                  <UploadBox title="Dokumen Pendukung" textWidth={140} />
                </div>
              </div>
              {/* contact support */}
              <div className="border border-gray_light rounded-xl flex flex-col justify-between overflow-hidden">
                <div className="p-[24px]">
                  <div className="flex flex-row items-center">
                     <Image width={24} height={24} alt="symbol" src={CUSTOMER_SERVICE} />                   
                    <span className=" ml-[24px] font-opensans font-bold text-[16px] w-[185px]">
                      Layanan Nasabah
                    </span>
                    <span className="text-purple_dark font-normal text-[16px]">
                      021 5789 8188
                    </span>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center mt-[12px]">
                    <Image width={24} height={24} alt="symbol" src={EMAIL} />                   
                    <span className=" ml-[24px] font-opensans font-bold text-[16px] w-[185px]">
                      Email
                    </span>
                    <span className="text-purple_dark font-normal text-[16px]">
                      customer@avrist.com
                    </span>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center mt-[12px]">
                  <Image width={24} height={24} alt="symbol" src={CLOCK} /> 
                    <span className=" ml-[24px] font-opensans font-bold text-[16px] w-[185px]">
                      Waktu Operasional
                    </span>
                    <span className="text-purple_dark font-normal text-[16px]">
                      Senin - Jumat, 08.00 - 17.00 WIB
                    </span>
                  </div>
                </div>
                <div className="h-[8px] bg-purple_dark" />
              </div>
            </div>
            {/* snk */}
            <div className="flex flex-row mt-[36px]">
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
            <div className="mt-[36px] flex sm:flex-row xs:flex-col justify-between items-center">
              <Image width={277} height={84} alt="symbol" src={CaptchaPicture} />                   
              <button className="bg-purple_dark text-white h-[64px] w-[132px] rounded-lg">
                Kirim
              </button>
            </div>
          </form>
        </div>
        <div className="h-[8px] bg-purple_dark" />
      </div>
      <div className="sm:px-[136px] mt-[24px] mb-[26px]">
        <CardMenuDownload desc="Formulir Pengaduan" />
      </div>
    </div>
  );
};
