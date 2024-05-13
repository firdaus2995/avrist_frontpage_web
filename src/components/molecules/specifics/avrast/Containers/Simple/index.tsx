import React from 'react';

interface ISimpleContainer {
  children: React.ReactNode;
  bgColor?: string;
  gap?: string;
}

const SimpleContainer = ({ children, bgColor = 'white', gap }: ISimpleContainer) => {
  return (
    <div
      className={`flex flex-col justify-center px-[32px] py-[50px] sm:px-[136px] sm:py-[72px] ${gap ?? 'gap-[64px]'} bg-${bgColor}`}
    >
      {children}
    </div>
  );
};

export default SimpleContainer;
