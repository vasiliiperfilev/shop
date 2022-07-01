import { useAppSelector } from '../redux/hooks';

const ErrorPage = () => {
  const errorMessage = useAppSelector(({ error }) => error);
  return (
    <div style={{ padding: '1rem' }}>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
