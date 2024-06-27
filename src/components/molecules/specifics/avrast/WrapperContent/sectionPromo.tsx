import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const SectionPromo: React.FC<WrapperProps> = ({ children }) => {
  return <div className="my-[5rem]">{children}</div>;
};

export default SectionPromo;
