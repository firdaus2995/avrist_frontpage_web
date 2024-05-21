import {
  RequirementForm,
  ContactSupport,
  FeedbackForm,
  HighOffice,
  BranchOffice
} from './MainContentComponent';
import RoundedFrameBottom from '@/components/atoms/RoundedFrameBottom';

type Props = {
  formId?: string;
  formSaranId?: string;
};

export const MainContent = (props: Props) => {
  const { formId, formSaranId } = props;
  return (
    <div className="w-full flex flex-col">
      <div className="bg-purple_superlight flex flex-col gap-[4rem] xs:p-4 sm:p-0 sm:px-[8.5rem] sm:py-[6.25rem] xs:pb-[1.875rem] xs:px-[1.3125rem]">
        <div className="mx-[2rem] md:mx-[8.5rem]">
          <p className="font-karla font-bold text-[3.5rem] text-center text-purple_dark">
            Kebutuhan Anda adalah prioritas kami
          </p>
        </div>
        <RequirementForm Id={formId} />
        <ContactSupport />
      </div>
      <FeedbackForm Id={formSaranId} />
      <div className="bg-purple_superlight sm:px-[8.5rem] sm:pt-[6.25rem] sm:pb-[1.5rem] xs:pb-[1.875rem] xs:px-[1.3125rem]">
        <HighOffice />
      </div>
      <div className="bg-purple_superlight sm:px-[8.5rem] sm:pb-[6.25rem] xs:pb-[1.875rem] xs:px-[1.3125rem]">
        <BranchOffice />
      </div>
      <RoundedFrameBottom frameColor="bg-purple_superlight" />
    </div>
  );
};
