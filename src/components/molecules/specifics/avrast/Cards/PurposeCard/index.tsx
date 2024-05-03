import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

interface PurposeCardProps {
  title: string;
  desc: string;
  icon: StaticImport;
  link: string;
  href?: string;
}

const PurposeCard: React.FC<PurposeCardProps> = ({
  title,
  desc,
  icon,
  link,
  href
}) => (
  <div className="flex p-4 flex-col gap-4 items-center justify-center bg-white w-full border border-b-8 border-b-purple_dark rounded-xl text-center">
    <Image src={icon} alt="img" className="w-20" />
    <p className="text-[32px] font-bold">{title}</p>
    <p className="line-clamp-3">{desc}</p>
    <Link href={href ?? ''}>
      <p className="font-semibold text-purple_dark">{link}</p>
    </Link>
  </div>
);

export default PurposeCard;
