'use client';
import React from 'react';

type Props = {
  title: string;
  content: string;
};

const ArtikelTanyaAvrista = (props: Props) => {
  const { content, title } = props;

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-t-[60px] xs:py-[3.125rem] md:pt-[6.25rem] md:pb-[26px] px-[2rem] md:px-[8.5rem] flex flex-row">
        <section className="w-full flex flex-col gap-6">
          <h1 className="font-karla xs:text-[2.25rem] md:text-[3.5rem] font-bold sm:leading-[67.2px] xs:leading-[43.2px] -tracking-[0.04em]">
            {title}
          </h1>
          <p
            className="font-opensans text-xl leading-[2rem]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </div>
    </div>
  );
};

export default ArtikelTanyaAvrista;
