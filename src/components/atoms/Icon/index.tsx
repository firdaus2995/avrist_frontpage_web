import React from "react";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config';

import mapIcon from "./mapIcon";

export interface IIcon {
  name: string;
  width?: number;
  height?: number;
  color?: string;
};

const Icon = ({
  name,
  width = 20,
  height = 20,
  color = "black",
}: IIcon) => {
  const colorConfig = resolveConfig(tailwindConfig).theme?.colors;  
  const currentColor: string = colorConfig ? colorConfig[color] as string : color;

  return (
    mapIcon({ name, width, height, color: currentColor }) ?? <p style={{ color: 'red' }}>ICON_ERROR</p>
  )
};

export default Icon;