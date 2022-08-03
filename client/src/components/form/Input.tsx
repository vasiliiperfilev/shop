import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperChildProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperChildProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  input?: Partial<React.InputHTMLAttributes<HTMLInputElement>>;
};

export const Input = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error, input } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={
          'appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-btn-primary focus:border-btn-secondary sm:text-sm ' +
          className
        }
        {...registration}
        {...input}
      />
    </FieldWrapper>
  );
};
