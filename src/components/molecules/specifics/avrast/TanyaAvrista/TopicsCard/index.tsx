'use client';

import Image from 'next/image';

interface ITopicsCard {
  cards: { title: string; icon: string; color?: string | null }[];
  onClickCards: (title: string) => void;
}

const TopicsCard = ({ cards, onClickCards }: ITopicsCard) => {
  return (
    <div className="w-full flex flex-col gap-[7.5rem] items-center bg-[#F7F4F8] sm:px-[5rem] sm:py-[3.90625rem] xs:py-[1.875rem] xs:px-[1.3125rem]">
      <h1 className="font-karla text-[3.5rem] text-purple_dark">
        Apa yang ingin <span className="font-bold">Anda </span> ketahui?
      </h1>
      <div className="grid xs:grid-rows-1 xs:grid-cols-2 sm:grid-cols-4 gap-[1.5rem]">
        {cards.map((item, index) => (
          <div
            key={index}
            role="button"
            onClick={() => onClickCards(item.title)}
            className="flex flex-col items-center"
          >
            <div
              className={`xs:w-[11.25rem] bg-white sm:w-[17.125rem] xs:h-[11.625rem] sm:h-[16.25rem] flex flex-col items-center justify-center px-[1.5rem] pt-[1.5rem] pb-[2.25rem] gap-[1.5rem] border border-gray_light rounded-xl border-b-[0.5rem] ${!item.color ? 'border-b-purple_dark' : item.color}`}
            >
              <Image
                alt={item.title}
                src={item.icon}
                className="md:w-[3.75rem] md:h-[3.75rem] 2xl:w-[6.25rem] 2xl:h-[6.25rem]"
                width={60}
                height={60}
              />
              <p className="text-center font-bold md:text-[2rem] 2xl:text-[1.5rem] leading-[2.4rem]">
                {item.title.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsCard;
