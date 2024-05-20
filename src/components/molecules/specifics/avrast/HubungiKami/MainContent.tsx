import Image from 'next/image';
import {
  RequirementForm,
  ContactSupport,
  FeedbackForm,
  HighOffice,
  BranchOffice
} from './MainContentComponent';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom-purple-light.svg';

type Props = {
  formId?: string;
  formSaranId?: string;
};

export const MainContent = (props: Props) => {
  const { formId, formSaranId } = props;
  return (
    <div className="w-full flex flex-col">
      <div className="bg-purple_superlight flex flex-col gap-6 xs:p-4 sm:p-0">
        <div className="mt-[6.25rem] mx-[2rem] md:mx-[8.5rem]">
          <p className="font-karla font-bold text-[3.5rem] text-center text-purple_dark">
            Kebutuhan Anda adalah prioritas kami
          </p>
        </div>
        <RequirementForm Id={formId} />
        <ContactSupport />
        <FeedbackForm Id={formSaranId} />
        <HighOffice />
        <div className="sm:px-[8.5rem] sm:pb-[4rem] xs:pb-[1.875rem] xs:px-[1.3125rem]">
          <BranchOffice />
        </div>
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
