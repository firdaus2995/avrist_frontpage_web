import React from 'react';
import Link from 'next/link';

const urlPattern = /^(?:(?:(?:https?|ftp):)?\/\/)/;

const CustomLink = ({
  href = '',
  children,
  className = '',
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <>
      {urlPattern.test(href) ? (
        <a href={href} target="_blank" className={className} {...props}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

export default CustomLink;
