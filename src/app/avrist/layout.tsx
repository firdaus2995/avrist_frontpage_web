import React from 'react';

type AvristLayoutProps = {
  children: React.ReactNode;
};

const AvristLayout: React.FC<AvristLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-opensans">
      {children}
    </div>
  );
};

export default AvristLayout;
