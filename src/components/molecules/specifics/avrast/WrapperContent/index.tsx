import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const WrapperContent: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="md:px-[136px] xs:max-md:px-[50px] pt-[100px] pb-[24px] sm:flex sm:flex-row xs:px-[32px]">
      {children}
    </div>
  );
};

export default WrapperContent;
