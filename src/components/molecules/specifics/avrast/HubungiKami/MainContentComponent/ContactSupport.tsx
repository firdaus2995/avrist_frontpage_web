import Image from 'next/image';
import Link from 'next/link';
import { DividerPurple } from './Divider';

import CLOCK from '@/assets/images/avrast/hubungi-kami/clock.svg';
import cs from '@/assets/images/common/customer-service.svg';
import EMAIL from '@/assets/images/common/email.svg';
import phone from '@/assets/images/common/phone.svg';

export const ContactSupport = () => {
  return (
    <div className="mt-[80px] mx-[136px] grid grid-rows-1 md:grid-cols-5 gap-6">
      <div className="h-[323px] col-span-1 md:col-span-2 border bg-white rounded-2xl border-gray_light overflow-hidden flex flex-col justify-between">
        <div className="p-[36px]">
          <Image src={phone} alt="phone" width={100} height={100} />
          <p className="font-karla font-extrabold text-[24px] md:text-[48px] leading-10 md:leading-[50px] mt-[24px]">
            Hubungi Kami
          </p>
        </div>
        <DividerPurple />
      </div>
      <div className="h-auto md:h-[323px]  border bg-white rounded-2xl border-gray_light overflow-hidden flex flex-col justify-between">
        <Link href='tel:021-5789-8188' className="h-full font-opensans font-bold text-[20px] flex flex-col items-center mt-[36px]">
          <Image src={cs} alt="cs" width={100} height={100} />
          <p className="mt-[24px]">Layanan Nasabah</p>
          <p className="text-purple_dark">021 5789 8188</p>
        </Link>
        <DividerPurple />
      </div>
      <div className="h-auto md:h-[323px]  border bg-white rounded-2xl border-gray_light overflow-hidden flex flex-col justify-between">
        <Link href='mailto:customer-service@avrist.com' className="h-full font-opensans font-bold md:text-[20px] flex flex-col items-center mt-[36px]">
          <Image src={EMAIL} alt="email" width={100} height={100} />
          <p className="mt-[24px]">Email</p>
          <p className="text-purple_dark">customer@avrist.com</p>
        </Link>
        <DividerPurple />
      </div>
      <div className="h-auto md:h-[323px] border bg-white rounded-2xl border-gray_light overflow-hidden flex flex-col justify-between">
        <div className="h-full font-opensans font-bold text-[20px] flex flex-col items-center mt-[36px] text-center">
          <Image src={CLOCK} alt="clock" width={100} height={100} />
          <p className="mt-[24px]">Waktu Operasional</p>
          <p className="text-purple_dark">Senin - Jumat,</p>
          <p className="text-purple_dark">08.00 - 17.00 WIB</p>
        </div>
        <DividerPurple />
      </div>
    </div>
  );
};
