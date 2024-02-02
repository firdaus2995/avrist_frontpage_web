import React from "react";

import { IIcon } from ".";
import Icon from "@/svgs";

interface IIconType {
  [key: string]: React.ReactElement<IIcon>;
};

const mapIcon = (props: IIcon) => {
  const iconType: IIconType = {
    search: <Icon.Search {...props} />,
    helpcircle: <Icon.HelpCircle {...props} />,
    mail: <Icon.Mail {...props} />,
  };

  return iconType[props.name];
}

export default mapIcon;
