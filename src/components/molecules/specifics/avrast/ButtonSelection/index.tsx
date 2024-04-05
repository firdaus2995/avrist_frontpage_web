import React from 'react';
import Link from 'next/link'; // Assuming you're using Next.js
import ButtonSmall from '@/components/atoms/ButtonSmall';
import ButtonSmallWithCheck from '@/components/atoms/ButtonSmallWithCheck';

export interface ButtonHelperItem {
  type: 'button' | 'button-checkbox';
  href?: string;
  label: string;
  variant?: string;
}

interface ButtonSelectionProps {
  buttonHelper: ButtonHelperItem[];
}

const ButtonSelection: React.FC<ButtonSelectionProps> = ({ buttonHelper }) => (
  <div className="flex flex-nowrap overflow-x-scroll sm:overflow-x-hidden py-1">
    <div className="flex flex-row gap-[12px] w-full">
      {buttonHelper.map((item, index) =>
        item.type === 'button' ? (
          item.href ? (
            <Link href={item.href} key={index} className="w-[200px]">
              <ButtonSmall
                title={item.label}
                customClassName="w-[200px]"
                variant={item.variant}
              />
            </Link>
          ) : (
            <ButtonSmall
              title={item.label}
              customClassName="w-[200px]"
              variant={item.variant}
            />
          )
        ) : item.type === 'button-checkbox' ? (
          <ButtonSmallWithCheck
            key={index}
            name={item.label}
            title={item.label}
          />
        ) : null
      )}
    </div>
  </div>
);

export default ButtonSelection;
