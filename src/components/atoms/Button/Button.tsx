import React from 'react';

type RootButton = {
  IconButton: React.FC<Omit<IconButtonProps, 'className'>>;
  Radio: React.FC<Omit<RadioButtonProps, 'className'>>;
};

type IconButtonProps = {
  children: React.ReactNode;
  customButtonClass?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type RadioButtonProps = {
  children: React.ReactNode;
  customButtonClass?: string;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IButton {
  title?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  customButtonClass?: string;
  customTextClass?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const BASE_BUTTON_CLASS =
  'inline-block text-sm font-semibold border-1 rounded active:bg-indigo-500 focus:outline-none focus:ring cursor-pointer select-none ease-in-out duration-150';
const BASE_DISABLE_BUTTON_CLASS =
  'bg-gray_light text-gray_black rounded cursor-not-allowed';

const Button: RootButton & React.FC<IButton> = ({
  title,
  onClick,
  customButtonClass = '',
  customTextClass = '',
  disabled,
  children,
  isLoading = false
}) => {
  return (
    <button
      className={`${
        disabled
          ? `px-[1.25rem] py-[0.5rem] text-sm font-semibold ${BASE_DISABLE_BUTTON_CLASS}`
          : `${BASE_BUTTON_CLASS} px-[1.25rem] py-[0.5rem] text-purple_dark border-purple_dark hover:bg-purple_dark hover:text-white ${customButtonClass}`
      }`}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {isLoading && (
        <svg
          className="mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {title ? (
        <p className={`${customTextClass}`}>{title}</p>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  customButtonClass,
  ...rest
}) => {
  return (
    <button className={`p-1 ${customButtonClass ?? ''}`} {...rest}>
      {children}
    </button>
  );
};

const RadioButton: React.FC<RadioButtonProps> = ({
  children,
  customButtonClass,
  isActive,
  ...rest
}) => {
  return (
    <button
      className={`py-2 px-5 rounded-md ${BASE_BUTTON_CLASS} ${rest.disabled ? BASE_DISABLE_BUTTON_CLASS : isActive ? 'bg-dark-purple text-white' : 'bg-white text-dark-purple border-solid border-dark-purple border'} ${customButtonClass ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.IconButton = IconButton;
Button.Radio = RadioButton;

export default Button;
