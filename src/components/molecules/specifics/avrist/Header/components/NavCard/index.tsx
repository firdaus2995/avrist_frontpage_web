import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { NavbarMenuItemContent } from '../../types';

// import styles from './styles.module.css';

import ANALISIS from '@/assets/images/navbar-analisis.png';
import AVRAM from '@/assets/images/navbar-avram.png';
import INFORMASI from '@/assets/images/navbar-informasi.png';
import INVESTASI from '@/assets/images/navbar-investasi.png';
import KARIR from '@/assets/images/navbar-karir.png';
import Button from '@/components/atoms/Button/Button';

type NavCardProps = {
  content: NavbarMenuItemContent;
  customClass?: string;
};

const TEMPORARY_IMAGE_MAPPING = [INVESTASI, ANALISIS, INFORMASI, AVRAM, KARIR];

const NavCard: React.FC<NavCardProps> = ({ content, customClass }) => {
  return (
    <div
      className={`font-karla w-full bg-white gap-4 px-16 shadow-xl py-8 md:py-0 text-gray_body ${customClass ?? ''}`}
      // style={{ border: '3px solid red' }}
    >
      <div
        className="w-full max-w-[89rem] m-auto flex items-center justify-between gap-6"
        // style={{ border: '3px solid orange' }}
      >
        <div
          className="max-w-[35rem] w-full"
          // style={{ border: '3px solid yellow' }}
        >
          <h2 className="text-4xl font-bold text-gray_title">
            {content.title}
          </h2>
          <div
            className="mt-8 flex justify-between gap-6"
            // style={{ border: '3px solid green' }}
          >
            <div className="flex flex-col gap-6 items-start max-w-[15rem]">
              <p>{content.description}</p>
              <Button title={content.buttonTitle} />
            </div>
            <div
              className="flex flex-col justify-between"
              // style={{ border: '3px solid purple' }}
            >
              {content.tags.map((item, index) => (
                <React.Fragment key={index}>
                  <p
                    className={`font-bold ${index === 0 && 'text-purple_dark'}`}
                  >
                    {item}
                  </p>
                  {index < content.tags.length - 1 && (
                    <div className="border-gray_light border-solid border-b" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <Image
          className="h-auto max-w-[20rem] w-full hidden md:inline-block"
          // style={{ border: '3px solid blue' }}
          src={
            TEMPORARY_IMAGE_MAPPING[
              content.imageSource as keyof typeof TEMPORARY_IMAGE_MAPPING
            ] as StaticImageData
          }
          alt={content.title}
        />
      </div>
    </div>
  );
};

export default NavCard;
