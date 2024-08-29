interface Props {
  title: string;
  desc: string;
}

export const ContentPolicyList = ({ title, desc }: Props) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center text-center">
        <span className="text-purple_dark font-karla font-extrabold sm:text-[3.5rem] xs:text-[2.25rem] xs:-tracking-[1.44px] sm:-tracking-[2.56px] sm:leading-[67.2px] xs:leading-[43.2px]">
          {title}
        </span>
        <span className="font-karla font-normal sm:text-[2rem] xs:text-[1.5rem] text-gray_bold xs:-tracking-[0.72px] sm:-tracking-[1.08px]">
          {desc}
        </span>
      </div>
    </div>
  );
};
