import Image, { StaticImageData } from 'next/image';
import MediumTag from '@/components/atoms/Tag/MediumTag';
import { htmlParser } from '@/utils/helpers';

interface IDescriptionCategoryA {
  tags: string[];
  categoryTitle: string;
  productTitle: string;
  categorySymbol: StaticImageData;
  tagLineProduk?: string;
  deskripsiLengkapProduk?: string;
}

const DescriptionCategoryA = ({
  tags,
  categoryTitle,
  productTitle,
  categorySymbol,
  tagLineProduk = '',
  deskripsiLengkapProduk = ''
}: IDescriptionCategoryA) => {
  return (
    <div className="flex flex-col gap-[24px] font-karla">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-row gap-[0.5rem]">
          <Image width={36} height={36} alt="symbol" src={categorySymbol} />
          <p className="font-bold text-[24px] text-purple_dark -tracking-[0.72px]">
            {categoryTitle}
          </p>
        </div>
        <h1 className="xs:text-[2.25rem] md:text-[3.5rem] font-bold xs:-tracking-[1.44px] sm:-tracking-[2.24px] xs:leading-[43.2px] sm:leading-[67.2px]">
          {productTitle}
        </h1>
      </div>
      <div className="flex flex-col gap-[12px]">
        <p className="xs:text-[1.5rem] md:text-[2.25rem] font-bold md:pb-0 -tracking-[1.08px] xs:leading-[28.8px] sm:leading-[43.2px]">
          {tagLineProduk?.includes('>-<')
            ? ''
            : htmlParser(tagLineProduk ?? '')}
        </p>
        <p
          className="md:text-[24px] xs:text-[24px] -tracking-[0.72px] leading-[33.6px]"
          dangerouslySetInnerHTML={{ __html: deskripsiLengkapProduk ?? '' }}
        />
        <div className="flex flex-row flex-wrap gap-[8px] font-opensans">
          {tags.map((item: string, index: number) => (
            <MediumTag
              key={index}
              title={item}
              customClass="font-semibold text-[14px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionCategoryA;
