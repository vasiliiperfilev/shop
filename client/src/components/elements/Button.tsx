/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Spinner } from './Spinner';
import React from 'react';

// interface ButtonProps {
//   onClick: () => void;
//   text: string;
//   className?: string;
// }

// const defaultButtonStyles = [
//   'border',
//   'border-btn-primary',
//   'w-fit',
//   'px-8',
//   'py-2',
//   'relative',
//   'group',
// ];

// const Button = ({ onClick, className, text }: ButtonProps) => {
//   const getStyles = () => {
//     return defaultButtonStyles.join(' ') + (className ? ' ' + className : '');
//   };

//   return (
//     <button onClick={onClick} className={getStyles()}>
//       <span className="absolute w-full h-0 group-hover:h-full transition-all ease-out duration-500 bg-btn-primary bottom-0 left-0"></span>
//       <span className="group-hover:text-primary relative">{text}</span>
//     </button>
//   );
// };

const sizes = {
  sm: 'py-2 px-4 text-sm ',
  md: 'py-2 px-6 text-md ',
  lg: 'py-3 px-8 text-lg ',
};

const variants = {
  primary: 'bg-btn-primary text-primary ',
  inverse: 'bg-secondary-dark text-primary ',
  animated: 'border-btn-primary ',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={
          'w-fit relative group' + variants[variant] + sizes[size] + className
        }
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {variant === 'animated' && (
          <span className="absolute w-full h-0 group-hover:h-full transition-all ease-out duration-500 bg-btn-primary bottom-0 left-0"></span>
        )}
        <span
          className={
            (variant === 'animated'
              ? 'group-hover:text-primary relative '
              : '') + 'mx-2'
          }
        >
          {props.children}
        </span>
      </button>
    );
  }
);
