import React, { ReactNode } from 'react';

type Props = {
  direction?: 'col' | 'row';
  className?: string;
  children: ReactNode;
};
const ArticleContainer = ({
  direction = 'col',
  className = '',
  children
}: Props) => {
  return (
    <div
      className={`flex justify-center flex-${direction} mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default ArticleContainer;
