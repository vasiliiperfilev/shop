/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Spinner } from './Spinner';
import React from 'react';

const sizes = {
  sm: 'py-2 px-4 text-sm ',
  md: 'py-2 px-6 text-md ',
  lg: 'py-3 px-8 text-lg ',
};

const variants = {
  primary: 'bg-btn-primary text-primary rounded-xl ',
  inverse: 'bg-secondary-dark text-primary ',
  animated: 'border border-btn-primary ',
  transparent: 'bg-transparent ',
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
          'w-fit relative group flex ' +
          variants[variant] +
          sizes[size] +
          className
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
