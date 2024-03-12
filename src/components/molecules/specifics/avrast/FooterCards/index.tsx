import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface IFooterCards {
  cards: { title: string; subtitle?: string | undefined; icon: StaticImport }[];
}

const FooterCards = ({ cards }: IFooterCards) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center bg-purple_superlight px-[136px] pb-[72px]">
      {cards.map(
        (
          item: {
            title: string;
            subtitle?: string;
            icon: StaticImport | string;
          },
          index: number
        ) => (
          <div
            key={index}
            className="h-full flex flex-col items-center justify-center bg-white p-[24px] gap-[24px] border border-gray_light rounded-[12px]"
          >
            <Image
              alt={index.toString()}
              src={item.icon}
              className="w-[100px] h-[100px]"
            />
            <div className="flex flex-col gap-1">
              <p className="text-center font-bold md:text-lg 2xl:text-[24px]">
                {item.title.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </p>
              {item.subtitle && (
                <p className="text-center font-bold md:text-lg 2xl:text-[24px] text-purple_dark">
                  {item.subtitle}
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FooterCards;
