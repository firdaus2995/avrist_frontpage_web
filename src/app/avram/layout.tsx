import React from 'react';

import Header from '@/components/molecules/specifics/avrist/Header';

const Avram = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-opensans">
      <Header />
      <div className="text-black">{children}</div>
      <footer className="flex justify-center items-center text-black">
        Footer
      </footer>
    </div>
  );
};

export default Avram;
