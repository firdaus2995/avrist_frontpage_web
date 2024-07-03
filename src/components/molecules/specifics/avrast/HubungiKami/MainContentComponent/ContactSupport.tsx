import Image from 'next/image';
import Link from 'next/link';

import CLOCK from '@/assets/images/avrast/hubungi-kami/clock.svg';
import cs from '@/assets/images/common/customer-service.svg';
import EMAIL from '@/assets/images/common/email.svg';
import phone from '@/assets/images/common/phone.svg';

export const ContactSupport = () => {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-row gap-[1.5rem] font-['Source Sans Pro']">
      <div className="h-auto md:w-[380px] border bg-white border-b-8 border-b-purple_dark rounded-2xl border-gray_light overflow-hidden flex flex-col xs:items-center md:items-start justify-between">
        <div className="p-[2.25rem] gap-[1.5rem] flex flex-col h-full">
          <Image src={phone} alt="phone" width={100} height={100} />
          <p className="font-karla font-extrabold  md:text-[3rem] leading-10 md:leading-[3.3rem] -tracking-[1.44px]">
            Hubungi Kami
          </p>
        </div>
      </div>
      <div className="h-auto md:basis-60 border border-b-8 border-b-purple_dark bg-white rounded-2xl border-gray_light overflow-hidden flex flex-col justify-between">
        <Link
          href="tel:021-5789-8188"
          className="h-full font-opensans md:text-[1.5rem] font-bold  flex flex-col items-center text-center px-[1.5rem] py-[2.25rem] gap-[1.5rem]"
        >
          <Image src={cs} alt="cs" width={100} height={100} />
          <div className="flex flex-col">
            <p className="">Layanan Nasabah</p>
            <p className="text-purple_dark text-[22px] font-opensanspro">021 5789 8188</p>
          </div>
        </Link>
      </div>
      <div className="h-auto md:basis-60 border border-b-8 border-b-purple_dark bg-white rounded-2xl border-gray_light overflow-hidden flex flex-col justify-between">
        <Link
          href="mailto:customer-service@avrist.com"
          className="h-full font-opensans font-bold md:text-[1.5rem] flex flex-col items-center text-center px-[1.5rem] py-[2.25rem] gap-[1.5rem]"
        >
          <Image src={EMAIL} alt="email" width={100} height={100} />

          <div className="flex flex-col">
            <p className="">Email</p>
            <p className="text-purple_dark text-[22px] font-opensanspro">customer@avrist.com</p>
          </div>
        </Link>
      </div>
      <div className="h-auto md:basis-60 border border-b-8 border-b-purple_dark bg-white rounded-2xl border-gray_light overflow-hidden flex flex-col justify-between">
        <div className="h-full font-opensans font-bold md:text-[1.5rem] flex flex-col items-center text-center px-[1.5rem] py-[2.25rem] gap-[1.5rem]">
          <Image src={CLOCK} alt="clock" width={100} height={100} />
          <div className="flex flex-col">
            <p className="">Waktu Operasional</p>
            <p className="text-purple_dark text-[22px] font-opensanspro">Senin - Jumat,</p>
            <p className="text-purple_dark text-[22px] font-opensanspro">08.00 - 17.00 WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
};
