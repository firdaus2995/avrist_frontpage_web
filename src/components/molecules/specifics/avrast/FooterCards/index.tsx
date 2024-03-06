import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface IFooterCards {
  cards: { title: string, icon: StaticImport | string }[];
}

const FooterCards = ({
  cards,
}: IFooterCards) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center justify-center bg-purple_superlight px-[136px] pb-[72px]">
      {
        cards.map((item: {title: string, icon: StaticImport | string}, index: number) => (
          <div key={index} className="h-full flex flex-col items-center justify-center p-[24px] gap-[24px] border border-gray_light rounded-[12px]">
            <Image alt={index.toString()} src={item.icon} />
            <p className="text-center font-bold text-[24px]">{item.title}</p>
          </div>
        ))
      }
    </div>
  )
};

export default FooterCards;
