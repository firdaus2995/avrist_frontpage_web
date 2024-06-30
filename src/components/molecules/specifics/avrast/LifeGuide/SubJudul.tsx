import React from 'react';

export const SubJudul: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h1 className="text-purple_dark font-bold font-karla text-4xl -tracking-[1.08px] py-3">
      {title}
    </h1>
  );
};
