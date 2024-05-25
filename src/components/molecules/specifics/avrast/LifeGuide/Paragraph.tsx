import React from 'react';

export const Paragraph: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data
      }}
      className="font-opensans text-xl py-3"
    />
  );
};
