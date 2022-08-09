import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/elements/Button';
import { Form, FormErrors } from '../../components/form/Form';
import { Input } from '../../components/form/Input';
import useAuth from '../../hooks/useAuth';
import { RegisterRequest } from '../../services/auth/types/';
import { sanitize } from 'dompurify';
import { Link } from '../../components/elements/Link';

const PASSWORD_COMPLEXITY_REGEX =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/i;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { registerUser, isRequesting, errors, message } = useAuth();
  const onSubmit = async (data: RegisterRequest) => {
    Object.keys(data).forEach(
      (k) =>
        (data[k as keyof RegisterRequest] = sanitize(
          data[k as keyof RegisterRequest].trim()
        ))
    );
    const user = await registerUser(data);
    if (user) {
      navigate('/shop');
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-xl mx-auto text-center mb-4">
        Register your account
      </h1>
      <Form<RegisterRequest>
        onSubmit={onSubmit}
        errors={errors as FormErrors<RegisterRequest>}
        options={{
          shouldUnregister: true,
        }}
        className="w-1/3 mx-auto bg-primary p-8 rounded-xl"
      >
        {({ register, formState, getValues }) => (
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
              type="password"
              label="Confirm password"
              error={formState.errors['confirmPassword']}
              registration={register('confirmPassword', {
                required: { value: true, message: 'Required' },
                validate: (val: string) => {
                  const { password } = getValues();

                  if (password !== val) {
                    return 'Password do not match';
                  }

                  return true;
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
              <Button isLoading={isRequesting} type="submit" className="w-full">
                Register
              </Button>
            </div>
            {message && (
              <small className="mt-1 text-sm text-red-400 dark:text-red-600">
                {message}
              </small>
            )}
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm mx-auto">
          <Link to="../login" size="lg">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
