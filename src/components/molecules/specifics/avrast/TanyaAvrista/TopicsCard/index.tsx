'use client';

import Image from 'next/image';

interface ITopicsCard {
  cards: { title: string; icon: string; color?: string | null }[];
  onClickCards: (title: string) => void;
}

const TopicsCard = ({ cards, onClickCards }: ITopicsCard) => {
  return (
    <div className="w-full flex flex-col gap-8 items-center bg-[#F7F4F8]">
      <h1 className="mt-[100px] font-karla text-[56px] text-purple_dark">
      Apa yang ingin <span className="font-bold">Anda </span>
         ketahui?
      </h1>
      <div className="grid xs:grid-rows-1 md:grid-cols-2 xl:grid-cols-4 md:gap-4 2xl:gap-10 px-44 mt-8 mb-20">
        {cards.map((item, index) => (
          <div key={index} role='button' onClick={() => onClickCards(item.title)} className="flex flex-col items-center">
            <div className="md:w-[200px] bg-white 2xl:w-[274px] md:h-[186px] 2xl:h-[260px] flex flex-col items-center justify-center px-[24px] pt-[24px] pb-[36px] gap-[24px] border border-gray_light rounded-t-xl">
              <Image
                alt={item.title}
                src={item.icon}
                className="md:w-[60px] md:h-[60px] 2xl:w-[100px] 2xl:h-[100px]"
                width={60}
                height={60}
              />
              <p className="text-center font-bold md:text-[32px] 2xl:text-[24px] leading-[2.4rem]">
                {item.title.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </p>
            </div>
            <div
              className={`h-[7px] md:w-[200px] 2xl:w-[274px] rounded-b-xl ${!item.color ? 'bg-purple_dark' : item.color}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsCard;
