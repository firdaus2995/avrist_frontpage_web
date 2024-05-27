import React from 'react';
import Image from 'next/image';
import CLOCK from '@/assets/images/avrast/hubungi-kami/clock.svg';
import CUSTOMER_SERVICE from '@/assets/images/common/customer-service.svg';
import EMAIL from '@/assets/images/common/email.svg';
import Icon from '@/components/atoms/Icon';

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
    <div>
      <form className="mt-[2.25rem]">
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
      </form>
    </div>
  );
};
