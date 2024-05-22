interface Props { 
  title: string, 
  desc: string
}

export const ContentPolicyList = ({title, desc}: Props) => {
  return (
    <div className="mt-[64px]">
      <div className="flex flex-col justify-center items-center text-center">
        <span className="text-purple_dark font-karla font-medium text-[56px]">
          {title}
        </span>
        <span className="font-karla font-normal text-[36px] text-gray_bold">
          {desc}
        </span>
      </div>
    </div>
  );
};
