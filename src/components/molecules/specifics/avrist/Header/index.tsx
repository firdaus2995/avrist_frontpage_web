'use client';

import React from 'react';
import Image from 'next/image';
import NavCard from './components/NavCard';
import TriangleMarker from './components/TriangleMarker';

import DUMMY_DATA from './sample-data.json';

import styles from './styles.module.css';
import { NavbarMenuItem } from './types';

import HOME_ICON from '@/assets/icons/home-icon.svg';
import AVRIST_LOGO from '@/assets/images/avrist-logo.svg';
import Button from '@/components/atoms/Button/Button';

const Header = () => {
  const menus: NavbarMenuItem[] = DUMMY_DATA['menus']['navbar'];

  return (
    <>
      <header className="bg-gradient-to-b z-50 from-purple_dark to-purple_light sticky top-0 w-full m-0 mb-6 text-white py-3 px-8">
        <div
          className="flex justify-between items-center max-w-[90rem] m-auto gap-8"
          // style={{ border: '3px solid red' }}
        >
          <ul className="md:flex gap-10 items-center hidden">
            <Button.IconButton>
              <Image src={HOME_ICON} alt="Home" />
            </Button.IconButton>
            {menus.map((item) => (
              <React.Fragment key={item.title}>
                <li
                  className={`font-medium cursor-pointer text-sm relative ${styles['nav-list-item']}`}
                >
                  {item.title}
                  <TriangleMarker
                    customClass={`absolute bottom-0 left-1/2 -translate-x-1/2 top-[33px] cursor-default ${styles['nav-transition']}`}
                  />
                </li>
                <NavCard
                  customClass={`${styles['nav-card-animation']} absolute cursor-default left-0 duration-300`}
                  content={item.content}
                />
              </React.Fragment>
            ))}
          </ul>
          <Image
            src={AVRIST_LOGO}
            alt="Avrist Logo"
            className="h-auto w-6rem ml-auto"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
