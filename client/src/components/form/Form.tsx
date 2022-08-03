import React from 'react';
import { useEffect } from 'react';
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldPath,
} from 'react-hook-form';

export type FormErrors<TFormValues> =
  | Record<FieldPath<TFormValues>, string[]>
  | Record<string, never>;

type FormProps<TFormValues> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  errors: FormErrors<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>
>({
  onSubmit,
  errors,
  children,
  className,
  options,
  id,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...options,
  });

  const hasOwnProperty = <T extends object>(
    data: T,
    key: any
  ): key is keyof T => {
    return Object.prototype.hasOwnProperty.call(data, key);
  };

  useEffect(() => {
    for (const fieldName in errors) {
      if (hasOwnProperty(errors, fieldName)) {
        methods.setError(fieldName, {
          message: errors[fieldName][0],
        });
      }
    }
  });

  return (
    <form
      className={'space-y-6 ' + className}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
