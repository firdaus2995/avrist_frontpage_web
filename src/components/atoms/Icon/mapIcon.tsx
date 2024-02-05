import React from 'react';

import { IIcon } from '.';
import IconSVG from '@/svgs';

const iconType = {
  search: IconSVG.Search,
  helpcircle: IconSVG.HelpCircle,
  mail: IconSVG.Mail,
  homeIcon: IconSVG.HomeIcon,
  hamburgerMenuIcon: IconSVG.HamburgerMenuIcon,
  linkedInIcon: IconSVG.LinkedinIcon,
  tiktokIcon: IconSVG.TiktokIcon,
  instaIcon: IconSVG.InstaIcon,
  facebookIcon: IconSVG.FacebookIcon
} as const;

type IconsListType = keyof typeof iconType;
export type { IconsListType as IconsList };

const mapIcon = (props: IIcon) => {
  const Icon = iconType[props.name];

  if (!Icon) return undefined;

  return <Icon {...props} />;
};

export default mapIcon;
