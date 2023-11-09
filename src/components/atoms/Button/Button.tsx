import React from 'react';

export default function Button({ title }: string) {
  return (
    <a className="inline-block px-12 py-3 text-sm font-medium text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
      {title}
    </a>
  );
}
