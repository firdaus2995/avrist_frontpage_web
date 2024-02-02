import React from 'react';
import Header from '@/components/molecules/specifics/avrist/Header';

type AvristLayoutProps = {
  children: React.ReactNode;
};

const AvristLayout: React.FC<AvristLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-opensans">
      <Header />
      {children}
    </div>
  );
};

export default AvristLayout;
