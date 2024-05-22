import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

interface AboutHeadingProps {
  categoriesName: string;
  categoriesClassname?: string;
  categoriesIcon?: StaticImport | string;
  headingText: string;
  subHeadingText?: string;
  description: string;
  tags: string[];
  tagsClassname?: string;
  tagsTextClassname?: string;
  idTags?: string;
}

const AboutHeading: React.FC<AboutHeadingProps> = ({
  categoriesName,
  categoriesClassname,
  categoriesIcon,
  headingText,
  subHeadingText,
  description,
  tags,
  tagsClassname,
  tagsTextClassname,
  idTags
}) => (
  <div className="flex flex-col flex-nowrap" id={idTags}>
    <div>
      <div className="flex flex-row items-center gap-[0.75rem] font-karla">
        {categoriesIcon && (
          <Image width={36} height={36} alt="symbol" src={categoriesIcon} />
        )}
        <p className={`${categoriesClassname} font-bold text-[1.5rem]`}>
          {categoriesName}
        </p>
      </div>
      <div className="font-karla my-[0.75rem]">
        <h1 className="xs:text-[2.25rem] md:text-[3.5rem] font-bold">
          {headingText}
        </h1>
        <p
          className="xs:text-[1.5rem] md:text-[2.25rem] font-bold xs:pt-[1.5rem] xs:pb-[0.75rem] md:pb-0"
          dangerouslySetInnerHTML={{ __html: subHeadingText ?? '' }}
        ></p>
        <p
          className="text-[1.5rem] font-light"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="flex flex-row flex-nowrap my-[1.5rem] gap-[0.75rem]">
        {tags &&
          tags.map((item: string, index: number) => (
            <Link
              key={index}
              className={`${tagsClassname} px-[8px] py-[4px] rounded-[2px]`}
              href={{
                pathname: `/pencarian`,
                query: { searchValue: item }
              }}
            >
              <p
                className={`${tagsTextClassname} text-[14px] font-semibold font-opensans`}
              >
                {item}
              </p>
            </Link>
          ))}
      </div>
    </div>
  </div>
);

export default AboutHeading;
