import React from 'react';

interface ITitleContainer {
  children: React.ReactNode;
  className?: string;
}

const TitleContainer = ({ children, className }: ITitleContainer) => {
  return (
    <div
      className={`xs:my-[3.125rem] md:my-[5rem] xs:-tracking-[1.44px] sm:-tracking-[2.56px] font-karla xs:text-[2.25rem] md:text-[3.5rem] font-bold ${className}`}
    >
      {children}
    </div>
  );
};

export default TitleContainer;
