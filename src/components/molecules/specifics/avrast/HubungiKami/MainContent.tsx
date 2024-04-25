import Image from 'next/image';
import {
  RequirementForm,
  ContactSupport,
  FeedbackForm,
  HighOffice,
  BranchOffice
} from './MainContentComponent';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom-purple-light.svg';

export const MainContent = () => {
  return (
    <div className=" w-full flex flex-col">
      <div className="bg-purple_superlight flex flex-col gap-6">
        <div className="mt-[20px] mx-[32px] md:mx-[136px]">
          <p className="font-karla font-bold text-[56px] text-center text-purple_dark">
            Kebutuhan Anda adalah prioritas kami
          </p>
        </div>
        <RequirementForm />
        <ContactSupport />
        <FeedbackForm />
        <HighOffice />
        <BranchOffice />
      </div>
      <Image
        alt="border-bottom"
        className="w-full h-auto"
        src={ROUNDED_FRAME_BOTTOM}
        style={{ userSelect: 'none' }}
      />
    </div>
  );
};
