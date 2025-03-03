import React, { useState } from 'react';
import Icon from '@/components/atoms/Icon';

interface IButtonMenuVertical {
  item: {
    title: string;
    color?: string;
    onClick?: () => void;
  }[];
  outerClass?: string;
  loading?: boolean;
}

const ButtonMenuVertical: React.FC<IButtonMenuVertical> = ({
  item,
  outerClass,
  loading
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  return (
    <div className={outerClass}>
      <div className="xs:hidden md:block w-full bg-purple_light_bg rounded-xl cursor-pointer gap-[12px] border-l-8 border-l-purple_dark min-w-[240px]">
        {item.map((i, index) => (
          <span
            className={`flex flex-row gap-4 items-center py-[12px] pl-[24px] ${loading && 'cursor-default'}`}
            key={index}
            onClick={() => {
              if (!loading) {
                i.onClick ? i.onClick() : null;
                setSelected(index);
              }
            }}
          >
            <div
              className={`w-[6px] h-full ${index === selected ? 'bg-purple_dark' : 'bg-purple_mediumlight'} ${index === 0 ? 'rounded-tl-xl' : index === item.length - 1 ? 'rounded-bl-xl' : ''}`}
            />
            <p
              className={`w-full text-md sm:text-[18px] font-bold leading-[25.2px] ${i.color ? i.color : selected === index ? 'text-purple_dark' : 'text-purple_mediumlight'}`}
            >
              {i.title}
            </p>
          </span>
        ))}
      </div>

      <div className="md:hidden w-full h-full bg-white rounded-xl relative">
        <span
          className={`flex flex-row justify-between items-center cursor-pointer pr-4 px-5 py-2 border-l-8 border-l-purple_dark ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="flex flex-row gap-4 items-center">
            <p
              className={`font-opensanspro text-[18px] font-bold text-purple_dark leading-[25.2px] pr-4`}
            >
              {item[selected]?.title}
            </p>
          </div>

          <span className={`h-full ${isOpen ? 'rotate-[180deg]' : ''}`}>
            <Icon name="chevronDown" color="black" width={12} height={12} />
          </span>
        </span>
        {isOpen && (
          <div className="absolute w-full bg-white z-[10]">
            {item.map(
              (i, index) =>
                index !== selected && (
                  <span
                    className={`flex flex-row justify-between items-center cursor-pointer pr-4 px-5 py-2 border-l-8 border-l-purple_dark ${index === item.length - 1 ? 'rounded-b-xl' : ''}`}
                    key={index}
                    onClick={() => {
                      i.onClick ? i.onClick() : null;
                      setSelected(index);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex flex-row gap-4 items-center">
                      <p
                        className={`text-md sm:text-[18px] font-bold pr-4 ${i.color ? i.color : index === selected ? 'text-purple_dark' : 'text-purple_mediumlight'}`}
                      >
                        {index !== selected && i.title}
                      </p>
                    </div>
                  </span>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonMenuVertical;
