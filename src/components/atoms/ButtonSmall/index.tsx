interface IButtonSmall {
  title: string;
  variant?: string;
  customClassName?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonSmall = ({
  title,
  variant = 'filled',
  customClassName,
  onClick,
  type = 'button'
}: IButtonSmall) => {
  const variantButtonClassName =
    variant === 'outlined'
      ? 'bg-transparent border border-purple_dark text-purple_dark hover:bg-purple_light hover:text-white'
      : 'bg-purple_dark border border-purple_dark text-white hover:bg-purple_light';
  // const variantTextClassName =
  //   variant === 'outlined' ? 'text-purple_dark' : 'text-white';

  return (
    <button
      type={type}
      className={`px-[20px] py-[8px] rounded-[6px] ${variantButtonClassName} ${customClassName}`}
      onClick={onClick}
    >
      <p className={`font-semibold`}>{title}</p>
    </button>
  );
};

export default ButtonSmall;
