import React from 'react';
import { tableReplacement } from '@/utils/helpers';

export const Paragraph: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: tableReplacement(data)
      }}
      className="font-opensans text-xl py-3"
    />
  );
};
