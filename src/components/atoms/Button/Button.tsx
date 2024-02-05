import React from 'react';

type RootButton = {
  IconButton: React.FC<Omit<IconButtonProps, 'className'>>;
};

type IconButtonProps = {
  children: React.ReactNode;
  customClass?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IButton {
  title: string;
  onClick?: (event: React.SyntheticEvent) => void;
  customClass?: string;
}

const BASE_BUTTON_CLASS =
  'inline-block px-12 py-3 text-sm font-medium border-1 rounded active:bg-indigo-500 focus:outline-none focus:ring cursor-pointer select-none ease-in-out duration-150';

const Button: RootButton & React.FC<IButton> = ({ title, onClick }) => {
  return (
    <button
      className={`${BASE_BUTTON_CLASS} text-purple_dark border-purple_dark hover:bg-purple_dark hover:text-white`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  customClass,
  ...rest
}) => {
  return (
    <button className={`bg-transparent p-2 ${customClass ?? ''}`} {...rest}>
      {children}
    </button>
  );
};

Button.IconButton = IconButton;

export default Button;
