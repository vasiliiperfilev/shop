interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const defaultButtonStyles = [
  'border',
  'border-btn-primary',
  'w-fit',
  'px-8',
  'py-2',
  'relative',
  'group',
];

const Button = ({ onClick, className, text }: ButtonProps) => {
  const getStyles = () => {
    return defaultButtonStyles.join(' ') + (className ? ' ' + className : '');
  };

  return (
    <button onClick={onClick} className={getStyles()}>
      <span className="absolute w-full h-0 group-hover:h-full transition-all ease-out duration-500 bg-btn-primary bottom-0 left-0"></span>
      <span className="group-hover:text-primary relative">{text}</span>
    </button>
  );
};

export default Button;
