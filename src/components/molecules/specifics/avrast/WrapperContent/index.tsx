import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const WrapperContent: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="md:px-[136px] xs:max-md:px-[50px] md:pt-[100px] xs:pt-[50px] pb-[28px] sm:flex sm:flex-row xs:px-[32px]">
      {children}
    </div>
  );
};

export default WrapperContent;
