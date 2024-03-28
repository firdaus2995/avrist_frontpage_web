'use client';
import React from 'react';

type Props = {
  title: string;
  content: string;
};

const ArtikelTanyaAvrista = (props: Props) => {
  const { content, title } = props;

  return (
    <div className="w-full bg-purple_dark -mt-[1px]">
      <div className="w-full bg-white rounded-t-[65px] pt-16 px-20 md:px-40 xl:px-60 flex flex-row">
        <section className="w-[20%] flex flex-col">
          <span className="flex flex-row gap-4 items-center">
            <div className="w-[6px] h-[49px] bg-purple_dark rounded-tl-xl" />
            <p className="text-lg font-bold text-purple_dark">Lorem Ipsum</p>
          </span>
          <span className="flex flex-row gap-4 items-center">
            <div className="w-[6px] h-[49px] bg-purple_mediumlight" />
            <p className="text-lg font-bold text-purple_mediumlight">
              Lorem Ipsum
            </p>
          </span>
          <span className="flex flex-row gap-4 items-center">
            <div className="w-[6px] h-[49px] bg-purple_mediumlight" />
            <p className="text-lg font-bold text-purple_mediumlight">
              Lorem Ipsum
            </p>
          </span>
          <span className="flex flex-row gap-4 items-center">
            <div className="w-[6px] h-[49px] bg-purple_mediumlight" />
            <p className="text-lg font-bold text-purple_mediumlight">
              Lorem Ipsum
            </p>
          </span>
          <span className="flex flex-row gap-4 items-center">
            <div className="w-[6px] h-[49px] bg-purple_mediumlight" />
            <p className="text-lg font-bold text-purple_mediumlight">
              Lorem Ipsum
            </p>
          </span>
          <span className="flex flex-row gap-4 items-center">
            <div className="w-[6px] h-[49px] bg-purple_mediumlight rounded-bl-xl" />
            <p className="text-lg font-bold text-purple_mediumlight">
              Lorem Ipsum
            </p>
          </span>
        </section>
        <section className="w-[80%] flex flex-col gap-8">
          <h1 className="font-karla text-5xl font-semibold leading-[60px]">
            {title}
          </h1>
          <p
            className="font-karla text-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </div>
    </div>
  );
};

export default ArtikelTanyaAvrista;
