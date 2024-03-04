'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HERO_IMAGE from '@/assets/images/hero-image.svg';

interface IHero {
  title: string;
  breadcrumbsData: {
    title: string;
    href: string;
  }[];
}

const Hero: React.FC<IHero> = ({ title, breadcrumbsData }) => {
  const pathname = usePathname();
  return (
    <div className="relative w-full md:auto 2xl:h-[280px] z-0 overflow-hidden">
      <div className="w-full absolute top-[35%] flex items-center">
        <div className="w-full flex flex-row justify-between px-60 items-center">
          <p className="font-karla text-white text-[48px] font-light">
            {title}
          </p>

          <span className="flex flex-row gap-2">
            {breadcrumbsData.map((item, index) => (
              <>
                <Link
                  href={item.href}
                  className={`font-opensans text-white ${pathname === item.href ? 'font-bold' : ''}`}
                >
                  {item.title}
                </Link>
                {index < breadcrumbsData.length - 1 && (
                  <span className="w-[1px] h-auto bg-[#AA95B4]" />
                )}
              </>
            ))}
          </span>
        </div>
      </div>
      <Image alt="Avrist" className="h-auto w-full z-0" src={HERO_IMAGE} />
    </div>
  );
};

export default Hero;
