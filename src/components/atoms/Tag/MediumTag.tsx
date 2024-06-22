import React from 'react';
import Link from 'next/link';

interface IMediumTag {
  title: string;
  isLink?: boolean;
  customClass?: string;
}

const MediumTag = ({
  title,
  isLink = true,
  customClass,
  ...rest
}: IMediumTag &
  Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className'>) => {
  return isLink ? (
    <Link
      href={{
        pathname: `/pencarian`,
        query: { searchValue: title }
      }}
    >
      <p
        className={`px-2 py-1 bg-purple_dark/[.06] rounded-sm text-purple_dark/[.8] text-sm font-semibold ${customClass ?? ''}`}
        {...rest}
      >
        {title}
      </p>
    </Link>
  ) : (
    <p
      className={`px-2 py-1 bg-purple_dark/[.06] rounded-sm text-purple_dark/[.8] text-sm font-semibold ${customClass ?? ''}`}
      {...rest}
    >
      {title}
    </p>
  );
};

export default MediumTag;
