import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

interface PurposeCardProps {
  title: string;
  desc: string;
  icon: StaticImport;
  link: string;
  href?: string;
  customClassName?: string;
}

const PurposeCard: React.FC<PurposeCardProps> = ({
  title,
  desc,
  icon,
  link,
  href,
  customClassName = ''
}) => (
  <div
    className={`${customClassName} p-4 flex flex-col gap-4 bg-white w-full h-full border border-b-8 border-b-purple_dark rounded-xl text-center`}
  >
    <div className="flex flex-col gap-4 items-center">
      <Image src={icon} alt="img" className="w-20" />
      <p
        className="text-[2rem] font-bold font-karla -tracking-[0.96px] leading-[2.5rem]"
        dangerouslySetInnerHTML={{
          __html: title
        }}
      />
    </div>
    <p
      className="font-opensans leading-[22.4px]"
      dangerouslySetInnerHTML={{
        __html: desc
      }}
    />
    {href && (
      <Link href={href ?? ''}>
        <p className="font-bold text-purple_dark">{link}</p>
      </Link>
    )}
  </div>
);

export default PurposeCard;
