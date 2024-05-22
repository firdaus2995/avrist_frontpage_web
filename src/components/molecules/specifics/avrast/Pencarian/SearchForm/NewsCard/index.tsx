import React from 'react';
import Image from 'next/image';
import BOOK from '@/assets/images/common/book.svg';

interface INewsCard {
  label: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const NewsCard: React.FC<INewsCard> = ({
  label,
  title,
  date,
  description,
  tags
}) => {
  return (
    <div className="mx-3 rounded-xl border-2 border-gray_light px-[1.5rem] py-[2.25rem] flex flex-col gap-[1.5rem]">
      <span className="flex flex-row gap-2">
        <p className="font-bold text-purple_dark text-sm">{label}</p>
        <span className="w-[0.0625rem] h-auto bg-black" />
        <p className="text-sm">{date}</p>
      </span>
      <p className="text-2xl w-[74%] font-bold">{title}</p>
      <div
        className="text-sm text-body-text-1 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: description
        }}
      />

      <div className="flex flex-row gap-2">
        {tags?.length > 0 &&
          tags.map((item, index) => (
            <p
              key={index}
              className="text-purple_dark font-semibold bg-gray_bglightgray px-2 py-1 text-sm"
            >
              {item}
            </p>
          ))}
      </div>

      <div className="flex flex-row gap-2">
        <Image alt="book" src={BOOK} />
        <p className="text-sm font-bold">Baca 2 Menit</p>
      </div>
    </div>
  );
};

export default NewsCard;
