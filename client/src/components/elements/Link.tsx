import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

const sizes = {
  sm: 'text-sm ',
  md: 'text-md ',
  lg: 'text-lg ',
};

const variants = {
  primary: 'h-1 bg-btn-primary ',
  side: 'h-2 bg-btn-primary/30 ',
};

export type LinkProps = RouterLinkProps & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Link = ({
  className,
  children,
  variant = 'primary',
  size = 'md',
  ...props
}: LinkProps) => {
  return (
    <RouterLink
      className={'relative group ' + sizes[size] + className}
      {...props}
    >
      {children}
      <span
        className={
          variants[variant] +
          'absolute bottom-0 left-0 bg-btn-primary/50 w-0 group-hover:w-full ease-out duration-500'
        }
      ></span>
    </RouterLink>
  );
};
