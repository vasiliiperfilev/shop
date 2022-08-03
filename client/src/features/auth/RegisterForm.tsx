import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/elements/Button';
import { Form, FormErrors } from '../../components/form/Form';
import { Input } from '../../components/form/Input';
import useAuth from '../../hooks/useAuth';
import { RegisterRequest } from '../../services/auth/types/';
import { APIError } from '../../services/axios';

const PASSWORD_COMPLEXITY_REGEX =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/i;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors<RegisterRequest>>({});
  const { register, isRegistering } = useAuth();
  const onSubmit = async (data: RegisterRequest) => {
    await register(data);
    try {
      await register(data);
      navigate('/shop');
    } catch (err: any | APIError<FormErrors<RegisterRequest>>) {
      if (!(err instanceof APIError) || !err?.errors) {
        console.error(err);
        return;
      }

      if (err.errors) {
        setErrors(err.errors);
      }
    }
  };

  return (
    <div>
      <Form<RegisterRequest>
        onSubmit={onSubmit}
        errors={errors}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email', {
                required: { value: true, message: 'Required' },
                pattern: { value: /^\S+@\S+$/i, message: 'Incorrect format' },
              })}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password', {
                required: { value: true, message: 'Required' },
                pattern: {
                  value: PASSWORD_COMPLEXITY_REGEX,
                  message:
                    'Password must have at least 2 upper-case letters, 1 lower-case letter, number and special character',
                },
              })}
            />
            <Input
              type="text"
              label="Address"
              error={formState.errors['address']}
              registration={register('address', {
                required: { value: true, message: 'Required' },
              })}
            />
            <div>
              <Button
                isLoading={isRegistering}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
