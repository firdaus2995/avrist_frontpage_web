'use client';
import Image from 'next/image';

interface Card {
  name: string;
  role: string;
  image: string;
  desc?: string;
  onClick?: (cardData: Card) => void;
}

interface PersonCardProps {
  heading: string;
  cards: Card[];
  roleClassname?: string;
  idTags?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  heading,
  cards,
  roleClassname,
  idTags
}) => (
  <div className="font-karla mx-[2.25rem]" id={idTags}>
    <div className="text-center mb-[24px]">
      <p className="font-bold xs:text-[2.25rem] md:text-[3.5rem] font-karla text-purple_dark">
        {heading}
      </p>
    </div>
    <div className="flex xs:flex-col md:flex-row justify-center items-center gap-[24px]">
      {cards.map((item, index) => (
        <div
          key={index}
          role="button"
          onClick={() => item.onClick && item.onClick(item)}
          className="max-w-[372px] border-1 rounded-[12px] shadow-md"
        >
          <Image
            alt="blank-image"
            width={0}
            height={372}
            src={item.image}
            className="rounded-t-[12px] w-[372px]"
          />
          <div className="text-center mx-2 my-[32px] font-bold font-karla h-auto">
            <p className="xs:text-[1.5rem] md:text-[2.25rem] line-clamp-1">
              {item.name}
            </p>
            <p
              className={`${roleClassname} xs:text-[1.25rem] md:text-[1.5rem]`}
            >
              {item.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PersonCard;
