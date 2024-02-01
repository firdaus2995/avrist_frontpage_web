import React from 'react';

interface IButton {
  title: string;
  onClick?: (event: React.SyntheticEvent) => void;
};

const Button = ({
  title,
  onClick,
}: IButton) => {
  return (
    <div 
      className="inline-block px-12 py-3 text-sm font-medium text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring cursor-pointer select-none"
      onClick={onClick}
    >
      {title}
    </div>
  )
}

export default Button;
