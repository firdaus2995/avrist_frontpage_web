import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface IInfoError {
  symbol: StaticImport | string;
  title: string;
  description: string;
}

const InfoError = ({ symbol, title, description }: IInfoError) => {
  const renderedDescription = () => {
    const isOrdered = description.includes('<ol>');
    const isUnordered = description.includes('<ul>');

    if (isOrdered) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: description.replace(
              '<ol>',
              '<ol class="list-decimal list-outside pl-5">'
            )
          }}
        />
      );
    }
    if (isUnordered) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: description.replace(
              '<ul>',
              '<ul class="list-disc list-outside pl-5">'
            )
          }}
        />
      );
    }

    return (
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="font-opensans text-sm"
      />
    );
  };

  return (
    <div className="flex flex-col self-stretch items-center justify-center border border-gray_light border-b-8 border-b-reddist rounded-[12px] rounded-b-[8px]">
      <div className="flex flex-col self-stretch bg-purple_superlight rounded-xl px-[24px] pt-[24px] pb-[36px] gap-[24px]">
        <div className="flex gap-[12px] items-center">
          <Image
            alt="infoerror"
            src={symbol}
            className="mix-blend-multiply w-[32px] h-[32px]"
            width={32}
            height={32}
          />
          <p className="text-[24px] text-gray_body font-bold font-karla">
            {title}
          </p>
        </div>
        {description && renderedDescription()}
      </div>
    </div>
  );
};

export default InfoError;
