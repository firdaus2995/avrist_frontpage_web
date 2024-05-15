import React from 'react';

interface ISimpleContainer {
  children: React.ReactNode;
  bgColor?: string;
  gap?: string;
}

const SimpleContainer = ({
  children,
  bgColor = 'white',
  gap
}: ISimpleContainer) => {
  return (
    <div
      className={`flex flex-col justify-center px-[2rem] py-[3.125rem] sm:px-[8.5rem] sm:py-[4.5rem] ${gap ?? 'gap-[4rem]'} bg-${bgColor}`}
    >
      {children}
    </div>
  );
};

export default SimpleContainer;
