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
  headingClassname?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  heading,
  cards,
  roleClassname,
  idTags,
  headingClassname
}) => (
  <div className="font-karla" id={idTags}>
    <div className="text-center xs:my-[2.25rem] sm:my-[5rem]">
      <p
        className={`font-bold xs:text-[2.25rem] md:text-[3.5rem] font-karla ${headingClassname ?? 'text-purple_dark'}`}
      >
        {heading}
      </p>
    </div>
    <div className="flex xs:flex-col md:flex-row justify-center items-center gap-[1.5rem]">
      {cards.map((item, index) => (
        <div
          key={index}
          role="button"
          onClick={() => item.onClick && item.onClick(item)}
          className="max-w-[23.25rem] border-1 rounded-[12px] shadow-md"
        >
          <Image
            alt="blank-image"
            width={0}
            height={372}
            src={item.image}
            className="rounded-t-[12px] h-[23.25rem] w-full object-cover"
          />
          <div className="text-center md:m-[2rem] font-bold font-karla h-[150px] flex flex-col items-center justify-center sm:justify-between">
            <p className="xs:text-[1.5rem] md:text-[2.25rem] line-clamp-2">
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
