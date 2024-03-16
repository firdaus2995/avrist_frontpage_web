import { CardPurple } from './Card';

type Props = {
  title: string;
  address?: string;
  workHour?: string;
  contact?: string;
};
export const CardAddress = (props: Props) => {
  const { title, address, contact, workHour } = props;
  return (
    <CardPurple>
      <div className="p-[24px]">
        <div className="flex flex-row justify-between items-center">
          <span className="font-bold text-[24px]">{title}</span>
          <span>i</span>
        </div>
        {address && (
          <div className="flex flex-row items mt-[24px]">
            <span className="mr-[8px]">i</span>
            <span className="font-opensans text-[18px]">{address}</span>
          </div>
        )}
        {workHour && (
          <div className="flex flex-row items mt-[12px]">
            <span className="mr-[8px]">i</span>
            <span className="font-opensans text-[18px]">{workHour}</span>
          </div>
        )}
        {contact && (
          <div className="flex flex-row items mt-[12px]">
            <span className="mr-[8px]">i</span>
            <span className="font-opensans text-[18px]">{contact}</span>
          </div>
        )}
      </div>
    </CardPurple>
  );
};
