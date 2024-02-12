import React from 'react';

type RootButton = {
  IconButton: React.FC<Omit<IconButtonProps, 'className'>>;
};

type IconButtonProps = {
  children: React.ReactNode;
  customButtonClass?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IButton {
  title: string;
  onClick?: (event: React.SyntheticEvent) => void;
  customButtonClass?: string;
  customTextClass?: string;
  disabled?: boolean;
}

const BASE_BUTTON_CLASS =
  'inline-block px-12 py-3 text-sm font-medium border-1 rounded active:bg-indigo-500 focus:outline-none focus:ring cursor-pointer select-none ease-in-out duration-150';

const Button: RootButton & React.FC<IButton> = ({
  title,
  onClick,
  customButtonClass = '',
  customTextClass = '',
  disabled
}) => {
  return (
    <button
      className={`${disabled ? 'px-12 py-3 text-sm font-medium bg-gray_light text-gray_black rounded cursor-not-allowed' : `${BASE_BUTTON_CLASS} text-purple_dark border-purple_dark hover:bg-purple_dark hover:text-white ${customButtonClass}`}`}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      <p className={`${customTextClass}`}>{title}</p>
    </button>
  );
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  customButtonClass,
  ...rest
}) => {
  return (
    <button
      className={`bg-transparent p-2 ${customButtonClass ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.IconButton = IconButton;

export default Button;
