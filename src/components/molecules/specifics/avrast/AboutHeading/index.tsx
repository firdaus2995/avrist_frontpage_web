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
      <div className="flex flex-row items-center gap-[0.5rem] font-karla">
        {categoriesIcon && (
          <Image width={36} height={36} alt="symbol" src={categoriesIcon} />
        )}
        <p
          className={`${categoriesClassname} font-bold text-[1.5rem] -tracking-[0.72px]`}
        >
          {categoriesName}
        </p>
      </div>
      <div className="font-karla mt-[0.5rem] mb-[0.75rem]">
        <h1 className="xs:text-[2.25rem] md:text-[3.5rem] font-bold xs:-tracking-[1.44px] sm:-tracking-[2.56px] xs:leading-[43.2px] sm:leading-[67.2px]">
          {headingText}
        </h1>
        {subHeadingText && (
          <p
            className="xs:text-[1.5rem] md:text-[2.25rem] font-bold xs:pt-[1.5rem] xs:pb-[0.75rem] -tracking-[1.44px] xs:leading-[28.8px] sm:leading-[43.2px]"
            dangerouslySetInnerHTML={{
              __html: subHeadingText.includes('>-<') ? '' : subHeadingText
            }}
          />
        )}

        <p
          className="text-[1.5rem] font-light text-justify -tracking-[0.72px] leading-[33.6px]"
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />
      </div>
      <div className="flex flex-row flex-nowrap gap-[0.75rem]">
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
