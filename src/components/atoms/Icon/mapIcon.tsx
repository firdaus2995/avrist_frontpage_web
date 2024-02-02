import React from 'react';

import { IIcon } from '.';
import IconSVG from '@/svgs';

const iconType = {
  search: IconSVG.Search,
  helpcircle: IconSVG.HelpCircle,
  mail: IconSVG.Mail,
  homeIcon: IconSVG.HomeIcon,
  hamburgerMenuIcon: IconSVG.HamburgerMenuIcon
} as const;

type IconsListType = keyof typeof iconType;
export type { IconsListType as IconsList };

type IIconType = {
  [key in IconsListType]: React.ReactElement<IIcon>;
};

const mapIcon = (props: IIcon) => {
  const iconType: IIconType = {
    search: <IconSVG.Search {...props} />,
    helpcircle: <IconSVG.HelpCircle {...props} />,
    mail: <IconSVG.Mail {...props} />,
    homeIcon: <IconSVG.HomeIcon {...props} />,
    hamburgerMenuIcon: <IconSVG.HamburgerMenuIcon {...props} />
  };

  return iconType[props.name];
};

export default mapIcon;
