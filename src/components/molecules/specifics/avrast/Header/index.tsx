'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { EmailSubscribeModal } from '../Modal';
import NavCard from './components/NavCard';
import NavDropdownMenus from './components/NavDropdownMenus';

import DUMMY_DATA from './sample-data.json';

import styles from './styles.module.css';
import { NavbarMenuItem } from './types';
import AVRIST_LOGO from '@/assets/images/avrast/logo.svg';
import VectorLogo from '@/assets/images/avrast/vector-logo.svg';

import BlackOverlay from '@/components/atoms/BlackOverlay';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import { getContent } from '@/services/content-page.api';
import { EXTERNAL_URL } from '@/utils/baseUrl';
import {
  contentTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const handleGetContent = async (
  slug: string,
  params: Record<string, string>
) => {
  try {
    const data = await getContent(slug, params);
    return data;
  } catch (error) {
    console.log('Error', error);
  }
};

const Header = () => {
  const menuRef: any = useRef(null);
  const listRef: any = useRef([]);
  const menus: NavbarMenuItem[] = DUMMY_DATA['menus']['navbar'];
  const [isDropdownHeaderVisible, setIsDropdownHeaderVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isShowEmailSubs, setIsShowEmailSubs] = useState(false);
  const [xPositions, setXPositions] = useState<number[]>([]);
  const [imageModal, setImageModal] = useState({ imageUrl: '', altText: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('Pop-Up-Subscription', {
          includeAttributes: 'true'
        });
        const { content } = contentTransformer(data as any);

        setImageModal(singleImageTransformer(content['image']));
      } catch (e) {
        console.log('Error', e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownHeaderVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const totalMiddlePositions: any[] | ((prevState: number[]) => number[]) =
      [];
    const windowWidth = window.innerWidth;

    listRef.current.forEach((ref: { getBoundingClientRect: () => any }) => {
      const rect = ref.getBoundingClientRect();
      let leftPosition = rect.x;
      const itemWidth = rect.width / 2.5;

      let adjustment = 0;
      if (windowWidth > 1536 && windowWidth <= 1920) {
        adjustment = (windowWidth - 1536) / 2;
      } else if (windowWidth > 1920) {
        adjustment = (windowWidth - 1920) / 2;
      }

      leftPosition -= adjustment;

      const middlePositions =
        leftPosition + itemWidth + (windowWidth >= 1920 ? 190 : 0);
      totalMiddlePositions.push(middlePositions);
    });

    setXPositions(totalMiddlePositions);
  }, []);

  return (
    <nav className="isolate sticky z-50 top-0">
      {/* White Section */}
      <div className="flex flex-row justify-between items-center px-[2rem] md:px-[8.5rem] py-[1.25rem] text-gray_black bg-white">
        <Menu>
          <div ref={menuRef}>
            <Menu.Button
              className="flex flex-row gap-2 items-center relative cursor-pointer w-auto"
              onClick={() => {
                setIsDropdownHeaderVisible(!isDropdownHeaderVisible);
              }}
            >
              <Image
                className="h-auto w-7"
                src={VectorLogo}
                alt="vector-logo"
              />
              <div className="flex flex-row gap-1 items-center">
                <p className="text-md font-bold text-black text-[14px] leading-[19.6px]">
                  Avrist Group
                </p>
                <span
                  className={`transform transition-transform ${
                    isDropdownHeaderVisible ? 'rotate-180' : ''
                  }`}
                >
                  <Icon
                    width={12}
                    height={12}
                    name="chevronDown"
                    color="black"
                  />
                </span>
              </div>

              <Menu.Items
                className={`shadow-lg z-[99] rounded-md bg-white flex flex-col p-4 gap-4 w-[150%] h-auto absolute top-full left-0 text-start`}
              >
                <Menu.Item>
                  <Link
                    href="/"
                    className="font-karla hover:text-purple_dark hover:font-medium"
                  >
                    Avrist Life Insurance
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href={EXTERNAL_URL.agiUrl}
                    target="_blank"
                    className="font-karla hover:text-purple_dark hover:font-medium"
                  >
                    Avrist General Insurance
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href={EXTERNAL_URL.avramUrl}
                    target="_blank"
                    className="font-karla hover:text-purple_dark hover:font-medium"
                  >
                    Avrist Asset Management
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu.Button>
          </div>
        </Menu>

        <div className="flex flex-row justify-between gap-4 md:divide-x-2 justify-center items-center">
          <Link
            href={`/tanya-avrista`}
            className="flex flex-row gap-2 cursor-pointer md:flex xs:hidden"
          >
            <Icon name="helpcircle" color="gray_black" />
            <p className="font-bold text-sm leading-[19.6px]">Tanya Avrista</p>
          </Link>
          <Link
            href={'https://shop.avrist.com/'}
            target="_blank"
            className="flex flex-row gap-2 cursor-pointer md:flex xs:hidden pl-3"
          >
            <Icon name="shoppingCart" color="gray_black" />
            <p className="font-bold text-sm leading-[19.6px]">Beli Online</p>
          </Link>
          <a
            href={'https://my.avrist.com/welcome'}
            target="_blank"
            className="flex flex-row gap-2 cursor-pointer md:flex xs:hidden pl-3"
          >
            <Icon name="lightBulb" color="gray_black" />
            <p className="font-bold text-sm leading-[19.6px]">
              Avrist Solution
            </p>
          </a>
          <div
            className="flex flex-row gap-2 cursor-pointer md:flex xs:hidden pl-3"
            onClick={() => setIsShowEmailSubs(true)}
          >
            <Icon name="mail" color="gray_black" />
            <p className="font-bold text-sm leading-[19.6px]">Subscribe</p>
          </div>
          <div className="flex flex-row gap-2 cursor-pointer pl-3">
            <Link href={`/pencarian`}>
              <Icon name="search" />
            </Link>
          </div>
        </div>
      </div>

      {/* Purple Section */}

      <div className="bg-gradient-to-b  from-purple_dark to-purple_light w-full m-0 text-white py-[1.25rem] px-[2rem] md:px-[8.5rem] relative">
        <div className="flex justify-between items-center w-full gap-8">
          <ul className="md:flex gap-[2.5rem] items-center hidden">
            <Link href={`/`}>
              <Button.IconButton>
                <Icon name="homeIcon" color="white" width={24} isSquare />
              </Button.IconButton>
            </Link>
            {menus.map((item, idx) => {
              return (
                <React.Fragment key={item.title}>
                  <li
                    className={`font-opensans cursor-pointer relative font-semibold leading-[23.8px] ${styles['nav-list-item']}`}
                    ref={(el) => {
                      listRef.current[idx] = el;
                    }}
                  >
                    {item.title}{' '}
                  </li>
                  <NavCard
                    customClass={`${styles['nav-card-animation']} absolute cursor-default left-0 duration-300`}
                    content={item.content}
                    title={item.title}
                    skipUrl={item.skipUrl}
                    indexData={idx}
                    xPosition={xPositions[idx]}
                  />
                </React.Fragment>
              );
            })}
          </ul>
          <Button.IconButton
            customButtonClass="inline-block md:hidden"
            onClick={() => setIsDropdownVisible((prevState) => !prevState)}
          >
            <Icon name="hamburgerMenuIcon" color="white" />
          </Button.IconButton>
          <Link href={`/`}>
            <Image alt="Avrist Logo" src={AVRIST_LOGO} width={94} height={48} />
          </Link>
        </div>
        <NavDropdownMenus
          isVisible={isDropdownVisible}
          menus={menus}
          setVisibility={(newValue: boolean) => setIsDropdownVisible(newValue)}
        />
      </div>

      <BlackOverlay
        isVisible={isDropdownVisible}
        onClick={() => setIsDropdownVisible(false)}
      />
      <EmailSubscribeModal
        show={isShowEmailSubs}
        onClose={() => setIsShowEmailSubs(false)}
        data={imageModal}
      />
    </nav>
  );
};

export default Header;
