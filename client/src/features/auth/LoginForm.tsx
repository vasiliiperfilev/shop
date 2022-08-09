import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/elements/Button';
import { Form, FormErrors } from '../../components/form/Form';
import { Input } from '../../components/form/Input';
import useAuth from '../../hooks/useAuth';
import { LoginRequest } from '../../services/auth/types/';
import { sanitize } from 'dompurify';
import { Link } from '../../components/elements/Link';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { loginUser, isRequesting, errors, message } = useAuth();
  const onSubmit = async (data: LoginRequest) => {
    Object.keys(data).forEach(
      (k) =>
        (data[k as keyof LoginRequest] = sanitize(
          data[k as keyof LoginRequest].trim()
        ))
    );
    const user = await loginUser(data);
    if (user) {
      navigate('/shop');
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-xl mx-auto text-center mb-4">
        Log in to your account
      </h1>
      <Form<LoginRequest>
        onSubmit={onSubmit}
        errors={errors as FormErrors<LoginRequest>}
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
              })}
            />
            <div>
              <Button isLoading={isRequesting} type="submit" className="w-full">
                Log in
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
          <Link to="../register" size="lg">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
