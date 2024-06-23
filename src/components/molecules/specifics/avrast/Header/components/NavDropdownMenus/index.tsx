import React, { useEffect, useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';

import { EmailSubscribeModal } from '../../../Modal';
import { NavbarMenuItem } from '../../types';
import styles from './styles.module.css';
import Icon from '@/components/atoms/Icon';

import { getContent } from '@/services/content-page.api';
import { camelToKebabCase, convertToKebabCase } from '@/utils/helpers';
import {
  contentTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

type NavDropdownMenusProps = {
  isVisible: boolean;
  menus: NavbarMenuItem[];
  setVisibility: (newValue: boolean) => void;
};

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

const NavDropdownMenus: React.FC<NavDropdownMenusProps> = ({
  isVisible,
  menus,
  setVisibility
}) => {
  const [expandedMenu, setExpandedMenu] = useState('');
  const [isShowEmailSubs, setIsShowEmailSubs] = useState(false);
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

  return (
    <div
      className={`
        absolute top-full left-0 right-0 z-50
        flex md:hidden flex-col items-stretchgap-4 
        bg-[white]
        text-white text-sm p-4
        transition-all duration-300 ease-in-out
        max-h-[60vh] overflow-y-auto
        ${isVisible ? styles['show-menu'] : styles['hide-menu']}
      `}
    >
      {menus.map((item, index) => (
        <Disclosure key={index}>
          <div>
            <div className="flex w-full">
              <Disclosure.Button className="top- text-[black] font-medium w-full text-base text-start p-2 transition-all rounded hover:bg-white/20 outline-none focus:bg-white/20">
                {item.title}
              </Disclosure.Button>
              <Disclosure.Button>
                <Transition
                  show={true}
                  enter="transition-all"
                  enterFrom="rotate-0 opacity-100"
                  enterTo="rotate-270 opacity-0"
                  leaveFrom="rotate-0 opacity-100"
                  leaveTo="rotate-270 opacity-0"
                >
                  <div className="px-2">
                    <Icon name="chevronRight" color="purple_dark" />
                  </div>
                </Transition>
              </Disclosure.Button>
            </div>
            <Transition
              enter="transition-all"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel className="p-2 text-[black] items-stretch gap-4 pl-2">
                {item.content.map((val, idx) => (
                  <div key={idx} className={`${val.title ? 'pt-4' : 'pt-0'}`}>
                    {val.title ? (
                      <span className="text-md cursor-pointer rounded font-bold outline-none p-2">
                        {val.title}
                      </span>
                    ) : null}
                    {val.subMenus.map((el, menuIdx) =>
                      el?.listMenu ? (
                        <React.Fragment key={menuIdx}>
                          <div
                            className={`${val.title ? 'mt-4' : 'mt-0'} flex flex-row justify-between`}
                            onClick={() => {
                              if (expandedMenu === el.title)
                                setExpandedMenu('');
                              else setExpandedMenu(el.title);
                            }}
                          >
                            <div className="text-xs cursor-pointer rounded transition-all hover:bg-white/20 outline-none p-2">
                              {el.title}
                            </div>
                            <span
                              className={`mt-[3px] mr-1 ${expandedMenu === el.title && 'rotate-180 '}`}
                            >
                              <Icon
                                name="chevronDown"
                                color="purple_dark"
                                width={12}
                              />
                            </span>
                          </div>
                          <div
                            className={`${expandedMenu === el.title ? 'grid gap-4 p-2' : 'hidden'}`}
                          >
                            {expandedMenu === el.title &&
                              el.listMenu.map((subMenu, subIndex) => (
                                <Link
                                  href={{
                                    pathname: `${!item.skipUrl ? `/${convertToKebabCase(item.title)}` : ''}/${camelToKebabCase(val.title !== '' ? val.title : item.title)}`,
                                    query: { tab: el.title, category: subMenu }
                                  }}
                                  key={subIndex}
                                  onClick={() => {
                                    setExpandedMenu('');
                                    setVisibility(false);
                                  }}
                                  className="text-xs cursor-pointer rounded transition-all hover:bg-white/20 outline-none p-2"
                                >
                                  {subMenu}
                                </Link>
                              ))}
                          </div>
                        </React.Fragment>
                      ) : (
                        <div key={menuIdx} className="mt-4">
                          <Link
                            href={
                              index !== 1 || el.icon !== 2
                                ? {
                                    pathname: `
                                  ${el.customUrl ? el.customUrl : !item.skipUrl ? `/${convertToKebabCase(item.title)}` : ''}/${el.customUrl ? '' : camelToKebabCase(val.title !== '' ? val.title : item.title)}`,
                                    query: el.skipParams
                                      ? null
                                      : { tab: el.title }
                                  }
                                : 'https://my.avrist.com/welcome'
                            }
                            onClick={() => setVisibility(false)}
                            target={
                              index === 1 && el.icon === 2 ? '_blank' : '_self'
                            }
                            className="text-xs cursor-pointer rounded transition-all hover:bg-white/20 outline-none p-2"
                          >
                            {el.title}
                          </Link>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </Disclosure.Panel>
            </Transition>
          </div>
        </Disclosure>
      ))}
      <div className="grid grid-cols-2 gap-4 mt-2 border-t-2 pt-4">
        <Link
          href={`/tanya-avrista`}
          className="flex flex-row gap-2 cursor-pointer"
        >
          <Icon name="helpcircle" color="gray_black" />
          <p className="font-bold text-sm text-gray_black">Tanya Avrista</p>
        </Link>
        <Link
          href={'https://shop.avrist.com/'}
          target="blank"
          className="flex flex-row gap-2 cursor-pointer border-l-2 pl-2"
        >
          <Icon name="shoppingCart" color="gray_black" />
          <p className="font-bold text-sm text-gray_black">Beli Online</p>
        </Link>
        <a
          href={'https://my.avrist.com/welcome'}
          target="_blank"
          className="flex flex-row gap-2 cursor-pointer"
        >
          <Icon name="lightBulb" color="gray_black" />
          <p className="font-bold text-sm text-gray_black">Avrist Solution</p>
        </a>
        <div
          className="flex flex-row gap-2 cursor-pointer border-l-2 pl-2"
          onClick={() => setIsShowEmailSubs(true)}
        >
          <Icon name="mail" color="gray_black" />
          <p className="font-bold text-sm text-gray_black">Subscribe</p>
        </div>
        <div className="flex flex-row gap-2 cursor-pointer">
          <Link href={`/pencarian`}>
            <Icon name="search" />
          </Link>
        </div>
      </div>
      <EmailSubscribeModal
        show={isShowEmailSubs}
        onClose={() => setIsShowEmailSubs(false)}
        data={imageModal}
      />
    </div>
  );
};

export default NavDropdownMenus;
